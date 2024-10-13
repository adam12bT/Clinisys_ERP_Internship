var listPrestationSelect = [];
$(function () {
   $(document.body).on('keyup', 'input.input-xs , td input ,textarea', function () {
        var s = this.selectionStart;
        var e = this.selectionEnd;
        this.selectionStart = s;
        this.selectionEnd = e;
    });
});

$(function () {
    $(document.body).on('keyup', 'input.input-code , td input.input-code', function () {

        this.value = verifCode(this.value);

    });
});

function verifCode(code) {

    var regex = new RegExp("[a-z0-9]", "i");
    var valid;
    for (x = 0; x < code.length; x++) {
        valid = regex.test(code.charAt(x));
        if (valid === false) {
            code = code.substr(0, x) + code.substr(x + 1, code.length - x + 1);
            x--;
        }
    }
    return code;
}
function getTimestamp(date, end) {
    let dateTimeStamp = new Date(parseInt(date.split('/')[2]), parseInt(date.split('/')[1]) - 1, parseInt(date.split('/')[0]));
    if (end)
        dateTimeStamp.setHours(23, 59, 59, 999);
    else
        dateTimeStamp.setHours(0, 0, 0, 0);
    return dateTimeStamp.getTime();
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function applyDatePresentation(idElement) {
    $('#' + idElement).on('focus', function () {
        $(this).select();
    });

}

function showLoadingNotification() {
    window.parent.$.loader.open();
    if (localStorage.getItem("langue") === "ar")
        window.parent.$(".loading_wrp").css("direction", "ltr");
}

function hideLoadingNotification() {
    window.parent.$.loader.close();
}
function dateDiff(date1, date2) {
    var diff = {};
    var t = [];
    t = date1.split('/');
    var month = (parseInt(t[1]) - 1) + '';
    var d1 = new Date(t[2], month, t[0]);
    t = date2.split('/');
    month = (parseInt(t[1]) - 1) + '';
    var d2 = new Date(t[2], month, t[0]);
    var tmp = d2 - d1;
    tmp = Math.floor(tmp / 1000); // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60; // Extraction du nombre de secondes

    tmp = Math.floor((tmp - diff.sec) / 60); // Nombre de minutes (partie enti?)
    diff.min = tmp % 60; // Extraction du nombre de minutes

    tmp = Math.floor((tmp - diff.min) / 60); // Nombre d'heures (enti?s)
    diff.hour = tmp % 24; // Extraction du nombre d'heures

    tmp = Math.floor((tmp - diff.hour) / 24); // Nombre de jours restants
    diff.day = tmp;
    return diff.day;
//    var WNbJours = d2.getTime() - d1.getTime();
//    return WNbJours / (1000 * 60 * 60 * 24);
}
function getDateNow() {
    var day, hour, min;
    var month;
    var year;
    day = (currentDate.getDate().toString().length === 2) ? currentDate.getDate() : "0" + currentDate.getDate();
    month = ((currentDate.getMonth() + 1).toString().length === 2) ? (currentDate.getMonth() + 1) : "0" + (currentDate.getMonth() + 1);
    year = currentDate.getFullYear();
    hour = (currentDate.getHours().toString().length === 2) ? currentDate.getHours() : "0" + currentDate.getHours();
    min = (currentDate.getMinutes().toString().length === 2) ? currentDate.getMinutes() : "0" + currentDate.getMinutes();
    return  day + "/" + month + "/" + year;//+ " à " + hour + ":" + min ;
}

function getDayAfterDay(date, nbrDays) {
    var today = new Date(date.split("/")[2], date.split("/")[1] - 1, date.split("/")[0]);
    var dateResult = new Date(date.split("/")[2], date.split("/")[1] - 1, date.split("/")[0]);
    dateResult.setDate(today.getDate() + nbrDays);
    var day = (dateResult.getDate().toString().length === 2) ? dateResult.getDate() : "0" + dateResult.getDate();
    var month = ((dateResult.getMonth() + 1).toString().length === 2) ? (dateResult.getMonth() + 1) : "0" + (dateResult.getMonth() + 1);
    var year = dateResult.getFullYear();
    return  day + '/' + month + '/' + year;
}
function verifContains(ch1, ch2) {
    var test;
    ch1 = ch1.toUpperCase();
    ch2 = ch2.toUpperCase();
    var lengthCh1 = ch1.length;
    var lengthCh2 = ch2.length;
    if (lengthCh1 > lengthCh2) {
        var indexCh2 = ch1.indexOf(ch2);
        if (indexCh2 > -1)
            test = true;
        else
            test = false;
    } else {
        var indexCh1 = ch2.indexOf(ch1);
        if (indexCh1 > -1)
            test = true;
        else
            test = false;
    }
    return test;
}
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d === undefined ? "." : d,
            t = t === undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
function calculmntht(qte, priuni, remise) {
    return ((parseFloat(qte) * parseFloat(priuni)).toFixed(3) - ((parseFloat(qte) * parseFloat(priuni) * parseFloat(remise)) / 100).toFixed(3)).toFixed(3);
}

function getdayafteronemonth() {
    currentDate.setDate(currentDate.getDate() - 30);
    var month2 = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    if (day < 10)
        day = '0' + day;
    if (month2 < 10)
        month2 = '0' + month2;
    return day + "/" + month2 + "/" + currentDate.getFullYear();
}
function getdaybeforeonemonth() {
    var today = new Date();
    today.setDate(today.getDate() + 30);
    var month2 = today.getMonth() + 1;
    var day = today.getDate();
    if (day < 10)
        day = '0' + day;
    if (month2 < 10)
        month2 = '0' + month2;
    return day + "/" + month2 + "/" + today.getFullYear();
}


function parseDateToString(date) {
    var day = (date.getDate().toString().length === 2) ? date.getDate() : "0" + date.getDate();
    var month = ((date.getMonth() + 1).toString().length === 2) ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

function impressionPiece(url) {
    $('#iframe_content').attr('src', '').replaceWith('<iframe id="iframe_content" src="" style="width: 100%;height:100%;" ></iframe>');
    $("#_edition_modal").modal("show");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Accept-Language", localStorage.getItem("langue"));
    xhr.setRequestHeader("x-auth-token", localStorage.getItem("x-auth-token"));
    xhr.onload = function () {
        let blob = new Blob([xhr.response], {type: 'application/pdf'});
        let url = URL.createObjectURL(blob);
        window.open(url);
        document.getElementById('iframe_content').src = url;
    };
    xhr.send(JSON.stringify());
}
function formattimestamp(timestamp) {
    date = new Date(timestamp),
            datevalues = [
                date.getFullYear(),
                addzero(date.getMonth() + 1),
                addzero(date.getDate()),
                addzero(date.getHours()),
                addzero(date.getMinutes()),
                addzero(date.getSeconds())
            ];


    return(datevalues[2] + '/' + datevalues[1] + '/' + datevalues[0]);
}
function addzero(i) {
    var r = i;
    if (i < 10)
        r = '0' + r;
    return r;

}

function impressionListe(url, methode, data) {
    showLoadingNotification( );
    let xhr = new XMLHttpRequest();
    if (methode) {
        xhr.open(methode, url);
    } else {
        xhr.open("GET", url);
    }
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Accept-Language", localStorage.getItem("langue"));
    xhr.setRequestHeader("x-auth-token", localStorage.getItem("x-auth-token"));
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
                let blob = new Blob([xhr.response], {type: 'application/pdf'});
                let url = URL.createObjectURL(blob);
                $('#iframe_content').attr('src', url);
                $("#modalimprimer").modal("show");
            } else if (xhr.status === 409) {
                $("#modalimprimer").modal("hide");
                showNotification('Attention', JSON.parse(xhr.responseText).description, 'error', 2000);
            } else {
                $("#modalimprimer").modal("hide");
                showNotification('Attention', dictionnaire_local["fb.global.UneErreurEstProduite"], 'error', 2000);
            }
            hideLoadingNotification();
        } else if (xhr.readyState === 2) {
            if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204)
                xhr.responseType = "blob";
            else
                xhr.responseType = "text";
        }
    };
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send(JSON.stringify());
    }
}
function fetchGridd(totalDebitBO, totalCreditBO, totalDebitSI, totalCreditSI, totalDebitAS, totalCreditAS, totalDebitMP, totalCreditMP, totalDebitMC, totalCreditMC, totalDebitST, totalCreditST, id) {
    $('#totalDebitBO').html(parseFloat(totalDebitBO).formatMoney(currencyScale, '.', ' '));
    $('#totalCreditBO').html(parseFloat(totalCreditBO).formatMoney(currencyScale, '.', ' '));
    $('#totalDebitSI').html(parseFloat(totalDebitSI).formatMoney(currencyScale, '.', ' '));
    $('#totalCreditSI').html(parseFloat(totalCreditSI).formatMoney(currencyScale, '.', ' '));
    $('#totalDebitAS').html(parseFloat(totalDebitAS).formatMoney(currencyScale, '.', ' '));
    $('#totalCreditAS').html(parseFloat(totalCreditAS).formatMoney(currencyScale, '.', ' '));
    $('#totalDebitMP').html(parseFloat(totalDebitMP).formatMoney(currencyScale, '.', ' '));
    $('#totalCreditMP').html(parseFloat(totalCreditMP).formatMoney(currencyScale, '.', ' '));
    $('#totalDebitMC').html(parseFloat(totalDebitMC).formatMoney(currencyScale, '.', ' '));
    $('#totalCreditMC').html(parseFloat(totalCreditMC).formatMoney(currencyScale, '.', ' '));
    $('#totalDebitST').html(parseFloat(totalDebitST).formatMoney(currencyScale, '.', ' '));
    $('#totalCreditST').html(parseFloat(totalCreditST).formatMoney(currencyScale, '.', ' '));
    var etatActifJournal = $('.filtreJournal').find('.fa-check-circle').parent().attr('valeur');
    if (etatActifJournal === "1") {
        $('#totalDebitSI').show();
        $('#totalCreditSI').show();
        $('#' + id + 'tbody tr .cellsIDebCpt').show();
        $('#' + id + ' tbody tr .cellsICreCpt').show();
    } else if (etatActifJournal === "0") {
        $('#totalDebitSI').hide();
        $('#totalCreditSI').hide();
        var idCol1sICreCpt = pageableGridBalance.columns.where({name: "sICreCpt"});
        var idCol1sIDebCpt = pageableGridBalance.columns.where({name: "sIDebCpt"});
        pageableGridBalance.removeColumn(idCol1sICreCpt);
        pageableGridBalance.removeColumn(idCol1sIDebCpt);
    }
}
function DessinerButton(idMenu, idHeader, btn_imprime) {
    var url = "";
        url = `${url_base_access}/gestion-access-core/api/access-button-user/findByCodeMenuAndModule?module=${idModule}&menu=${idMenu}`;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: "json",
        async: false,
        headers: {
            'X-Auth-Token': localStorage.getItem("x-auth-token"),
            'Accept-Language': localStorage.getItem("langue")
        }
        ,
        error: function (jqXHR, textStatus, errorThrown) {
        }
        ,
        complete: function (jqXHR, textStatus) {

        }
        ,
        success: function (data, textStatus, jqXHR) {
            data = _.sortBy(data, function (obj) {
                return eval('obj.button.orderButton');
            });
            data = data.reverse();
            var html = '';
            for (let i = 0; i < data.length; i++) {
                if (data[i].codeButton.indexOf('Imprim') !== -1 && btn_imprime === true) {
                    html += `<div id=\"btnPrint\" style=\"margin-right: 20px; \" >
                                                                    <div  class=\"btn-group \">
                                                                       <button class=\"btn dropdown-toggle btn btn-default\"  style=\"float: right;\"  data-toggle=\"dropdown\" aria-expanded=\"false\">${data[i].button.designation}<span class=\"caret\"></span></button>
                                                                     <ul class=\"dropdown-menu pull-right js-status-modif\">
                                                                           <li  id="parametrageedition_${data[i].codeButton}" class=\"\">
                                                                              <a href=\"javascript:void(0);\"><i class=\"fa fa-circle txt-color-green\"></i> Paramétrage</a>
                                                                       </li>
                                                                         <li id="${data[i].codeButton}" class=\"\">
                                                                             <a href=\"javascript:void(0);\"><i class=\"fa fa-circle txt-color-blue\"></i> Impression</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                             </div>`;

                } else {
                    html += `<a class="btn btn-default accessCtrl pull-right" id="${data[i].codeButton}" > 
                                <span class="widget-icon"><i class="glyphicon  ${data[i].button.logo}"></i>${data[i].button.designation}</span>
                            </a> `;
                }
            }
            $(idHeader).append(html);
        }
    }
    );

}
function getformatterLocaldate(date) {
    var d = date.split('/');
    return    d[0] + "-" + d[1] + "-" + d[2];
}
function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
function impressionListeWithNotification(url, methode, data) {
    showLoadingNotification( );
    let xhr = new XMLHttpRequest();
    if (methode) {
        xhr.open(methode, url);
    } else {
        xhr.open("GET", url);
    }
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Accept-Language", localStorage.getItem("langue"));
    xhr.setRequestHeader("x-auth-token", localStorage.getItem("x-auth-token"));
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
                if (xhr.response.message !== undefined) {
                    showNotification('Attention', xhr.response.message, 'warning', 2000);
                }
                let blob = b64toBlob(xhr.response.edition, 'application/pdf');
                let url = URL.createObjectURL(blob);
                $('#iframe_content').attr('src', url);
                $("#modalimprimer").modal("show");
            } else if (xhr.status === 409) {
                $("#modalimprimer").modal("hide");
                showNotification('Attention', JSON.parse(xhr.responseText).description, 'error', 2000);
            } else {
                $("#modalimprimer").modal("hide");
                showNotification('Attention', dictionnaire_local["fb.global.UneErreurEstProduite"], 'error', 2000);
            }
            hideLoadingNotification();
        } else if (xhr.readyState === 2) {
            if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204)
                xhr.responseType = "json";
            else
                xhr.responseType = "text";
        }
    };


    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send(JSON.stringify());
    }

}
function compareDate(date1, date2) {
    var parts1 = date1.split("/");
    var parts2 = date2.split("/");
    var Date1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
    var Date2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
    return Date1 >= Date2;
}
function compareDateFin(date1, date2) {
    var parts1 = date1.split("/");
    var parts2 = date2.split("/");
    var Date1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
    var Date2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
    return Date1 > Date2;
}
function afficheDate() {
    var today = new Date();
    var nbj = 8;
    var previousWeek = getDayBeforeDays(today, (nbj - 1));

    var daytoday = (today.getDate().toString().length === 2) ? today.getDate() : "0" + today.getDate();
    var monthtoday = ((today.getMonth() + 1).toString().length === 2) ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1);
    var yeartoday = today.getFullYear();

    var daylastWeek = (previousWeek.getDate().toString().length === 2) ? previousWeek.getDate() : "0" + previousWeek.getDate();
    var monthlastWeek = ((previousWeek.getMonth() + 1).toString().length === 2) ? (previousWeek.getMonth() + 1) : "0" + (previousWeek.getMonth() + 1);
    var yearlastWeek = previousWeek.getFullYear();

    $("#date_au").val(daytoday + "/" + monthtoday + "/" + yeartoday);
    $("#date_du").val(daylastWeek + "/" + monthlastWeek + "/" + yearlastWeek);
    $("#date_ferie").val(daytoday + "/" + monthtoday + "/" + yeartoday);

}
function getMimeType(extension, data) {
    var mime = "";
    switch (extension) {
        case 'doc':
            mime = 'data:application/msword;base64,' + data;
            break;
        case 'dot':
            mime = 'data:application/msword;base64,' + data;
            break;

        case 'docx':
            mime = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + data;
            break;
        case 'dotx':
            mime = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.template;base64,' + data;
            break;
        case 'docm':
            mime = 'data:application/vnd.ms-word.document.macroEnabled.12;base64,' + data;
            break;
        case 'dotm':
            mime = 'data:application/vnd.ms-word.template.macroEnabled.12;base64,' + data;
            break;

        case 'xls':
            mime = 'data:application/vnd.ms-excel;base64,' + data;
            break;
        case 'xlt':
            mime = 'data:application/vnd.ms-excel;base64,' + data;
            break;
        case 'xla':
            mime = 'data:application/vnd.ms-excel;base64,' + data;
            break;

        case 'xlsx':
            mime = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data;
            break;
        case 'xltx':
            mime = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.template;base64,' + data;
            break;
        case 'xlsm':
            mime = 'data:application/vnd.ms-excel.sheet.macroEnabled.12;base64,' + data;
            break;
        case 'xltm':
            mime = 'data:application/vnd.ms-excel.template.macroEnabled.12;base64,' + data;
            break;
        case 'xlam':
            mime = 'data:application/vnd.ms-excel.addin.macroEnabled.12;base64,' + data;
            break;
        case 'xlsb':
            mime = 'data:application/vnd.ms-excel.sheet.binary.macroEnabled.12;base64,' + data;
            break;

        case 'ppt':
            mime = 'data:application/vnd.ms-powerpoint;base64,' + data;
            break;
        case 'pot':
            mime = 'data:application/vnd.ms-powerpoint;base64,' + data;
            break;
        case 'pps':
            mime = 'data:application/vnd.ms-powerpoint;base64,' + data;
            break;
        case 'ppa':
            mime = 'data:application/vnd.ms-powerpoint;base64,' + data;
            break;

        case 'pptx':
            mime = 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,' + data;
            break;
        case 'potx':
            mime = 'data:application/vnd.openxmlformats-officedocument.presentationml.template;base64,' + data;
            break;
        case 'ppsx':
            mime = 'data:application/vnd.openxmlformats-officedocument.presentationml.slideshow;base64,' + data;
            break;
        case 'ppam':
            mime = 'data:application/vnd.ms-powerpoint.addin.macroEnabled.12;base64,' + data;
            break;
        case 'pptm':
            mime = 'data:application/vnd.ms-powerpoint.presentation.macroEnabled.12;base64,' + data;
            break;
        case 'potm':
            mime = 'data:application/vnd.ms-powerpoint.template.macroEnabled.12;base64,' + data;
            break;
        case 'ppsm':
            mime = 'data:application/vnd.ms-powerpoint.slideshow.macroEnabled.12;base64,' + data;
            break;

        case 'mdb':
            mime = 'data:application/vnd.ms-access;base64,' + data;
            break;

        case 'txt':
            mime = 'data:text/plain;base64,' + data;
            break;

        case 'jpg':
            mime = 'data:image/' + extension + ";base64," + data;
            break;

        case 'png':
            mime = 'data:image/' + extension + ";base64," + data;
            break;

        case 'jpeg':
            mime = 'data:image/' + extension + ";base64," + data;
            break;

        case 'gif':
            mime = 'data:image/' + extension + ";base64," + data;
            break;

        case 'bmp':
            mime = 'data:image/' + extension + ";base64," + data;
            break;

        default:
            mime = "data:application/" + extension + ";base64," + data;
    }
    return mime;
}

function base64ArrayBuffer(arrayBuffer) {
    var base64 = '';
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var bytes = new Uint8Array(arrayBuffer);
    var byteLength = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength = byteLength - byteRemainder;
    var a, b, c, d;
    var chunk;
    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12;// 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
        d = chunk & 63;             // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }
    // Deal with the remaining bytes and padding
    if (byteRemainder === 1) {
        chunk = bytes[mainLength];
        a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4; // 3   = 2^2 - 1
        base64 += encodings[a] + encodings[b] + '==';
    } else if (byteRemainder === 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2; // 15    = 2^4 - 1
        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }
    return base64;
}
function generateCodeAutoByparam(param) {
    var response = "";
    var url = `${url_base}/paramcodetables?param=${param}`;
    $.ajax({
        url: url,
        contentType: "text/html; charset=utf-8",
        type: 'GET',
        dataType: "json",
        async: false,
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}

function listcolumnedition(type) {
    var response = "";
    $.ajax({
        url: url_base + '/paramcolonneeditions/findParamColonneEditionByListeUser?liste=' + type,
        contentType: "text/html; charset=utf-8",
        type: 'GET',
        dataType: "json",
        async: false,
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}
function addparameditionlist(list) {
    var response = "";
    $.ajax({
        url: url_base + '/paramcolonneeditions',
        type: 'PUT',
        data: JSON.stringify(list),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data)
        {
            response = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 409) {
                showNotification('Attention', JSON.parse(jqXHR.responseText).description, 'error', 5000);
            } else {
                showNotification('Attention', "Echec modification", 'error', 5000);
            }
        }
    });
    return response;
}

function addColonneEdition(param) {
    var response = "";
    $.ajax({
        url: url_base + '/paramcolonneeditions/addColonneEdition?param=' + param,
        contentType: "text/html; charset=utf-8",
        type: 'POST',
        async: false,
        success: function (data)
        {
            response = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 409) {
                showNotification('Attention', JSON.parse(jqXHR.responseText).description, 'error', 5000);
            } else {
                showNotification('Attention', "Echec modification", 'error', 5000);
            }
        }
    });
    return response;
}
function verifInputNumber(chars) {
    // Caract res autoris s
    var regex = new RegExp("[0-9 .]", "i");
    var valid;
    for (x = 0; x < chars.value.length; x++) {
        valid = regex.test(chars.value.charAt(x));
        if (valid === false) {
            chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1);
            x--;
        }
    }
}
function verifInteger(chars) {
    // Caract res autoris s
    var regex = new RegExp("[0-9]", "i");
    var valid;
    for (x = 0; x < chars.value.length; x++) {
        valid = regex.test(chars.value.charAt(x));
        if (valid === false) {
            chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1);
            x--;
        }
    }
}

function verifMail(champ) {
    var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!regex.test(champ)) {
        return false;
    } else {
        return true;
    }
}
function controlMatricule(matricule, nature) {
    if (nature === "matFiscale") {
        var m = matricule.trim();
        var Mat = m.slice(0, 7);// Left(matricule, 7);
        var num = m.slice(matricule.length - 3, m.length);//Right(matricule, 3);
        var Cle = m[7]; //Right(Left(matricule, 8), 1);
        var Tva = m[8];//Right(Left(matricule, 9), 1);
        var Cat = m[9];//Right(Left(matricule, 10), 1);
        if (m.length !== 13) {
            return'Matricule doit être sur 13 caractéres';
        } else if (!($.isNumeric(Mat))) {
            return'La partie identifiant doit être numérique';
        } else if ($.isNumeric(Cle)) {//else if (!isAlphaOrParen(Cle)) {
            return'La clé doit être alphabétique';
        } else if (Cle.toLowerCase() === 'i' || Cle.toLowerCase() === 'o' || Cle.toLowerCase() === 'u') {
            return'La clé ne doit être ni I,O,U';
        } else if (Cle.toLowerCase() !== cleMatricule(Mat).toLowerCase()) {
            if (cleMatricule(Mat).length !== 1) {
                return cleMatricule(Mat);
            } else {
                return'Clé invalide: ' + Cle + ' il aurait du être : ' + cleMatricule(Mat);
            }
        } else if ((Tva.toLowerCase() !== 'a') && (Tva.toLowerCase() !== 'b') && (Tva.toLowerCase() !== 'd') && (Tva.toLowerCase() !== 'p') && (Tva.toLowerCase() !== 'n')) {
            return 'Le code TVA doit être A, B, D, P, N';
        } else if ((Cat.toLowerCase() !== 'm') && (Cat.toLowerCase() !== 'p') && (Cat.toLowerCase() !== 'c') && (Cat.toLowerCase() !== 'n') && (Cat.toLowerCase() !== 'e')) {
            return 'La catégorie doit être M, P, C, N, E';
        } else if (!($.isNumeric(num))) {
            return"Le numéro d'établissement doit être numérique";
        } else if ((num === '000') && (Cat.toLowerCase() === 'e')) {
            return"Incohérance entre numéro d'établissement et catégorie";
        } else {
            return 'true';
        }
    } else if (nature === "cateCIN") {
        var mat = matricule.trim();
        if (mat.length !== 8) {
            return'N° CIN doit être sur 8 caractéres';
        } else if (!($.isNumeric(mat.trim()))) {
            return'Le numéro de CIN doit être numérique';
        } else {
            return 'true';
        }
    } else {
        return 'Veuillez vérifier le type de la matricule';
    }

}

function verifInteger(chars) {
    // Caract res autoris s
    var regex = new RegExp("[0-9]", "i");
    var valid;
    for (x = 0; x < chars.value.length; x++) {
        valid = regex.test(chars.value.charAt(x));
        if (valid === false) {
            chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1);
            x--;
        }
    }
}
function DrawListRassemblant(idTable, idContainer, list) {
    document.getElementById(idContainer).innerHTML = '';
    var table_list = "<table id='" + idTable + "' class='display dataTable projects-table table table-striped table-bordered table-hover' cellspacing='0'  width='100%' align='center'>";
    table_list += "</table>";
    $("#" + idContainer).html(table_list);
    var colDef = [1];
    table = $('#' + idTable).on('page.dt', function () {}).DataTable({
        "dom": 'frtip',
        "searching": true,
        destroy: false,
        bPaginate: true,
        sort: false,
        data: list,
        language: dataTablesLang,
        "pageLength": 50,
        columns: [
            {
                title: "Code",
                data: 'codexam',
                render: function (data, type, row, meta) {
                    if (data !== null)
                        return data;
                    else
                        "";
                }
            },
            {
                title: "Libellé",
                data: 'desexam',
                render: function (data) {
                    if (data === undefined)
                        return '';
                    else
                        return "<span title='" + data + "'>" + data + "</span>";
                }
            }
        ],
        "aoColumnDefs": [{
                'bSortable': false,
                'aTargets': colDef
            }],
        "order": [[0, "asc"]]
    });
    $('#tableListRassemblant  tbody').delegate('tr', 'click', function (e) {
        var highlightColor = '#d9edf7';
        var css = $(this).attr('style');
        if ($(this).find('.dataTables_empty').length === 0) {
            if (css !== 'border-color: rgb(217, 237, 247); background-color: rgb(217, 237, 247)') {
                $('#' + idTable + ' > tbody > tr').removeAttr('style');
                $('#' + idTable + ' > tbody > tr').removeClass('selectionnee');
                $(this).addClass('selectionnee');
                $(this).css('background-color', highlightColor);
                $(this).css('border-color', highlightColor);
            } else {
                $(this).removeAttr('style');
            }
        }
        $('#' + idTable + ' tbody > tr').focus();
    });
    $("#search").on("keyup search input paste cut", function () {
        table.search(this.value).draw();
    });
    $('#tableListRassemblant_info').css("padding", '0');
    $('#tableListRassemblant_filter').hide();
    hideLoadingNotification();

    $('#add_msg').html("<h6>Autre(s) examen(s) ressemblante(s): </h6>");
    $('#add_msg_confirm').html("<span>Voulez vous confirmer l'ajout ? </span>");
    $('#addConfirm').modal('show');
    $('#modalAddAutreExam').modal('hide');
    return true;
}

function ListeRemises(action, id) {
    var Facture = Backbone.Model.extend({
        defaults: {
        },
        initialize: function () {
        }
    });
    var ListFacture = Backbone.PageableCollection.extend({
        model: Facture
    });
    var listFacture = new ListFacture();
    var CustomHeaderCell = Backgrid.HeaderCell.extend({
        className: "custom-header-cell",
        initialize: function (options) {
            Backgrid.HeaderCell.prototype.initialize.call(this, options);
        }
    }); 
                   
    var columns = [
        {
            className: "cellCode",
            name: "numSer",
            label: "Code",
            editable: true,
            sortable: false,
            headerCell: CustomHeaderCell

        },
        {
            className: "cellCode",
            name: "codFamPres",
            label: "Code",
            editable: true,
            sortable: false,
            headerCell: CustomHeaderCell
        },
        {
            className: "cellCode",
            name: "desfamPres",
            label: "Libellé",
            editable: true,
            sortable: false,
            headerCell: CustomHeaderCell
        },
        {
            className: "cellCode",
            name: "desSer",
            label: "Libellé",
            editable: true,
            sortable: false,
            headerCell: CustomHeaderCell

        },
        {
            name: "montant",
            label: "Montant",
            editable: false,
            headerCell: CustomHeaderCell,
            cell: Backgrid.StringCell.extend({
                className: "prixpublic",
                editor: EditorNumber
            }),
            formatter: PrixPublicformatter
        },
        {
            name: "remise",
            label: "Taux de Remise",
            editable: function (model) {
                if (model.get("numSer") !== null || model.get("codFamPres") !== null ) {
                    return true;
                } else
                    return false;
            },
            headerCell: CustomHeaderCell,
            cell: Backgrid.StringCell.extend({
                className: "remise",
                editor: EditorNumber
            }),
            formatter: MajorationPresformatter
        },
        {
            name: "montantRemise",
            label: "Montant de la remise",
            editable: function (model) {
                if (model.get("numSer") !== null || model.get("codFamPres") !== null ) {
                    return true;
                } else
                    return false;
            },
            headerCell: CustomHeaderCell,
            cell: Backgrid.StringCell.extend({
                className: "remise",
                editor: EditorNumber
            }),
            formatter: remiseformatter
        },
        {
            name: "prixNet",
            label: "Prix Net",
            editable: function (model) {
                if (model.get("numSer") !== null || model.get("codFamPres") !== null ) {
                    return true;
                } else
                    return false;
            },
            headerCell: CustomHeaderCell,
            cell: Backgrid.StringCell.extend({
                className: "prixconvention",
                editor: EditorNumber
            }),
            formatter: prixconventionformatter
        },
         {
            name: "montantTtc",
            label: "Montant Ttc",
            editable: function (model) {
                if (model.get("numSer") !== null || model.get("codFamPres") !== null ) {
                    return true;
                } else
                    return false;
            },
            headerCell: CustomHeaderCell,
            cell: Backgrid.StringCell.extend({
                className: "prixconvention",
                editor: EditorNumber
            }),
            formatter: prixconventionformatter
        },
      
        {
            name: "tauxTva",
            label: "Taux maximum",
            editable: function (model) {
                if (model.get("numSer") !== null || model.get("codFamPres") !== null ) {
                    return true;
                } else
                    return false;
            },
            headerCell: CustomHeaderCell,
            cell: Backgrid.StringCell.extend({
                className: "majorationhonoraire",
                editor: EditorNumber
            }),
            formatter: majorationhonoraireformatter
        },
         {
            name: "tauxMax",
            label: "Taux maximum",
            editable: function (model) {
                if (model.get("numSer") !== null || model.get("codFamPres") !== null ) {
                    return true;
                } else
                    return false;
            },
            headerCell: CustomHeaderCell,
            cell: Backgrid.StringCell.extend({
                className: "majorationhonoraire",
                editor: EditorNumber
            }),
            formatter: majorationhonoraireformatter
        },
        {
            name: "remisehonoraire",
            label: "Remise honoraire",
            editable: function (model) {
                if (model.get("numSer") !== null || model.get("codFamPres") !== null ) {
                    return true;
                } else
                    return false;
            },
            headerCell: CustomHeaderCell,
            cell: Backgrid.StringCell.extend({
                className: "remisehonoraire",
                editor: EditorNumber
            }),
            formatter: remisehonoraireformatter
        },
        {
            name: "prixconventionhonoraire",
            label: "Prix convention honoraire",
            editable: function (model) {
                if (model.get("numSer") !== null || model.get("codFamPres") !== null ) {
                    return true;
                } else
                    return false;
            },
            headerCell: CustomHeaderCell,
            cell: Backgrid.StringCell.extend({
                className: "prixconventionhonoraire",
                editor: EditorNumber
            }),
            formatter: prixconventionhonoraireformatter
        }
    ];
    if (action === "consult") {
        columns.forEach(function (col) {
            col.editable = false;
        });
    }
    grid = new Backgrid.Grid({
        emptyText: "-",
        columns: columns,
        collection: listFacture,
        className: 'table table-bordered table-striped table-editable no-margin table-hover'
    });
    if (id === "Prestation") {
        var idColcodFamPres = grid.columns.where({name: "codFamPres"});
        var idColdesfamPres = grid.columns.where({name: "desfamPres"});
        grid.removeColumn(idColcodFamPres);
        grid.removeColumn(idColdesfamPres);
    }
    if (id === "Famille") {
        var idColnumSer = grid.columns.where({name: "numSer"});
        var idColdesSer = grid.columns.where({name: "desSer"});
        grid.removeColumn(idColnumSer);
        grid.removeColumn(idColdesSer);
    }
    return grid;
}
function CloseWindow() {
    window.parent.$('#modalAccorderRemise').modal('hide');
}
function CloseWindowHistorique() {
    $('#modalHistorique').modal('hide');
}