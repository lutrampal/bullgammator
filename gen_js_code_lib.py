import os
import re

dirname = "sample_programs"
destfile = "emulator/control/code_samples.json"

def get_start(text):
	m = re.match(r"(.*?)(<[a-zA-Z0-9]+>).*?</[a-zA-Z0-9]+>", text)
	if m:
		return m.group(1), text[text.find(m.group(2)):]
	else:
		return text, ""

def get_tag(text):
	m = re.match(r".*?<([a-zA-Z0-9]+)>(.*?)</([a-zA-Z0-9]+)>(.*?)$", text)

	if m:
		assert m.group(1) == m.group(3), "differents tag: " + m.group(1) + "/" + m.group(3)
		tag = m.group(1)
		data = m.group(2)
		text = m.group(4)
		return tag, data, text
	else:
		return 0, "", ""

code = "{\n"
for filename in os.listdir(dirname):
	code += '\t"' + filename.replace(".txt", "") + '":'
	with open(os.path.join(dirname, filename), "r") as text:
		print(filename)
		code += "\t{\n"
		filecontent = text.read().replace("\n", "--%n%").replace("\t", "--%t%")

		data, filecontent = get_start(filecontent)
		tag = len(filecontent) > 0
		lines = ['\t\t"series3": "' + data + '"']

		while True:
			tag, data, filecontent = get_tag(filecontent)
			if tag:
				lines.append('\t\t"' + tag + '": "' + data + '"')
			else:
				break

		code += ",\n".join(lines)
		code += "\n\t},\n"
code = code[:-2]
code += "\n}"

with open(destfile, "w") as json:
	json.write(code)
