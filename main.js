

let drum = new Tone.Sampler({
    "C3": "./sounds/kick.mp3",
    "D3": "./sounds/snare.mp3",
    "E3": "./sounds/hihat.mp3",
}, function(){
    sysExecute();
}).toMaster();

let gridArr = document.querySelectorAll(".grid-item");

for (let x = 0; x < 17; x++) {
    $(gridArr[x]).on("mousedown", function(){
      drum.triggerAttackRelease('C3');
    });
}

let sysExecute = () => {

}
