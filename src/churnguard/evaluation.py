import pandas as pd
from sklearn.metrics import (accuracy_score,f1_score,roc_auc_score,recall_score,precision_score)

def evaluate_model(model,X_test,Y_test):
    y_pred=model.predict(X_test)
    y_proba=model.predict_proba(X_test)[:,1]
    result={
        "accurancy":accuracy_score(Y_test,y_pred),
        "precision":precision_score(Y_test,y_pred,zero_division=0),
        "recall":recall_score(Y_test,y_pred,zero_division=0),
        "f1":f1_score(Y_test,y_pred,zero_division=0),
        "Roc-auc":roc_auc_score((Y_test==1).astype(int),y_proba)
    }
    return result

def compare_model(result):
    comparison=pd.DataFrame(result).T
    return comparison.sort_values(by="Roc-auc",ascending=False)