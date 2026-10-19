# ChurnGuard — Customer Churn Prediction

## Overview

ChurnGuard is a machine learning project that predicts whether a telecom customer is likely to leave a service. It provides churn predictions, churn probabilities, and risk classifications through a Python prediction module and a FastAPI REST API.

## Features

- Data preprocessing and feature engineering
- Machine learning model training and comparison
- Hyperparameter tuning
- CatBoost-based churn prediction
- Churn probability and risk classification
- FastAPI endpoint for predictions
- Basic prediction validation tests

## Tech Stack

- Python
- Pandas
- Scikit-learn
- CatBoost
- XGBoost
- FastAPI
- Pydantic
- Joblib
- Pytest (if configured and used)

## Project Structure

```text
Telco_churn/
├── data/
├── artifacts/
├── src/
│   └── churnguard/
│       ├── api.py
│       ├── predict.py
│       ├── model.py
│       └── ...
├── tests/
│   └── test_prediction.py
└── README.md
```

## Run the API

Install the required dependencies, then run from the project root:

```bash
uvicorn churnguard.api:app --reload --app-dir src
```

Open the interactive API documentation at:

http://127.0.0.1:8000/docs

## Example Prediction

```json
{
  "prediction": "No Churn",
  "churn_probability": 0.0432,
  "churn_risk": "Low"
}
```

The example illustrates the API output format. Predictions are estimates, not guarantees.

## Dataset

The project uses the Telco Customer Churn dataset. The dataset is not included in this example README; provide instructions for obtaining it if it is not committed to the repository.

## Disclaimer

This project is for educational and demonstration purposes. Predictions should not be treated as guarantees of customer behavior.
