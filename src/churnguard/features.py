import pandas as pd
def split_features_target(df:pd.DataFrame):
    X=df.drop(columns=["Churn","customerID"])
    Y=df["Churn"].map({"No":0,"Yes":1})
    return X,Y