// Octads constants
const NB_COMMUTED_OCTADS = 8;
module.exports.NB_COMMUTED_OCTADS = NB_COMMUTED_OCTADS;
const NB_MEMORIES_PER_OCTAD = 8;
module.exports.NB_MEMORIES_PER_OCTAD = NB_MEMORIES_PER_OCTAD;

// Groups constants
const NB_GROUPS = 4;
module.exports.NB_GROUPS = NB_GROUPS
const NB_OCTADS_PER_GROUP = 2;
module.exports.NB_OCTADS_PER_GROUP = NB_OCTADS_PER_GROUP;

// Series constants
const NB_GENERAL_SERIES = 3;
module.exports.NB_GENERAL_SERIES = NB_GENERAL_SERIES;
const NB_INST_CONNEXION_ARRAY = 64;
module.exports.NB_INST_CONNEXION_ARRAY = NB_INST_CONNEXION_ARRAY;
const NB_INST_PER_MEM = 4;
module.exports.NB_INST_PER_MEM = NB_INST_PER_MEM;
const NB_INST_PER_SERIE = NB_OCTADS_PER_GROUP * NB_MEMORIES_PER_OCTAD * NB_INST_PER_MEM;
module.exports.NB_INST_PER_SERIE = NB_INST_PER_SERIE;

// Memories constants
const NB_BANAL_MEMORIES = 8;
module.exports.NB_BANAL_MEMORIES = NB_BANAL_MEMORIES;
const NB_OTHER_MEMORIES = NB_MEMORIES_PER_OCTAD * NB_COMMUTED_OCTADS;
module.exports.NB_OTHER_MEMORIES = NB_OTHER_MEMORIES;

// Computer sizes constants
const NB_CHRS_PROGRAM_COUNTER = 2;
module.exports.NB_CHRS_PROGRAM_COUNTER = NB_CHRS_PROGRAM_COUNTER;
const NB_CHRS_PER_WORD = 12;
module.exports.NB_CHRS_PER_WORD = NB_CHRS_PER_WORD;
const NB_HEX_VALUES_PER_OCTAD = NB_CHRS_PER_WORD*NB_MEMORIES_PER_OCTAD
module.exports.NB_HEX_VALUES_PER_OCTAD = NB_HEX_VALUES_PER_OCTAD

// Drum constants
const NB_WORD_PER_DRUM_BLOCK = 16;
module.exports.NB_WORD_PER_DRUM_BLOCK = NB_WORD_PER_DRUM_BLOCK;
const NB_BLOCKS_PER_DRUM_TRACK = 8;
module.exports.NB_BLOCKS_PER_DRUM_TRACK = NB_BLOCKS_PER_DRUM_TRACK;
const NB_TRACKS_PER_DRUM_TRACK_GROUP = 16
module.exports.NB_TRACKS_PER_DRUM_TRACK_GROUP = NB_TRACKS_PER_DRUM_TRACK_GROUP;
const NB_TRACK_GROUPS = 8;
module.exports.NB_TRACK_GROUPS = NB_TRACK_GROUPS;

// Drum sizes constants
const NB_HEX_VALUES_PER_DRUM_BLOCK = NB_CHRS_PER_WORD*NB_WORD_PER_DRUM_BLOCK
module.exports.NB_HEX_VALUES_PER_DRUM_BLOCK = NB_HEX_VALUES_PER_DRUM_BLOCK
const NB_HEX_VALUES_PER_GROUP = NB_HEX_VALUES_PER_DRUM_BLOCK;
module.exports.NB_HEX_VALUES_PER_GROUP = NB_HEX_VALUES_PER_GROUP
const NB_HEX_VALUES_PER_DRUM_TRACK = NB_HEX_VALUES_PER_DRUM_BLOCK*NB_BLOCKS_PER_DRUM_TRACK
module.exports.NB_HEX_VALUES_PER_DRUM_TRACK = NB_HEX_VALUES_PER_DRUM_TRACK
const NB_HEX_VALUES_PER_DRUM_TRACK_GROUP = NB_HEX_VALUES_PER_DRUM_TRACK*NB_TRACKS_PER_DRUM_TRACK_GROUP
module.exports.NB_HEX_VALUES_PER_DRUM_TRACK_GROUP = NB_HEX_VALUES_PER_DRUM_TRACK_GROUP
const NB_HEX_VALUES_PER_MAGNETIC_DRUM = NB_HEX_VALUES_PER_DRUM_TRACK_GROUP*NB_TRACK_GROUPS
module.exports.NB_HEX_VALUES_PER_MAGNETIC_DRUM = NB_HEX_VALUES_PER_MAGNETIC_DRUM

// Computation mode
MEMORY_MODE = {
  BINARY: {value: 0, name: "binary", code: "b"},
  DECIMAL: {value: 1, name: "decimal", code: "d"}
};
Object.freeze(MEMORY_MODE);
module.exports.MEMORY_MODE = MEMORY_MODE;
