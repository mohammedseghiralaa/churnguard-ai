import pandas as pd
from sklearn.model_selection import StratifiedKFold,cross_validate
from churnguard.model import create_model
def validate_data(df:pd.DataFrame)->dict:
       report={
        "rows":len(df),
        "columns":len(df.columns),
        "missing_values":df.isnull().sum().to_dict(),
        "duplicate_rows":df.duplicated().sum(),
        "column_types":df.dtypes.astype(str).to_dict(),
       }
       return report 

def cross_validate_model(
    X: pd.DataFrame,
    Y: pd.Series,
    classifier,
    n_splits: int = 5,
) -> dict:

    cv = StratifiedKFold(
        n_splits=n_splits,
        shuffle=True,
        random_state=40,
    )

    model = create_model(X, classifier)

    scores = cross_validate(
        model,
        X,
        Y,
        cv=cv,
        scoring={
            "accuracy": "accuracy",
            "precision": "precision",
            "recall": "recall",
            "f1": "f1",
            "roc_auc": "roc_auc",
        },
        n_jobs=1,
    )

    results = {}

    for metric in ["accuracy", "precision", "recall", "f1", "roc_auc"]:
        results[f"{metric}_mean"] = scores[f"test_{metric}"].mean()
        results[f"{metric}_std"] = scores[f"test_{metric}"].std()

    return results
