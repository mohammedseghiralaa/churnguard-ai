import pandas as pd 
from churnguard.prepare import prepare_data 
from churnguard.tuning import tune_model
from churnguard.evaluation import evaluate_model
from churnguard.save_model import save_model
def main():
     data_path = "data/WA_Fn-UseC_-Telco-Customer-Churn.csv"
     X_train, X_test, Y_train, Y_test = prepare_data(data_path)
     model_names=[
          "logistic regression",
          "random forest",
          "CatBoost",
          "xgboost"
     ]
     results={}
     for name in model_names:
          print(f"\n tuning {name}")
          search=tune_model(X_train,Y_train,model_name=name)
          best_model=search.best_estimator_
          save_model(best_model,f"{name.replace(" ","_")}_churn")
          test_results=evaluate_model(best_model,X_test,Y_test)
          results[name] = {
            "CV ROC-AUC": search.best_score_,
            **test_results,
        }
          print(f"Best parameters: {search.best_params_}")
          print(f"Best CV ROC-AUC: {search.best_score_:.4f}")
          print(f"Test results: {test_results}")
     comparison=pd.DataFrame(results).T
     print("\n tuning comparison")
     print(comparison)


if __name__=="__main__":
     main()
