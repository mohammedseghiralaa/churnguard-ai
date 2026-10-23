# AGENTS.md

## Project

ChurnGuard predicts Telco customer churn. The Python package lives in `src/churnguard/`; the only HTTP entrypoint is the root `app.py` (FastAPI). The dataset is committed at `data/WA_Fn-UseC_-Telco-Customer-Churn.csv` (README claims otherwise; it is stale).

`dashboard/` is only a bare Next.js 16 (App Router, Tailwind v4, TypeScript) `create-next-app` scaffold with the default `app/page.tsx` and no `components/`, `lib/`, or `hooks/`. `design/PROMPT.md` is the unbuilt spec for it; `design/stitch_*/` is the raw Stitch export (HTML/PNG) it references. `notebooks/`, `configs/`, and `scripts/` are empty; the notebooks live in `models/`.

## Setup

- Use Python 3.12 (Docker and `tune.py` require it).
- `pip install -e . -r requirements.txt` - the editable install is required for `import churnguard`; `src/` is not on `sys.path` otherwise.
- `requirements.txt` omits `catboost`, which `models.py` needs: `pip install catboost`.
- Dashboard: `npm install` inside `dashboard/`; no lockfile is committed.
- No Python lint, formatter, or typecheck config exists. Do not invent commands. The dashboard has ESLint via `npm run lint`.

## Commands

Run Python commands from the repo root; data paths in `train.py`/`tune.py` are cwd-relative.

- API: `uvicorn app:app --reload` -> http://127.0.0.1:8000/docs
- Tests: `python -m pytest -q` (3 collected smoke tests, ~17s; model loading dominates)
- Single test: `python -m pytest tests/test_validation.py::test_validate_data -q`
- Train and compare all models: `python -m churnguard.train` - does NOT save models.
- Tune, save all four models, and compare: `python tune.py` (slow; RandomizedSearchCV 10 iterations x 5 folds per model). Requires Python 3.12+ because of nested f-string quotes; it fails to parse on 3.10/3.11 despite `pyproject.toml`.
- SHAP summary: `python -m churnguard.explain` (needs `artifacts/CatBoost_churn.joblib`).
- Dashboard (from `dashboard/`): `npm run dev` -> http://localhost:3000; also `npm run lint` and `npm run build`.

## Architecture

Flow: `data.load_data` -> `preprocessing.convert_numeric_columns` (coerces `TotalCharges`, currently filling blanks with 0) -> `features.split_features_target` (drops `customerID`/`Churn`, maps `Churn` Yes/No -> 1/0) -> `splite.splite_data` (stratified 80/20) -> `model.create_model` (sklearn `Pipeline` of preprocessing + classifier) -> `train.py`/`tuning.py` -> `save_model.py` -> `predict.py`.

- `prepare_data` uses dtypes to pick numeric vs categorical columns, so `TotalCharges` must be converted before `create_model`; otherwise it is one-hot encoded as categorical.
- Model registry keys in `models.get_models()`: `logistic regression`, `random forest`, `CatBoost`, `xgboost`.
- Saved artifacts: `logistic_regression_churn.joblib`, `random_forest_churn.joblib`, `CatBoost_churn.joblib`, `xgboost_churn.joblib`.
- `predict.load_model` uses the exact name and is case-sensitive on Linux. Use `CatBoost_churn` (as `app.py` does), not `catboost_churn`.
- Artifact and `explain.py` data lookups are anchored to the repo root via `Path(__file__).resolve().parents[2]`, independent of cwd.
- Prediction: P(churn) >= 0.5 -> `"Churn"`; risk is Low < 0.4, Medium 0.4-0.7, High >= 0.7 (`predict.py`). Keep `app.py`'s Pydantic contract in sync with `design/PROMPT.md`.

## Gotchas

- Root `app.py` supersedes the deleted `src/churnguard/api.py`. `README.md` and `Dockerfile` still reference `churnguard.api`, so they are stale; the Docker image also never installs the package, so its CMD cannot import `churnguard`.
- Preserve existing misspellings that are part of the API: `splite.py`, `create_preprocessing_pipline`, and result keys `accurancy` / `Roc-auc`. Renaming them breaks imports or callers.
- `tests/test_prediction.py` is not collected (no `test_` function) but its module-level code runs at import and loads `catboost_churn` (lowercase). That only works on Windows' case-insensitive filesystem; on Linux it raises `FileNotFoundError` during collection. `test_data.py` and `test_preprocessing.py` have no assertions. Treat the suite as smoke coverage only.
- `artifacts/` and `catboost_info/` are gitignored. Models exist locally but are not in git; only `tune.py` regenerates them.
- `app.py` uses strict Pydantic enums for categorical fields, so values must exactly match the dataset strings (e.g., `"No internet service"`, `"No phone service"`). CORS allows only `http://localhost:3000`.
- `data.load_data`'s missing-file branch is broken: `raise` precedes the `FileNotFoundError`, so a wrong path raises `RuntimeError: No active exception to reraise`.
