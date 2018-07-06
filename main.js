window.onload = function () {
    //play token
    let playToken = false;

    //display pads. The numbers in the pad are used to identify it.
    for (let x = 0; x < 16; x++) {
        $(".grid-container").append("<div class='grid-item'>" + x + "</div>");
    };
    //-----------------

    //Setup arrays and program init
    let gridArr = document.querySelectorAll(".grid-item");
    let state = {
        instrument: "kick",
        kick: [],
        snare: [],
        hihat: []
    };
    $($("#kickClr")).css("fill", "brown");
    //-----------------


    //load sounds and parts
    let drum = new Tone.Sampler({
        "C3": "./sounds/kick.mp3",
        "D3": "./sounds/snare.mp3",
        "E3": "./sounds/hihat.mp3",
    }, () => {}).toMaster();

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
    //-----------------


    function setup(time, note, dur, item) { // returns object to add to part
        return {
            time: time,
            note: note,
            dur: dur,
            item: item
        }
    }

    function parseTime(num) { // refactor this, sets up when to play a note
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

    //------------


    //Cosmetically switches state
    function loadState(val, color) {
        for (let x = 0; x < 16; x++) {
            if (val.includes(gridArr[x].innerHTML)) {
                $(gridArr[x]).css("border-color", color);
            } else {
                $(gridArr[x]).css("border-color", "black");
            }
        }
    }

    //instrument states
    function stateBtn() {
        $("#kick").on("click", (e) => {
            state.instrument = "kick";
            $($("#kickClr")).css("fill", "brown");
            $($(".snareClr")).attr("fill", "#C5EFE5");
            $($(".hihatClr")).attr("fill", "#C5EFE5");
            loadState(state.kick, "brown");
        });
        $("#snare").on("click", (e) => {
            state.instrument = "snare";
            $($("#kickClr")).css("fill", "#C5EFE5");
            $($(".snareClr")).attr("fill", "gold");
            $($(".hihatClr")).attr("fill", "#C5EFE5");
            loadState(state.snare, "gold");
        });
        $("#hihat").on("click", (e) => {
            state.instrument = "hihat";
            $($("#kickClr")).css("fill", "#C5EFE5");
            $($(".snareClr")).attr("fill", "#C5EFE5");
            $($(".hihatClr")).attr("fill", "lightGreen");
            loadState(state.hihat, "lightGreen");
        });
    }
    stateBtn();

    //turns on pad buttons
    for (let x = 0; x < 16; x++) {
        $(gridArr[x]).on("mousedown", () => {
            //check the state of the button
            if ($(gridArr[x]).css("border-color") == "rgb(0, 0, 0)") {
                //TURN ON
                if (state.instrument == "kick") {
                    $(gridArr[x]).css("border-color", "brown");
                    state.kick.push(gridArr[x].innerHTML);
                    kickPart.add(setup(parseTime(gridArr[x].innerHTML), "C3", "4n", gridArr[x].innerHTML));
                    if (playToken === false) {
                        drum.triggerAttackRelease('C3');
                    }

                } else if (state.instrument == "snare") {
                    $(gridArr[x]).css("border-color", "gold");
                    state.snare.push(gridArr[x].innerHTML);
                    snarePart.add(setup(parseTime(gridArr[x].innerHTML), "D3", "4n", gridArr[x].innerHTML));
                    if (playToken === false) {
                        drum.triggerAttackRelease('D3');
                    }

                } else if (state.instrument == "hihat") {
                    $(gridArr[x]).css("border-color", "lightGreen");
                    state.hihat.push(gridArr[x].innerHTML);
                    hihatPart.add(setup(parseTime(gridArr[x].innerHTML), "E3", "4n", gridArr[x].innerHTML));
                    if (playToken === false) {
                        drum.triggerAttackRelease('E3');
                    }

                }
            } else {
                //TURN OFF
                if (state.instrument == "kick") {
                    $(gridArr[x]).css("border-color", "rgb(0, 0, 0)");
                    state.kick.splice(state.kick.indexOf(x.toString()), 1);
                    kickPart.remove(parseTime(gridArr[x].innerHTML));

                } else if (state.instrument == "snare") {
                    $(gridArr[x]).css("border-color", "rgb(0, 0, 0)");
                    state.snare.splice(state.snare.indexOf(x.toString()), 1);
                    snarePart.remove(parseTime(gridArr[x].innerHTML));

                } else if (state.instrument == "hihat") {
                    $(gridArr[x]).css("border-color", "rgb(0, 0, 0)");
                    state.hihat.splice(state.hihat.indexOf(x.toString()), 1);
                    hihatPart.remove(parseTime(gridArr[x].innerHTML));

                }
            }

        });
    }

    $("#play").on("click", (e) => {
        playToken = true;
        Tone.Transport.start('+0.1');
        $("#stop").attr("display", "inline");
    });

    $("#stop").on("click", (e) => {
        playToken = false;
        Tone.Transport.stop();
        $("#stop").attr("display", "none");
    });

    //    Tempo slider
    let tempo = document.getElementById("tempo");
    let tempoNum = document.getElementById("tempo-num");
    tempoNum.innerHTML = tempo.value;
    tempo.oninput = function () {
        tempoNum.innerHTML = this.value;
    }
    tempo.addEventListener("input", function (e) {
        Tone.Transport.bpm.value = parseInt(e.target.value);
    });
    //    Tone.Transport.swing = 0.25;

}
