import pandas as ps
from churnguard.validation import validate_data
from churnguard.data import load_data

def test_validate_data():
    df=load_data("data/WA_Fn-UseC_-Telco-Customer-Churn.csv")
    report=validate_data(df)
    assert report["rows"]==7043
    assert report["columns"]==21
