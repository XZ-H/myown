import requests


def get_zip(url):
    file_name = url.split('/')[-1]
    print(file_name)
    r = requests.get(url)
    print(r)
    file_name = "./" + file_name
    with open(file_name, 'wb') as f:
        f.write(r.content)


if __name__ == '__main__':
    get_zip("http://tjj.hubei.gov.cn/tjsj/sjkscx/tjnj/qstjnj/201912/P020191231594172785626.rar")
