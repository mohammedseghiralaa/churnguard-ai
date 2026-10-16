from pathlib import Path
import pandas as pd

PROJECT_ROOT=Path(__file__).resolve().parents[2]
DATA_PATH=PROJECT_ROOT/"data"/"WA_Fn-UseC_-Telco-Customer-Churn.csv"

def load_data()-> pd.DataFrame:
    """ Load the telco customer churn dataset."""
    if not DATA_PATH.exists():
        raise 
    FileNotFoundError(f"dataset not found at : {DATA_PATH}")
    df =pd.read_csv(DATA_PATH)
    if df.empty:
        raise ValueError("The dataset is empty")
    return df

load_data()