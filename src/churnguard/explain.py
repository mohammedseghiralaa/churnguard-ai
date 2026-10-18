
from pathlib import Path
import joblib
import pandas as pd
import shap


def explain_model():
    project_root = Path(__file__).resolve().parents[2]

    model_path = (
        project_root / "artifacts" / "CatBoost_churn.joblib"
    )

    data_path = (
        project_root / "data" /
        "WA_Fn-UseC_-Telco-Customer-Churn.csv"
    )

    model = joblib.load(model_path)
    df = pd.read_csv(data_path)

    X = df.drop(columns=["Churn"])
    X_sample = X.sample(
        n=min(100, len(X)),
        random_state=42
    )

    preprocessor = model.named_steps["preprocessing"]
    classifier = model.named_steps["classifier"]

    X_transformed = preprocessor.transform(X_sample)
    feature_names = preprocessor.get_feature_names_out()

    explainer = shap.TreeExplainer(classifier)
    shap_values = explainer.shap_values(X_transformed)

    shap.summary_plot(
        shap_values,
        X_transformed,
        feature_names=feature_names
    )


if __name__ == "__main__":
    explain_model()
