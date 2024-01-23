let button = document.querySelector('#button');

let content = document.querySelector('#content'); 

const input = document.querySelector('#inp'); 

// const recog = new window.webkitSpeechRecognition ;     
const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition || window.speechRecognition; 
const recog = new SpeechRecognition();     

input.contentEditable = false; 

const listen = document.querySelector('#listen'); 
var recognizing = false; 

/*function sleep(time){
    let st = new Date();
    let sp = new Date();
    while(sp.getTime()-st.getTime() < time){
        sp = new Date(); 
    }
}*/ 


/*##################################################################################*/ 

let hey = ['hello','who is this?','who are you?','hai'];

let stark = ['Hey man How are you?','How are you doing Stark?','Glad to see you again stark']; 

let care = ['why do you care?','Fine','Doing Great','feeling good'];  

let fine = ['then Whats up?','How can I help you?','Why you are here?']; 

let didnt = ['sorry I didnt get that','can you repeat what you said','Probably that was out of my context']; 

// let created = ['The creator','GOAT','Zeus'] 

let imhappy = ["Be Happy Forever", "Happyness is everyones right"]  

let nothing = ['be productive','go find a hobby','do something useful']; 

let weather = ['Somehow you will not go out','programmers do not need that','did you even go out?'] 

let friend = ['sure','everyone is my friend']; 

let help = ["Your Help is on the Way", "Hold on I'm Coming there", "Don't Panic we will take care"]   
/*##################################################################################*/ 

let speech = new window.SpeechSynthesisUtterance ; 
    speech.pitch = 0; 
    speech.volume = 1;
    speech.rate = 1;
    let voices = window.speechSynthesis.getVoices();  
    speech.voice = voices[4];
    
function speak(message){
    speech.text = message; 
    window.speechSynthesis.speak(speech); 
    console.log('Completed'); 
}

input.addEventListener('keydown',event =>{
    event.key=='Enter' && speak(input.value); 
});

button.addEventListener('click',function(){
    speak(input.value);  
});


function randPick(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}



recog.onstart = function(){console.log('Recognition Started'); recognizing = true};   
recog.onend = function(){console.log('Recognition Ended'); recognizing = false};  
recog.onspeechstart = function(){console.log('Speech Started')};  
recog.onspeechend = function(){console.log('Speech Ended')};   

/*recog.onerror = () => {recog.stop() ; recog.start();}  */ 

recog.onresult = function(event){
    console.log('processing...'); 
    let index = event.resultIndex;
    let transcript = event.results[index][0].transcript.toLowerCase(); 
    console.log(transcript); 
    input.value = transcript;
    
    if(transcript.includes('hey') || transcript.includes('hi') || transcript.includes('hay') || transcript.includes('hello')){
        speak(randPick(hey));  
    }
    if(transcript.includes('this is Stark') || transcript.includes('I am Stark') || transcript.includes('stark')){
        speak(randPick(stark)); 
    }
    if(transcript.includes('how are you') || transcript.includes('how is your day')){
        let res = randPick(care); 
        speak(res);  
        writeContent(res)  
    }
    if(transcript.includes('fine')){
        speak(randPick(fine)); 
    }
    if(transcript.includes("i'm happy") || transcript.includes("i am happy")){ 
        let res = randPick(imhappy); 
        writeContent(res); 
        speak(res);  
    }
    if(transcript.includes('who is this') || transcript.includes('who are you') || transcript.includes('your name')){
        speak('I am DuckAI'); 
        writeContent("I am DuckAI");  
    } 
    if(transcript.includes('who created you') || transcript.includes('who coded you') || transcript.includes('who made you')){
        // speak( 'I am created by '+randPick(created));  

    }
    if(transcript.includes('nothing')){
        speak(randPick(nothing)); 
    }
    if(transcript.includes('weather')){
        speak(randPick(weather)); 
    }
    if(transcript.includes('I am your friend')){
        speak('Hello Friend , nice to meet you'); 
    }
    if(transcript.includes('you be my friend')){
        speak(randPick(friend));  
    }
    if(transcript.includes('search')){ 
        let srSt = transcript.slice(transcript.indexOf('search') + 7); 
        let query = srSt.replace(' ','+'); 
        window.open('http://www.google.com/search?q='+query);  
    }if(transcript.includes("open")){ 
        let st = transcript.slice(transcript.indexOf("open")+ 4).trim();   
        let url = `https://www.${st}`;
        window.open(url);  
    }

    if( (transcript.includes("danger") || transcript.includes("help me") || transcript.includes("need help") ) && (!transcript.includes("open") && !transcript.includes("search"))){
        
        const f = async () => {
        
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude; 
                const lng = position.coords.longitude; 

                console.log(position) 

                console.log(`Lat: ${lat} Long:${lng}`); 

                let location = {latitude:lat, longitude:lng}; 
                let url = "http://localhost:5000/help"; 

                fetch(url, {
                    method:"POST", 
                    headers:{"Content-Type":"application/json"}, 
                    body:JSON.stringify({location})  
                }).then(res => {console.log(res); writeContent("Mail Sent Successfully!")})
                .catch(err => {console.log(err)}); 

                console.log(randPick(help));
                speak(randPick(help));

            }, (error) => {
                console.log("Error Getting GeoLocation!"); 
                console.log(error); 
            }); 
        }else{
            console.log("GeoLocation Not Supported by the Browser!") 
        }

        } 

        f();   
        
    }
    // else{
    //     speak(randPick(didnt)) 
    // } 

    

}

async function getMedia(constraints) {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(stream)
    } catch(err) {
     console.log(err); 
    }
}
  
// getMedia({ audio: true}); 

function writeContent(msg){ 
    content.innerText = msg; 
}




listen.addEventListener('click',()=> {
    console.log(recognizing); 
    if(!recognizing){  
        recog.start(); 
    }
});

