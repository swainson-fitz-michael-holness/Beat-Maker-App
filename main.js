// __
// / ()     _  _, _      o  ,_|_
// >-   /\// \/ ||/ /|/| | / \|
// \___/ /\\_/\/||_/ | |_|/ \/|_/
//             (|
// Swainson Holness

let sequenceArr = [];

// Runs when the page loads.
let drum = new Tone.Sampler({
    "C3": "./sounds/kick.mp3",
    "D3": "./sounds/snare.mp3",
    "E3": "./sounds/hihat.mp3",
}, () => {
    // Main function in the system
    sysExecute();
}).toMaster();
//--X


// Dom design stuff and UI interface
for (let x = 0; x < 16; x++) {
    $(".grid-container").append("<div class='grid-item'>" + x + "</div>");
};

let gridArr = document.querySelectorAll(".grid-item");

for (let x = 0; x < 16; x++) {
    $(gridArr[x]).on("mousedown", function () {
        if (sequenceArr.includes(this.innerHTML)) {
            sequenceArr.splice(sequenceArr.findIndex((el) => {
                return el === this.innerHTML
            }), 1);
            $(gridArr[this.innerHTML]).css("border-color", "black");
        } else {
            sequenceArr.push(this.innerHTML);
            $(gridArr[this.innerHTML]).css("border-color", "brown");
            drum.triggerAttackRelease('C3');
        }

        console.log(sequenceArr);
    });
}

//--X


// The code for the system logic goes here.
// Update the system, add features in this function.
let sysExecute = () => {
    //    drum.triggerAttackRelease('C3', "4n", "1m");
    let sequence = new Tone.Part((time, event) => {
        drum.triggerAttackRelease(event.note, event.dur, time);
    }, [{
            time: 0,
            note: "E3",
            dur: "4n"
        }, {
            time: "16n",
            note: "E3",
            dur: "4n"
        }, {
            time: "16n + 16n",
            note: "E3",
            dur: "4n"
        }, {
            time: "16n + 16n + 16n",
            note: "E3",
            dur: "4n"
        }, {
            time: "16n + 16n + 16n + 16n",
            note: "D3",
            dur: "4n"
        }, {
            time: "16n + 16n + 16n + 16n + 16n",
            note: "E3",
            dur: "4n"
        }
    ]);

    sequence.start(0);
    Tone.Transport.start('+0.1');
} //--X
