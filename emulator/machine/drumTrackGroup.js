assert = require('assert');

const NB_TRACKS_PER_DRUM_TRACK_GROUP = require("./constants").NB_TRACKS_PER_DRUM_TRACK_GROUP
const NB_HEX_VALUES_PER_DRUM_TRACK = require("./constants").NB_HEX_VALUES_PER_DRUM_TRACK
const NB_HEX_VALUES_PER_DRUM_TRACK_GROUP = require("./constants").NB_HEX_VALUES_PER_DRUM_TRACK_GROUP

DrumTrack = require("./drumTrack").DrumTrack;

/**
 * Note: I was unable to find a proper translation for the word "Seizaine" in English which is equivalent to "dozen"
 * or "decade" but with 16.
 */
class DrumTrackGroup {

  constructor(id, drum) {
    this.id = id
    this.drum = drum
    this.tracks = new Array(NB_TRACKS_PER_DRUM_TRACK_GROUP)
    for (let i = 0; i < NB_TRACKS_PER_DRUM_TRACK_GROUP; ++i) {
      this.tracks[i] = new DrumTrack(i, this);
    }
  }

  setContent(hexCode) {
    hexCode = hexCode.replace(/[\s\n\r]/g, ''); // remove white space and line breaks
    assert.equal(hexCode.length, NB_HEX_VALUES_PER_DRUM_TRACK_GROUP,
      "hexCode should be of length " + NB_HEX_VALUES_PER_DRUM_TRACK_GROUP)
    for (let i = 0; i < NB_TRACKS_PER_DRUM_TRACK_GROUP; ++i) {
      this.tracks[i].setContent(hexCode.substr(i*NB_HEX_VALUES_PER_DRUM_TRACK, NB_HEX_VALUES_PER_DRUM_TRACK))
    }
  }

  toString() {
    let str = ""
    this.tracks.forEach(function(track) {
      str += track.toString() + "\n"
    })
    return str
  }
}

module.exports.DrumTrackGroup = DrumTrackGroup;
