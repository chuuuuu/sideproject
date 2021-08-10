import random
import json

loc = "台大"
rests = []
with open(f'{loc}.json', 'r') as f:
  rests = json.loads(f.read())

rest = random.choice(rests)
title, href, ctgs, addr, bh = rest['title'], rest['href'], rest['ctgs'], rest['addr'], rest['bh']
print(f"title: {title}")
print(f"href: {href}")
print(f"ctgs: {ctgs}")
print(f"addr: {addr}")
print(f"bh: {bh}")
print(f"google map: http://maps.google.com/?q={title} {addr}")