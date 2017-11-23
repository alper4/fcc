(() => {
    var fsm = {
        "sInit": {
            init: function () {
                this.lcdCap = 9;
                this.lcdUsed = 1;
                this.nokta = false;
                this.E = false;
                this.lcd = "0";
                this.accu = 0;
                this.op = undefined;
                $("#lcd").text(this.lcd);
                return "sEntry";
            }
        },
        "sEntry": {
            rakam: function (val) {
                if (this.E) return;
                if (this.lcdUsed == this.lcdCap)
                    return;

                if (this.lcd == "0") 
                    this.lcd = val;
                else {
                    this.lcd = this.lcd.concat(val);
                    ++this.lcdUsed;
                }
                $("#lcd").text(this.lcd);
                if (this.op == '=') this.op == undefined;
            },

            nokta: function (val) {
                if (this.E) return;
                if (this.nokta || this.lcdUsed == this.lcdCap)
                    return;

                if (this.lcdUsed == 0) {
                    this.lcd = "0";
                    ++this.lcdUsed;
                }

                this.lcd = this.lcd.concat(val);
                this.nokta = true;
                $("#lcd").text(this.lcd);
                if (this.op == '=') this.op == undefined;
            },

            allClear: function () {
                this.lcdUsed = 1;
                this.nokta = false;
                this.E = false;
                this.lcd = "0";
                this.accu = 0;
                this.op = undefined;
                $(".opsign").text("");
                $(".Esign").text("");
                $("#lcd").text(this.lcd);
            },

            oper: function (op) {
                if (this.E) return;
                $(".opsign").html(`<kbd>${op}</kbd>`);
                if (this.op == undefined)
                    this.accu = Number(this.lcd);
                else if (this.lcdUsed > 0)
                    this.sDispatch.oper.call(this);
                
                this.lcdUsed = 0;
                this.lcd = "";
                this.nokta = false;
                this.op = op;
            },

            opEql: function () {
                if (this.E) return;
                if (this.op == undefined)
                    return;
                else if (this.lcdUsed > 0)
                    this.sDispatch.oper.call(this);

                $(".opsign").text("");
                this.lcdUsed = 0;
                this.lcd = "";
                this.nokta = false;
                this.op = '=';
            },

            kkök: function () {
                if (this.E) return;
                let kkarg;
                if (this.op == undefined)
                    kkarg = Number(this.lcd);
                else 
                    kkarg = this.accu;
                this.op = 'kk';
                this.sDispatch.oper.call(this, kkarg);
                $(".opsign").text("");
                this.lcdUsed = 0;
                this.lcd = "";
                this.nokta = false;
            },

            clear: function() {
                if (this.E) {
                    this.E = false;
                    $(".Esign").text("");
                }
                else if (this.op == undefined || this.lcdUsed == 0) {
                    this.lcdUsed = 1;
                    this.nokta = false;
                    this.lcd = "0";
                    this.accu = 0;
                    this.op = undefined;
                    $(".opsign").text("");
                    $("#lcd").text(this.lcd);                  
                }
                else {
                    this.lcdUsed = 1;
                    this.nokta = false;
                    this.lcd = "0";
                    $("#lcd").text(this.lcd); 
                }
            }
        },
        sDispatch: {
            oper: function (kkarg) {
                var kkE = false;
                switch(this.op) {
                    case '+': 
                        this.accu += Number(this.lcd);
                        break;
                    case '-':
                        this.accu -= Number(this.lcd);
                        break;
                    case 'x':
                        this.accu *= Number(this.lcd);
                        break;
                    case '/':
                        this.accu /= Number(this.lcd);
                        break;
                    case 'kk':
                        if (kkarg < 0)
                            kkE = true;
                        this.accu = Math.sqrt(Math.abs(kkarg));
                        break;
                }
                let [norm, E] = düzelt(this.accu, this.lcdCap);
                $("#lcd").text(norm);
                if (E || kkE) {
                    this.accu = Number(norm);
                    $(".Esign").text("E");
                    this.E = true;
                }
            }
        }

    }; /* fsm */

    var mach = new Stately(fsm);
    mach.init();
    
    $("button[name='rakam']").click(function () { mach.rakam(this.value); });
    $("button[name='nokta']").click(function () { mach.nokta(this.value); });
    $("button[name='aclr']").click(function () { mach.allClear(); });
    $("button[name='op']").click(function () { mach.oper(this.value); });
    $("button[name='opEql']").click(function () { mach.opEql(); });
    $("button[name='kkök']").click(function () { mach.kkök(); });
    $("button[name='clr']").click(function () { mach.clear(); });

    function düzelt(num, cap) {
        var sp = num.toString().split('.');
        if (sp[0].length > cap) {
            let fark = sp[0].substr(cap).length;
            if (fark >= cap)
                return [sp[0].substr(0, cap).concat('.'), true];
            else
                return [sp[0].substr(0, fark).concat('.') + sp[0].substring(fark, cap), true];
        }
        else if (sp.length == 1) /* noktalı değil ve 9 basamak (veya daha az) */
            return [sp[0], false];
        else {                   /* noktalı, tam kısmı 9 basamaktan az */
            if (sp[0].length + sp[1].length <= cap)
                return [sp[0].concat('.') + sp[1], false];
            else
                return [sp[0].concat('.') + sp[1].substr(0, cap - sp[0].length), false];
        }
    }

})();