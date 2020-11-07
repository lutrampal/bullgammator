// Octads constants
const NB_COMMUTED_OCTADS = 8; // Number of commuted octads
module.exports.NB_COMMUTED_OCTADS = NB_COMMUTED_OCTADS;
const NB_MEMORIES_PER_OCTAD = 8; // Number of memories per octad
module.exports.NB_MEMORIES_PER_OCTAD = NB_MEMORIES_PER_OCTAD;
const NB_MEMORIES_PER_HALF_OCTAD = NB_MEMORIES_PER_OCTAD / 2; // Number of memories per half octad
module.exports.NB_MEMORIES_PER_HALF_OCTAD = NB_MEMORIES_PER_HALF_OCTAD;

// Groups constants
const NB_GROUPS = 4; // Number of octads groups
module.exports.NB_GROUPS = NB_GROUPS;
const NB_OCTADS_PER_GROUP = 2; // Number of octads per group
module.exports.NB_OCTADS_PER_GROUP = NB_OCTADS_PER_GROUP;

// Series constants
const NB_GENERAL_SERIES = 3; // Number of general series (series 3 excluded)
module.exports.NB_GENERAL_SERIES = NB_GENERAL_SERIES;
const NB_SERIES = NB_GENERAL_SERIES + 1; // Number of series (series 3 included)
module.exports.NB_SERIES = NB_SERIES;
const NB_INST_SERIES_3 = 64; // Number of instructions on the connections array (series 3)
module.exports.NB_INST_SERIES_3 = NB_INST_SERIES_3;
const NB_INST_PER_MEM = 4; // Number of instructions per memory (3 + 1 blank)
module.exports.NB_INST_PER_MEM = NB_INST_PER_MEM;
const NB_INST_PER_SERIE = NB_OCTADS_PER_GROUP * NB_MEMORIES_PER_OCTAD * NB_INST_PER_MEM; // Number of instructions per series (64 with 1/4 blank)
module.exports.NB_INST_PER_SERIE = NB_INST_PER_SERIE;
const NB_HEX_VALUES_PER_INST = 4; // Number of hex digits per instruction
module.exports.NB_HEX_VALUES_PER_INST = NB_HEX_VALUES_PER_INST;

// Memories constants
const NB_BANAL_MEMORIES = 8; // Number of banal memories
module.exports.NB_BANAL_MEMORIES = NB_BANAL_MEMORIES;
const NB_OTHER_MEMORIES = NB_MEMORIES_PER_OCTAD * NB_COMMUTED_OCTADS; // Number of other memories (total in octads = 64)
module.exports.NB_OTHER_MEMORIES = NB_OTHER_MEMORIES;

// Computer sizes constants
const NB_CHRS_PROGRAM_COUNTER = 2; // Number of hex digits for program counter
module.exports.NB_CHRS_PROGRAM_COUNTER = NB_CHRS_PROGRAM_COUNTER;
const NB_CHRS_PER_WORD = 12; // Number of hex digits per memory / word
module.exports.NB_CHRS_PER_WORD = NB_CHRS_PER_WORD;
const NB_HEX_VALUES_PER_OCTAD = NB_CHRS_PER_WORD * NB_MEMORIES_PER_OCTAD; // Number of hex digits per octad
module.exports.NB_HEX_VALUES_PER_OCTAD = NB_HEX_VALUES_PER_OCTAD;

// Drum constants
const NB_WORD_PER_DRUM_BLOCK = 16; // Number of memories / words per drum block
module.exports.NB_WORD_PER_DRUM_BLOCK = NB_WORD_PER_DRUM_BLOCK;
const NB_BLOCKS_PER_DRUM_TRACK = 8; // Number of blocks per drum track
module.exports.NB_BLOCKS_PER_DRUM_TRACK = NB_BLOCKS_PER_DRUM_TRACK;
const NB_TRACKS_PER_DRUM_TRACK_GROUP = 16 // Number of tracks per tracks group
module.exports.NB_TRACKS_PER_DRUM_TRACK_GROUP = NB_TRACKS_PER_DRUM_TRACK_GROUP;
const NB_TRACK_GROUPS = 8; // Number of tracks groups
module.exports.NB_TRACK_GROUPS = NB_TRACK_GROUPS;

// Drum sizes constants
const NB_HEX_VALUES_PER_DRUM_BLOCK = NB_CHRS_PER_WORD * NB_WORD_PER_DRUM_BLOCK;
module.exports.NB_HEX_VALUES_PER_DRUM_BLOCK = NB_HEX_VALUES_PER_DRUM_BLOCK;
const NB_HEX_VALUES_PER_GROUP = NB_HEX_VALUES_PER_DRUM_BLOCK;
module.exports.NB_HEX_VALUES_PER_GROUP = NB_HEX_VALUES_PER_GROUP;
const NB_HEX_VALUES_PER_DRUM_TRACK = NB_HEX_VALUES_PER_DRUM_BLOCK * NB_BLOCKS_PER_DRUM_TRACK;
module.exports.NB_HEX_VALUES_PER_DRUM_TRACK = NB_HEX_VALUES_PER_DRUM_TRACK;
const NB_HEX_VALUES_PER_DRUM_TRACK_GROUP = NB_HEX_VALUES_PER_DRUM_TRACK * NB_TRACKS_PER_DRUM_TRACK_GROUP;
module.exports.NB_HEX_VALUES_PER_DRUM_TRACK_GROUP = NB_HEX_VALUES_PER_DRUM_TRACK_GROUP;
const NB_HEX_VALUES_PER_MAGNETIC_DRUM = NB_HEX_VALUES_PER_DRUM_TRACK_GROUP * NB_TRACK_GROUPS;
module.exports.NB_HEX_VALUES_PER_MAGNETIC_DRUM = NB_HEX_VALUES_PER_MAGNETIC_DRUM;

// Computation mode
MEMORY_MODE = {
  BINARY: {value: 0, name: "binary", code: "b", base: 16},
  DECIMAL: {value: 1, name: "decimal", code: "d", base: 10}
};
Object.freeze(MEMORY_MODE);
module.exports.MEMORY_MODE = MEMORY_MODE;
