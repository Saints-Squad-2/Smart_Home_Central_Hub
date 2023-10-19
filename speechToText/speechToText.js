// Speech to text functions

// Function to get the transcript from speech recognition results
function getTranscript(e) {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    return transcript;
}

// Function to set up speech recognition
function setUpRecognition() {
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = getTranscript(e);
        document.getElementById("textTarget").innerHTML = transcript;
    });

    return recognition;
}

// Function to start speech recognition
function speechToText() {
    var speech = true;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = setUpRecognition();

    if (speech == true) {
        recognition.start();
    }
}

// Function to get the current text from the "textTarget" element
function getCurrentText() {
    return document.getElementById('textTarget').innerText;
}

// Example usage:
// Call speechToText() to start speech recognition, 
// and use getCurrentText() to retrieve the current recognized text.