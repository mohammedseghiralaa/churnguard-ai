from churnguard.data import load_data
from churnguard.validation import validate_data
df=load_data()
report=validate_data(df)

print("Rows",report["rows"])
print("columns",report["columns"])
print("duplicate rows",report["duplicate_rows"])
print("columns Types",report["column_types"])
print("\n Missing values")
for column,count in report["missing_values"].items():
    if count>0 :
        print(f"{column}:{count}")