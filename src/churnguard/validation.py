import pandas as pd

def validate_data(df:pd.DataFrame)->dict:
       """Genrate a basic data quality report."""
       report={
        "rows":len(df),
        "columns":len(df.columns),
        "missing_values":df.isnull().sum().to_dict(),
        "duplicate_rows":df.duplicated().sum(),
        "column_types":df.dtypes.astype(str).to_dict(),
       }
       return report 