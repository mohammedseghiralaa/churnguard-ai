from pathlib import Path
import pandas as pd

def load_data(path:str|Path)-> pd.DataFrame:
    path=Path(path)
    if not path.exists():
        raise 
    FileNotFoundError(f"dataset not found at : {path}")
    if path.suffix.lower()!=".csv":
        raise ValueError("expected a csv file")
    return pd.read_csv(path)
