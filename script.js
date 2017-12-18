/*  VARIABLE DECLARATION  */
var table, tableBody, divVar, element1, element2, text
var counter = 1
var cutoffValue = 1000
var waveForm = 'sawtooth'

var stopButton = document.getElementById('stopButton')
var playButton = document.getElementById('playButton')
var timerLabel = document.getElementById('presetLabelTD')

var notesArray = [220.000, 195.998, 174.614, 164.814, 146.832, 130.813, 123.471, 110.000]
var faderArray = ['fad177', 'fad178', 'fad179', 'fad180', 'fad181', 'fad182', 'fad183', 'fad184']

var timer = 0
var context
var note

/*  WEB AUDIO API - SOUND GENERATOR CLASS  */
class Sound {
    
    constructor(context) {
        this.context = context;
    }

    init() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();
        this.filter = this.context.createBiquadFilter()

        this.oscillator.connect(this.filter);
        this.filter.connect(this.gainNode)
        this.gainNode.connect(this.context.destination);

        this.oscillator.type = waveForm;

        this.filter.type = 'lowpass'
        this.filter.frequency.value = cutoffValue
        this.filter.gain.value = 75
        this.filter.Q.value = 25
    }

    play(value, time, volume) {
        this.init();

        this.oscillator.frequency.value = value;
        this.gainNode.gain.value = volume;       
        this.oscillator.start(0);  
    }

    stop(time) {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, 0.2);
        this.oscillator.stop(0.5);
    }

}

function createElementTable 
(   divHTML, 
    rows, cols, 
    addNumber, 
    e1, e1text, 
    e2, e2text, 
    e1AtName, e1AtValue, 
    e2AtName, e2AtValue, 
    tableAtName, tableAtValue, 
    e1At2Name, e1At2Value, 
    e2At2Name, e2At2Value, 
    e1At3Name, e1At3Value, 
    e2At3Name, e2At3Value, 
    e1At4Name, e1At4Value, 
    e2At4Name, e2At4Value  )  {

    table = document.createElement("table")
    tableBody = document.createElement("tbody")
    
    divVar = document.getElementById(divHTML)
    
    for (var i = 0; i < rows; i++) {

        row = document.createElement("tr")

        for (var j = 0; j < cols; j++) {

            col = document.createElement("td")

            element1 = document.createElement(e1)
            element2 = document.createElement(e2)

                if (addNumber == "yes") {
                    element1.innerHTML = e1text + " " + (i + 1)
                    element2.innerHTML = e2text 
                }  else if (addNumber == "YES") {
                    element1.innerHTML = e1text + " " + (j + 1)
                    element2.innerHTML = e2text
                } else {
                    element1.innerHTML = e1text
                    element2.innerHTML = e2text
                }

            element1.setAttribute(e1AtName, e1AtValue)
            element1.setAttribute(e1At2Name, e1At2Value)
            element1.setAttribute(e1At3Name, e1At3Value + (counter - cols))
            element1.setAttribute(e1At4Name, e1At4Value)

            counter += 1 
            
            element2.setAttribute(e2AtName, e2AtValue)
            element2.setAttribute(e2At2Name, e2At2Value)
            element2.setAttribute(e2At3Name, e2At3Value + (counter - cols))
            element2.setAttribute(e2At4Name, e2At4Value)

            col.appendChild(element1)
    
            col.appendChild(element2)

            row.appendChild(col)

        }

        table.appendChild(row)

    }

    table.setAttribute(tableAtName, tableAtValue)

    table.appendChild(tableBody)

    divVar.appendChild(table)

}

// TRACK BUTTON //
createElementTable (
    /* DIV */                       'track',     
    /* ROW - COL */                 08, 01, 
    /* TEXT # */                    "yes", 
    /* ELEMENT 1 - InnerHTML */     "BUTTON", "TRACK",   
    /* ELEMENT 2 - InnerHTML */     'nil', '', 
    /* ELEMENT 1 ATT 1 */           'CLASS', 'trackButton', 
    /* ELEMENT 2 ATT 1 */           'nil', 'nil', 
    /* TABLE ATT */                 'CLASS', 'trkBtnTableClass',

    /* ELEMENT 1 ATT 2 */           'onclick','turnButtonON( this )',
    /* ELEMENT 2 ATT 2 */           'nil', 'nil',
    /* ELEMENT 1 ATT 3 */           'id', 'trk',
    /* ELEMENT 2 ATT 3 */           'nil', 'nil',
    /* ELEMENT 1 ATT 4 */           'ondblclick', 'turnButtonOFF( this )'
)

// SOLO & MUTE BUTTON // 
createElementTable (
    /* DIV */                       'track',     
    /* ROW - COL */                 08, 01, 
    /* TEXT # */                    "no",  
    /* ELEMENT 1 - InnerHTML */     "BUTTON", "SAW",        
    /* ELEMENT 2 - InnerHTML */     "BUTTON", "SQR", 
    /* ELEMENT 1 ATT 1 */           'CLASS', 'soloButton',     
    /* ELEMENT 2 ATT 1 */           'CLASS', 'muteButton', 
    /* TABLE ATT */                 'CLASS', 'table3Class',

    /* ELEMENT 1 ATT 2 */           'onclick', 'turnButtonON( this )',
    /* ELEMENT 2 ATT 2 */           'onclick', 'turnButtonON( this )',
    /* ELEMENT 1 ATT 3 */           'id', 'slo',
    /* ELEMENT 2 ATT 3 */           'id', 'mte',
    /* ELEMENT 1 ATT 4 */           'ondblclick', 'turnButtonOFF( this )',
    /* ELEMENT 2 ATT 4 */           'ondblclick', 'turnButtonOFF( this )'
)

// SEQUENCE BUTTON //
createElementTable (
    /* DIV */                       'steps',     
    /* ROW - COL */                 08, 16, 
    /* TEXT # */                    "no",  
    /* ELEMENT 1 - InnerHTML */     "BUTTON", "", 
    /* ELEMENT 2 - InnerHTML */     "nil", "",  
    /* ELEMENT 1 ATT 1 */           'CLASS', 'padButton',      
    /* ELEMENT 2 ATT 1 */           'nil', 'nil',        
    /* TABLE ATT */                 'CLASS', 'seqBtnTableClass',

    /* ELEMENT 1 ATT 2 */           'onclick', 'turnButtonON( this )',
    /* ELEMENT 2 ATT 2 */           'nil', 'nil',
    /* ELEMENT 1 ATT 3 */           'id', 'pad',
    /* ELEMENT 2 ATT 3 */           'nil', 'nil',
    /* ELEMENT 1 ATT 4 */           'ondblclick', 'turnButtonOFF( this )'
)

// STEP COUNTER //
createElementTable (
    /* DIV */                       'stepCount', 
    /* ROW - COL */                 01, 16, 
    /* TEXT # */                    "no",  
    /* ELEMENT 1 - InnerHTML */     "BUTTON", "", 
    /* ELEMENT 2 - InnerHTML */     "nil",  "",    
    /* ELEMENT 1 ATT 1 */           'CLASS', 'stepCountBtn',   
    /* ELEMENT 2 ATT 1 */           "nil", "nil",        
    /* TABLE ATT */                 'id', 'stepCountTable',

    /* ELEMENT 1 ATT 2 */           'onclick', 'turnButtonON( this )',
    /* ELEMENT 2 ATT 2 */           'nil', 'nil',
    /* ELEMENT 1 ATT 3 */           'id', 'stp',
    /* ELEMENT 2 ATT 3 */           'nil', 'nil',
    /* ELEMENT 1 ATT 4 */           'ondblclick', 'turnButtonOFF( this )'    
)

// FX 1 BUTTON //
createElementTable (
    /* DIV */                       'mix',       
    /* ROW - COL */                 01, 08,  
    /* TEXT # */                    "no",  
    /* ELEMENT 1 - InnerHTML */     "BUTTON", "FILTER",  
    /* ELEMENT 2 - InnerHTML */     "nil", "",    
    /* ELEMENT 1 ATT 1 */           'CLASS', 'fx1Btn',         
    /* ELEMENT 2 ATT 1 */           "nil", "nil",        
    /* TABLE ATT */                 'id', 'fx1BtnTableClass',

    /* ELEMENT 1 ATT 2 */           'onclick', 'turnButtonON( this )',
    /* ELEMENT 2 ATT 2 */           'nil', 'nil',
    /* ELEMENT 1 ATT 3 */           'id', 'fx1',
    /* ELEMENT 2 ATT 3 */           'nil', 'nil',
    /* ELEMENT 1 ATT 4 */           'ondblclick', 'turnButtonOFF( this )'
)

// FX 2 BUTTON //
createElementTable (
    /* DIV */                       'mix',       
    /* ROW - COL */                 01, 08,  
    /* TEXT # */                    "no",  
    /* ELEMENT 1 - InnerHTML */     "BUTTON", 1/1.25,  
    /* ELEMENT 2 - InnerHTML */     "nil", "",  
    /* ELEMENT 1 ATT 1 */           'CLASS', 'fx2Btn',         
    /* ELEMENT 2 ATT 1 */           "nil", "nil",        
    /* TABLE ATT */                 'id', 'fx2BtnTableClass',

    /* ELEMENT 1 ATT 2 */           'onclick', 'turnButtonON( this )',
    /* ELEMENT 2 ATT 2 */           'nil', 'nil',
    /* ELEMENT 1 ATT 3 */           'id', 'fx2',
    /* ELEMENT 2 ATT 3 */           'nil', 'nil',
    /* ELEMENT 1 ATT 4 */           'disabled', 'true'
)

// FADER BACKGROUND //
createElementTable (
    /* DIV */                       'mix',       
    /* ROW - COL */                 01, 08,  
    /* TEXT # */                    "no",  
    /* ELEMENT 1 - InnerHTML */     "BUTTON", "", 
    /* ELEMENT 2 - InnerHTML */     "nil", "",   
    /* ELEMENT 1 ATT 1 */           'CLASS', 'faderBG',        
    /* ELEMENT 2 ATT 1 */           "nil", "nil",        
    /* TABLE ATT */                 'id', 'faderBGTableClass',

    /* ELEMENT 1 ATT 2 */           'nil', 'nil',
    /* ELEMENT 2 ATT 2 */           'nil', 'nil',
    /* ELEMENT 1 ATT 3 */           'nil', 'nil',
    /* ELEMENT 2 ATT 3 */           'nil', 'nil',
    /* ELEMENT 1 ATT 4 */           'nil', 'nil'
)

// FADER SLIDER //
createElementTable (
    /* DIV */                       'mix',       
    /* ROW - COL */                 01, 08,  
    /* TEXT # */                    "no",  
    /* ELEMENT 1 - InnerHTML */     "input", "",  
    /* ELEMENT 2 - InnerHTML */     "nil", "",    
    /* ELEMENT 1 ATT 1 */           'type', 'range',          
    /* ELEMENT 2 ATT 1 */           "nil", "nil",        
    /* TABLE ATT */                 'id', 'volumeFaderTableClass', 
    
    /* ELEMENT 1 ATT 2 */           'class', 'volumeFader',
    /* ELEMENT 2 ATT 2 */           'nil', 'nil',
    /* ELEMENT 1 - ID */            'id', 'fad',
    /* ELEMENT 2 - ID */            'nil', 'nil',
    /* ELEMENT 1 ATT 4 */           'oninput', 'changeVolume( this )'
)

// TRACK NAME LABEL //
createElementTable (
    /* DIV */                       'mix',       
    /* ROW - COL */                 01, 08, 
    /* TEXT # */                    "YES",  
    /* ELEMENT 1 - InnerHTML */     "button", "TRACK", 
    /* ELEMENT 2 - InnerHTML */     "nil", "",  
    /* ELEMENT 1 ATT 1 */           'class', 'trackNameLabel', 
    /* ELEMENT 2 ATT 1 */           "nil", "nil",        
    /* TABLE ATT */                 'id', 'trackNameTableClass',

    /* ELEMENT 1 ATT 2 */           'nil', 'nil',
    /* ELEMENT 2 ATT 2 */           'nil', 'nil',
    /* ELEMENT 1 ATT 3 */           'nil', 'nil',
    /* ELEMENT 2 ATT 3 */           'nil', 'nil',
    /* ELEMENT 1 ATT 4 */           'nil', 'nil'
)

stopButton.disabled = true

for (var u = 177; u <= 184; u++) {
    document.getElementById('fad'+u).min = 0;
    document.getElementById('fad'+u).max = 1;
    document.getElementById('fad'+u).step = 0.10;
    document.getElementById('fad'+u).value = 1/1.25;
}

var interval = setInterval()

/*  FUNCTION - SETTING BUTTON BACKGROUND COLOR  */
function buttonBGColor(min_value, max_value, idName, attribute_value) {
    for (var c = min_value; c <= max_value; c++) {
        document.getElementById(idName+c).style.backgroundColor = attribute_value
    }
}

/*  FUNCTION - SETTING BUTTON BACKGROUND COLOR  */
function buttonScale(min_value, max_value, idName, attribute_value) {
    for (var d = min_value; d <= max_value; d++) {
        document.getElementById(idName+d).style.transform = attribute_value
    }
}

/*  FUNCTION - PLAYING SINGLE OSCILLATOR  */
function playNote(noteOsc, freq, vol) {
    noteOsc.play(freq / 2, 1, vol) 
    setTimeout(function(){note.stop(0.5)}, 200)
}

/*  FUNCTION - GET FADER VALUE  */
function setFader(obj) {
    return document.getElementById(obj).value
}

/* FUNCTION - START SEQUENCE OF EVENTS  */
function startTimer() {
    
    context = new (window.AudioContext || window.webkitAudioContext)()
    note = new Sound(context)
    
    playButton.disabled = true
    stopButton.disabled = false

    playButton.style.background = "none"
    stopButton.style.backgroundColor = "rgb(113, 10, 10)"

    /*  INTERVAL  */
    interval = setInterval(function() {
        
        timerLabel.innerHTML = ++timer 

        if (timer >= 16) {  timer = 0 }

        switch (timer) {

            case timer:

                /*  STEP COUNT ALTER BACKGROUND COLOR  */
                document.getElementById('stp' + (parseInt(timerLabel.innerHTML) + 128)).style.backgroundColor = "white";

                /*  STEP COUNT RESET BACKGROUND COLOR  */
                setTimeout(function() { 
                    document.getElementById('stp' + (parseInt(timerLabel.innerHTML) + 128)).style.backgroundColor = "rgb(113, 10, 10)"
                }, 220)
            
                    /*  SEQUENCER PAD - PLAY NOTE  */
                    if (document.getElementById('pad'+ (parseInt(timerLabel.innerHTML))).value == 1) {

                        playNote(note, notesArray[0], setFader(faderArray[0]))

                    } else if (document.getElementById('pad'+ (parseInt(timerLabel.innerHTML) + 16)).value == 1) {

                        playNote(note, notesArray[1], setFader(faderArray[1]))
                        
                    } else if (document.getElementById('pad'+ (parseInt(timerLabel.innerHTML) + 32)).value == 1) {
                    
                        playNote(note, notesArray[2], setFader(faderArray[2]))
                        
                    } else if (document.getElementById('pad'+ (parseInt(timerLabel.innerHTML) + 48)).value == 1) {
                        
                        playNote(note, notesArray[3], setFader(faderArray[3]))
                        
                    } else if (document.getElementById('pad'+ (parseInt(timerLabel.innerHTML) + 64)).value == 1) {
                        
                        playNote(note, notesArray[4], setFader(faderArray[4]))
        
                    } else if (document.getElementById('pad'+ (parseInt(timerLabel.innerHTML) + 80)).value == 1) {
                        
                        playNote(note, notesArray[5], setFader(faderArray[5]))
                
                    } else if (document.getElementById('pad'+ (parseInt(timerLabel.innerHTML) + 96)).value == 1) {
                        
                        playNote(note, notesArray[6], setFader(faderArray[6]))
                        
                    } else if (document.getElementById('pad'+ (parseInt(timerLabel.innerHTML) + 112)).value == 1) {
            
                        playNote(note, notesArray[7], setFader(faderArray[7]))
                    }

                break;

            default:

                console.log("ERROR In Switch")
                
            break;

        }
        
    }, 250)

}

function clearPads() {
    for (var y = 1; y <= 128; y++) {
        document.getElementById('pad'+y).value = 0
        document.getElementById('pad'+y).style.backgroundColor = "rgb(113, 10, 10)"
    }
}

function stopTimer() {

    stopButton.disabled = true
    playButton.disabled = false

    stopButton.style.background = "none"
    playButton.style.backgroundColor = "rgb(113, 10, 10)"

    clearInterval(interval)
    
    timer = 0
    timerLabel.innerHTML = timer

    for (var x = 0; x < 16; x++) {
        document.getElementById('stp'+(129+x)).style.backgroundColor = "rgb(113, 10, 10)"
    }

}

function turnButtonON(elem) {

    switch (elem.id[0] + elem.id[1] + elem.id[2]) {

        case "trk":
            switch (elem.id) {
                case "trk" + elem.id[3]:
                    elem.innerHTML = notesArray[elem.id[3]] + " " + "HZ"
                    break;
                default:
                    console.log("ERROR In Switch")
                    break;
            }
            break;  

        case "pad": 
            document.getElementById(elem.id).style.backgroundColor = "rgb(211, 123, 57)"
            break;

        case "slo": case "mte":
        
            if (elem.innerHTML == "SAW") {
                buttonBGColor(8, 15, 'slo', "rgb(158, 165, 165)")
                buttonBGColor(9, 16, 'mte', "rgb(138, 135, 128)")
                waveForm = 'sawtooth'
            } else {
                buttonBGColor(9, 16, 'mte', "rgb(158, 165, 165)")
                buttonBGColor(8, 15, 'slo', "rgb(138, 135, 128)")
                waveForm = 'square'
            }
            
            break;

        case "fx1":
            for (var h = 153; h <= 160; h++) {
                document.getElementById((elem.id[0] + elem.id[1]+ elem.id[2]) + h) .style.backgroundColor =  "rgb(161, 233, 143)"
            }
            cutoffValue = 1000
            break;

        default:
            console.log("ERROR IN SWITCH")
            break;

    }

    document.getElementById(elem.id).value = 1
      
}

function turnButtonOFF(elem) {

    switch (elem.id[0] + elem.id[1] + elem.id[2]) {

        case "trk":

            switch (elem.id) {

                case "trk" + elem.id[3]:
                    elem.innerHTML = "TRACK" + " " + (parseInt(elem.id[3]) + 1)
                    break;

                default:
                    break;
            }
            break;

        case "pad": case "fx2": 
            document.getElementById(elem.id).style.backgroundColor = "rgb(113, 10, 10)"
            break;

        case "fx1":
            for (var h = 153; h <= 160; h++) {
                document.getElementById((elem.id[0] + elem.id[1]+ elem.id[2]) + h) .style.backgroundColor = "rgb(113, 10, 10)"
            }
            cutoffValue = 20000
            break;

        default:
            console.log("ERROR IN SWITCH")
            break;

    }

    document.getElementById(elem.id).value = 0

}   

function changeVolume(elem) {
    
   document.getElementById('fx2'+((elem.id[3] + elem.id[4] + elem.id[5]) - 16)).innerHTML = elem.value

}

