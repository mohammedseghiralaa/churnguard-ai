from churnguard.models import get_models
from sklearn.model_selection import RandomizedSearchCV
from churnguard.model import create_model
param_distributions = {
        "logistic regression": {
            "classifier__C": [0.01, 0.1, 1, 10, 100],
        },
        "random forest": {
            "classifier__n_estimators": [100, 200, 300],
            "classifier__max_depth": [None, 5, 10, 15, 20],
            "classifier__min_samples_split": [2, 5, 10],
            "classifier__min_samples_leaf": [1, 2, 4],
        },
        "CatBoost": {
            "classifier__iterations": [100, 200, 300, 500],
            "classifier__depth": [3, 4, 5, 6, 8],
            "classifier__learning_rate": [0.01, 0.03, 0.05, 0.1],
            "classifier__l2_leaf_reg": [1, 3, 5, 7, 9],
        },
        "xgboost": {
            "classifier__n_estimators": [100, 200, 300, 500],
            "classifier__max_depth": [3, 4, 5, 6, 8],
            "classifier__learning_rate": [0.01, 0.03, 0.05, 0.1],
            "classifier__subsample": [0.7, 0.8, 0.9, 1.0],
            "classifier__colsample_bytree": [0.7, 0.8, 0.9, 1.0],
        },
    }


def tune_model(X,Y,model_name,n_iter=10):
    models=get_models()
    if model_name not in models:
        raise ValueError(f"unknown model name {model_name}")
    pipline = create_model(X,models[model_name])

    search=RandomizedSearchCV(
        estimator=pipline,
        param_distributions=param_distributions[model_name],
        n_iter=n_iter,
        scoring="roc_auc",
        cv=5,
        random_state=41,
        n_jobs=-1,
        verbose=1,
        error_score="raise",
    )
    search.fit(X,Y)
    return search