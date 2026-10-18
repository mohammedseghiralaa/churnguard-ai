
from pathlib import Path 
from churnguard.prepare import prepare_data 
from churnguard.models import get_models
from churnguard.model import create_model 
from churnguard.evaluation import evaluate_model,compare_model
import pandas as pd 
from churnguard.validation import cross_validate_model
def main():
    data_path = "data/WA_Fn-UseC_-Telco-Customer-Churn.csv"

    X_train, X_test, Y_train, Y_test = prepare_data(data_path)
    models = get_models()
    results = {}

    # 1. Train and evaluate each model
    for name, classifier in models.items():
        print(f"\nTraining {name} ...")

        model = create_model(X_train, classifier)
        model.fit(X_train, Y_train)

        results[name] = evaluate_model(model, X_test, Y_test)
        print(f"{name} ROC-AUC: {results[name]['Roc-auc']}")

    # 2. Compare test-set results
    comparison = compare_model(results)

    print("\nTest-set model comparison:")
    print(comparison.round(4))

    # 3. Cross-validation for all models
    results_cv = {}

    for name, classifier in models.items():
        print(f"\nCross-validating {name} ...")

        results_cv[name] = cross_validate_model(
            X_train,
            Y_train,
            classifier,
        )

    comparison_cv = pd.DataFrame(results_cv).T

    print("\nCross-validation comparison:")
    print(comparison_cv.round(4))


if __name__ == "__main__":
    main()
