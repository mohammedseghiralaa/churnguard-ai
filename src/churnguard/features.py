import pandas as pd
def split_features_target(df:pd.DataFrame):
    X=df.drop(columns=["Churn","customer ID"])
    Y=df["Churn"]
    return X,