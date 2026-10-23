import joblib 
from sklearn.metrics import (precision_score,recall_score,f1_score,confusion_matrix)
from churnguard.prepare import prepare_data
THRESHOLD=0.3

X_train, X_test, y_train, y_test = prepare_data(
    "data/WA_Fn-UseC_-Telco-Customer-Churn.csv"
)
model = joblib.load("artifacts/CatBoost_churn.joblib")

proba=model.predict_proba(X_test)[:,1]
pred=proba>=THRESHOLD

print("precision:", round(precision_score(y_test, pred), 3))
print("recall:   ", round(recall_score(y_test, pred), 3))
print("f1:       ", round(f1_score(y_test, pred), 3))
print(confusion_matrix(y_test, pred))