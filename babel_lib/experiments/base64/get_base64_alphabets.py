import json

if __name__ == "__main__":
    ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    ALPHABETS_LEN = 64

    # save base64_alphabets
    base64_dict = list(ALPHABETS)
    with open("base64_alphabets.json", 'w', encoding="utf-8") as f:
        json.dump(base64_dict, f, ensure_ascii=False)

    # save base64_alphabets_reverse
    base64_dict_reverse = {}
    for i in range(ALPHABETS_LEN):
        base64_dict_reverse[base64_dict[i]] = i
    with open("base64_alphabets_reverse.json", 'w', encoding="utf-8") as f:
        json.dump(base64_dict_reverse, f, ensure_ascii=False)
