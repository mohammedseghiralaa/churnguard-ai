from fastapi import FastAPI
from pydantic import BaseModel

from churnguard.predict import predict_churn

app=FastAPI(
    title="ChurnGuard API",
    description="predict customer churn using machine learning",
    version="1.0.0",
)

class Customer(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float

@app.get("/")

def home():
    return {"message":"Welcom to churnguard api"}

@app.post("/predict")
def predict(customer:Customer):
    return predict_churn(customer.model_dump(),model_name="CatBoost_churn")