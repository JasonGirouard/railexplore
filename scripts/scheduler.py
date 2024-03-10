import schedule
import time
import subprocess

def run_preprocessing():
    subprocess.run(['python', 'preprocess_data.py'])

schedule.every().day.at('00:00').do(run_preprocessing)

while True:
    schedule.run_pending()
    time.sleep(1)