(function() {
    var tmMin, tmSec, timerOn=false, timerPaused=false, tmId, totSec, elapsed, work;
    $(":button:eq(0)").click(function() {
        if (timerPaused)
            timerOn = timerPaused = false;
        let v = Number($(":button:eq(1)").text());
        if (v < 90) /* max 90 min work */
            $(":button:eq(1)").text(v+1);
    });
    $(":button:eq(2)").click(function() {
        if (timerPaused)
            timerOn = timerPaused = false;
        let v = Number($(":button:eq(1)").text());
        if (v > 1)
            $(":button:eq(1)").text(v-1);
    });
    $(":button:eq(3)").click(function() {
        if (timerPaused)
            timerOn = timerPaused = false;
        let v = Number($(":button:eq(4)").text());
        if (v < 60) /* max 60 min break */
            $(":button:eq(4)").text(v+1);
    });
    $(":button:eq(5)").click(function() {
        if (timerPaused)
            timerOn = timerPaused = false;
        let v = Number($(":button:eq(4)").text());
        if (v > 1)
            $(":button:eq(4)").text(v-1);
    });
    
    $(":button:eq(1)").click(function() {
        if (timerPaused) {
            tmId = window.setInterval(cbTmr, 1000);
            $(".progress-bar").addClass("active");
            $(":button:eq(0), :button:eq(2)").prop("disabled", true);
            timerPaused = false;
        }
        else if (timerOn) {
            window.clearInterval(tmId);
            $(".progress-bar").removeClass("active");
            $(":button:eq(0), :button:eq(2)").prop("disabled", false);
            timerPaused = true;
        }
        else {
            tmMin = Number($(":button:eq(1)").text());
            tmSec = 0;
            totSec = tmMin * 60;
            elapsed = 0;
            $(".progress-bar").css("width", "100%")
                              .removeClass("progress-bar-success")
                              .addClass("progress-bar-info active");
            tmId = window.setInterval(cbTmr, 1000);
            timerOn = true;
            work = true;
            $(":button:eq(4)").prop("disabled", true);
            $(":button:eq(3), :button:eq(5)").prop("disabled", false);
            $(":button:eq(0), :button:eq(2)").prop("disabled", true);
        }
    });
            
    $(":button:eq(4)").click(function() {
        if (timerPaused) {
            tmId = window.setInterval(cbTmr, 1000);
            $(".progress-bar").addClass("active");
            $(":button:eq(3), :button:eq(5)").prop("disabled", true);
            timerPaused = false;
        }
        else if (timerOn) {
            window.clearInterval(tmId);
            $(".progress-bar").removeClass("active");
            $(":button:eq(3), :button:eq(5)").prop("disabled", false);
            timerPaused = true;
        }
        else {
            tmMin = Number($(":button:eq(4)").text());
            tmSec = 0;
            totSec = tmMin * 60;
            elapsed = 0;
            $(".progress-bar").css("width", "100%")
                              .removeClass("progress-bar-info")
                              .addClass("progress-bar-success active");
            tmId = window.setInterval(cbTmr, 1000);
            timerOn = true;
            work = false;
            $(":button:eq(1)").prop("disabled", true);
            $(":button:eq(0), :button:eq(2)").prop("disabled", false);
            $(":button:eq(3), :button:eq(5)").prop("disabled", true);
        }
    });
    
    function cbTmr() {
        if (tmSec == 0)
            if (tmMin == 0) {
                window.clearInterval(tmId);
                $(".progress-bar").removeClass("active");
                timerOn = false;
                if (work) {
                    $(":button:eq(4)").prop("disabled", false).trigger("click");
                    work = false;
                }
                else {
                    $(":button:eq(1)").prop("disabled", false).trigger("click");
                    work = true;
                }
                return;
            }
            else {
                tmSec = 59;
                --tmMin;
            }
        else
            --tmSec;
        
        ++elapsed;
        $(".progress-bar").text(`${tmMin}:${tmSec<10?0:''}${tmSec}`);
        let prs = 100 - Math.floor(elapsed/totSec*100);
        $(".progress-bar").css("width",  (prs > 10 ? prs : 10) + "%");
    }
    
})();