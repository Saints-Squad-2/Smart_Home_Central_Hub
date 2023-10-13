// Light tests written for use with Jest npm module

const { Light } = require('./light');

describe('Light', () => {
  let light;

  beforeEach(() => {
    light = new Light('Living Room Light', 75);
  });

  test('Light can be turned on', () => {
    light.turnOn();
    expect(light.poweredOn).toBe(true);
  });

  test('Light can be turned off', () => {
    light.turnOff();
    expect(light.poweredOn).toBe(false);
  });

  test('Brightness can be set', () => {
    light.brightness = 50;
    expect(light.brightness).toBe(50);
  });

  test('Enable voice control', () => {
    light.enableVoiceControl();
    expect(light._voiceControlEnabled).toBe(true);
  });

  test('Disable voice control', () => {
    light.disableVoiceControl();
    expect(light._voiceControlEnabled).toBe(false);
  });

  test('Enable motion detection', () => {
    light.enableMotionDetection();
    expect(light._motionDetectionEnabled).toBe(true);
  });

  test('Disable motion detection', () => {
    light.disableMotionDetection();
    expect(light._motionDetectionEnabled).toBe(false);
  });

  test('Respond to voice command when voice control is enabled', () => {
    light.enableVoiceControl();
    const command = 'Turn on the light';
    const mockConsoleLog = jest.spyOn(console, 'log');
    light.respondToVoiceCommand(command);
    expect(mockConsoleLog).toHaveBeenCalledWith(`Received voice command: "${command}"`);
  });

  test('Do not respond to voice command when voice control is disabled', () => {
    light.disableVoiceControl();
    const command = 'Turn on the light';
    const mockConsoleLog = jest.spyOn(console, 'log');
    light.respondToVoiceCommand(command);
    expect(mockConsoleLog).toHaveBeenCalledWith('Voice control is not enabled for this light.');
  });

  test('Detect motion and turn on the light when motion detection is enabled', () => {
    light.enableMotionDetection();
    const mockConsoleLog = jest.spyOn(console, 'log');
    light.detectMotion();
    expect(mockConsoleLog).toHaveBeenCalledWith('Motion detected; turning on the light.');
    expect(light.poweredOn).toBe(true);
  });

  test('Do not detect motion and turn on the light when motion detection is disabled', () => {
    light.disableMotionDetection();
    const mockConsoleLog = jest.spyOn(console, 'log');
    light.detectMotion();
    expect(mockConsoleLog).toHaveBeenCalledWith('Motion detection is not enabled for this light.');
    expect(light.poweredOn).toBe(false);
  });
});
