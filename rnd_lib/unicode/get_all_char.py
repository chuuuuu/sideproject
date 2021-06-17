import string
from zhon import cedict, hanzi
import set

def get_all_char():
  ret = set()
  ret = ret.union(set(cedict.trad))
  ret = ret.union(set(hanzi.punctuation))
  ret = ret.union(set(string.ascii_letters))
  ret = ret.union(set(string.punctuation))
  ret = ret.union(set(string.digits))
  ret = ret.union(set(' '))

