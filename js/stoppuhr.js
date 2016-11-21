'use strict';

//****************************************
// HTML-Elemente
//****************************************
var ausgabe = document.getElementById('ausgabe');
var startstop = document.getElementById('startstop');
var reset = document.getElementById('reset');

//****************************************
// stoppuhr-Objekt
//****************************************
var stoppuhr = {
    timerLaeuft: false,
    zeitInZehntelSekunden: 0,
    timerId: null,
    startstop: function () {
        if (stoppuhr.timerLaeuft) {
            // Stoppen
            stoppuhr.timerLaeuft = false;
            stoppuhr.timerStoppen();
            startstop.innerHTML = 'Start';
            startstop.className = 'btn btn-success';
        } else {
            // Starten
            stoppuhr.timerLaeuft = true;
            startstop.innerHTML = 'Stopp';
            startstop.className = 'btn btn-danger';
            stoppuhr.timerStarten(); // !!!! this.timerStarten() -> undefined !!!!
        }
    },
    reset: function () {
        stoppuhr.zeitInZehntelSekunden = 0;
        stoppuhr.ausgabe();
    },
    ausgabe: function () {
        var stunden = Math.floor(stoppuhr.zeitInZehntelSekunden / 36000);
        var minuten = Math.floor(stoppuhr.zeitInZehntelSekunden % 36000 / 600);
        if(minuten < 10){
            minuten = '0' + minuten;
        }
        var sekunden = Math.floor(stoppuhr.zeitInZehntelSekunden % 600 / 10);
        if(sekunden < 10){
            sekunden = '0' + sekunden;
        }
        var zehntel = stoppuhr.zeitInZehntelSekunden % 10;
        ausgabe.innerHTML = stunden + ':' + minuten + ':' + sekunden + ',' + zehntel;
    },
    timerStarten: function () {
        stoppuhr.timerId = setInterval(stoppuhr.timerAction, 100);
    },
    timerStoppen: function () {
        clearInterval(stoppuhr.timerId);
    },
    timerAction: function () {
        stoppuhr.zeitInZehntelSekunden++;
        stoppuhr.ausgabe();
    }
};

//****************************************
// Event-Handler
//****************************************
startstop.addEventListener('click', stoppuhr.startstop);
reset.addEventListener('click', stoppuhr.reset);

