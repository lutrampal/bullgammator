let code = `10aa -- VCS Bio 
11aa -- VCS RNL1
12aa -- VCS RNL2
13aa -- VCS
15aa -- VRS RNL1
16aa -- VRS RNL2
17aa -- VRS VMC
1aaa -- CD
1Caa -- CO
1Daa -- CSz
1Faa -- CB

70aa -- AMD
72aa -- BD
7aaa -- IL OF
7caa -- IL M2

31aa -- ZB

40aa -- KB

50aa -- GG

60aa -- BO

81aa -- OB

90aa -- CN

A0aa -- AN

B0aa -- SN

C0aa -- MR

D0aa -- DR

E0aa -- MC

F0aa -- DC`;
console.log("-- Running parser test : all basic emu instructions --");
instructions = parse_hex_str_to_instructions(code, null);
instructions.forEach(function (instr) {
  console.log(instr.toLineString());
});
console.log("DONE!");
