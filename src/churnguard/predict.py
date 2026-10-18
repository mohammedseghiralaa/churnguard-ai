from pathlib import Path

import joblib 
import pandas as pd 

def load_model(model_name:str):
    project_root=Path(__file__).resolve().parents[2]
    model_path=project_root/"artifacts"/f"{model_name}.joblib"
    if not model_path.exists():
        raise FileNotFoundError(f"Model file {model_path} does not exist.")
    model=joblib.load(model_path)
    return model

def predict_churn(customer_data:pd.DataFrame,model_name:str):
    model=load_model(model_name)

    customer_df=pd.DataFrame([customer_data])

    prediction=model.predict(customer_df)[0]

    probability=model.predict_proba(customer_df)[0][1]

    return {
       "prediction": "Churn" if prediction == 1 else "No Churn",
    "churn_probability": round(float(probability), 4),
    "churn_risk": (
        "High" if probability >= 0.7
        else "Medium" if probability >= 0.4
        else "Low"
    )
    }