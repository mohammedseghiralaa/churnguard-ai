from pathlib import Path 
from churnguard.prepare import prepare_data 
from churnguard.models import get_models
from churnguard.model import create_model 
from churnguard.evaluation import evaluate_model,compare_model
import pandas as pd 

def main():
    data_path="data/WA_Fn-UseC_-Telco-Customer-Churn.csv"

    X_train,X_test,Y_train,Y_test=prepare_data(data_path)
    models=get_models()
    results={}
    for name,classifier in models.items():

        print(f"training {name} ....")
        model=create_model(X_train,classifier)
        model.fit(X_train,Y_train)
        results[name]=evaluate_model(model,X_test,Y_test)
        print(f"{name} Roc-auc:{results[name]["Roc-auc"]}")
        comparison=compare_model(results)

        print("\n model comparison")
        print(comparison.round(4))

main()