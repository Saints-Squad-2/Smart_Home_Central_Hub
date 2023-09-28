// Speech to text functions

/*
speechToText() converts speech to text and displays 
it on an HTML Element with the "textTarget" id

getCurrentText() returns the text in the "textTarget" element
*/

function getTranscript(e) {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    return transcript;
}

function setUpRecognition() {
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = getTranscript(e);
        document.getElementById("textTarget").innerHTML = transcript;
    });

    return recognition;
}

function speechToText() {
    var speech = true;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = setUpRecognition();
   
    
    if (speech == true) {
        recognition.start();
        //recognition.addEventListener('end', recognition.start);
    }
}

function getCurrentText() {
    return document.getElementById('textTarget').innerText;
}