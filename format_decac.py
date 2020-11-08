"""
This script parses the output of decac compiler and generates a sample program
"""
import sys

if sys.argv[1] == "-h" or sys.argv[1] == "--help" or sys.argv[1] == "?" or len(sys.argv) < 5:
  print("")
  print("usage: python format_decac.py <sample> <tableau> <tambour> <source>")
  print("")
  print("  sample  :  The target file. Ex 'sample_programs/test.txt'")
  print("  tableau  :  The path to compiled TABLEAU.IMG")
  print("  tambour  :  The path to compiled TAMBOUR.IMG")
  print("  source  :  The path to source code file")
  sys.exit(0)

sample_filename = sys.argv[1]
tableau_filename = sys.argv[2]
tambour_filename = sys.argv[3]
source_code = sys.argv[4]

def read_file(filename):
  """
  Returns a string from the binary generated by decac with correct endianness
  """
  res = ""
  with open(filename, 'rb') as file:
    byte = file.read(1)
    i = 0
    hex1 = 0
    hex2 = 0
    while byte != b"":
      hex_val = byte.encode('hex')
      if i % 2 == 0:
        hex1 = hex_val
      else:
        hex2 = hex_val
        if i % 16 == 15:
          res += hex2 + hex1 + "\n"
        else:
          res += hex2 + hex1 + " "
      i += 1
      byte = file.read(1)
  return res

tableau = read_file(tableau_filename)
tambour = read_file(tambour_filename)

with open(source_code, 'r') as target:
  source = target.readlines()

with open(sample_filename, 'w') as target:
  for line in source:
    target.write("-- " + line)
  target.write("\n")
  target.write(tableau + "\n")
  target.write("\n")
  target.write("<description>\n\n</description>\n")
  target.write("\n")
  target.write("<drum>\n")
  target.write(tambour + "\n")
  target.write("</drum>\n")