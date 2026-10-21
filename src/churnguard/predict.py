from pathlib import Path
from functools import lru_cache
import joblib 
import pandas as pd 

ARTIFACTS_DIR = Path(__file__).resolve().parents[2] / "artifacts"

RISK_HIGH = 0.7
RISK_MEDIUM = 0.4


@lru_cache(maxsize=4)

def load_model(model_name:str):
    model_path=ARTIFACTS_DIR/f"{model_name}.joblib"
    if not model_path.exists():
        raise FileNotFoundError(f"Model file {model_path} does not exist.")
    model=joblib.load(model_path)
    return model


def get_risk_level(probability:float)->str:
    if probability>=RISK_HIGH :
        return "High"
    if probability>=RISK_MEDIUM:
        return "Medium"
    return "Low"

def predict_churn(customer_data:dict,model_name:str)->dict:
    model=load_model(model_name)

    customer_df=pd.DataFrame([customer_data])

    probability=float(model.predict_proba(customer_df)[0][1])
    prediction=probability>=0.5

    return {
       "prediction": "Churn" if prediction == 1 else "No Churn",
    "churn_probability": round(float(probability), 4),
    "churn_risk":get_risk_level(probability)
    }