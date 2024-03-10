import json
import os
import sys
import pandas as pd
import heapq

# Get the absolute path to the src/data directory
src_data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src', 'data'))

# Load the preprocessed train data from the CSV file
csv_file_path = os.path.join(src_data_dir, 'train_data.csv')
df = pd.read_csv(csv_file_path)

# Cast 'arrival' and 'departure' columns to datetime
df['arrival'] = pd.to_datetime(df['arrival'])
df['departure'] = pd.to_datetime(df['departure'])
string_columns = df.columns.drop(['time', 'arrival', 'departure'])
df[string_columns] = df[string_columns].astype(str)
# Replace None values with empty strings in string columns
df[string_columns] = df[string_columns].fillna('')
filtered_df = df[df['to_station'] == 'NYP'].copy()
filtered_json = filtered_df.to_json()

def calculate_elapsed_time(start_time, end_time):
    elapsed_time = end_time - start_time
    return int(elapsed_time.total_seconds())

def dijkstra(origin_station, destination_station):
    if origin_station == destination_station:
          # Handle the case when origin and destination are the same
          return json.dumps([{
              'route_names': [],
              'start_time': '',
              'end_time': '',
              'elapsed_time': 0,
              'transfers': [],
              'stops': [{
                  'station': origin_station,
                  'route_name': '',
                  'train_number': '',
                  'arrival_time': '',
                  'departure_time': '',
                  'next_stop': None
              }]
          }])
    # Create a dictionary to store the graph
    graph = {}
    for _, row in df.iterrows():
        from_station = row['from_station']
        to_station = row['to_station']
        from_station_name = row['from_station_name']
        to_station_name = row['to_station_name']
        route_name = row['from_route']
        train_number = row['train_number']
        departure_time = pd.to_datetime(row['departure'])
        arrival_time = pd.to_datetime(row['arrival'])

        if from_station not in graph:
            graph[from_station] = []
        graph[from_station].append((to_station, from_station_name, to_station_name, route_name, train_number, departure_time, arrival_time))

    # Initialize variables
    paths = []
    visited = set()
    pq = [(0, origin_station, [], None, None, None, None)]

    while pq:
        (cost, current_station, path, route_names, train_numbers, departure_times, arrival_times) = heapq.heappop(pq)

        if (current_station, arrival_times[-1] if arrival_times else None) in visited:
            continue

        visited.add((current_station, arrival_times[-1] if arrival_times else None))
        path = path + [current_station]

        if current_station == destination_station:
            path_info = {
                'route_names': list(set(route_names)),
                'start_time': departure_times[0].isoformat(),
                'end_time': arrival_times[-1].isoformat(),
                'elapsed_time': calculate_elapsed_time(departure_times[0], arrival_times[-1]),
                'transfers': [],
                'stops': []
            }
            for i in range(len(path) - 1):
                stop_info = {
                    'station': path[i],
                    'route_name': route_names[i],
                    'train_number': train_numbers[i],
                    'arrival_time': arrival_times[i].isoformat(),
                    'departure_time': departure_times[i].isoformat(),
                    'next_stop': path[i+1]
                }
                path_info['stops'].append(stop_info)

                if i < len(route_names) - 1 and route_names[i] != route_names[i+1]:
                    path_info['transfers'].append({
                        'station': path[i+1],
                        'station_name': graph[path[i]][0][2],  # Add station name to transfers
                        'arrival_time': arrival_times[i].isoformat(),
                        'departure_time': departure_times[i+1].isoformat(),
                        'layover_time': calculate_elapsed_time(arrival_times[i], departure_times[i+1])
                    })

            # Add the last stop
            path_info['stops'].append({
                'station': path[-1],
                'route_name': route_names[-1],
                'train_number': train_numbers[-1],
                'arrival_time': arrival_times[-1].isoformat(),
                'departure_time': departure_times[-1].isoformat(),
                'next_stop': None
            })

            paths.append(path_info)
            continue  # Move to the next path in the priority queue

        if current_station in graph:
            for neighbor, from_station_name, to_station_name, route_name, train_number, departure_time, arrival_time in graph[current_station]:
                if arrival_times is None or departure_time >= arrival_times[-1]:
                    new_route_names = route_names + [route_name] if route_names else [route_name]
                    new_train_numbers = train_numbers + [train_number] if train_numbers else [train_number]
                    new_departure_times = departure_times + [departure_time] if departure_times else [departure_time]
                    new_arrival_times = arrival_times + [arrival_time] if arrival_times else [arrival_time]
                    heapq.heappush(pq, (cost + 1, neighbor, path, new_route_names, new_train_numbers, new_departure_times, new_arrival_times))

    # Filter paths to keep only the shortest elapsed time for each start time
    filtered_paths = []
    start_time_dict = {}
    for path in paths:
        start_time = path['start_time']
        elapsed_time = path['elapsed_time']

        if start_time not in start_time_dict or elapsed_time < start_time_dict[start_time]['elapsed_time']:
            start_time_dict[start_time] = {
                'elapsed_time': elapsed_time,
                'path': path
            }

    filtered_paths = [path_info['path'] for path_info in start_time_dict.values()]

    return json.dumps(filtered_paths, default=str)

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python path_calculation.py <origin_station> <destination_station>")
        sys.exit(1)

    origin_station = sys.argv[1]
    destination_station = sys.argv[2]

    paths_json = dijkstra(origin_station, destination_station)
    print(paths_json)