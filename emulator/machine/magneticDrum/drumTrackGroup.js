const assert = require('../../tools/assert');

const NB_TRACKS_PER_DRUM_TRACK_GROUP = require("../constants").NB_TRACKS_PER_DRUM_TRACK_GROUP
const NB_HEX_VALUES_PER_DRUM_TRACK = require("../constants").NB_HEX_VALUES_PER_DRUM_TRACK
const NB_HEX_VALUES_PER_DRUM_TRACK_GROUP = require("../constants").NB_HEX_VALUES_PER_DRUM_TRACK_GROUP

DrumTrack = require("./drumTrack").DrumTrack;
InstructionsParser = require("../../assembly/hexParser").InstructionsParser

/**
 * A DrumTrackGroup is a set of 16 (NB_TRACKS_PER_DRUM_TRACK_GROUP) DrumTracks attached to a Drum
 * Note: I was unable to find a proper translation for the word "Seizaine" in English which is equivalent to "dozen"
 * or "decade" but with 16.
 */
class DrumTrackGroup {

  /**
   * constructs a new instance of DrumTrackGroup
   * @param id the id for this DrumTrackGroup
   * @param drum the Drum to which this track group belongs
   */
  constructor(id, drum) {
    this.id = id
    this.drum = drum
    this.tracks = new Array(NB_TRACKS_PER_DRUM_TRACK_GROUP)
    for (let i = 0; i < NB_TRACKS_PER_DRUM_TRACK_GROUP; ++i) {
      this.tracks[i] = new DrumTrack(i, this);
    }
  }


  /**
   * Set the Word's content with hex values
   * @param hexCode a String that represents the new hex values of this Word
   */
  setContent(hexCode) {
    hexCode = InstructionsParser.parseHex(hexCode);
    assert(hexCode.length <= NB_HEX_VALUES_PER_DRUM_TRACK_GROUP,
      "hexCode should be of length " + NB_HEX_VALUES_PER_DRUM_TRACK_GROUP)
		hexCode = hexCode.padEnd(NB_HEX_VALUES_PER_DRUM_TRACK_GROUP, "0");
    for (let i = 0; i < NB_TRACKS_PER_DRUM_TRACK_GROUP; ++i) {
      this.tracks[i].setContent(hexCode.substr(i*NB_HEX_VALUES_PER_DRUM_TRACK, NB_HEX_VALUES_PER_DRUM_TRACK))
    }
  }

  toString() {
    let str = ""
    this.tracks.forEach(function(track) {
      str += track.toString() + "\n";
    })
    return str
  }
}

module.exports.DrumTrackGroup = DrumTrackGroup;
