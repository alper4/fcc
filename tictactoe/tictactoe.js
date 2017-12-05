(function() {
    var inGame = false, step, gLine = [], imgO = [], imgX = [];
    var vacant = [], usr, cmptr;
    const dur = 350;
    $("button:eq(0)").click(function() {
        if (inGame)  gameReset();
        usr = imgO; cmptr = imgX;
        $("h1:eq(0)").text("You");
        $("h1:eq(1)").text("Computer");
    });
    $("button:eq(2)").click(function() {
        if (inGame)  gameReset();
        usr = imgX; cmptr = imgO;
        $("h1:eq(1)").text("You");
        $("h1:eq(0)").text("Computer");
    });
    
    for (let O=$("img[src='o.png']"), X=$("img[src='x.png']"), i=0; i<9; ++i) {
        imgO[i] = O.eq(i);
        imgX[i] = X.eq(i);
    }

    $("button:eq(1)").click(function() {  // begin O
        if (inGame)  gameReset();
        inGame = true;
        if (usr == imgO) return;
        window.setTimeout(() => gPlayC(), dur);
    });
    $("button:eq(3)").click(function() {  // begin X
        if (inGame)  gameReset();
        inGame = true;
        if (usr == imgX) return;
        window.setTimeout(() => gPlayC(), dur);
    });
    
    $("map area").click(function() {
        if (! inGame)  return;
        let k = Number($(this).attr("alt"));
        if (vacant[k])
            gPlayU(k);
    });
    
    gameReset();
    usr = imgO; cmptr = imgX;
    
    function gameReset() {
        $("img[src='x.png'], img[src='o.png']").css({"z-index": "-1", "filter": "invert(0)"});
        gLine = [];
        for (let i = 0; i < 9; ++i) {
            gLine.push(i);
            vacant[i] = true;
        }
        step = 0;
        inGame = false;
    }
    
    function gPlayC() {
        let k = Math.floor(Math.random() * (9-step));
        cmptr[gLine[k]].css('z-index', '1');
        vacant[gLine[k]] = false;
        gLine.splice(k, 1);
        if (step > 1) {
            let [gwin,winline] = checkWin(cmptr);
            if (gwin) {
                for (let i of winline)
                    cmptr[i].css('filter', 'invert(100%)');
                $(".modal-body h3").text("Computer won!");
                $("#gWin").modal("toggle");
                return;
            }
        }            
        ++step;
        if (step == 9) {
            $(".modal-body h3").text("Draw.");
            $("#gWin").modal("toggle");
        }
    }
    
    function gPlayU(kare) {
        usr[kare].css('z-index', '1');
        vacant[kare] = false;
        gLine.splice(gLine.indexOf(kare), 1);
        if (step > 1) {
            let [gwin,winline] = checkWin(usr);
            if (gwin) {
                for (let i of winline)
                    usr[i].css('filter', 'invert(100%)');
                $(".modal-body h3").text("You won!");
                $("#gWin").modal("toggle");
                return;
            }
        }
        ++step;
        if (step < 9)
            window.setTimeout(() => gPlayC(), dur);
        else {
            $(".modal-body h3").text("Draw.");
            $("#gWin").modal("toggle");
        }
    }
    
    function checkWin(im) {
        let arr = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (let i of arr)
            if (im[i[0]].css("z-index") == "1" &&  im[i[1]].css("z-index") == "1" &&  im[i[2]].css("z-index") == "1")
                return [true, i];
        return [false, null];
    }
    
})();