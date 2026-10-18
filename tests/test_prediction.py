import pandas as pd
from churnguard.predict import predict_churn

data_path = "data/WA_Fn-UseC_-Telco-Customer-Churn.csv"

df=pd.read_csv(data_path)
customer=df.drop(columns=["Churn"]).iloc[1].to_dict()


result=predict_churn(customer,model_name="catboost_churn")

print("prediction",)
print(result)