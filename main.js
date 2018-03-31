

let drum = new Tone.Sampler({
    "C3": "./sounds/kick.mp3",
    "D3": "./sounds/snare.mp3",
    "E3": "./sounds/hihat.mp3",
}, {
    "release": 1,
}).toMaster();

drum.triggerAttackRelease('E3', 0.5, 7);

setTimeout(function () {
    
}, 1000)
