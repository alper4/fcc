(() => {
    var fsm = {
        "sInit": {
            init: () => {
                this.lcdCap = 9;
                this.lcdUsed = 0;
                this.nokta = false;
                this.accu = "0";
                $("#lcd").text(this.accu);
                return "sEntry";
            }
        },
        "sEntry": {
            rakam: (val) => {
                if (this.lcdUsed == this.lcdCap)
                    return;
                if (val == "." && this.nokta)
                    return;

                if (this.lcdUsed == 0)
                    if (val != ".") {
                        this.accu = val;
                        ++this.lcdUsed;
                    }
                    else {
                        this.nokta = true;
                        this.accu = this.accu.concat(val);
                        ++this.lcdUsed;
                    }
                else {
                    this.accu = this.accu.concat(val);
                    if (val != ".")
                        ++this.lcdUsed;
                    else
                        this.nokta = true;
                }

                $("#lcd").text(this.accu);
            },
            allClear: () => {
                this.lcdUsed = 0;
                this.nokta = false;
                this.accu = "0";
                $("#lcd").text(this.accu);
            }
        }

    };

    var mach = new Stately(fsm);
    mach.init();
    
    $("button[name='rakam']").click(function () { mach.rakam(this.value); });
    $("button[name='aclr']").click(function () { mach.allClear(); });

})();