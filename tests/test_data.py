from churnguard.data import load_data
def test_load_data():
    df=load_data()
    
    assert not df.empty
    assert "Churn" in df.columns