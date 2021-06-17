# ref: https://stackoverflow.com/questions/1366068/whats-the-complete-range-for-chinese-characters-in-unicode
# Block                                   Range       Comment
# CJK Unified Ideographs                  4E00-9FFF   Common
# CJK Unified Ideographs Extension A      3400-4DBF   Rare
# CJK Unified Ideographs Extension B      20000-2A6DF Rare, historic
# CJK Unified Ideographs Extension C      2A700–2B73F Rare, historic
# CJK Unified Ideographs Extension D      2B740–2B81F Uncommon, some in current use
# CJK Unified Ideographs Extension E      2B820–2CEAF Rare, historic
# CJK Compatibility Ideographs            F900-FAFF   Duplicates, unifiable variants, corporate characters
# CJK Compatibility Ideographs Supplement 2F800-2FA1F Unifiable variants

import math

def save_uni(uni_min, uni_max, file_name):
  pad10 = int(math.log10(uni_max))
  pad16 = int(math.log10(uni_max) / math.log10(16))

  with open(file_name, 'w') as f:
    for i in range(uni_min, uni_max):
      idx16 = f'0x{hex(i)[2:].zfill(pad16)}'
      idx10 = str(i).zfill(pad10)
      c = chr(i)
      try:
        f.write(f'{idx16} {idx10} {c}\n')
      except UnicodeEncodeError:
        f.write(f'{idx16} {idx10} error\n')

def save_uni_all():
  uni_min = 0x0
  uni_max = 0x110000
  file_name = 'unicode_all'

  save_uni(uni_min, uni_max, file_name)

def save_uni_common_zh():
  uni_min = 0x4e00
  uni_max = 0xa000
  file_name = 'unicode_common_zh'

  save_uni(uni_min, uni_max, file_name)

def save_uni_rare_zh():
  uni_min = 0x3400
  uni_max = 0x4DBF
  file_name = 'unicode_rare_zh'

  save_uni(uni_min, uni_max, file_name)

save_uni_all()
# save_uni_common_zh()
# save_uni_rare_zh()