const pcConfig = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

const localMicrophone = new Microphone();
const peerConnection = new RTCPeerConnection(pcConfig);

// When an ICE candidate is generated by the RTCPeerConnection
peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
        // Send this candidate to the other device (e.g., using a signaling server)
    }
};

// To start the call:
async function startCall() {
    const localStream = await localMicrophone.getAudioStream();
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Send `offer` to the other device (e.g., using a signaling server)
}

// On receiving an answer (from the other device):
function handleAnswer(answer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

// On receiving an ICE candidate (from the other device):
function addIceCandidate(candidate) {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
}