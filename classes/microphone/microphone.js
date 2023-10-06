class Microphone {
    constructor() {
        this.stream = null;
        this.mediaConstraints = { audio: true };
    }

    async getAudioStream() {
        if (!this.stream) {
            this.stream = await navigator.mediaDevices.getUserMedia(this.mediaConstraints);
        }
        return this.stream;
    }

    stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }
}
