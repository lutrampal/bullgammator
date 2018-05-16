import os

dirname = "sample_programs"
destfile = "emulator/control/code_samples.json"

code = "{\n"
for filename in os.listdir(dirname):
	code += '\t"' + filename.replace(".txt", "") + '":'
	with open(os.path.join(dirname, filename), "r") as text:
		code += "\t{\n"
		series3 = '\t\t"series3": "' + text.read().replace("\n", "--%n%").replace("\t", "--%t%") + '"'
		drum = '\t\t"drum": ""'
		code += ",\n".join([series3, drum])
		code += "\n\t},\n"
code = code[:-2]
code += "\n}"

with open(destfile, "w") as json:
	json.write(code)
