import pandas as pd
from churnguard.preprocessing import convert_numeric_columns

def test_convert_total_charges():
    df=pd.DataFrame({"TotalCharges":["100.5","200"]})
    result=convert_numeric_columns(df)
