// __
// / ()     _  _, _      o  ,_|_
// >-   /\// \/ ||/ /|/| | / \|
// \___/ /\\_/\/||_/ | |_|/ \/|_/
//             (|
// Swainson Holness

let sequenceArr = [];
let parseArr = [];

// Runs when the page loads.
let drum = new Tone.Sampler({
    "C3": "./sounds/kick.mp3",
    "D3": "./sounds/snare.mp3",
    "E3": "./sounds/hihat.mp3",
}, () => {}).toMaster();
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
        sequenceArr.sort(function (a, b) {
            return a - b
        });
    });
}
//--X


// play sequence array

function playSequence() {
    function setup(time, note, dur) {
        return {
            time: time,
            note: note,
            dur: dur
        }
    }

    parseArr.push()
}


// Update the system, add features in this function.
let sysExecute = (data) => {
    //    drum.triggerAttackRelease('C3', "4n", "1m");
    let sequence = new Tone.Part((time, event) => {
        drum.triggerAttackRelease(event.note, event.dur, time);
    }, parseArr);
    console.log(parseArr);

    sequence.loop = Infinity;
sequence.loopEnd = '1m';

    sequence.start(0);
    Tone.Transport.start('+0.1');

} //--X


$("#play").on("click", (e) => {
    e.preventDefault;
    parseArr  = [];
    function setup(time, note, dur) {
        return {
            time: time,
            note: note,
            dur: dur
        }
    }

    function parseTime(num) {
        console.log(num)
        if (num === "0") {
            return 0;
        }
        if (num === "1") {
            return "16n";
        }
        if (num > 1) {
            let temp ="16n";
            for(var i = 0; i < num - 1; i++) {
                temp = temp + "+16n"
            }
            return temp;
        }
    }

    if (sequenceArr.length === 0) {

    } else {
        for (let x = 0; x < sequenceArr.length; x++) {
            parseArr.push(setup(parseTime(sequenceArr[x]), "C3", "4n"));
        }
        sysExecute();
    }
});
