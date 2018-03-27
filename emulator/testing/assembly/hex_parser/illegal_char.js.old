code = `aaaa
aaaa
aaze
aaaa`;

console.log("-- Running parser test : illegal char --");
try {
  instructions = parse_hex_str_to_instructions(code, null);
  instructions.forEach(function (instr) {
    console.log(instr.toLineString());
  });
} catch (error) {
  console.log("caught error as expected: " + error);
}
console.log("DONE!");
