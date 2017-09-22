var vtiatmr;
function ypSehirVerileri(h, b, i, e, f, k, l, j, d) {
    this.Ad = h;
    this.HaritaAdi = b;
    this.X = i;
    this.Y = e;
    this.Genislik = f;
    this.Yukseklik = k;
    this.mX = l;
    this.mY = j;
    this.svg = d
}
var gezilenNesne = null;
var svgn = "http://www.w3.org/2000/svg";
function snfVtiih() {
    var arrSSehirler = new Array();
    var haritaAdi = "";
    var haritaAlanId = "";
    var listeAlanId = "";
    var cokluSecim = false;
    var listeAcik = true;
    var cokRenkli = true;
    var filtreAdi = "none";
    var dolguRengi = "";
    var etiketAcik = false;
    var orantili = true;
    var genislik = null;
    var yukseklik = null;
    var icAnmAcik = true;
    var komsularAcik = true;
    var anmYokEtiketVar = true;
    var maxx = 0;
    var maxy = 0;
    var oran = 1;
    var Secildi = null;
    var SecimIptal = null;
    var Aktif = null;
    var Pasif = null;
    var snfnes = this;
	var loadedControl = false;
    var dolguRenkleri = new Array(["r1", "green"], ["r2", "blue"], ["r3", "brown"], ["r4", "red"], ["r5", "yellow"], ["r6", "skyblue"], ["r7", "aqua"], ["r8", "beige"], ["r9", "burlywood"], ["r10", "lime"], ["r11", "coral"], ["r12", "darkcyan"], ["r13", "darkorchid"], ["r14", "darksalmon"], ["r15", "darkseagreen"], ["r16", "gray"], ["r17", "gold"], ["r18", "hotpink"], ["r19", "maroon"], ["r20", "olive"]);

    function getRootWebSitePath() {
        var _location = document.location.toString();
        var applicationNameIndex = _location.indexOf("/", _location.indexOf("://") + 3);
        var applicationName = _location.substring(0, applicationNameIndex) + "/";
        return applicationName
    }

    function RenkAdiAra(arananAd) {
        var i = 0;
        for (i = 0; i < dolguRenkleri.length; i++) {
            if (arananAd == dolguRenkleri[i][0]) {
                return dolguRenkleri[i][1]
            }
        }
        return dolguRengi
    }

    this.SeciliSehirSayisiniVer = function () {
        return arrSSehirler.length
    };
    this.SeciliSehirleriVer = function () {
        return arrSSehirler.sort()
    };
    this.SeciliMi = function (e) {
        return (arrSSehirler.indexOf(e) != -1) ? true : false
    };
    function SecimListesindenCikart(e) {
        var ind = arrSSehirler.indexOf(e);
        if (ind == -1) {
            return false
        }
        arrSSehirler = (arrSSehirler.slice(0, ind)).concat(arrSSehirler.slice(ind + 1));
        return true
    }

    this.Yukle = function (HaritaAdi, HaritaAlanId, ListeAlanId, cc) {
        haritaAdi = HaritaAdi;
        haritaAlanId = "#" + HaritaAlanId;
        listeAlanId = "#" + ListeAlanId;
        arrSSehirler = [];
        //var st = getRootWebSitePath() + "vtiih/Haritalar/" + HaritaAdi + ".svg";
        var st = "vtiih/Haritalar/" + HaritaAdi + ".svg";
        $(haritaAlanId).load(st, function () {
            init(cc)
        });
		loadedControl = true;
        return true
    };
    function init(cc) {
        $(haritaAlanId + " #__Harita").css("display", "block");
        $(haritaAlanId + " #__Komsular").css("display", "block");
        $(haritaAlanId + " #__Harita g").mouseenter(Uste).click(Secim);
        $(haritaAlanId + " #__Harita path").attr("class", "Harita");
        $(haritaAlanId + " #__Harita circle").attr("class", "MerkezNokta");
        maxx = parseFloat($(haritaAlanId + " #HaritaCizim").attr("width"));
        maxy = parseFloat($(haritaAlanId + " #HaritaCizim").attr("height"));
        oran = maxx / maxy;
        var hList = $(haritaAlanId + " #__Harita g");
        $(haritaAlanId + " #f").attr("id", haritaAlanId.substring(1) + "f");
        $(haritaAlanId + " #__golge1").attr("id", haritaAlanId.substring(1) + "glg");
        $(haritaAlanId + " #__flt1").attr("id", haritaAlanId.substring(1) + "flt1");
        $(haritaAlanId + " #__flt2").attr("id", haritaAlanId.substring(1) + "flt2");
        $(haritaAlanId + " #__flt3").attr("id", haritaAlanId.substring(1) + "flt3");
        $(haritaAlanId + " #__flt4").attr("id", haritaAlanId.substring(1) + "flt4");
        var el = null;
        var st = "";
        var obj;
        var newText;
        var textNode;
        var ge;
        var rec;
        var path;
        var txt;
        var textNode;
        var merkez;
        var kutu;
        if (dolguRengi == "") {
            dolguRengi = $(hList[0]).children("path:first").css("fill")
        }
        ge = document.createElementNS(svgn, "g");
        $(ge).attr("id", "etiketler");
        $(ge).appendTo($(haritaAlanId + " #HaritaCizim"));
        for (var i = 0; i < hList.length; i++) {
            if (cokRenkli) {
                el = $(listeAlanId + " #" + (hList[i].id).substring(2)).attr("class");
                $(hList[i]).children("path").css("fill", RenkAdiAra(el))
            }
            $(listeAlanId + " #" + (hList[i].id).substring(2)).click(function () {
                $(haritaAlanId + " #__Harita #__" + $(this).attr("id")).trigger("click")
            }).mouseenter(function () {
                $(haritaAlanId + " #__Harita #__" + $(this).attr("id")).trigger("mouseenter")
            }).mouseleave(function () {
                if (gezilenNesne != null) {
                    Cikti(gezilenNesne)
                }
            });
            $merkez = $(hList[i]).children("circle");
            g = document.createElementNS(svgn, "g");
            path = document.createElementNS(svgn, "path");
            rec = document.createElementNS(svgn, "rect");
            txt = document.createElementNS(svgn, "text");
            textNode = document.createTextNode((hList[i].id).substring(2));
            $(g).attr("id", "et" + (hList[i].id).substring(2));
            $(g).appendTo($(ge));
            $(g).click(function () {
                $(haritaAlanId + " #__Harita #__" + $(this).text()).trigger("click")
            }).mouseenter(function () {
                $(haritaAlanId + " #__Harita #__" + $(this).text()).trigger("mouseenter")
            }).mouseleave(function () {
                if (gezilenNesne != null) {
                    Cikti(gezilenNesne)
                }
            });
            $(path).appendTo($(g));
            $(g)[0].appendChild(rec);
            $(txt).attr("class", "SehirEtiketi");
            $(txt)[0].appendChild(textNode);
            $(txt).appendTo($(g));
            kutu = txt.getBBox();
            $(txt).attr("x", $merkez.attr("cx"));
            $(txt).attr("y", $merkez.attr("cy") - (kutu.height / 5) - 10 - 3);
            $(txt).attr("text-anchor", "middle");
            rec.setAttributeNS(null, "x", $(txt).attr("x") - kutu.width / 2 - 25);
            rec.setAttributeNS(null, "y", $(txt).attr("y") - (kutu.height / 5 * 4) - 3);
            rec.setAttributeNS(null, "width", kutu.width + 50);
            rec.setAttributeNS(null, "height", kutu.height + 6);
            rec.setAttributeNS(null, "class", "EtiketCercevesi");
            rec.setAttributeNS(null, "rx", "5");
            rec.setAttributeNS(null, "ry", "5");
            $(path).attr("d", "M" + ($merkez.attr("cx") - 8) + " " + ($merkez.attr("cy") - 10) + " l17 0 l-9 10z");
            $(path).css("fill", $(rec).css("stroke"));
            $(path).css("cursor", $(rec).css("cursor"))
        }
        if (filtreAdi != "none") {
            $(haritaAlanId + " #__Harita path").attr("filter", filtreAdi)
        }
        $(haritaAlanId + " #__Harita #__cer").mouseenter(function () {
            if (gezilenNesne != null) {
                Cikti(gezilenNesne)
            }
        });
        if (!listeAcik) {
            $(listeAlanId).css("display", "none")
        } else {
            $(listeAlanId).css("display", "block")
        }
        if (etiketAcik) {
            $(ge).children("g").css("visibility", "visible")
        } else {
            $(ge).children("g").css("visibility", "hidden")
        }
        if (cc != null && cc != "") {
            var prm = cc.toString();
            prm = prm.replace(/Sec/gi, "sec");
            prm = prm.replace(/AktifYap/gi, "aktifyap");
            prm = prm.replace(/SetProperty/gi, "setproperty");
            prm = prm.replace(/GetProperty/gi, "getproperty");
            prm = prm.replace(/Kapla/gi, "kapla");
            prm = prm.replace(/ListeOlustur/gi, "listeolustur");
            prm = prm.replace(/Renklendir/gi, "renklendir");
            prm = prm.replace(/AnOlceklendir/gi, "anolceklendir");
            prm = prm.replace(/SehirleriVer/gi, "sehirleriver");
            prm = prm.replace(/SehireRenkAta/gi, "sehirerenkata");
            prm = prm.replace(/RenkDegeriniVer/gi, "renkdegeriniver");
            eval(prm)
        }
        return true
    }

    function Uste() {
        if (gezilenNesne != null && gezilenNesne.id == this.id) {
            return
        }
        if (gezilenNesne != null && gezilenNesne.id != this.id) {
            Cikti(gezilenNesne)
        }
        if (arrSSehirler.indexOf(this.id.substring(2)) > -1) {
            return
        }
        gezilenNesne = this;
        $(listeAlanId + " #" + this.id.substring(2)).addClass("ListeUstunde");
        if (!icAnmAcik) {
            if (Aktif != null) {
                Aktif(snfnes, this.id.substring(2))
            }
            return
        }
        var sx = 1.5;
        var sy = 1.5;
        var bb = gezilenNesne.getBBox();
        var merx = bb.x + bb.width / 2;
        var mery = bb.y + bb.height / 2;
        var st = "matrix(" + sx + ", 0, 0, " + sy + ", " + (merx - sx * merx) + ", " + (mery - sy * mery) + ")";
        $(this).appendTo(haritaAlanId + " #__Harita");
        $(this).attr("transform", st);
        $(haritaAlanId + " #et" + this.id.substring(2)).attr("transform", st);
        $(this).children("path").attr("filter", "url(" + haritaAlanId + "glg)");
        $(haritaAlanId + " #et" + this.id.substring(2)).css("visibility", "visible");
        if (Aktif != null) {
            Aktif(snfnes, this.id.substring(2))
        }
    }

    function Cikti(n) {
        $(listeAlanId + " #" + ($(n).attr("id")).substring(2)).removeClass("ListeUstunde");
        if (!icAnmAcik) {
            if (Pasif != null) {
                Pasif(snfnes, ($(n).attr("id")).substring(2))
            }
            return
        }
        $(n).children("path").attr("filter", filtreAdi);
        $(n).attr("transform", "none");
        $(haritaAlanId + " #et" + ($(n).attr("id")).substring(2)).attr("transform", "none");
        if (!etiketAcik) {
            $(haritaAlanId + " #et" + ($(n).attr("id")).substring(2)).css("visibility", "hidden")
        }
        gezilenNesne = null;
        if (Pasif != null) {
            Pasif(snfnes, ($(n).attr("id")).substring(2))
        }
    }

    function fnSecimiKaldir(e) {
        $(haritaAlanId + " #__" + e + " path").attr("mask", "none");
        $(haritaAlanId + " " + haritaAlanId + "_ma_" + e).remove();
        SecimListesindenCikart(e);
        if (!etiketAcik) {
            $(haritaAlanId + " #et" + e).css("visibility", "hidden")
        }
        $(listeAlanId + " #" + e).removeClass("ListeSecili");
        if (arrSSehirler.length == 0) {
            snfVtiih.xsan(haritaAlanId, 1)
        }
        if (SecimIptal != null) {
            SecimIptal(snfnes, e)
        }
    }

    function Secim() {
        var adet = 0;
        $(listeAlanId + " #" + this.id.substring(2)).toggleClass("ListeSecili");
        if (arrSSehirler.indexOf(this.id.substring(2)) > -1) {
            fnSecimiKaldir(this.id.substring(2));
            return
        }
        if (!cokluSecim) {
            adet = arrSSehirler.length;
            for (var i = 0; i < adet; i++) {
                fnSecimiKaldir(arrSSehirler.pop().toString())
            }
        }
        arrSSehirler.push(this.id.substring(2));
        Cikti(this);
        if (!icAnmAcik) {
            if (anmYokEtiketVar) {
                $(haritaAlanId + " #et" + this.id.substring(2)).css("visibility", "visible")
            }
            if (Secildi != null) {
                Secildi(snfnes, this.id.substring(2))
            }
            return true
        }
        $(haritaAlanId + " #et" + this.id.substring(2)).css("visibility", "visible");
        var mask = document.createElementNS(svgn, "mask");
        mask.setAttributeNS(null, "id", haritaAlanId.substring(1) + "_ma_" + this.id.substring(2));
        $(mask).append($(this).children("path").clone().attr({
            style: "fill:url(" + haritaAlanId + "f)",
            filter: "none"
        }));
        $(haritaAlanId + " #HaritaCizim")[0].appendChild(mask);
        $(this).children("path").attr("mask", "url(" + haritaAlanId + "_ma_" + this.id.substring(2) + ")");
        if (arrSSehirler.length == 1) {
            snfVtiih.xsan(haritaAlanId, 0)
        }
        if (Secildi != null) {
            Secildi(snfnes, this.id.substring(2))
        }
    }

    function setproperty(property, deger) {
        switch (property) {
            case"çoklu_seçim":
                if (deger == true || deger == false) {
                    cokluSecim = deger
                }
                break;
            case"liste_açik":
                if (deger == true || deger == false) {
                    listeAcik = deger;
                    if (deger == true) {
                        $(listeAlanId).css("display", "block")
                    }
                    if (deger == false) {
                        $(listeAlanId).css("display", "none")
                    }
                }
                break;
            case"çok_renkli":
                if (deger == true || deger == false) {
                    cokRenkli = deger;
                    if (cokRenkli) {
                        var sList = $(haritaAlanId + " #__Harita g").not("._Etiket");
                        for (var i = 0; i < sList.length; i++) {
                            $(sList[i]).children("path").css("fill", RenkAdiAra($(listeAlanId + " #" + (sList[i].id).substring(2)).attr("class")))
                        }
                    } else {
                        $(haritaAlanId + " #__Harita path").css("fill", dolguRengi)
                    }
                }
                break;
            case"renk_paleti":
                dolguRenkleri = deger;
                break;
            case"dolgu_rengi":
                dolguRengi = deger;
                if (!cokRenkli) {
                    $(haritaAlanId + " #__Harita path").css("fill", dolguRengi)
                }
                break;
            case"çizgi_rengi":
                $(haritaAlanId + " #__Harita path").css("stroke", deger);
                break;
            case"merkez_rengi":
                $(haritaAlanId + " #__Harita circle").css("fill", deger);
                break;
            case"filtre_no":
                filtreAdi = deger;
                if (deger != "none") {
                    filtreAdi = "url(" + haritaAlanId + "flt" + deger + ")"
                }
                $(haritaAlanId + " #__Harita path").attr("filter", filtreAdi);
                break;
            case"olay_seçildi":
                Secildi = deger;
                break;
            case"olay_seçim_iptal":
                SecimIptal = deger;
                break;
            case"olay_aktif":
                Aktif = deger;
                break;
            case"olay_pasif":
                Pasif = deger;
                break;
            case"genişlik":
                $(haritaAlanId + " #HaritaCizim").attr("width", deger);
                if (orantili) {
                    $(haritaAlanId + " #HaritaCizim").attr("height", deger / oran)
                }
                break;
            case"yükseklik":
                $(haritaAlanId + " #HaritaCizim").attr("height", deger);
                if (orantili) {
                    $(haritaAlanId + " #HaritaCizim").attr("width", deger * oran)
                }
                break;
            case"etiket_açık":
                if (deger == true || deger == false) {
                    etiketAcik = deger;
                    if (etiketAcik) {
                        $(haritaAlanId + " #etiketler g").css("visibility", "visible")
                    } else {
                        $(haritaAlanId + " #etiketler g").css("visibility", "hidden")
                    }
                }
                break;
            case"çizgi_kalınlığı":
                $(haritaAlanId + " #__Harita path").css("stroke-width", deger);
                break;
            case"orantılı":
                if (deger == true) {
                    orantili = deger;
                    $(haritaAlanId + " #HaritaCizim").attr("height", parseFloat($(haritaAlanId + " #HaritaCizim").attr("width")) / oran)
                }
                if (deger == false) {
                    orantili = deger
                }
                break;
            case"ic_anm_açık":
                if (deger == true || deger == false) {
                    icAnmAcik = deger
                }
                break;
            case"komsular_acik":
                if (deger == true || deger == false) {
                    komsularAcik = deger;
                    if (komsularAcik) {
                        $(haritaAlanId + " #__Komsular").css("visibility", "visible")
                    } else {
                        $(haritaAlanId + " #__Komsular").css("visibility", "hidden")
                    }
                }
                break;
            case"iç_anm_yok_etk_var":
                if (deger == true || deger == false) {
                    anmYokEtiketVar = deger
                }
                break
        }
        return true
    }

    this.SetProperty = function (property, deger, r) {
        setproperty(property, deger, r)
    };
    function getproperty(property) {
        switch (property) {
            case"çoklu_seçim":
                return cokluSecim;
                break;
            case"liste_açik":
                return listeAcik;
                break;
            case"çok_renkli":
                return cokRenkli;
                break;
            case"filtre_no":
                return filtreAdi;
                break;
            case"renk_paleti":
                return dolguRenkleri;
                break;
            case"olay_seçildi":
                return Secildi;
                break;
            case"olay_seçim_iptal":
                return SecimIptal;
                break;
            case"olay_aktif":
                return Aktif;
                break;
            case"olay_pasif":
                return Pasif;
                break;
            case"genişlik":
                return $(haritaAlanId + " #HaritaCizim").attr("width");
                break;
            case"yükseklik":
                return $(haritaAlanId + " #HaritaCizim").attr("height");
                break;
            case"etiket_açik":
                return etiketAcik;
                break;
            case"orantılı":
                return orantili;
                break;
            case"harita_adı":
                return haritaAdi;
                break;
            case"komsular_acik":
                return komsularAcik;
                break;
            case"ic_anm_açık":
                return icAnmAcik;
                break;
            case"çizgi_rengi":
                return $(haritaAlanId + " #__Harita path").css("stroke");
                break;
            case"çizgi_kalınlığı":
                $(haritaAlanId + " #__Harita path").css("stroke-width");
                break;
            case"merkez_rengi":
                $(haritaAlanId + " #__Harita circle").css("fill", deger);
                break;
            case"dolgu_rengi":
                return dolguRengi;
                break;
            case"orjinal_genişlik":
                return maxx;
                break;
            case"orjinal_yükseklik":
                return maxy;
                break;
            case"gyoran":
                return oran;
                break;
            case"iç_anm_yok_etk_var":
                return anmYokEtiketVar;
                break;
            default:
                return $(haritaAlanId + " #__Harita #__" + property).children("path:first").css("fill");
                break
        }
    }

    this.GetProperty = function (property) {
        return getproperty(property)
    };
    function sehirerenkata(s, r) {
        for (var i = 0; i < dolguRenkleri.length; i++) {
            if (r == dolguRenkleri[i][0]) {
                r = dolguRenkleri[i][1];
                break
            }
        }
        $(haritaAlanId + " #__Harita #__" + s + " path").css("fill", r)
    }

    this.SehireRenkAta = function (s, r) {
        sehirerenkata(s, r)
    };
    function renkdegeriniver(r) {
        return RenkAdiAra(r)
    }

    this.RenkDegeriniVer = function (renkAdi) {
        return renkdegeriniver(renkAdi)
    };
    this.SehirVerileriniVer = function (sehir) {
        var shr = $(haritaAlanId + " #__Harita #__" + sehir);
        var kutu = $(haritaAlanId + " #__Harita #__" + sehir)[0].getBBox();
        var mx = $(haritaAlanId + " #__Harita #__" + sehir + " circle").attr("cx");
        var my = $(haritaAlanId + " #__Harita #__" + sehir + " circle").attr("cy");
        return new ypSehirVerileri(sehir, haritaAdi, kutu.x, kutu.y, kutu.width, kutu.height, mx, my, shr)
    };
    function kapla() {
        if (orantili) {
            var kw = parseInt($(haritaAlanId).css("width"));
            var kh = parseInt($(haritaAlanId).css("height"));
            setproperty("genişlik", kw);
            if (parseInt($(haritaAlanId + " #HaritaCizim").attr("height")) > kh) {
                setproperty("yükseklik", kh)
            }
        } else {
            $(haritaAlanId + " #HaritaCizim").attr({
                width: $(haritaAlanId).css("width"),
                height: $(haritaAlanId).css("height")
            })
        }
    }

    this.Kapla = function () {
        return kapla()
    };
    function sec(s) {
        $(haritaAlanId + " #__Harita #__" + s).trigger("click")
    }

    function aktifyap(s) {
        $(haritaAlanId + " #__Harita #__" + s).trigger("mouseenter")
    }

    this.CizimiVer = function (n, w, h, dr, cr, ck) {
        var orn = 1;
        var ww = (w == NaN || w == null || w == 0) ? n.Genislik : w;
        var hh = (h == NaN || h == null || h == 0) ? n.Yukseklik : h;
        var ddr = (dr == NaN || dr == null || dr == "") ? $(n.svg).children("path:first").css("fill") : dr;
        var cck = (ck == NaN || ck == null || ck == "") ? $(n.svg).children("path:first").css("stroke-width") : ck;
        var ccr = (cr == NaN || cr == null || cr == 0) ? $(n.svg).children("path:first").css("stroke") : cr;
        var gec = 0;
        orn = n.Genislik / n.Yukseklik;
        if (n.Genislik > n.Yukseklik) {
            gec = ww / orn;
            if (gec > hh) {
                ww = hh * orn
            } else {
                hh = gec
            }
        } else {
            gec = hh * orn;
            if (gec > ww) {
                hh = ww / orn
            } else {
                ww = gec
            }
        }
        var xx = n.X;
        var yy = n.Y;
        var morn = ww / n.Genislik;
        var st = "matrix(" + morn + ", 0, 0, " + morn + ", " + (-morn * n.X) + ", " + (-morn * n.Y) + ")";
        var svge = document.createElementNS(svgn, "svg");
        $(svge).attr({x: "0px", y: "0px", width: ww + "px", height: hh + "px"});
        $(svge).attr("viewBox", "0 0 " + (ww + 1) + " " + (hh + 1));
        var ilc = $(n.svg).clone();
        $(ilc).children("path").removeAttr("mask");
        $(ilc).children("path").removeAttr("filter");
        $(ilc).children("path").removeAttr("style");
        $(ilc).attr("id", $(ilc).attr("id") + "_Kopya");
        $(ilc).children("path").css("fill", ddr);
        $(ilc).children("path").css("stroke-width", cck);
        $(ilc).children("path").css("stroke", ccr);
        $(ilc).children("circle").css("stroke-width", cck);
        $(ilc).attr("transform", st).appendTo($(svge));
        return svge
    };
    this.Sec = function (sehir) {
        sec(sehir)
    };
    this.AktifYap = function (sehir) {
        aktifyap(sehir)
    };
    this.PasifYap = function (sehir) {
        Cikti($(haritaAlanId + " #__Harita #__" + sehir))
    };
    function sehirleriver() {
        var sList = $(haritaAlanId + " #__Harita g");
        var seh = new Array();
        for (var i = 0; i < sList.length; i++) {
            seh.push(sList[i].id.substring(2))
        }
        seh.sort(tkar);
        return seh
    }

    this.SehirleriVer = function () {
        return sehirleriver()
    };
    function tkar(a, b) {
        var turkcealfabe = "0123456789AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz";
        var aa = "";
        var bb = "";
        var s = 0;
        var uz = (a.length < b.length) ? a.length : b.length;
        for (var i = 0; i < a.length; i++) {
            aa = aa + String.fromCharCode(33 + turkcealfabe.indexOf(a[i]))
        }
        for (var i = 0; i < b.length; i++) {
            bb = bb + String.fromCharCode(33 + turkcealfabe.indexOf(b[i]))
        }
        for (var i = 0; i < uz; i++) {
            if (aa[i] < bb[i]) {
                s = -1;
                break
            }
            if (aa[i] > bb[i]) {
                s = 1;
                break
            }
        }
        if (s == 0 && a.length != b.length) {
            if (a.length < b.length) {
                s = -1
            } else {
                s = 1
            }
        }
        return s
    }

    function gIdKarsilastir(a, b) {
        var aid = ($(a).attr("id"));
        var bid = ($(b).attr("id"));
        return tkar(aid, bid)
    }

    function listeolustur(s) {
        var sList = new Array();
        var sList = $(haritaAlanId + " #__Harita g");
        sList.sort(gIdKarsilastir);
        var ss = 1;
        var tbl = document.createElement("table");
        var td;
        var tr = document.createElement("tr");
        var spn;
        var ssay = sList.length;
        var rs = dolguRenkleri.length;
        var r = 0;
        var oss = 0;
        for (var i = 0; i < ssay; i++) {
            spn = document.createElement("span");
            $(spn).attr({id: sList[i].id.substring(2), "class": dolguRenkleri[r][0]});
            r++;
            if (r == rs) {
                r = 0
            }
            spn.innerHTML = sList[i].id.substring(2);
            $(spn).click(function () {
                $(haritaAlanId + " #__Harita #__" + $(this).text()).trigger("click")
            }).mouseenter(function () {
                $(haritaAlanId + " #__Harita #__" + $(this).text()).trigger("mouseenter")
            }).mouseleave(function () {
                if (gezilenNesne != null) {
                    Cikti(gezilenNesne)
                }
            });
            td = document.createElement("td");
            $(td).attr("style", "padding-right:5px;padding-left: 5px");
            $(td)[0].appendChild(spn);
            $(tr)[0].appendChild(td);
            oss++;
            if (oss == s || i == (ssay - 1)) {
                $(tbl)[0].appendChild(tr);
                tr = document.createElement("tr");
                oss = 0
            }
        }
        $(listeAlanId).empty();
        $(listeAlanId)[0].appendChild(tbl)
    }

    this.ListeOlustur = function (s) {
        listeolustur(s)
    };
    function renklendir(c) {
        if (c == false) {
            if (!cokRenkli) {
                setproperty("çok_renkli", false);
                return
            }
            var sList = $(haritaAlanId + " #__Harita g");
            var radet = dolguRenkleri.length;
            var sadet = sList.length;
            var r = 0;

            $.each(sList, function (k, v) {
                $(this).find("path").css("fill", dolguRenkleri[r][1]);
                r++;
                if (r >= radet) {
                    r = 0
                }
            });
        } else {
            if (cokRenkli) {
                setproperty("çok_renkli", true)
            } else {
                setproperty("çok_renkli", false)
            }
        }
    }

    this.Renklendir = function (c) {
        renklendir(c)
    };
    function anolceklendir(g, y, s, a) {
        var tz = s / a;
        var ag = (g - parseFloat($(haritaAlanId + " #HaritaCizim").attr("width"))) / a;
        var ay = (y - parseFloat($(haritaAlanId + " #HaritaCizim").attr("height"))) / a;
        AnimOlcek(haritaAlanId, ag, ay, tz, a)
    }

    this.AnOlceklendir = function (g, y, s, a) {
        anolceklendir(g, y, s, a)
    }
}
function AnimOlcek(b, d, h, e, c) {
    var f = parseInt($(b + " #HaritaCizim").attr("width")) + d;
    var i = parseInt($(b + " #HaritaCizim").attr("height")) + h;
    $(b + " #HaritaCizim").attr("width", f);
    $(b + " #HaritaCizim").attr("height", i);
    c--;
    if (c > 0) {
        vtiatmr = window.setTimeout("AnimOlcek('" + b + "'," + d + "," + h + "," + e + "," + c + ");", e)
    } else {
        window.clearTimeout(vtiatmr)
    }
}
snfVtiih.xsl = new Array();
snfVtiih.xar = 0.15;
snfVtiih.xde = 0.4;
snfVtiih.xtt = null;
snfVtiih.xst = function () {
    var a = "";
    if (((snfVtiih.xde + snfVtiih.xar) < 0) || ((snfVtiih.xde + snfVtiih.xar) > 1)) {
        snfVtiih.xar = -snfVtiih.xar
    }
    snfVtiih.xde = snfVtiih.xde + snfVtiih.xar;
    for (var b = 0; b < snfVtiih.xsl.length; b++) {
        $(snfVtiih.xsl[b] + " #__def #STOP1").attr("offset", snfVtiih.xde);
        a = a + snfVtiih.xsl[b]
    }
};
snfVtiih.xsan = function (a, b) {
    var c;
    switch (b) {
        case 0:
            if (snfVtiih.xsl.indexOf(a) == -1) {
                snfVtiih.xsl.push(a);
                if (snfVtiih.xsl.length == 1) {
                    snfVtiih.xtt = window.setInterval("snfVtiih.xst()", 40)
                }
            }
            break;
        case 1:
            c = snfVtiih.xsl.indexOf(a);
            if (c >= 0) {
                snfVtiih.xsl = (snfVtiih.xsl.slice(0, c)).concat(snfVtiih.xsl.slice(c + 1));
                if (snfVtiih.xsl.length == 0) {
                    window.clearInterval(snfVtiih.xtt)
                }
            }
            break
    }
};