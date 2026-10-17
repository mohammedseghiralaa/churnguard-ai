from churnguard.pipeline import create_preprocessing_pipline
from sklearn.pipeline import Pipeline
from sklearn.base import ClassifierMixin

def create_model(X,classifier:ClassifierMixin)->Pipeline:
    preprocessor=create_preprocessing_pipline(X)
    model=Pipeline(steps=[
    ("preprocessing",preprocessor),
    ("classifier",classifier)
    ])
    return model
