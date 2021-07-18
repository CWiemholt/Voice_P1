/*
Cody Wiemholt
CS410 Voice Assistants Summer 2021
Homework 3

This for some reason doesn't work on Chrome at all. Cannot get it to work with multiple fields.
However, on microsoft edge (I regret to admit) it works as intended.

Interesting as before when only dealing with 1 element field, it worked fine in chrome.
But boy, multi-fields are slightly different there apparently.
 */

window.SpeechRecognition =
    window.SpeechRecognition ||window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();
let synth = window.speechSynthesis;
let form = document.querySelector('form');
let info = document.querySelector('#info');
let usage = document.querySelector('#usage');
let transcript;


recognition.interimResults = true;
recognition.continuous = true;
recognition.lang ="en-US";

form.addEventListener('submit', form.onsubmit);
info.addEventListener("click", getInfo);
usage.addEventListener('click', howToUse);

function getInfo(event){
    console.log("Info requested.");
    let temp ="Homework 3 by Cody Wiemholt. CS410, Voice Assistants, Summer 2021.";
    synth.speak(new SpeechSynthesisUtterance(temp));
    }

function howToUse(event){
    console.log("Usage requested.");
    window.location.href="usage.html";
}




form.onsubmit = (event)=>{  //do the talking from here.
    event.preventDefault();
    console.log("onsubmit hit.");
    speakData();
}

function speakData(){

    transcript = form.elements.namedItem('aname').value;

    let utter = new SpeechSynthesisUtterance("name: "+transcript);
    if(transcript.length !=0){
        synth.speak(utter);
    }
    transcript = form.elements.namedItem('descript').value;
    utter = new SpeechSynthesisUtterance("Appointment Description: "+transcript);
    if(transcript.length !=0) {
        synth.speak(utter);
    }
    transcript = form.elements.namedItem('date').value;
    utter = new SpeechSynthesisUtterance("On: "+transcript);
    if(transcript.length !=0) {
        synth.speak(utter);
    }
    transcript = form.elements.namedItem('time').value;
    utter = new SpeechSynthesisUtterance("At: "+transcript);
    if(transcript.length !=0) {
        synth.speak(utter);
    }

}

let res;

function handleListening(event, anElementName){ //each time an element pans in
    recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.lang ="en-US";

    console.log("Start Listening");
    recognition.addEventListener('error', (event)=>{
        console.log("An error occurred");
    })
    recognition.addEventListener('result',(event)=>{
        res = Array.from(event.results).map(item => item[0].transcript);
        console.log(anElementName.toString()+":  "+res);
        form.elements.namedItem(anElementName).value = res;
    })

    recognition.start();
}

function handleStopListening(event, anElementName){
    console.log("Stopped Listening")
    recognition.stop();

}

