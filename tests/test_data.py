from churnguard.data import load_data
def test_load_data(path:str="data/WA_Fn-UseC_-Telco-Customer-Churn.csv"):
    df=load_data(path=path)
    
   