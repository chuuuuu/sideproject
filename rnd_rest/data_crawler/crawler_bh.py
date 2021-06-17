# crawl data of business hours
import requests
import json
import re
from bs4 import BeautifulSoup

loc = "台大"
rests = []
with open(f'{loc}.json', 'r') as f:
  rests = json.loads(f.read())


for i in range(len(rests)):
  print(f'{i}/{len(rests)}')
  rest = rests[i]
  url = rest['href']
  html = requests.get(url).text
  begin = html.find('"openingHoursList":')
  end = html.find('"openingHours":')
  bh = html[begin: end]
  bh = re.search('\[.*\]', bh).group(0)[1:-1]
  if len(bh) == 0:
    rest['bh'] = None
    continue

  bh = bh.split('"')
  bh = [s for s in bh if s.find('星期')==0]
  print(bh)

  rest['bh'] = {
    '0': bh[0],
    '1': bh[1],
    '2': bh[2],
    '3': bh[3],
    '4': bh[4],
    '5': bh[5],
    '6': bh[6],
  }

with open(f'{loc}.json', 'w') as f:
  f.write(json.dumps(rests))