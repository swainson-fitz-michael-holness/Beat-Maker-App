window.onload = function () {
    //display pads. The numbers in the pad are used to identify it.
    for (let x = 0; x < 16; x++) {
        $(".grid-container").append("<div class='grid-item'>" + x + "</div>");
    };

    let gridArr = document.querySelectorAll(".grid-item");
    let state = {
        instrument: "kick",
        kick: [],
        snare: [],
        hihat: []
    };
    $($("#kickClr")).css("fill", "brown");
    //load sounds
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

                } else if (state.instrument == "snare") {
                    $(gridArr[x]).css("border-color", "gold");
                    state.snare.push(gridArr[x].innerHTML);

                } else if (state.instrument == "hihat") {
                    $(gridArr[x]).css("border-color", "lightGreen");
                    state.hihat.push(gridArr[x].innerHTML);

                }
            } else {
                //TURN OFF
                if (state.instrument == "kick") {
                    $(gridArr[x]).css("border-color", "rgb(0, 0, 0)");
                    state.kick.splice(state.kick.indexOf(x.toString()), 1);

                } else if (state.instrument == "snare") {
                    $(gridArr[x]).css("border-color", "rgb(0, 0, 0)");
                    state.snare.splice(state.snare.indexOf(x.toString()), 1);

                } else if (state.instrument == "hihat") {
                    $(gridArr[x]).css("border-color", "rgb(0, 0, 0)");
                    state.hihat.splice(state.hihat.indexOf(x.toString()), 1);

                }
            }

        });
    }
    $("#play").on("click", (e) => {
        e.preventDefault;
        parser(addParts);
        if (checkState().length === 0) {

        } else {
            //        $(".grid-item").off("mousedown");
            //        $("#kick").off("click");
            //        $("#snare").off("click");
            //        $("#hihat").off("click");
            stateOn = true;
            $("#stop").attr("display", "inline");
            //        for (let x = 0; x < kickArr.length; x++) {
            //            parsePart().add(setup(parseTime(kickArr[x]), "C3", "4n"));
            //        }
            //        for (let x = 0; x < snareArr.length; x++) {
            //            parsePart().add(setup(parseTime(snareArr[x]), "D3", "4n"));
            //        }
            //        for (let x = 0; x < hihatArr.length; x++) {
            //            parsePart().add(setup(parseTime(hihatArr[x]), "E3", "4n"));
            //        }

            Tone.Transport.start('+0.1');
        }
    });




}
