# BullGammator
<img src="https://raw.githubusercontent.com/lutrampal/bullgammator/master/bullgammator.jpg" height="300" />

BullGammator is a web emulator for the ancient Bull Gamma 3 computer. 

The Gamma 3 was a machine built by French company Bull in the 50's, in a pre-transistor era.  
It initially possessed only seven 48 bits memories but this capacity was later extended with the ET (for "Extension Tambour", Drum Extension) version.  
The drum extension added many more 48 bits memories and a magnetic drum with a whopping storage capacity of 96 KB!
Coding for the Bull Gamma 3 was no easy task as you can imagine since no programming language could be compiled for it. The instructions, which are somewhat similar to those of today's machines, had to be coded by hand on an array of wires. With the drum extension, they could finally be stored in memory.   

This emulator aims to recreate the Bull Gamma 3 with its drum extension. 

This project was backed by ACONIT, an association from Grenoble, France that aims to study and illustrate the History of computer science.  

Documentation about [the machine](http://www.aconit.org/spip/spip.php?article246) and how to code for it can be found on [ACONIT's index](http://aconit.org/histoire/Gamma-3/Articles/). The most interesting documents if you want to write code for it being [Bolliet's course](http://aconit.org/histoire/Gamma-3/Articles/Gamma-Bolliet.pdf), [Chabrol's manual](http://aconit.org/histoire/Gamma-3/Articles/Cours_Gamma_3_Chabrol.pdf) and [the instruction set](http://aconit.org/histoire/Gamma-3/Articles/tableau-de-code.jpg) (all in French language only).

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
NodeJS, see: https://nodejs.org/en/  

Angular is used for the UI:  
`npm install -g @angular/cli`  

Mocha is used for unit testing:  
`npm install -g mocha`  

[JSDoc](https://github.com/jsdoc3/jsdoc) is used to generate the API documentation.

## Running the UI

## Running the unit test
Tests for each instruction can be run from the `emulator/` directory with:  
`npm test`

## Authors 
* José Maillard - *UI, emulator architecture, instruction set* - [hnvseau](https://github.com/hnvseau)
* Lucas Trampal - *emulator architecture, instruction set* - [lutrampal](https://github.com/lutrampal) 

## License
This project is licensed under the GNU GPU License - see the [LICENCE.md](https://raw.githubusercontent.com/lutrampal/bullgammator/master/LICENSE) for details.

## Acknowledgments
* ACONIT for their documentation base
* Roland Groz, researcher at Grenoble Informatics Laboratory (LIG), teacher at Ensimag and mentor of this project
* Alain Guyot, member of ACONIT
