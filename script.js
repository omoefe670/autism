const skipbtn = document.getElementById("skip-btn");
const videosection = document.querySelector(".video-section");
const skipmessage = document.getElementById("skip-message")
const video = videosection.querySelector("video");
const replaybtn = document.querySelector("#replay-btn");
skipbtn.addEventListener("click", () => {
    video.pause();
    videosection.classList.add("fade-out");



    setTimeout(() => {
        videosection.style.display = "none";
        skipmessage.textContent = "you skipped the video!";
        replaybtn.style.display = "inline-block";
    }, 800)

})
replaybtn.addEventListener("click", () => {
    videosection.style.display = "block";
    videosection.classList.remove("fade-out");
    videosection.classList.add("fade-in")
    skipmessage.textContent = "";
    replaybtn.style.display = "none"
    video.currentTime = 0;
    video.play();
})
// 
document.addEventListener("DOMContentLoaded", function () {
    const balloon = document.getElementById('balloon');
    const instruction = document.getElementById('breathingInstruction');
    const startBtn = document.getElementById('startBreathing');
    const stopBtn = document.getElementById('stopBreathing'); // make sure you have this button in your HTML
    const music = document.getElementById('backgroundMusic');

    let breathingTimer = null;
    let inhale = true;
    let breathCount = 0;

    startBtn.addEventListener('click', () => {
        inhale = true;
        breathCount = 0;
        startBtn.disabled = true;
        stopBtn.disabled = false;

        // Reset & play background music
        music.currentTime = 0;
        music.volume = 1;
        music.play();
        //  Run the first cycle immediately
    if (inhale) {
        balloon.classList.add('inhale');
        balloon.classList.remove('exhale');
        instruction.textContent = "Breathe in.....";
    } else{
        balloon.classList.add('exhale');
        balloon.classList.remove('inhale');
        instruction.textContent = "Breath out.......";
        breathCount++;
    }
    inhale = !inhale;
    

        breathingTimer = setInterval(() => {
            if (inhale) {
                balloon.classList.add('inhale');
                balloon.classList.remove('exhale');
                instruction.textContent = "Breathe in.....";
            } else {
                balloon.classList.add('exhale');
                balloon.classList.remove('inhale');
                instruction.textContent = "Breathe out.....";
                breathCount++;
            }

            inhale = !inhale;

            if (breathCount >= 5) {
                clearInterval(breathingTimer);
                breathingTimer = null;

                // Let balloon finish last exhale
                setTimeout(() => {
                    instruction.textContent = "Great job! You're done!";
                    startBtn.disabled = false;
                    stopBtn.disabled = true;

                    // Fade out music gradually
                    let fadeAudio = setInterval(() => {
                        if (music.volume > 0.05) {
                            music.volume -= 0.05;
                        } else {
                            clearInterval(fadeAudio);
                            music.pause();
                            music.currentTime = 0;
                        }
                    }, 200); // reduces volume every 0.2s
                }, 5000); // matches balloon cycle
            }
        }, 5000); // 5 seconds per inhale/exhale
    });

    stopBtn.addEventListener('click', () => {
        if (breathingTimer) {
            clearInterval(breathingTimer);
            breathingTimer = null;
        }

        instruction.textContent = "Breathing stopped.";
        startBtn.disabled = false;
        stopBtn.disabled = true;

        balloon.classList.remove('inhale', 'exhale');

        music.pause();
        music.currentTime = 0;
    });

    // Initially disable stop button
    stopBtn.disabled = true;
});
document.addEventListener("DOMContentLoaded", function () {
    //get all button
    const themeBtn = document.getElementById('themeToggle');
    const calmBtn = document.getElementById('calmMode');
    const fontUpBtn = document.getElementById('fontUp');
    const fontDownBtn = document.getElementById('fontDown');
    //font size tracker
    let currentSize = 16;
    //function: switch theme
    function toggleTheme() {
        document.body.classList.toggle('dark');
    }
    //function: calm mode
    function toggleCalmMode() {
        document.body.classList.toggle('calm');
    }
    //function; increase font size
    function increaseFont() {
        const element = document.querySelectorAll('body,body *');
        element .forEach(el =>{
            let style = window.getComputedStyle(el);
            let size = parseFloat(style.fontSize);
            el.style.fontSize = (size + 2) + 'px';
        })
    }
    //function: decrease font size
    function decreaseFont() {
        const element = document.querySelectorAll('body,body *');
        element .forEach(el =>{
            let style = window.getComputedStyle(el);
            let size = parseFloat(style.fontSize);
            el.style.fontSize = (size - 2) + 'px';
        })
    }
    //attach each button to it function
    themeBtn.addEventListener('click', toggleTheme)
    calmBtn.addEventListener('click', toggleCalmMode)
    fontUpBtn.addEventListener('click', increaseFont)
    fontDownBtn.addEventListener('click', decreaseFont)

})
document.addEventListener("DOMContentLoaded", function () {
    const shapes = document.querySelectorAll('.shape');
    const dropZone = document.querySelectorAll('.drop-zone');
    const correctSound = document.getElementById('correctSound');
    const wrongSound = document.getElementById('wrongSound');

    let draggedShape = null;
    //function start draging
    function startDrag(e) {
        draggedShape = e.target.dataset.shape;
        e.dataTransfer.setData("text/plain", draggedShape);
    }
    function allowDrop(e) {
        e.preventDefault();
    }
    function handleDrop(e) {
        e.preventDefault();
        const dropShape = e.target.dataset.shape;
        if (draggedShape === dropShape) {
            e.target.classList.remove("wrong");
            e.target.classList.add("correct");
            correctSound.play();
        }
        else {
            e.target.classList.remove("correct");
            e.target.classList.add("wrong");
            wrongSound.play();
        }
    }
    shapes.forEach(shape => {
        shape.addEventListener("dragstart", startDrag);
    });
    dropZone.forEach(zone => {
        zone.addEventListener("dragover", allowDrop);
        zone.addEventListener("drop", handleDrop);
    })

})
document.addEventListener("DOMContentLoaded", function () {
    //grab all the emotion boxes
    const emotions = document.querySelectorAll(".emotion");
    //grab the display area (title + discription)
    const emotionTitle = document.getElementById("emotion-title");
    const emotionDiscription = document.getElementById("emotion-discription");
    // --- new make a function talk
let voices = [];

// load voices when they are available
function loadVoices() {
    voices = speechSynthesis.getVoices();
    console.log("Available voices:", voices); // 👈 this will help you see all voices in console
}
speechSynthesis.onvoiceschanged = loadVoices;

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // set language
    // 🎬 Movie narrator style (dramatic but child-friendly)
    speech.rate = 0.85;   // a bit slower, like storytelling
    speech.pitch = 0.9;   // deeper voice
    speech.volume = 1;    // full volume

    // Try to find a female voice
    let femaleVoice = voices.find(voice =>
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("zira") ||
        voice.name.toLowerCase().includes("samantha") ||
        voice.name.toLowerCase().includes("woman") ||
        voice.name.toLowerCase().includes("girl")
    );

    if (femaleVoice) {
        speech.voice = femaleVoice;
    }

    window.speechSynthesis.speak(speech);
}

    //funtion that update the display
    function showEmotion(emotion) {
        if (emotion === "happy") {
            emotionTitle.textContent = "😊 you are happy!";
            emotionDiscription.textContent = "happiness is a warm sunshine so keep smiling";
            speak(" you are happy!")
            speak("happiness is a warm sunshine so keep smiling")
        }
        if (emotion === "sad") {
            emotionTitle.textContent = "😢 you are sad";
            emotionDiscription.textContent = "it's okay to feel sad sometimes so take a deep breath";
            speak(" you are sad")
            speak("it's okay to feel sad sometimes so take a deep breath")
        }
        if (emotion === "angry") {
            emotionTitle.textContent = "😡 you are angry"
            emotionDiscription.textContent = "try to calm down and take the breathing exercise";
            speak(" you are angry")
            speak("try to calm down and take the breathing exercise")
        }
        if (emotion === "surprised") {
            emotionTitle.textContent = "😲 you are surprised"
            emotionDiscription.textContent = "wow! something unexpected happened 🌟";
            speak(" you are surprised")
            speak("wow! something unexpected happened ")
        }
    }
    //add click event to every emotion box
    emotions.forEach(function (box) {
        box.addEventListener("click", function () {
            const emotion = box.getAttribute("data-emotion");//find which one was clicked
            showEmotion(emotion);//call the function
        });
    });

});
// DOM HANDLING FOR FORM//
const form = document.getElementById('contactForm')
const successMessage = document.getElementById('successMessage')

form.addEventListener('submit', function(e){
    e.preventDefault();// stop page reload
    console.log("form submitted");//debug
    successMessage.style.display = 'block';//show thank you message
    form.reset();//clear form field
})