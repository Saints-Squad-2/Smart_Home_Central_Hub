const { SmartAppliance } = require('../appliance');

class Light extends SmartAppliance {
  constructor(name = '', brightness = 100) {
    super(name);
    this._brightness = brightness;
    this._voiceControlEnabled = false;
    this._motionDetectionEnabled = false;
  }

  get brightness() {
    return this._brightness;
  }

  set brightness(value) {
    if (value >= 0 && value <= 100) {
      this._brightness = value;
      console.log(`Set brightness to ${value}%`);
    } else {
      console.log('Invalid brightness value. It should be between 0 and 100.');
    }
  }

  turnOn() {
    console.log('Light is turned on.');
  }

  turnOff() {
    console.log('Light is turned off.');
  }

  enableVoiceControl() {
    this._voiceControlEnabled = true;
    console.log('Voice control for the light is now enabled.');
  }

  disableVoiceControl() {
    this._voiceControlEnabled = false;
    console.log('Voice control for the light is now disabled.');
  }

  enableMotionDetection() {
    this._motionDetectionEnabled = true;
    console.log('Motion detection for the light is now enabled.');
  }

  disableMotionDetection() {
    this._motionDetectionEnabled = false;
    console.log('Motion detection for the light is now disabled.');
  }

  respondToVoiceCommand(command) {
    if (this._voiceControlEnabled) {
      console.log(`Received voice command: "${command}"`);
    } else {
      console.log('Voice control is not enabled for this light.');
    }
  }

  detectMotion() {
    if (this._motionDetectionEnabled) {
      console.log('Motion detected; turning on the light.');
      this.turnOn();
    } else {
      console.log('Motion detection is not enabled for this light.');
    }
  }
}

module.exports = { Light };
