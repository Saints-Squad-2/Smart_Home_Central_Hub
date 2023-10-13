// its for Smart Appliance classes

const assert = require('assert');

const { SmartAppliance } = require('../classes/appliance');
const { Thermostat } = require('../classes/thermostat');
const { Light } = require('../classes/light/light');

describe('SmartAppliance Classes', () => {
    
    describe('Base', () => {
        before(() => {
            this.appliance = new SmartAppliance([]);
        })
    
        it('should connect when connect method is called', () => {
            this.appliance.connect();
            assert.equal(this.appliance.connected, true);
        });
    
        it('should disconnect when disconnect method is called', () => {
            this.appliance.disconnect();
            assert.equal(this.appliance.connected, false)
        });
    
        it('should power on when powerOn method is called', () => {
            this.appliance.powerOn();
            assert.equal(this.appliance.poweredOn, true);
        });
    
        it('should power off when powerOff method is called', () => {
            this.appliance.powerOff();
            assert.equal(this.appliance.poweredOn, false);
        });
    
        it('should be able to set a custom name', () => {
            this.appliance.name = 'Bingo';
            assert.equal(this.appliance.name, 'Bingo');
        });
    });

    describe('Thermostat', () => {
        before(() => {
            this.appliance = new Thermostat([]);
        });

        it("should only allow units of 'C' or 'F'", () => {
            this.appliance.units = 'C';
            assert.equal(this.appliance.units, 'C');

            this.appliance.units = 'F';
            assert.equal(this.appliance.units, 'F');

            this.appliance.units = 'Hello world!';
            assert.equal(this.appliance.units, 'F');
        });

        it('should only allow numbers for preferred, max, and min temps', () => {
            this.appliance.preferredTemp = 70;
            this.appliance.maxTemp = 75;
            this.appliance.minTemp = 65;

            this.appliance.preferredTemp = NaN;
            this.appliance.maxTemp = 'string!';
            this.appliance.minTemp = [1, 2, 3];

            assert.equal(this.appliance.preferredTemp, 70);
            assert.equal(this.appliance.maxTemp, 75);
            assert.equal(this.appliance.minTemp, 65);
        });

        it('should be able to determine if the temp combinations are valid', () => {
            assert.equal(this.appliance.validTemps, true);

            this.appliance.preferredTemp = 80;
            assert.equal(this.appliance.validTemps, false);

            this.appliance.preferredTemp = 65;
            assert.equal(this.appliance.validTemps, true);

            this.appliance.minTemp = 75;
            this.appliance.maxTemp = 65;
            assert.equal(this.appliance.validTemps, false);
        });

        it('should be able to reset all temps', () => {
            this.appliance.resetTemps();

            assert.equal(this.appliance.preferredTemp, null);
            assert.equal(this.appliance.maxTemp, null);
            assert.equal(this.appliance.minTemp, null);

            assert.equal(this.appliance.validTemps, true);
        });
    });

    describe('Light', () => {
        before(() => {
            this.originalLogFunc = console.log;
            this.light;
            this.output;

            console.log = (msg) => {
                this.output = msg;
            }
        });
        
        beforeEach(() => {
            this.light = new Light('Living Room Light', 75);
            this.output = null;
        });

        it('Brightness can be set', () => {
            this.light.brightness = 50;
            assert.equal(this.light.brightness, 50);
        });

        it('Enable voice control', () => {
            this.light.enableVoiceControl();
            assert.equal(this.light._voiceControlEnabled, true);
        });

        it('Disable voice control', () => {
            this.light.disableVoiceControl();
            assert.equal(this.light._voiceControlEnabled, false);
        });

        it('Enable motion detection', () => {
            this.light.enableMotionDetection();
            assert.equal(this.light._motionDetectionEnabled, true);
        });

        it('Disable motion detection', () => {
            this.light.disableMotionDetection();
            assert.equal(this.light._motionDetectionEnabled, false);
        });

        it('Respond to voice command when voice control is enabled', () => {
            this.light.enableVoiceControl();
            const command = 'Turn on the light';
            this.light.respondToVoiceCommand(command);

            assert.equal(this.output, `Received voice command: "${command}"`)
        });

        it('Do not respond to voice command when voice control is disabled', () => {
            this.light.disableVoiceControl();
            const command = 'Turn on the light';
            this.light.respondToVoiceCommand(command);
            
            assert.equal(this.output, 'Voice control is not enabled for this light.');
        });

        it('Detect motion and turn on the light when motion detection is enabled', () => {
            this.light.enableMotionDetection();
            this.light.detectMotion();
            
            assert.equal(this.output, 'Motion detected; turning on the light.');
            assert.equal(this.light.poweredOn, true);
        });

        it('Do not detect motion and turn on the light when motion detection is disabled', () => {
            this.light.disableMotionDetection();
            this.light.detectMotion();
            
            assert.equal(this.output, 'Motion detection is not enabled for this light.');
            assert.equal(this.light.poweredOn, false);
        });

        after(() => {
            console.log = this.originalLogFunc;
        })
    });      
});