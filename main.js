//###########################
//###(:)#####':v:`####[`'`']#
//###|:|#####(o:0)#####|::|##
//###|:|######(:)######|::|##
//###########################

//  _____  _____   __ _  ___ _ __ (_)___| |_
// / _ \ \/ / _ \ / _` |/ _ \ '_ \| / __| __|
//|  __/>  < (_) | (_| |  __/ | | | \__ \ |_
// \___/_/\_\___/ \__, |\___|_| |_|_|___/\__|
//                |___/
// Swainson Holness

let kickArr = [];
let snareArr = [];
let hihatArr = [];
let state = [true, false, false] // state[0] = kick, state[1] = snare, state[2] = hihat,


function checkState() {
    for (var i = 0; i < state.length; i++) {
        if (state[0]) {
            return kickArr;
        }
        if (state[1]) {
            return snareArr;
        }
        if (state[2]) {
            return hihatArr;
        }
    }
}

function getNote() {
    for (var i = 0; i < state.length; i++) {
        if (state[0]) {
            return "C3";
        }
        if (state[1]) {
            return "D3";
        }
        if (state[2]) {
            return "E3";
        }
    }
}


function getColor() {
    for (var i = 0; i < state.length; i++) {
        if (state[0]) {
            return "brown";
        }
        if (state[1]) {
            return "gold";
        }
        if (state[2]) {
            return "lightGreen";
        }
    }
}

// Runs when the page loads.
let drum = new Tone.Sampler({
    "C3": "./sounds/kick.mp3",
    "D3": "./sounds/snare.mp3",
    "E3": "./sounds/hihat.mp3",
}, () => {}).toMaster();
//--X

//=====================================
// Dom design stuff and UI interface
//=====================================
for (let x = 0; x < 16; x++) {
    $(".grid-container").append("<div class='grid-item'>" + x + "</div>");
};

let gridArr = document.querySelectorAll(".grid-item");

function updateSequence(sequenceArr, val) {
    if (sequenceArr.includes(val.innerHTML)) {
        sequenceArr.splice(sequenceArr.findIndex((el) => {
            return el === val.innerHTML
        }), 1);
        $(gridArr[val.innerHTML]).css("border-color", "black");
    } else {
        sequenceArr.push(val.innerHTML);
        $(gridArr[val.innerHTML]).css("border-color", getColor());
        drum.triggerAttackRelease(getNote());
    }
    sequenceArr.sort(function (a, b) {
        return a - b
    });
}

for (let x = 0; x < 16; x++) {
    $(gridArr[x]).on("mousedown", () => {
        updateSequence(checkState(), gridArr[x]);
    });
}
//--X

//=====================================
// Create instrument parts for drums snare and hihat.
//=====================================
let kickPart = new Tone.Part((time, event) => {
    drum.triggerAttackRelease(event.note, event.dur, time);
}, {});
kickPart.loop = Infinity;
kickPart.loopEnd = '1m';
kickPart.start(0);

let snarePart = new Tone.Part((time, event) => {
    drum.triggerAttackRelease(event.note, event.dur, time);
}, {});
snarePart.loop = Infinity;
snarePart.loopEnd = '1m';
snarePart.start(0);

let hihatPart = new Tone.Part((time, event) => {
    drum.triggerAttackRelease(event.note, event.dur, time);
}, {});
hihatPart.loop = Infinity;
hihatPart.loopEnd = '1m';
hihatPart.start(0);
//--X


//=====================================
// system logic flow.
//=====================================
function setup(time, note, dur) { // returns object to add to part
    return {
        time: time,
        note: note,
        dur: dur
    }
}

function parseTime(num) { // refactor this
    if (num === "0") {
        return 0;
    }
    if (num === "1") {
        return "16n";
    }
    if (num > 1) {
        let temp = "16n";
        for (var i = 0; i < num - 1; i++) {
            temp = temp + "+16n"
        }
        return temp;
    }
}

function parsePart() {
    if (checkState() === kickArr) {
        return kickPart;
    }
    if (checkState() === snareArr) {
        return snarePart;
    }
    if (checkState() === hihatArr) {
        return hihatPart;
    }
}

function setInstrumentState(val) {
    $(".grid-item").off("mousedown");
    state = val;
    parsePart().removeAll();

    //    console.log(checkState());

    for (let x = 0; x < 16; x++) {
        //        console.log(x == gridArr[x].innerHTML)

        if (checkState().includes(gridArr[x].innerHTML)) {
            $(gridArr[x]).css("border-color", getColor());
        } else {
            $(gridArr[x]).css("border-color", "black");

        }

        $(gridArr[x]).on("mousedown", () => {
            updateSequence(checkState(), gridArr[x]);
            //            console.log($(gridArr[x].innerHTML));
        });
    }


}

// Button controls =====================================================
function controlBtnOn() {
    $("#kick").on("click", (e) => {
        $($("#kickClr")).css("fill", "brown");
        $($(".snareClr")).attr("fill", "#C5EFE5");
        $($(".hihatClr")).attr("fill", "#C5EFE5");
        setInstrumentState([true, false, false]);
    });
    $("#snare").on("click", (e) => {
        $($("#kickClr")).css("fill", "#C5EFE5");
        $($(".snareClr")).attr("fill", "gold");
        $($(".hihatClr")).attr("fill", "#C5EFE5");
        setInstrumentState([false, true, false]);
    });
    $("#hihat").on("click", (e) => {
        $($("#kickClr")).css("fill", "#C5EFE5");
        $($(".snareClr")).attr("fill", "#C5EFE5");
        $($(".hihatClr")).attr("fill", "lightGreen");
        setInstrumentState([false, false, true]);
    });
}

$("#play").on("click", (e) => {
    e.preventDefault;
    if (checkState().length === 0) {

    } else {
        $(".grid-item").off("mousedown");
        $("#kick").off("click");
        $("#snare").off("click");
        $("#hihat").off("click");

        $("#stop").attr("display", "inline");
        for (let x = 0; x < kickArr.length; x++) {
            parsePart().add(setup(parseTime(kickArr[x]), "C3", "4n"));
        }
        for (let x = 0; x < snareArr.length; x++) {
            parsePart().add(setup(parseTime(snareArr[x]), "D3", "4n"));
        }
        for (let x = 0; x < hihatArr.length; x++) {
            parsePart().add(setup(parseTime(hihatArr[x]), "E3", "4n"));
        }

        Tone.Transport.start('+0.1');
    }
});

$("#stop").on("click", (e) => {
    Tone.Transport.stop();
    $(".grid-item").off("mousedown");
    parsePart().removeAll();
    $("#stop").attr("display", "none");

    for (let x = 0; x < 16; x++) {
        $(gridArr[x]).on("mousedown", () => {
            updateSequence(checkState(), gridArr[x]);
        });
    }
controlBtnOn();
});

controlBtnOn();




//                                    _
//        ___ _   _ ___  ___ ___   __| | ___
//  _____/ __| | | / __|/ __/ _ \ / _` |/ _ \
// |_____\__ \ |_| \__ \ (_| (_) | (_| |  __/
//       |___/\__, |___/\___\___/ \__,_|\___|
//            |___/

// kick drum icon created by Raz Cohen
// snare drum icon created by Andrejs Kirma
// hihat icon created by Dmitry Mirolyubov
