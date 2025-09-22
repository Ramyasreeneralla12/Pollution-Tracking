import pandas as pd

def load_pollution_data():
    df = pd.read_csv('./data/pollution_data.csv')
    return df
