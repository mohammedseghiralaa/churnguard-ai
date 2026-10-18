from pathlib import Path 
import joblib

def save_model(model,model_name):
    project_root=Path(__file__).resolve().parents[2]
    models_dir=project_root/"artifacts"
    models_dir.mkdir(parents=True,exist_ok=True)

    model_path=models_dir/f"{model_name}.joblib"
    joblib.dump(model,model_path)
    print(f"model saved to {model_path}")

    return model_path