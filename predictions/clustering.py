import pandas as pd
import sklearn.cluster as skcl




def main():
    df = pd.read_csv("./car_insurance_claims.csv")
    # print(df.sample(10))


if __name__ == "__main__":
    main()