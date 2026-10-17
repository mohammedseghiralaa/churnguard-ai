from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression 
from xgboost import XGBClassifier
from catboost import CatBoostClassifier
def get_models():
    return {
        "logistic regression":LogisticRegression(max_iter=100,random_state=1),
        "random forest":RandomForestClassifier(n_estimators=100,random_state=1,n_jobs=-1),
        "CatBoost":CatBoostClassifier(iterations=100,depth=3,learning_rate=0.05,verbose=0,random_seed=42,thread_count=4),
        "xgboost":XGBClassifier(n_estimators=100,max_depth=3, learning_rate=0.05)
    }