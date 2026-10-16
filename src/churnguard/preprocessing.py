import pandas as pd 

def convert_numeric_columns(df :pd.DataFrame)->pd.DataFrame:
    """Convert totalchargers to numerical"""
    if "TotalCharges" in df.columns:
        df["TotalCharges"]=pd.to_numeric(df["TotalCharges"].str.strip(),errors="coerce")
    return df