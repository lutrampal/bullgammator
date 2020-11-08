"""
A script to agregate CODE samples in DESTFILE
"""
import os
import re

DIRNAME = "sample_programs"
DESTFILE = "emulator/control/code_samples.json"

def get_start(text):
  """
  Extracts the series 3 CODE from the file
  text: the string to parse
  """
  match = re.match(r"(.*?)(<[a-zA-Z0-9]+>).*?</[a-zA-Z0-9]+>", text)
  if match:
    return match.group(1), text[text.find(match.group(2)):]
  return text, None

def get_tag(text):
  """
  Reads and extracts the content of the first tag encountered.
  Tag <description> can contain other tags (HTML data).
  text: the string to parse
  return: tag, inner data, rest of the text
  """
  match = re.match(r".*?<description>(.*?)</description>(.*?)$", text)
  if match:
    return "description", match.group(1).replace('"', '\\"'), match.group(2)

  match = re.match(r".*?<([a-zA-Z0-9]+)>(.*?)</([a-zA-Z0-9]+)>(.*?)$", text)
  if match:
    tag = match.group(1)
    assert tag == match.group(3), "differents tag: " + tag + "/" + match.group(3)
    return tag, match.group(2), match.group(4)

  return None, None, None

def get_tags(filename):
  """
  Yields the tags and their data
  """
  with open(os.path.join(DIRNAME, filename), "r") as file:
    print(filename)
    filecontent = file.read().replace("\n", "--%n%").replace("\t", "--%t%")

    tag = "series3"
    data, filecontent = get_start(filecontent)

    while filecontent:
      yield tag, data
      tag, data, filecontent = get_tag(filecontent)


SAMPLES = "{\n\t" + ",\n\t".join([
    "\"" + re.sub(r"\.[a-z]{3,4}$", "", filename) + "\": {\n\t\t" + ",\n\t\t".join([
            "\"" + tag +"\": \"" + data + "\"" for tag, data in get_tags(filename)
    ]) + "\n\t}" for filename in os.listdir(DIRNAME)
]) + "\n}"


with open(DESTFILE, "w") as json:
  json.write(SAMPLES)
