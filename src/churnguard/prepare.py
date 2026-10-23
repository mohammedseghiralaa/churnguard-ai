import pandas as pd 
from pathlib import Path
from churnguard.data import load_data
from churnguard.features import split_features_target
from churnguard.preprocessing import convert_numeric_columns
from churnguard.splite import splite_data
def prepare_data(path:str|Path)->tuple[pd.DataFrame,pd.DataFrame,pd.Series,pd.Series]:
    df=load_data(path)
    df=convert_numeric_columns(df)
    X,Y=split_features_target(df)
    X_train,X_test,Y_train,Y_test=splite_data(X,Y)
    return X_train,X_test,Y_train,Y_test


