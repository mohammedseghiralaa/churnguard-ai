import pandas as pd 
from sklearn.model_selection import train_test_split
def splite_data(X:pd.DataFrame,Y:pd.Series,test_size:float=0.2,random_state:int=2):
    return train_test_split(X,Y,test_size=test_size,random_state=random_state,stratify=Y)
