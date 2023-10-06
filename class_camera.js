const { SmartAppliance } = require('./smartAppliance');

class Camera extends SmartAppliance {
  constructor(name = '', resolution = '1080p') {
    super(name);
    this._resolution = resolution;
    this._isRecording = false;
    this._recordings = [];
  }

  get resolution() {
    return this._resolution;
  }

  set resolution(resolution) {
    this._resolution = resolution;
  }

  get isRecording() {
    return this._isRecording;
  }

  get recordings() {
    return this._recordings;
  }

  startRecording() {
    if (!this._isRecording) {
      this._isRecording = true;
      console.log(`Started recording with ${this._resolution} resolution.`);
    } else {
      console.log('Already recording.');
    }
  }

  stopRecording() {
    if (this._isRecording) {
      this._isRecording = false;
      console.log('Stopped recording.');
    } else {
      console.log('Not currently recording.');
    }
  }

  saveRecording(recording) {
    if (this._isRecording) {
      this._recordings.push(recording);
      console.log('Saved recording.');
    } else {
      console.log('Cannot save recording while not recording.');
    }
  }

  playbackRecording(index) {
    if (index >= 0 && index < this._recordings.length) {
      console.log(`Playing back recording ${index + 1}.`);
    } else {
      console.log('Invalid recording index.');
    }
  }
}

module.exports = { Camera };
