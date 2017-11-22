(() => {
    var fsm = {
        "sInit": {
            init: () => {
                this.lcdCap = 9;
                this.lcdUsed = 0;
                this.nokta = false;
                this.lcd = "0";
                this.accu = 0;
                $("#lcd").text(this.lcd);
                return "sEntry";
            }
        },
        "sEntry": {
            rakam: (val) => {
                if (this.lcdUsed == this.lcdCap)
                    return;

                this.lcd = this.lcdUsed == 0 ? val : this.lcd.concat(val);
                ++this.lcdUsed;
                $("#lcd").text(this.lcd);
            },

            nokta: (val) => {
                if (this.nokta || this.lcdUsed == this.lcdCap)
                    return;
                    
                this.lcd = this.lcd.concat(val);
                this.nokta = true;
                if (this.lcdUsed == 0)
                    ++this.lcdUsed;
                $("#lcd").text(this.lcd);
            },

            allClear: () => {
                this.lcdUsed = 0;
                this.nokta = false;
                this.lcd = "0";
                this.accu = 0;
                $("#lcd").text(this.lcd);
            }
        }

    };

    var mach = new Stately(fsm);
    mach.init();
    
    $("button[name='rakam']").click(function () { mach.rakam(this.value); });
    $("button[name='nokta']").click(function () { mach.nokta(this.value); });
    $("button[name='aclr']").click(function () { mach.allClear(); });

})();