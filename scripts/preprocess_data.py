import pandas as pd
import numpy as np
from pandas import json_normalize
import json
import networkx as nx
import datetime
from datetime import datetime, timedelta
from datetime import timezone
from collections import defaultdict
from queue import PriorityQueue
import time
import requests
import os

# note that something about this file isn't running correctly and its most likely a dependencies issue? 


url = "https://mgwalker.github.io/amtrak-api/trains.json"
try:
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for unsuccessful requests
    data = response.json()
except requests.exceptions.RequestException as e:
    print("Error occurred while fetching the JSON data:", e)

# Extract the relevant information from the JSON
train_data = []
for train in data:
    train_number = train['number']
    train_route = train['route']
    stations = train['stations']

    for i, station in enumerate(stations):
        station_code = station['station']['code']
        station_name = station['station']['name']
        station_lat = station['station']['lat']
        station_lon = station['station']['lon']

        arrival_actual = station.get('arrivalActual')
        arrival_estimated = station.get('arrivalEstimated')
        arrival_scheduled = station.get('arrivalScheduled')

        departure_actual = station.get('departureActual')
        departure_estimated = station.get('departureEstimated')
        departure_scheduled = station.get('departureScheduled')

        # Prioritize Scheduled time over Estimated and Actual time for Arrival
        arrival_time = arrival_scheduled
        arrival_method = 'scheduled'

        if arrival_time is None:
            arrival_time = arrival_estimated
            arrival_method = 'estimated'

        if arrival_time is None:
            arrival_time = arrival_actual
            arrival_method = 'actual'

        # Choose the Departure time based on the same method as Arrival
        if arrival_method == 'scheduled':
            departure_time = departure_scheduled
        elif arrival_method == 'estimated':
            departure_time = departure_estimated
        else:
            departure_time = departure_actual

        # Handle cases where all arrival times are None for the first stop
        if i == 0 and arrival_time is None:
            arrival_time = departure_time

        # Handle cases where all departure times are None for the last stop
        if i == len(stations) - 1 and departure_time is None:
            departure_time = arrival_time

        # If departure time is still None, set it equal to the arrival time
        if departure_time is None:
            departure_time = arrival_time

        # Check if departure is after arrival
        is_departure_after_arrival = pd.to_datetime(departure_time) >= pd.to_datetime(arrival_time) if arrival_time and departure_time else False

        # Get the next station code and name if it exists
        next_station = stations[i + 1]['station']['code'] if i < len(stations) - 1 else None
        next_station_name = stations[i + 1]['station']['name'] if i < len(stations) - 1 else None

        # Calculate the travel time to the next station
        if next_station:
            next_arrival_time = pd.to_datetime(stations[i + 1]['arrivalScheduled'])
            if pd.isnull(next_arrival_time):
                next_arrival_time = pd.to_datetime(stations[i + 1]['arrivalEstimated'])
            if pd.isnull(next_arrival_time):
                next_arrival_time = pd.to_datetime(stations[i + 1]['arrivalActual'])
            travel_time = next_arrival_time - pd.to_datetime(departure_time) if departure_time and next_arrival_time else None
        else:
            travel_time = None

        train_data.append([
            train_number,
            train_route, station_code, station_name, train_route, next_station, next_station_name, travel_time, arrival_time, departure_time,
            # departure_actual, departure_estimated, departure_scheduled,
            # arrival_actual, arrival_estimated, arrival_scheduled
        ])
# Create the DataFrame with all columns, including commented out columns
df = pd.DataFrame(train_data, columns=[
    'train_number',
    'from_route', 'from_station', 'from_station_name', 'to_route', 'to_station', 'to_station_name', 'time', 'arrival', 'departure',
    # 'departureActual', 'departureEstimated', 'departureScheduled',
    # 'arrivalActual', 'arrivalEstimated', 'arrivalScheduled'
])

# Convert 'time' column to seconds and change its data type to integer
df['time'] = df['time'].dt.total_seconds().fillna(0).astype(int)
# Cast 'arrival' and 'departure' columns to datetime
df['arrival'] = pd.to_datetime(df['arrival'])
df['departure'] = pd.to_datetime(df['departure'])
# Convert all other columns (excluding 'time', 'arrival', 'departure') to string
string_columns = df.columns.drop(['time', 'arrival', 'departure'])
df[string_columns] = df[string_columns].astype(str)
# Replace None values with empty strings in string columns
df[string_columns] = df[string_columns].fillna('')

# Get the absolute path to the src/data directory
src_data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'src', 'data'))
# Create the src/data directory if it doesn't exist
os.makedirs(src_data_dir, exist_ok=True)
# Save the DataFrame to a CSV file in the src/data directory
csv_file_path = os.path.join(src_data_dir, 'train_data.csv')
df.to_csv(csv_file_path, index=False)

# Save the last run timestamp to a file
last_run_file = os.path.join(src_data_dir, 'last_run.txt')
with open(last_run_file, 'w') as file:
    file.write(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))