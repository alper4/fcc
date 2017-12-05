(function() {
    const dur = 500, off_dur = 200;
    const maxit = 19;
    var inplay = false, tur = 0, seq = [], itera = 0, b = [];
    for (let i = 0; i < 4; ++i)
        b[i] = $("audio source[src^='simon']").parent().eq(i)[0];
    
    $("button.btn-default").click(function() {
        $(".cntr").text("1");
        itera = tur = 0;
        for (let i = 0; i <= maxit; i++)
            seq[i] = Math.floor(Math.random() * 4);
        inplay = true;
        window.setTimeout(() => roboPlay(tur), dur);
    });
    
    for (let i = 0; i < 4; ++i)
        $("button").eq(i).click(function() {
            if (inplay) return;
            if (i != seq[tur]) {
                $("audio source[src^='fail']").parent().eq(0)[0].play();
                if ($("input:checkbox").is(":checked"))
                    window.setTimeout(() => $("button.btn-default").trigger("click"), dur*2);
                else {
                    tur = 0;
                    window.setTimeout(() => roboPlay(tur), dur*2);
                }
            }
            else {
                inplay = true;
                b[i].play();
                if (tur == itera)
                    if (itera == maxit)
                        window.setTimeout(() => gSuccess(), dur*2);
                    else {
                        ++itera;
                        tur = 0;
                        window.setTimeout(() => {
                            $(".cntr").text(Number($(".cntr").text()) + 1);
                            roboPlay(tur);
                        }, dur*2);
                    }
                else
                    window.setTimeout(() => { ++tur; inplay = false; }, dur);
            }
        });
    
    function roboPlay(i) {
        $("button").eq(seq[i]).addClass("active focus");
        b[seq[i]].play();
        window.setTimeout(function() { 
            $("button").eq(seq[i]).removeClass("active focus");
            if (tur == itera) {
                inplay = false;
                tur = 0;
                return;
            }
            window.setTimeout(() => roboPlay(++tur), off_dur);
        }, dur);
    }
    
    function gSuccess() {
        $("audio source[src^='tada']").parent().eq(0)[0].play();
        $("#gSuccess").modal("toggle");
        $(".cntr").text("0");
    }
    
})();