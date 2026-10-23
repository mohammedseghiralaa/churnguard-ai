import joblib 
from churnguard.prepare import prepare_data
from sklearn.model_selection import StratifiedKFold,cross_val_predict
from sklearn.metrics import precision_score,recall_score,f1_score
x_train,x_test,y_train,y_test=prepare_data("data/WA_Fn-UseC_-Telco-Customer-Churn.csv")

model=joblib.load("artifacts/CatBoost_churn.joblib")

cv=StratifiedKFold(n_splits=5,shuffle=True,random_state=2)
oof=cross_val_predict(model,x_train,y_train,cv=cv,method="predict_proba")[:,1]

print("threshold   precision recall f1")
for t in [0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50]:
    pred = oof >= t
    print(f"{t:.2f}       {precision_score(y_train, pred):.3f}      "
          f"{recall_score(y_train, pred):.3f}    {f1_score(y_train, pred):.3f}")