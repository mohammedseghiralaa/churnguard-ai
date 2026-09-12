# Telco Customer Churn Prediction

## 📌 Project Overview

This project aims to build a Machine Learning model that predicts whether a telecommunications customer is likely to churn.

Customer churn prediction can help telecom companies identify high-risk customers and take retention actions before they leave.

This is a **binary classification** problem:

- `0` → No Churn
- `1` → Churn

---

## 🎯 Objectives

The main objectives of this project are:

- Analyze customer churn data.
- Clean and preprocess the dataset.
- Handle missing values and categorical variables.
- Compare multiple classification models.
- Handle class imbalance using SMOTE.
- Optimize model hyperparameters using GridSearchCV.
- Evaluate the models using appropriate classification metrics.
- Optimize the classification threshold.
- Interpret the final model using Feature Importance and SHAP.

---

## 📊 Dataset

The dataset used in this project is:

`WA_Fn-UseC_-Telco-Customer-Churn.csv`

The dataset contains customer information such as:

- Gender
- Senior Citizen
- Partner
- Dependents
- Tenure
- Phone Service
- Internet Service
- Online Security
- Online Backup
- Device Protection
- Tech Support
- Streaming Services
- Contract
- Paperless Billing
- Payment Method
- Monthly Charges
- Total Charges

The target variable is:

`Churn`

---

## 🧹 Data Preprocessing

### TotalCharges

`TotalCharges` was converted from object/string to numeric:

```python
dataset["TotalCharges"] = pd.to_numeric(
    dataset["TotalCharges"],
    errors="coerce"
)
```
