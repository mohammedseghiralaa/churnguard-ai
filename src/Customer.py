import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split ,StratifiedKFold,cross_val_score,cross_val_predict,GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    confusion_matrix,
    classification_report,
    precision_score,
    f1_score,
    roc_auc_score,
    average_precision_score,
    recall_score
)
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from imblearn.pipeline import Pipeline as ImbPipline
from imblearn.over_sampling import SMOTE
import shap

dataset=pd.read_csv("WA_Fn-UseC_-Telco-Customer-Churn.csv")
dataset["TotalCharges"]=pd.to_numeric(
    dataset["TotalCharges"],errors="coerce"
)
Target=dataset["Churn"].map({
    "No":0,
    "Yes":1
})
Features=dataset.drop("Churn",axis=1)

X_train,X_test,Y_train,Y_test=train_test_split(Features,Target,test_size=0.2,random_state=1,stratify=Target)

numerical_features=X_train.select_dtypes(include=["int64","float64"]).columns

categorical_features=X_train.select_dtypes(include=["object"]).columns

num_pipline=Pipeline([
    ("imputer",SimpleImputer(strategy="median")),
    ("scaler",StandardScaler())
])

cat_pipline=Pipeline([
    ("imputer",SimpleImputer(strategy="most_frequent")),
    ("encoder",OneHotEncoder(handle_unknown="ignore"))
])

preprocessor=ColumnTransformer([
    ("num",num_pipline,numerical_features),
    ("cat",cat_pipline,categorical_features)
])

logistic_Pipline=Pipeline([
    ("preprocessor",preprocessor),
    ("model",LogisticRegression())
])

cv=StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=1
)

scores=cross_val_score(
    logistic_Pipline,
    X_train,
    Y_train,
    cv=cv,
    scoring="f1"
)

param_grid={
    "model__C":[0.01,0.1,1,10,100]
}
grid_search=GridSearchCV(
    logistic_Pipline,
    param_grid=param_grid,
    cv=cv,
    scoring="f1",
    n_jobs=-1
)
grid_search.fit(X_train,Y_train)

best_model=grid_search.best_estimator_
y_pred=best_model.predict(X_test)

test_f1=f1_score(Y_test,y_pred)
print("Logistic Model ",test_f1)

#===============Random Forest Model 
random_forest_pipline=Pipeline([
    ("preprocessor",preprocessor),
    ("model",RandomForestClassifier(random_state=1))
])

param_grid_rf={
    "model__n_estimators":[100,200],
    "model__max_depth":[None,5,10]
}

grid_search_rf=GridSearchCV(
    random_forest_pipline,
    param_grid=param_grid_rf,
    cv=cv,
    scoring="f1",
    n_jobs=-1
)
grid_search_rf.fit(X_train,Y_train)

best_rf=grid_search_rf.best_estimator_
y_pred_rf=best_rf.predict(X_test)
test_f1_rf=f1_score(Y_test,y_pred_rf)
print("Rf model",test_f1_rf)
#============== xgboost 
xgb_pipeline=ImbPipline([
    ("preprocessor",preprocessor),
    ("smote",SMOTE(random_state=1)),
    ("model",XGBClassifier(random_state=1,eval_metric="logloss"))
])
xgb_scores=cross_val_score(
    xgb_pipeline,
    X_train,
    Y_train,
    cv=cv,
    scoring="f1",
    n_jobs=-1
)

param_grid_xgb={
    "model__n_estimators":[100,200],
    "model__max_depth":[3,5],
    "model__learning_rate":[0.05,0.1]
}
grid_search_xgb=GridSearchCV(
    xgb_pipeline,
    param_grid=param_grid_xgb,
    cv=cv,
    scoring="f1",
    n_jobs=-1
)
grid_search_xgb.fit(X_train,Y_train)

best_xgb=grid_search_xgb.best_estimator_
y_pred_xgb=best_xgb.predict(X_test)
test_f1_xgb=f1_score(Y_test,y_pred_xgb)
print("xgb Model",test_f1_xgb)
# =========================================================
# 21. XGBoost Probabilities
# =========================================================
y_proba_xgb=best_xgb.predict_proba(X_test)[:,1]
# =========================================================
# 22. Confusion Matrix
# =========================================================
print("confusion matrix")
print(
    confusion_matrix(
        Y_test,
        y_pred_xgb
    )
)

# =========================================================
# 29. Threshold Tuning
# =========================================================
oof_proba=cross_val_predict(
    best_xgb,
    X_train,
    Y_train,
    cv=cv,
    method="predict_proba",
    n_jobs=-1
    )[:,1]

thresholds = np.arange(0.1, 0.91, 0.05)

results = []

for threshold in thresholds:

    y_pred_threshold = (
        oof_proba >= threshold
    ).astype(int)

    precision = precision_score(
        Y_train,
        y_pred_threshold,
        zero_division=0
    )

    recall = recall_score(
        Y_train,
        y_pred_threshold,
        zero_division=0
    )

    f1 = f1_score(
        Y_train,
        y_pred_threshold,
        zero_division=0
    )

    results.append({
        "threshold": threshold,
        "precision": precision,
        "recall": recall,
        "f1": f1
    })


results_df = pd.DataFrame(results)

best_threshold = results_df.loc[
    results_df["f1"].idxmax(),
    "threshold"
]

y_pred_final=(
    y_proba_xgb>=best_threshold
).astype(int)

# model=best_xgb.named_steps["model"]
# preprocessor_fitted=best_xgb.named_steps["preprocessor"]
# X_test_transformed=preprocessor_fitted.transform(X_test)
# feature_names=preprocessor_fitted.get_feature_names_out()
# explainer = shap.TreeExplainer(model)

# shap_values = explainer.shap_values(X_test_transformed)
# shap.summary_plot(
#     shap_values,
#     X_test_transformed,
#     feature_names=feature_names
# )

# customer=X_test.iloc[[0]]
# customer_transformed=preprocessor_fitted.transform(customer)
# customer_shap=explainer.shap_values(customer_transformed)
# shap.force_plot(
#     explainer.expected_value,
#     customer_shap[0],
#     feature_names=feature_names,
#     matplotlib=True
# )


#              comparison
comparison=pd.DataFrame({
    "Model":[
        "Logistic Regression",
        "random forest ",
        "xgboost+ smote"
    ],
    "F1":[
        test_f1,
        test_f1_rf,
        test_f1_xgb
    ]
})
print(comparison.sort_values("F1",ascending=False))

print("===== XGBOOST FINAL EVALUATION =====")

print("F1:", f1_score(Y_test, y_pred_final))

print("Precision:", precision_score(
    Y_test,
    y_pred_final,
    zero_division=0
))

print("Recall:", recall_score(
    Y_test,
    y_pred_final,
    zero_division=0
))

print("ROC-AUC:", roc_auc_score(
    Y_test,
    y_proba_xgb
))

print("F1 before threshold tuning:", test_f1_xgb)

print("F1 after threshold tuning:",
      f1_score(Y_test, y_pred_final))

print("Best threshold:", best_threshold)