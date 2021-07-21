# in babel library, we need the 2 ** x alphabets
# with the zhon packets, we know that there're at least 10878 alphabets, we need to include
# hence, we need to include at least 2 ** 14 = 16384 alphabets

import string
from zhon import cedict, hanzi
import json


def get_necessary_alphabets():
    ret = set()
    ret = ret.union(set(cedict.trad))
    ret = ret.union(set(hanzi.punctuation))
    ret = ret.union(set(string.ascii_letters))
    ret = ret.union(set(string.punctuation))
    ret = ret.union(set(string.digits))
    ret = ret.union(set(' '))

    return ret


if __name__ == "__main__":
    ALPHABETS_LEN = 2**14
    UNICODE_MIN = 0x4e00
    UNICODE_MAX = 0xa000

    necessary_alphabets = get_necessary_alphabets()
    for i in range(UNICODE_MIN, UNICODE_MAX + 1):
        if len(necessary_alphabets) == ALPHABETS_LEN:
            break
        necessary_alphabets.add(chr(i))

    # save necessary_alphabets
    babel_dict = list(necessary_alphabets)
    with open("babel_alphabets.json", 'w', encoding="utf-8") as f:
        json.dump(babel_dict, f, ensure_ascii=False)

    babel_dict_reverse = {}
    for i in range(ALPHABETS_LEN):
        babel_dict_reverse[babel_dict[i]] = i
    with open("babel_alphabets_reverse.json", 'w', encoding="utf-8") as f:
        json.dump(babel_dict_reverse, f, ensure_ascii=False)
