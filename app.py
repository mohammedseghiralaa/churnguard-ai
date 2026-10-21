from typing import Literal

from fastapi import FastAPI , HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel,Field
from churnguard.predict import predict_churn

MODEL_NAME="CatBoost_churn"
app=FastAPI(
    title="ChurnGuard API",
    description="Predict customer churn using machine learning",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"]
)
YesNo = Literal["Yes", "No"]

class Customer(BaseModel):
    gender: Literal["Male", "Female"]
    SeniorCitizen: Literal[0, 1]
    Partner: YesNo
    Dependents: YesNo
    tenure: int = Field(ge=0, le=100)
    PhoneService: YesNo
    MultipleLines: Literal["Yes", "No", "No phone service"]
    InternetService: Literal["DSL", "Fiber optic", "No"]
    OnlineSecurity: Literal["Yes", "No", "No internet service"]
    OnlineBackup: Literal["Yes", "No", "No internet service"]
    DeviceProtection: Literal["Yes", "No", "No internet service"]
    TechSupport: Literal["Yes", "No", "No internet service"]
    StreamingTV: Literal["Yes", "No", "No internet service"]
    StreamingMovies: Literal["Yes", "No", "No internet service"]
    Contract: Literal["Month-to-month", "One year", "Two year"]
    PaperlessBilling: YesNo
    PaymentMethod: Literal[
        "Electronic check",
        "Mailed check",
        "Bank transfer (automatic)",
        "Credit card (automatic)",
    ]
    MonthlyCharges: float = Field(ge=0)
    TotalCharges: float = Field(ge=0)
@app.get("/")
def home():
    return{"message":"welcom to churnguard api"}

@app.get("/health")
def health():
    return {"status":"ok"}
@app.post("/predict")
def predict(customer:Customer):
    try:
        return predict_churn(customer.model_dump(),model_name=MODEL_NAME)
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"prediction failed {e}")