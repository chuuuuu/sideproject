# 000 -> 001
# 001 -> 100
# 010 -> 111
# 011 -> 000
# 100 -> 101
# 101 -> 110
# 110 -> 010
# 111 -> 011
import random
import json

if __name__ == "__main__":
    BLOCK_SIZE = 14
    TABLE_LEN = 2**BLOCK_SIZE
    # save initial vector
    iv = ""
    for i in range(BLOCK_SIZE):
        iv += (random.choice(["0", "1"]))
    with open("initial_vector.json", 'w', encoding="utf-8") as f:
        json.dump(iv, f, ensure_ascii=False)

    # save shuffle_table
    shuffle_table = list(range(TABLE_LEN))
    random.shuffle(shuffle_table)
    with open("shuffle_table.json", 'w', encoding="utf-8") as f:
        json.dump(shuffle_table, f, ensure_ascii=False)

    # save necessary_alphabets_reverse
    shuffle_table_reverse = {}
    for i in range(TABLE_LEN):
        shuffle_table_reverse[shuffle_table[i]] = i
    with open("shuffle_table_reverse.json", 'w', encoding="utf-8") as f:
        json.dump(shuffle_table_reverse, f, ensure_ascii=False)
