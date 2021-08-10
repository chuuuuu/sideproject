import requests
import re
import json
from bs4 import BeautifulSoup

loc = "台大"
url_loc = f'https://ifoodie.tw/explore/list?poi={loc}'
html = requests.get(url_loc).text
soup = BeautifulSoup(html, 'html.parser')
last_pg = [int(a.text) for a in soup.find('ul', {'class': ['pagination']}).findAll('a', {'role': ['button']}) if a.text.isdigit()][-1]

rests = []
for i in range(1, last_pg+1):
  print(f'crawling page: {i}')
  url_loc_page = f'{url_loc}&page={i}'
  html = requests.get(url_loc_page).text
  soup = BeautifulSoup(html, 'html.parser')

  divs = soup.findAll('div', {'class':['info-rows']})
  for div in divs:
    title = div.find('div', {'class': ['title-row']}).text
    title = re.sub("^[0-9]+.", "", title)
    idx = div.find('span', {'class': ['index']}).text
    idx = re.sub("\.", "", idx)

    href = 'https://ifoodie.tw' + div.find('a', {'class': ['title-text']})['href']

    ctgs = [ctg.text for ctg in div.findAll('a', {'class': ['category']})]
    ctgs.remove('附近餐廳')

    addr = div.find('div', {'class': ['address-row']}).text

    rest = {
      "idx": idx,
      "title": title,
      "href": href,
      "ctgs": ctgs,
      "addr": addr,
    }
    # print(f'rest: {rest}')

    rests.append(rest)

with open(f'{loc}.json', 'w') as f:
  f.write(json.dumps(rests))