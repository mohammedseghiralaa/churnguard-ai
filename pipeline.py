import pandas as pd
from sklearn.compose import ColumnTransformer 
from sklearn.impute import SimpleImputer 
from sklearn.pipeline import Pipeline 
from sklearn.preprocessing import OneHotEncoder,StandardScaler

def create_preprocessing_pipline(x:pd.DataFrame)-> ColumnTransformer:
    numerical_columns=x.select_dtypes(include=["number"]).columns.to_list()
    categorical_columns=x.select_dtypes(include=["object","bool","category"]).columns.to_list()
    numerical_pipline=Pipeline(
        steps=[
            ("imputer",SimpleImputer(strategy="median")),
            ("scaler",StandardScaler())
        ]
    )
    categorical_pipline=Pipeline(
        steps=[
            ("imputer",SimpleImputer(strategy="most_frequent")),
            ("encoder",OneHotEncoder(handle_unknown="ignore"
            ))
        ]
    )
    preprocessor=ColumnTransformer(
        transformers=[
            ("numerical",numerical_pipline,numerical_columns),
            ("categorical",categorical_pipline,categorical_columns)
        ],
        remainder="drop"
    )
    return preprocessor