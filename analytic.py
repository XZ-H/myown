import pandas as pd

df = pd.read_json(r'static/hb_GDP.json', encoding='utf-8')
# print(df)

# 求极差
maxCity = df.loc[:, 'value'].max()
minCity = df.loc[:, 'value'].min()
# print(maxCity)
jc = maxCity - minCity
print('湖北省GDP极差为', end=' ')
print(jc)

# 求均值
new_df = df.describe()
mean = new_df['value'][1]
print('湖北省平均GDP为 {:.2f}'.format(mean))
