import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value = 'World';
  recognizing = false;
  recognition: any;


constructor()
{




var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

if (!('webkitSpeechRecognition' in window)) {
  alert('Your browser does not support speech recognition. Try Google Chrome.');
} else {
this.recognition = new (window as any).webkitSpeechRecognition();//new SpeechRecognition();
// if (SpeechGrammarList) {
//   // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
//   // This code is provided as a demonstration of possible capability. You may choose not to use it.
//   var speechRecognitionList = new SpeechGrammarList();
//   var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
//   speechRecognitionList.addFromString(grammar, 1);
//   recognition.grammars = speechRecognitionList;
// }
this.recognition.continuous = false;
this.recognition.lang = 'he-IL';
this.recognition.interimResults = false;
this.recognition.maxAlternatives = 1;

//var diagnostic = document.querySelector('.output');
// var bg = document.querySelector('html');
// var hints = document.querySelector('.hints');

var colorHTML= '';
// colors.forEach(function(v, i, a){
//   console.log(v, i);
//   colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
// });
// hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

// document.body.onclick = function() {
//   recognition.start();
//   console.log('Ready to receive a color command.');
// }

this.recognition.onstart = function() {

  document.getElementById('buttonText').innerText = 'Stop Recording';
  document.getElementById('speechButton').classList.add('recording');
};


this.recognition.onend = function() {

  document.getElementById('buttonText').innerText = 'Start Recording';
  document.getElementById('speechButton').classList.remove('recording');
};

this.recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var color = event.results[0][0].transcript;
  const ul = document.getElementById('dynamicList');
  const newItem = color;

  if (newItem) {
      const li = document.createElement('li');
      li.textContent = newItem;
      ul.appendChild(li);
  }
  //diagnostic.textContent = 'Result received: ' + color + '.';
  console.log('Confidence: ' + event.results[0][0].confidence);
}

// this.recognition.onspeechend = function() {
//   this.recognition.stop();
// }

this.recognition.onnomatch = function(event) {
  //diagnostic.textContent = "I didn't recognise that color.";
}

this.recognition.onerror = function(event) {
  //diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}  
}   
}

toggleRecording() {
  console.log('hello toogle');
  if (this.recognizing) {
    this.recognizing = false;
    this.recognition.stop();
  } else {
    this.recognizing = true;
    this.recognition.start();

  }
}
}



