function pad(num, size) {
    var s = num + "";
    while (s.length < size)
        s = "0" + s;
    return s;
}
function  CreateSelectTree(el, treeData) {
    el.append('<div class="input-group SelectTree"><input readonly="true" type="text" class="form-control textSelect input-xs" style="cursor: default; background-color: white;"><span class="input-group-addon openerSelect" style="height: 22px;padding: 1px 5px;font-size: 12px;line-height: 1.5;"><i class="fa  fa-angle-down"></i></span></div><div style="display: none;position: absolute;overflow-y: auto;overflow-x: auto;min-width: 120px; max-width: 430px;max-height: 170px;height:auto !important;z-index: 9999;" class="treeSelect"></div>');
    el.find('.treeSelect').dynatree({
        checkbox: true,
        classNames: {checkbox: "dynatree-radio"},
        selectMode: 1,
        children: treeData,
        onActivate: function (node) {
            return false;
        },
        onSelect: function (select, node) {
            if (select === true) {
                this.$tree.prev().find('.textSelect').val(node.data.title);
                this.$tree.prev().find('.textSelect').attr('title', node.data.title);
                this.$tree.css("display", "none");
            } else {
                this.$tree.prev().find('.textSelect').val('');
                this.$tree.prev().find('.textSelect').attr('title', '');
            }
        },
        onDblClick: function (node, event) {
            node.toggleSelect();
        },
        onKeydown: function (node, event) {
            if (event.which === 32) {
                node.toggleSelect();
                return false;
            }
        },
        cookieId: "dynatree-Cb1",
        idPrefix: "dynatree-Cb1-"
    });
    el.find(".openerSelect").bind('click', function () {
        var tree = $(this).parents('.SelectTree').next();
        if (tree.css("display") === "none")
        {
            tree.css("display", "block");
            tree.css('min-width', tree.parent().width());
            tree.css('top', tree.parent().position().top + tree.parent().height());
            tree.css('left', tree.parent().position().left + tree.parent());
            tree.find('ul.dynatree-container li')[0].click();
            $(document).mouseup(function (e)
            {

                if (!tree.is(e.target) // if the target of the click isn't the container...
                        && tree.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    tree.hide();
                }
            });
//            
        } else {
            tree.css("display", "none");
            var list = tree.dynatree("getSelectedNodes");
            if (list.length > 0) {
                $(this).parents('.SelectTree').find('textSelect').val(list[0].data.title);
                $(this).parents('.SelectTree').find('textSelect').attr('title', list[0].data.title);
            }
        }
    });
    el.find(".textSelect").bind('click', function () {
        var tree = $(this).parents('.SelectTree').next();
        if (tree.css("display") === "none")
        {
            tree.css("display", "block");
            tree.css('min-width', $('.treeSelect').parent().width());
            tree.css('top', tree.parent().position().top + tree.parent().height());
            tree.css('left', tree.parent().position().left + tree.parent());
            tree.find('ul.dynatree-container li')[0].click();
            $(document).mouseup(function (e)
            {

                if (!tree.is(e.target) // if the target of the click isn't the container...
                        && tree.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    tree.hide();
                }
            });
        } else {
            tree.css("display", "none");
            var list = tree.dynatree("getSelectedNodes");
            if (list.length > 0) {
                $(this).val(list[0].data.title);
                $(this).attr('title', list[0].data.title);
            }
        }

    });

}
function min_date(date1, date2) {
    var parts1 = date1.split("/");
    var parts2 = date2.split("/");
    var Date1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
    var Date2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
    if (Date1 > Date2) {
        return date2;
    } else {
        return date1;
    }
}


function verif_date(input) {
    reg = new RegExp(/^[0-3]{1}[0-9]{1}[\/][0-1]{1}[0-9]{1}[\/][0-9]{4}$/);
    if (!reg.test(input)) { // check format JJ/MM/AAAA
        return false;
    }

    tabDate = input.split('/');
    dateTest = new Date(tabDate[2], tabDate[1] - 1, tabDate[0]);
    if (parseInt(tabDate[0], 10) !== parseInt(dateTest.getDate(), 10)
            || parseInt(tabDate[1], 10) !== parseInt(dateTest.getMonth(), 10) + parseInt(1, 10)
            || parseInt(tabDate[2], 10) !== parseInt(dateTest.getFullYear(), 10)) { // if exist
        return false;
    }
    return true;
}
function findParamByCode(code) {
    var response = "";
    var url = url_base + '/fichier-base-core/api/params?code=' + code;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        headers: {
            'x-auth-token': localStorage.getItem("x-auth-token"),
            'Accept-Language': localStorage.getItem("langue")
        },
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}
function getDateServer() {
    showLoadingNotification();
    var response = "";
    $.ajax({
        url: `${url_base}/fichier-base-core/api/server-date/date`,
        type: 'GET',
        async: false,
        success: function (data)
        {
            response = data;
            hideLoadingNotification();
        }
    });
    return response;
}
function findExerciceByExercice() {
    showLoadingNotification();
    var Exercice = window.sessionStorage.getItem('Exercice');
    var response = "";
    $.ajax({
        url: url_base + '/fichier-base-core/api/exercice/findExercice?annee=' + Exercice,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data)
        {
            response = data;
            hideLoadingNotification();
        }
    });
    return response;
}

function findJournauxCodJouCodeSoc(codJou, codSoc) {
    var societe = codSoc;
    if (codSoc === undefined || codSoc === null) {
        societe = $('#SelectSociete').val();
    }
    var response = "";
    $.ajax({
        url: `${url_base}/fichier-base-core/api/journaux/getJournal?codeSoc=${societe}&codJou=${codJou}`,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}

function getformatterdate(date) {
    var d = date.split('/');
    return d[2] + "-" + d[1] + "-" + d[0];
}
function compareDate(date1, date2) {
    var parts1 = date1.split("/");
    var parts2 = date2.split("/");
    var Date1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
    var Date2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
    return Date1 >= Date2;
}
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? " " : d,
            t = t == undefined ? "." : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
String.prototype.formatMoney = function (c, d, t) {
    var n = Number(this),
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? " " : d,
            t = t == undefined ? "." : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function dateformater(current)
{
    var day;
    var month;
    var year;
    day = (current.getDate().toString().length === 2) ? current.getDate() : "0" + current.getDate();
    month = ((current.getMonth() + 1).toString().length === 2) ? (current.getMonth() + 1) : "0" + (current.getMonth() + 1);
    var year = current.getFullYear();
    return  day + "/" + month + "/" + year;

}
function accoladeFormatter(text) {
    return "{ " + text + " }";
}

function parantheseFormatter(text) {
    return "( " + text + " )";
}

function crocheFormatter(text) {
    return "[ " + text + " ]";
}

function getSeparator() {
    return "    |    ";
}
function getSeparator2() {
    return "    -    ";
}


function convertToChar(etat_prest) {

    return String.fromCharCode(etat_prest);
}

function timeFormatter(date, timeformat) {

    var time;

    if (timeformat === "hh:mm")
    {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        time = hour + ":" + minute;
    } else if (timeformat === "hh:mm:ss")
    {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        var second = (date.second.toString().length === 2) ? date.second : "0" + date.second;
        time = hour + ":" + minute + ":" + second;
    } else
    {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        time = hour + ":" + minute;
    }

    return time;

}

function getTimeNow(dateFormat)
{
    var current = new Date();

    var hour;
    var minute;
    var second;

    hour = (current.getHours().toString().length === 2) ? current.getHours() : "0" + current.getHours();
    minute = (current.getMinutes().toString().length === 2) ? current.getMinutes() : "0" + current.getMinutes();
    second = (current.getSeconds().toString().length === 2) ? current.getSeconds() : "0" + current.getSeconds();

    if (dateFormat === "hh:mm") {
        return   hour + ":" + minute;
    } else if (dateFormat === "hh:mm:ss") {
        return   hour + ":" + minute + ":" + second;
    } else {
        return   hour + ":" + minute + ":" + second;
    }
}

function getDateAfterDays(nbrDays) {
    var today = new Date();
    var dateResult = new Date();
    dateResult.setDate(today.getDate() + nbrDays);
    var day = (dateResult.getDate().toString().length === 2) ? dateResult.getDate() : "0" + dateResult.getDate();
    var month = (dateResult.getMonth().toString().length === 2) ? dateResult.getMonth() + 1 : "0" + (dateResult.getMonth() + 1);
    var year = dateResult.getFullYear();
    return day + '/' + month + '/' + year;
}

function getDateNow()
{
    var current = new Date();
    var day;
    var month;
    var year;

    day = (current.getDate().toString().length === 2) ? current.getDate() : "0" + current.getDate();
    month = ((current.getMonth() + 1).toString().length === 2) ? (current.getMonth() + 1) : "0" + (current.getMonth() + 1);
    year = current.getFullYear();


    return  day + "/" + month + "/" + year;
}

function getDateTimeNow(timeFormat) {
    return getDateNow() + " " + getTimeNow(timeFormat);
}
function getDiffDayDate(dateSupp, dateInf, byYear) {
    var DSupp;
    if (dateSupp === "") {
        var dateNow = getDateNow().split("/");
        DSupp = new Date(dateNow[2], dateNow[1], dateNow[0]);
    } else {
        DSupp = new Date(dateSupp.year, dateSupp.month, dateSupp.day);
    }
    var DInf = new Date(dateInf.year, dateInf.month, dateInf.day);
    if (byYear === undefined)
        return parseInt(DSupp.getTime() / (24 * 60 * 60 * 1000)) - parseInt(DInf.getTime() / (24 * 60 * 60 * 1000));
    else
        return parseInt((DSupp.getTime() - parseInt(DInf.getTime())) / (24 * 60 * 60 * 1000 * 365));

}



function getListYear(infyear, suppyear) {

    var years = [];
    var nbrY = suppyear - infyear;
    for (var i = 0; i <= nbrY; i++) {
        var year = {};
        year["id"] = i.toString();
        year["text"] = (infyear + i).toString();
        years.push(year);
    }
    return years;


}


function moneyFormatter(money) {
    return  money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function moneyFormatterToFixed(money, fixed) {
    if (fixed === undefined)
        fixed = 3;
    var moneyFixed = money.toFixed(fixed);
    return  moneyFixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ",");
}


function tableFormatter(index, tableId, nbr_Cols) {
    var rows;
    var nbrCols;
    if (index !== "")
        rows = index.$("#" + tableId).find('tr');
    else
        rows = $("#" + tableId).find('tr');

    if (nbr_Cols === "all")
        nbrCols = $(rows).find('td').length / rows.length;
    else
        nbrCols = nbr_Cols;

    var arrayPos = [];
    var arrayNbrToFusion = [];
    for (var i = 0; i < nbrCols; i++) {
        var col = [];
        for (var j = 0; j < rows.length; j++) {
            var td = $($(rows[j]).find('td')[i]).text();
            col.push(td);

        }
        var compt = 1;
        var isPushed = false;
        for (var k = 0; k < col.length; k++) {
            var str1 = col[k] === undefined ? "" : col[k].trim();
            var str2 = col[k + 1] === undefined ? "" : col[k + 1].trim();
            if (str1 === str2 && !isPushed) {
                compt++;
                arrayPos.push(k);
                arrayNbrToFusion.push(compt);
                isPushed = true;

            } else if (str1 === str2 && isPushed) {
                compt++;
                arrayNbrToFusion[arrayNbrToFusion.length - 1] = compt;

            } else {
                compt = 1;
                isPushed = false;
            }
        }

        /////////////////////////////////////
        /////Traitement de fusion ICI//////////

        for (var p = 0; p < arrayPos.length; p++) {
            $($(rows[arrayPos[p]]).find('td')[i]).attr("rowspan", arrayNbrToFusion[p]);
            var limit = arrayNbrToFusion[p] + arrayPos[p];
            for (var c = arrayPos[p] + 1; c < limit; c++) {
                $($(rows[c]).find('td')[i]).attr("class", "todel" + i);
            }
        }

        //////////////////////////////////////

//        
//        console.log(arrayPos);
//        console.log(arrayNbrToFusion);

        arrayPos = [];
        arrayNbrToFusion = [];


    }

    for (var i = 0; i < nbrCols; i++) {
        index.$("#" + tableId).find('.todel' + i).remove();
    }


}

function CountEachMergedRow(table_body, nbCols, keyColToCount) {
//    var tmpnbCol = 0;
    var listOfCell = $(table_body).find('tr').find('td');
    var cell = $(listOfCell[keyColToCount]);
//    $(cell).append('<i class="label label-danger mynotification">-' + $(cell).prop("rowspan") + ' </i>');

    for (var i = 0; i < listOfCell.length; i++) {
        cell = $(listOfCell[i]);
        if ($(cell).siblings().length > 1) {

            $(listOfCell[i + keyColToCount]).append('<i class="label label-danger mynotification" >-' + $(listOfCell[i + keyColToCount]).prop("rowspan") + ' </i>');
            i += nbCols - 1;
        } else {
            $(cell).append('<i class="label label-danger mynotification" >-' + $(cell).prop("rowspan") + ' </i>');
        }
    }
}


function formIsValide(index, formId) {
    var $inputs = index.$("#" + formId).find('input:required');
    var isValide = true;
    $inputs.each(function () {
        if ($(this).val() === "") {
            isValide = false;
        }
    });

    return isValide;


}


function getDateReferToNow(y)
{
    var current = new Date();
    var day;
    var month;
    var year;

    day = (current.getDate().toString().length === 2) ? current.getDate() : "0" + current.getDate();
    month = ((current.getMonth() + 1).toString().length === 2) ? (current.getMonth() + 1) : "0" + (current.getMonth() + 1);
    year = current.getFullYear();

    if (y !== undefined)
        year = (parseInt(year) - y).toString();


    return  day + "/" + month + "/" + year;
}


function showLoadingDialog() {
//    setTimeout(function() {
    window.parent.$("#loading_modal").modal("show");
//    }, 50);

}

function dismessLoadingDialog() {
//    setTimeout(function() {
    window.parent.$("#loading_modal").modal("hide");
//    }, 50);
}


function compareTwoDateTime(firstDateTime, secondDateTime, dateSeparator, timeSeparator) {
    var frstDate = firstDateTime.split(" ")[0];
    var frstTime = firstDateTime.split(" ")[1];
    var secDate = secondDateTime.split(" ")[0];
    var secTime = secondDateTime.split(" ")[1];

    var arrayFrstDate = frstDate.split(dateSeparator);
    var arrayFrstTime = frstTime.split(timeSeparator);
    var arraySecDate = secDate.split(dateSeparator);
    var arraySecTime = secTime.split(timeSeparator);

    var firstDateTimeObj = new Date(arrayFrstDate[2], arrayFrstDate[1], arrayFrstDate[0], arrayFrstTime[0], arrayFrstTime[1]);
    var SecondDateTimeObj = new Date(arraySecDate[2], arraySecDate[1], arraySecDate[0], arraySecTime[0], arraySecTime[1]);
    var arrayScalarDate = [];
    var diffMunites = SecondDateTimeObj.getTime() / (60 * 1000) - firstDateTimeObj.getTime() / (60 * 1000);
    if (firstDateTimeObj - SecondDateTimeObj < 0) {
        arrayScalarDate.push(parseInt(diffMunites / (60 * 24)));
        arrayScalarDate.push(parseInt((diffMunites % (60 * 24)) / 60));
        arrayScalarDate.push(parseInt((diffMunites % (60 * 24)) % 60));
    }

    return arrayScalarDate;

}

function compareTwoDate(firstDateTime, secondDateTime, dateSeparator) {
    var arrayFrstDate = firstDateTime.split(dateSeparator);
    var arraySecDate = secondDateTime.split(dateSeparator);
    var firstDateTimeObj = new Date(arrayFrstDate[2], arrayFrstDate[1], arrayFrstDate[0]);
    var SecondDateTimeObj = new Date(arraySecDate[2], arraySecDate[1], arraySecDate[0]);
    var diffMunites = SecondDateTimeObj.getTime() / (60 * 1000) - firstDateTimeObj.getTime() / (60 * 1000);
    return  parseInt(diffMunites / (60 * 24));
}
function TexttdIsSelected(tableId, codB) {
    var exist = false;
    var rows = $("#" + tableId).find("table").find('tr');
    var cols = $($("#" + tableId).find('thead').find('tr')[0]).find('th');
    for (var i = 1; i < rows.length; i++) {
        for (var j = 0; j < cols.length; j++) {
            var codeBoite = $($(rows[i]).find('td')[0]).text();
            if (codeBoite.toUpperCase() === codB.toUpperCase()) {
                exist = true;
                break;
            }
        }

    }

    return exist;
}
function verifInput(chars) {
    // Caract res autoris s
    var regex = new RegExp("[a-z0-9_ ]", "i");
    var valid;
    for (x = 0; x < chars.value.length; x++) {
        valid = regex.test(chars.value.charAt(x));
        if (valid === false) {
            chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1);
            x--;
        }
    }
}


function verifString(chars) {
    // Caract res autoris s
    var regex = new RegExp("[a-z_ ]", "i");
    var valid;
    for (x = 0; x < chars.value.length; x++) {
        valid = regex.test(chars.value.charAt(x));
        if (valid === false) {
            chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1);
            x--;
        }
    }
}
function verifInputNumber(chars) {
    // Caract res autoris s
    var regex = new RegExp("[0-9_ ,'.']", "i");
    var valid;
    for (x = 0; x < chars.value.length; x++) {
        valid = regex.test(chars.value.charAt(x));
        if (valid === false) {
            chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1);
            x--;
        }
    }
}

function formatCurrentDate(dat)
{

    var day = dat.substr(8, 2);
    var month = dat.substr(5, 2);
    var year = dat.substr(0, 4);
    var date = day + '/' + month + '/' + year;
    return date;


}

function formatCurrentDate1(dat)
{

    var day = dat.substr(8, 2);
    var month = dat.substr(5, 2);
    var year = dat.substr(0, 4);
    var date = day + '-' + month + '-' + year;
    return date;


}
function formatdateTime(date)
{
    var mois = date[1] < 10 ? "0" + date[1] : date[1];
    var day = date[2] < 10 ? "0" + date[2] : date[2];
    var datetime = date[0] + '-' + mois + '-' + day;
    return datetime;

}

function formatdateTime1(date)
{
    var mois = date[1] < 10 ? "0" + date[1] : date[1];
    var day = date[2] < 10 ? "0" + date[2] : date[2];
    var datetime = day + '/' + mois + '/' + date[0];
    return datetime;

}
function formatdate(date, formatter)
{
    if (formatter === "dd/mm/yyyy")
    {
        var mois = date[1] < 10 ? "0" + date[1] : date[1];
        var day = date[2] < 10 ? "0" + date[2] : date[2];
        var date = day + '/' + mois + '/' + date[0];
    } else if (formatter === "yyyy-mm-dd")
    {
        var mois = date[1] < 10 ? "0" + date[1] : date[1];
        var day = date[2] < 10 ? "0" + date[2] : date[2];
        var date = date[0] + '-' + mois + '-' + day;
    } else if (formatter === "yyyy/mm/dd")
    {
        var mois = date[1] < 10 ? "0" + date[1] : date[1];
        var day = date[2] < 10 ? "0" + date[2] : date[2];
        var date = date[0] + '/' + mois + '/' + day;
    }
    return date;
}
function getformatterdate(date) {
    var d = date.split('/');
    return d[0] + "-" + d[1] + "-" + d[2];
}
function getformatterdate1(date) {
    var d = date.split('/');
    return d[2] + "-" + d[1] + "-" + d[0];
}
function formatCalendar(dat, formatter)
{
    var date;
    if (Array.isArray(dat))
    {
        if (formatter === "dd/mm/yyyy")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = day + '/' + mois + '/' + dat[0];
        } else if (formatter === "yyyy-mm-dd")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = dat[0] + '-' + mois + '-' + day;
        } else if (formatter === "yyyy/mm/dd")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = dat[0] + '/' + mois + '/' + day;
        } else if (formatter === "dd-mm-yyyy")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = day + '-' + mois + '-' + dat[0];
        }

    } else
    {
        if (formatter === "dd-mm-yyyy")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                date = day + '-' + month + '-' + year;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = day + '-' + month + '-' + year;
            }
        } else if (formatter === "dd/mm/yyyy")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                date = day + '/' + month + '/' + year;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = day + '/' + month + '/' + year;
            }
        } else if (formatter === "yyyy/mm/dd")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                date = year + '/' + month + '/' + day;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = year + '/' + month + '/' + day;
            }
        } else if (formatter === "yyyy-mm-dd")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                date = year + '-' + month + '-' + day;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = year + '-' + month + '-' + day;
            }
        }
    }
    return date;
}
$(document).ajaxError(function myErrorHandler(event, xhr, ajaxOptions, thrownError) {
    if (xhr.status === 409) {
        showNotification('Attention', JSON.parse(xhr.responseText).description, 'error', 2000);
    } else if (xhr.status === 401) {
        $('#sessionExpirationConfirm').modal('show');

        $("#submitSessionExpiration").unbind("click");
        $("#submitSessionExpiration").bind("click", function (e) {

            $('#sessionExpirationConfirm').modal('hide');
            $('#authentification').modal('show').on('shown.bs.modal', function () {
                $('#username').val('').focus();
                $('#password').val('');
                if (window.sessionStorage) {
                    $("#username").val(window.localStorage.getItem('loginFicheBase'));
                    $("#password").val(window.localStorage.getItem('passwordCompta'));
                }
            });
            ;

            $('#validerAuthentification').unbind("click");
            $('#validerAuthentification').bind("click", function (e) {
                validerAuthentification();
            });

            document.addEventListener("keypress", function (e) {
                let key = e.keyCode || e.which;
                if (key === 13)
                    validerAuthentification();
            });
            $("#cancelAuthentification").unbind("click");
            $("#cancelAuthentification").bind("click", function (e) {
                $('#authentification').modal('hide');
                let xhr = new XMLHttpRequest();
                xhr.open("GET", `${url_base}/fichier-base-core/logout`);
                xhr.responseType = "json";
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.setRequestHeader("x-auth-token", localStorage.getItem("x-auth-token"));
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        localStorage.removeItem("username");
                        window.localStorage.removeItem("x-auth-token");
                        document.cookie = "";
                        window.location.href = "/template-web/";
                    }
                };
                xhr.send(JSON.stringify());
            });


        });
        $("#cancelSessionExpiration").unbind("click");
        $("#cancelSessionExpiration").bind("click", function (e) {
            window.parent.location.href = "/template-web/login";
        });
    } else if (xhr.status !== 0 && xhr.status !== 200) {
        showNotification('Attention', "Veuillez réessayer une autre fois", 'error', 2000);
    }
});
function validerAuthentification() {
    let data = {};
    data["user"] = $('#username').val();
    data["pass"] = $('#password').val();

    if (data.user && data.pass) {
        authenticate(data);
    } else
        showNotification('Attention', "Des champs sont manquants !", 'error', 3000);
}
function authenticate(data) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${url_base_access}/gestion-access-core/login`, true);
    xhr.setRequestHeader("Accept-Language", sessionStorage.getItem("langue"));
    xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                localStorage.setItem("username", data["user"]);
                let token = xhr.responseText;
                window.localStorage.setItem("x-auth-token", token);
                document.cookie = "x-auth-token=" + token + ";path=/";
                $('#authentification').modal('hide');
            } else {
                showNotification('Attention', "Veuillez vérifier votre nom d'utilisateur / mot de passe ! ", 'error', 3000);
            }
        }
    });

    let params = "username=" + data["user"] + "&password=" + data["pass"].toLowerCase() + "&submit=Login";
    xhr.send(params);
}
$.ajaxSetup({
    beforeSend: function (xhr)
    {
        setTimeout(function () {
            window.parent.$.loader.open();
        }, 20);
        xhr.setRequestHeader("x-auth-token", localStorage.getItem("x-auth-token"));
        xhr.setRequestHeader("Accept-Language", localStorage.getItem("langue"));


    }
});
$(document).ajaxComplete(function (event, jqXHR, settings) {
    setTimeout(function () {
        window.parent.$.loader.close();
    }, 20);
});
function pad(num, size) {
    var s = num + "";
    while (s.length < size)
        s = "0" + s;
    return s;
}
function  CreateSelectTree(el, treeData) {
    el.append('<div class="input-group SelectTree"><input readonly="true" type="text" class="form-control textSelect input-xs" style="cursor: default; background-color: white;"><span class="input-group-addon openerSelect" style="height: 22px;padding: 1px 5px;font-size: 12px;line-height: 1.5;"><i class="fa  fa-angle-down"></i></span></div><div style="display: none;position: absolute;overflow-y: auto;overflow-x: auto;min-width: 120px; max-width: 430px;max-height: 170px;height:auto !important;z-index: 9999;" class="treeSelect"></div>');
    el.find('.treeSelect').dynatree({
        checkbox: true,
        classNames: {checkbox: "dynatree-radio"},
        selectMode: 1,
        children: treeData,
        onActivate: function (node) {
            return false;
        },
        onSelect: function (select, node) {
            if (select === true) {
                this.$tree.prev().find('.textSelect').val(node.data.title);
                this.$tree.prev().find('.textSelect').attr('title', node.data.title);
                this.$tree.css("display", "none");
            } else {
                this.$tree.prev().find('.textSelect').val('');
                this.$tree.prev().find('.textSelect').attr('title', '');
            }
        },
        onDblClick: function (node, event) {
            node.toggleSelect();
        },
        onKeydown: function (node, event) {
            if (event.which === 32) {
                node.toggleSelect();
                return false;
            }
        },
        cookieId: "dynatree-Cb1",
        idPrefix: "dynatree-Cb1-"
    });
    el.find(".openerSelect").bind('click', function () {
        var tree = $(this).parents('.SelectTree').next();
        if (tree.css("display") === "none")
        {
            tree.css("display", "block");
            tree.css('min-width', tree.parent().width());
            tree.css('top', tree.parent().position().top + tree.parent().height());
            tree.css('left', tree.parent().position().left + tree.parent());
            tree.find('ul.dynatree-container li')[0].click();
            $(document).mouseup(function (e)
            {

                if (!tree.is(e.target) // if the target of the click isn't the container...
                        && tree.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    tree.hide();
                }
            });
//            
        } else {
            tree.css("display", "none");
            var list = tree.dynatree("getSelectedNodes");
            if (list.length > 0) {
                $(this).parents('.SelectTree').find('textSelect').val(list[0].data.title);
                $(this).parents('.SelectTree').find('textSelect').attr('title', list[0].data.title);
            }
        }
    });
    el.find(".textSelect").bind('click', function () {
        var tree = $(this).parents('.SelectTree').next();
        if (tree.css("display") === "none")
        {
            tree.css("display", "block");
            tree.css('min-width', $('.treeSelect').parent().width());
            tree.css('top', tree.parent().position().top + tree.parent().height());
            tree.css('left', tree.parent().position().left + tree.parent());
            tree.find('ul.dynatree-container li')[0].click();
            $(document).mouseup(function (e)
            {

                if (!tree.is(e.target) // if the target of the click isn't the container...
                        && tree.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    tree.hide();
                }
            });
        } else {
            tree.css("display", "none");
            var list = tree.dynatree("getSelectedNodes");
            if (list.length > 0) {
                $(this).val(list[0].data.title);
                $(this).attr('title', list[0].data.title);
            }
        }

    });

}
function min_date(date1, date2) {
    var parts1 = date1.split("/");
    var parts2 = date2.split("/");
    var Date1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
    var Date2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
    if (Date1 > Date2) {
        return date2;
    } else {
        return date1;
    }
}

function max_date(date1, date2) {
    var parts1 = date1.split("/");
    var parts2 = date2.split("/");
    var Date1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
    var Date2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
    if (Date1 < Date2) {
        return date2;
    } else {
        return date1;
    }
}
function verif_date(input) {
    reg = new RegExp(/^[0-3]{1}[0-9]{1}[\/][0-1]{1}[0-9]{1}[\/][0-9]{4}$/);
    if (!reg.test(input)) { // check format JJ/MM/AAAA
        return false;
    }

    tabDate = input.split('/');
    dateTest = new Date(tabDate[2], tabDate[1] - 1, tabDate[0]);
    if (parseInt(tabDate[0], 10) !== parseInt(dateTest.getDate(), 10)
            || parseInt(tabDate[1], 10) !== parseInt(dateTest.getMonth(), 10) + parseInt(1, 10)
            || parseInt(tabDate[2], 10) !== parseInt(dateTest.getFullYear(), 10)) { // if exist
        return false;
    }
    return true;
}
function findParam1ByCode(code) {
    var response = "";
    $.ajax({
        url: '../../comptabilite-core/ecritureComptable/findParam1ByCode?&code=' + code,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}
function findSocieteByCode() {
    var Societe = window.sessionStorage.getItem('Societe');
    var response = "";
    $.ajax({
        url: `${url_base}/fichier-base-core/api/societes/${Societe}?lazy=true`,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}
function findExerciceByExerciceCodeSoc() {
    var Societe = window.sessionStorage.getItem('Societe');
    var Exercice = window.sessionStorage.getItem('Exercice');
    var response = "";
    $.ajax({
        url: `${url_base}/fichier-base-core/api/exercice/find-exercice?exercice=${Exercice}&codSoc=${Societe}`,
        headers: {
            'x-auth-token': localStorage.getItem("x-auth-token"),
            'Accept-Language': localStorage.getItem("langue")
        },
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}
function findClotureMoisByCodeSocExerciceMois(mois) {
    var Societe = window.sessionStorage.getItem('Societe');
    var Exercice = window.sessionStorage.getItem('Exercice');
    var response = null;
    $.ajax({
        url: url_base + '/fichier-base-core/api/cloturemois/findByCodeSocAndAnneeAndMois?annee=' + Exercice + '&codeSoc=' + Societe + '&mois=' + mois + '&cloturer=true&definitive=true,false',
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}

function findJournauxCodJouCodeSoc(codJou) {
    var Societe = window.sessionStorage.getItem('Societe');
    var response = "";
    $.ajax({
        url: `${url_base}/fichier-base-core/api/journaux/getJournal?codJou=${codJou}&codeSoc=${Societe}`,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}

function getformatterdate(date) {
    var d = date.split('/');
    return d[2] + "-" + d[1] + "-" + d[0];
}
function getformatterLocaldate(date) {
    var d = date.split('/');
    return    d[0] + "-" + d[1] + "-" + d[2];
}
function appllyDatePresentation(idElement, minDate, maxDate) {
    $('#' + idElement).datepicker({
//defaultDate: "+1w",
        changeMonth: true,
        minDate: minDate,
        maxDate: maxDate,
        numberOfMonths: 1,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        closeText: 'Fermer',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        dateFormat: 'dd/mm/yy',
        beforeShow: function ()
        {
            setTimeout(function () {
                $('.ui-datepicker').css('z-index', 99999999999999);
            }, 0);
        }
    });
}
function compareDate(date1, date2) {
    var parts1 = date1.split("/");
    var parts2 = date2.split("/");
    var Date1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
    var Date2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
    return Date1 >= Date2;
}
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? " " : d,
            t = t == undefined ? "." : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
String.prototype.formatMoney = function (c, d, t) {
    var n = Number(this),
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? " " : d,
            t = t == undefined ? "." : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function dateformater(current)
{
    var day;
    var month;
    var year;
    day = (current.getDate().toString().length === 2) ? current.getDate() : "0" + current.getDate();
    month = ((current.getMonth() + 1).toString().length === 2) ? (current.getMonth() + 1) : "0" + (current.getMonth() + 1);
    var year = current.getFullYear();
    return  day + "/" + month + "/" + year;

}
function accoladeFormatter(text) {
    return "{ " + text + " }";
}

function parantheseFormatter(text) {
    return "( " + text + " )";
}

function crocheFormatter(text) {
    return "[ " + text + " ]";
}

function getSeparator() {
    return "    |    ";
}
function getSeparator2() {
    return "    -    ";
}


function convertToChar(etat_prest) {

    return String.fromCharCode(etat_prest);
}

function dateFormatter(date, timeformat) {
    var day;
    var month;
    var year;
    var fulldate;

    if (date === undefined || "")
        return ""
    day = (date.day.toString().length === 2) ? date.day : "0" + date.day;
    month = (date.month.toString().length === 2) ? date.month : "0" + date.month;
    year = date.year;

    fulldate = day + "/" + month + "/" + year;

    if (timeformat === "hh:mm")
    {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        fulldate += " " + hour + ":" + minute;
    }
    if (timeformat == "hh:mm:ss")
    {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        var second = (date.second.toString().length === 2) ? date.second : "0" + date.second;
        fulldate += " " + hour + ":" + minute + ":" + second;
    }






    return fulldate;


}

function timeFormatter(date, timeformat) {

    var time;

    if (timeformat === "hh:mm")
    {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        time = hour + ":" + minute;
    } else if (timeformat === "hh:mm:ss")
    {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        var second = (date.second.toString().length === 2) ? date.second : "0" + date.second;
        time = hour + ":" + minute + ":" + second;
    } else
    {
        var hour = (date.hour.toString().length === 2) ? date.hour : "0" + date.hour;
        var minute = (date.minute.toString().length === 2) ? date.minute : "0" + date.minute;
        time = hour + ":" + minute;
    }

    return time;

}

function getTimeNow(dateFormat)
{
    var current = new Date();

    var hour;
    var minute;
    var second;

    hour = (current.getHours().toString().length === 2) ? current.getHours() : "0" + current.getHours();
    minute = (current.getMinutes().toString().length === 2) ? current.getMinutes() : "0" + current.getMinutes();
    second = (current.getSeconds().toString().length === 2) ? current.getSeconds() : "0" + current.getSeconds();

    if (dateFormat === "hh:mm") {
        return   hour + ":" + minute;
    } else if (dateFormat === "hh:mm:ss") {
        return   hour + ":" + minute + ":" + second;
    } else {
        return   hour + ":" + minute + ":" + second;
    }
}

function getDateAfterDays(nbrDays) {
    var today = new Date();
    var dateResult = new Date();
    dateResult.setDate(today.getDate() + nbrDays);
    var day = (dateResult.getDate().toString().length === 2) ? dateResult.getDate() : "0" + dateResult.getDate();
    var month = (dateResult.getMonth().toString().length === 2) ? dateResult.getMonth() + 1 : "0" + (dateResult.getMonth() + 1);
    var year = dateResult.getFullYear();
    return day + '/' + month + '/' + year;
}

function getDateNow()
{
    var current = new Date();
    var day;
    var month;
    var year;

    day = (current.getDate().toString().length === 2) ? current.getDate() : "0" + current.getDate();
    month = ((current.getMonth() + 1).toString().length === 2) ? (current.getMonth() + 1) : "0" + (current.getMonth() + 1);
    year = current.getFullYear();


    return  day + "/" + month + "/" + year;
}

function getDateTimeNow(timeFormat) {
    return getDateNow() + " " + getTimeNow(timeFormat);
}
function getDiffDayDate(dateSupp, dateInf, byYear) {
    var DSupp;
    if (dateSupp === "") {
        var dateNow = getDateNow().split("/");
        DSupp = new Date(dateNow[2], dateNow[1], dateNow[0]);
    } else {
        DSupp = new Date(dateSupp.year, dateSupp.month, dateSupp.day);
    }
    var DInf = new Date(dateInf.year, dateInf.month, dateInf.day);
    if (byYear === undefined)
        return parseInt(DSupp.getTime() / (24 * 60 * 60 * 1000)) - parseInt(DInf.getTime() / (24 * 60 * 60 * 1000));
    else
        return parseInt((DSupp.getTime() - parseInt(DInf.getTime())) / (24 * 60 * 60 * 1000 * 365));

}



function getListYear(infyear, suppyear) {

    var years = [];
    var nbrY = suppyear - infyear;
    for (var i = 0; i <= nbrY; i++) {
        var year = {};
        year["id"] = i.toString();
        year["text"] = (infyear + i).toString();
        years.push(year);
    }
    return years;


}


function moneyFormatter(money) {
    return  money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function moneyFormatterToFixed(money, fixed) {
    if (fixed === undefined)
        fixed = 3;
    var moneyFixed = money.toFixed(fixed);
    return  moneyFixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ",");
}


function tableFormatter(index, tableId, nbr_Cols) {
    var rows;
    var nbrCols;
    if (index !== "")
        rows = index.$("#" + tableId).find('tr');
    else
        rows = $("#" + tableId).find('tr');

    if (nbr_Cols === "all")
        nbrCols = $(rows).find('td').length / rows.length;
    else
        nbrCols = nbr_Cols;

    var arrayPos = [];
    var arrayNbrToFusion = [];
    for (var i = 0; i < nbrCols; i++) {
        var col = [];
        for (var j = 0; j < rows.length; j++) {
            var td = $($(rows[j]).find('td')[i]).text();
            col.push(td);

        }
        var compt = 1;
        var isPushed = false;
        for (var k = 0; k < col.length; k++) {
            var str1 = col[k] === undefined ? "" : col[k].trim();
            var str2 = col[k + 1] === undefined ? "" : col[k + 1].trim();
            if (str1 === str2 && !isPushed) {
                compt++;
                arrayPos.push(k);
                arrayNbrToFusion.push(compt);
                isPushed = true;

            } else if (str1 === str2 && isPushed) {
                compt++;
                arrayNbrToFusion[arrayNbrToFusion.length - 1] = compt;

            } else {
                compt = 1;
                isPushed = false;
            }
        }

        /////////////////////////////////////
        /////Traitement de fusion ICI//////////

        for (var p = 0; p < arrayPos.length; p++) {
            $($(rows[arrayPos[p]]).find('td')[i]).attr("rowspan", arrayNbrToFusion[p]);
            var limit = arrayNbrToFusion[p] + arrayPos[p];
            for (var c = arrayPos[p] + 1; c < limit; c++) {
                $($(rows[c]).find('td')[i]).attr("class", "todel" + i);
            }
        }

        //////////////////////////////////////

//        
//        console.log(arrayPos);
//        console.log(arrayNbrToFusion);

        arrayPos = [];
        arrayNbrToFusion = [];


    }

    for (var i = 0; i < nbrCols; i++) {
        index.$("#" + tableId).find('.todel' + i).remove();
    }


}

function CountEachMergedRow(table_body, nbCols, keyColToCount) {
//    var tmpnbCol = 0;
    var listOfCell = $(table_body).find('tr').find('td');
    var cell = $(listOfCell[keyColToCount]);
//    $(cell).append('<i class="label label-danger mynotification">-' + $(cell).prop("rowspan") + ' </i>');

    for (var i = 0; i < listOfCell.length; i++) {
        cell = $(listOfCell[i]);
        if ($(cell).siblings().length > 1) {

            $(listOfCell[i + keyColToCount]).append('<i class="label label-danger mynotification" >-' + $(listOfCell[i + keyColToCount]).prop("rowspan") + ' </i>');
            i += nbCols - 1;
        } else {
            $(cell).append('<i class="label label-danger mynotification" >-' + $(cell).prop("rowspan") + ' </i>');
        }
    }
}


function formIsValide(index, formId) {
    var $inputs = index.$("#" + formId).find('input:required');
    var isValide = true;
    $inputs.each(function () {
        if ($(this).val() === "") {
            isValide = false;
        }
    });

    return isValide;


}


function getDateReferToNow(y)
{
    var current = new Date();
    var day;
    var month;
    var year;

    day = (current.getDate().toString().length === 2) ? current.getDate() : "0" + current.getDate();
    month = ((current.getMonth() + 1).toString().length === 2) ? (current.getMonth() + 1) : "0" + (current.getMonth() + 1);
    year = current.getFullYear();

    if (y !== undefined)
        year = (parseInt(year) - y).toString();


    return  day + "/" + month + "/" + year;
}


function showLoadingDialog() {
//    setTimeout(function() {
    window.parent.$("#loading_modal").modal("show");
//    }, 50);

}

function dismessLoadingDialog() {
//    setTimeout(function() {
    window.parent.$("#loading_modal").modal("hide");
//    }, 50);
}


function compareTwoDateTime(firstDateTime, secondDateTime, dateSeparator, timeSeparator) {
    var frstDate = firstDateTime.split(" ")[0];
    var frstTime = firstDateTime.split(" ")[1];
    var secDate = secondDateTime.split(" ")[0];
    var secTime = secondDateTime.split(" ")[1];

    var arrayFrstDate = frstDate.split(dateSeparator);
    var arrayFrstTime = frstTime.split(timeSeparator);
    var arraySecDate = secDate.split(dateSeparator);
    var arraySecTime = secTime.split(timeSeparator);

    var firstDateTimeObj = new Date(arrayFrstDate[2], arrayFrstDate[1], arrayFrstDate[0], arrayFrstTime[0], arrayFrstTime[1]);
    var SecondDateTimeObj = new Date(arraySecDate[2], arraySecDate[1], arraySecDate[0], arraySecTime[0], arraySecTime[1]);
    var arrayScalarDate = [];
    var diffMunites = SecondDateTimeObj.getTime() / (60 * 1000) - firstDateTimeObj.getTime() / (60 * 1000);
    if (firstDateTimeObj - SecondDateTimeObj < 0) {
        arrayScalarDate.push(parseInt(diffMunites / (60 * 24)));
        arrayScalarDate.push(parseInt((diffMunites % (60 * 24)) / 60));
        arrayScalarDate.push(parseInt((diffMunites % (60 * 24)) % 60));
    }

    return arrayScalarDate;

}

function compareTwoDate(firstDateTime, secondDateTime, dateSeparator) {
    var arrayFrstDate = firstDateTime.split(dateSeparator);
    var arraySecDate = secondDateTime.split(dateSeparator);
    var firstDateTimeObj = new Date(arrayFrstDate[2], arrayFrstDate[1], arrayFrstDate[0]);
    var SecondDateTimeObj = new Date(arraySecDate[2], arraySecDate[1], arraySecDate[0]);
    var diffMunites = SecondDateTimeObj.getTime() / (60 * 1000) - firstDateTimeObj.getTime() / (60 * 1000);
    return  parseInt(diffMunites / (60 * 24));
}
function TexttdIsSelected(tableId, codB) {
    var exist = false;
    var rows = $("#" + tableId).find("table").find('tr');
    var cols = $($("#" + tableId).find('thead').find('tr')[0]).find('th');
    for (var i = 1; i < rows.length; i++) {
        for (var j = 0; j < cols.length; j++) {
            var codeBoite = $($(rows[i]).find('td')[0]).text();
            if (codeBoite.toUpperCase() === codB.toUpperCase()) {
                exist = true;
                break;
            }
        }

    }

    return exist;
}
function verifInput(chars) {
    // Caract res autoris s
    var regex = new RegExp("[a-z0-9_ ]", "i");
    var valid;
    for (x = 0; x < chars.value.length; x++) {
        valid = regex.test(chars.value.charAt(x));
        if (valid === false) {
            chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1);
            x--;
        }
    }
}


function verifString(chars) {
    // Caract res autoris s
    var regex = new RegExp("[a-z_ ]", "i");
    var valid;
    for (x = 0; x < chars.value.length; x++) {
        valid = regex.test(chars.value.charAt(x));
        if (valid === false) {
            chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1);
            x--;
        }
    }
}
function verifInputNumber(chars) {
    // Caract res autoris s
    var regex = new RegExp("[0-9_ ,'.']", "i");
    var valid;
    for (x = 0; x < chars.value.length; x++) {
        valid = regex.test(chars.value.charAt(x));
        if (valid === false) {
            chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1);
            x--;
        }
    }
}

function onfocusoutInputPrix(el) {
    var valeur = $(el).val();
    if (parseFloat(valeur) > 0) {
        $(el).val(parseFloat(valeur).toFixed(3));
    } else {
        $(el).val(parseFloat(0).toFixed(3));
//        showNotification('Avertissement', "Veuillez saisir un prix supérieur à 0 !", 'error', 3000);
//        $(el).focus();
    }
}

function formatCurrentDate(date)
{


    var mois = date[1] < 10 ? "0" + date[1] : date[1];
    var day = date[2] < 10 ? "0" + date[2] : date[2];
    var datetime = day + '/' + mois + '/' + date[0];
    return datetime;

}

function formatdateTime(dat)
{
    var day = dat.substr(8, 2);
    var month = dat.substr(5, 2);
    var year = dat.substr(0, 4);
    var date = day + '/' + month + '/' + year;
    return date;
}
function verifValidDate(Val_date) {
    var test = true;
    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (Val_date.match(dateformat) || Val_date.split('/').length === 3 || Val_date.split('-').length === 3) {
        var seperator1 = Val_date.split('/');
        var seperator2 = Val_date.split('-');

        if (seperator1.length > 1)
        {
            var splitdate = Val_date.split('/');
        } else if (seperator2.length > 1)
        {
            var splitdate = Val_date.split('-');
        }
        if (!isNaN(splitdate[0]) && !isNaN(splitdate[1]) && !isNaN(splitdate[2]) && splitdate[0].indexOf('.') === -1 && splitdate[1].indexOf('.') === -1 && splitdate[2].indexOf('.') === -1) {
            var dd = parseInt(splitdate[0]);
            var mm = parseInt(splitdate[1]);
            var yy = parseInt(splitdate[2]);
            var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (yy < 2100 && yy > 1950) {
                if (dd <= 31 && dd > 0) {
                    if (mm == 1 || (mm > 2) && mm < 13)
                    {
                        if (dd > ListofDays[mm - 1])
                        {
                            test = false;
                        }
                    }
                    if (mm == 2)
                    {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400))
                        {
                            lyear = true;
                        }
                        if ((lyear === false) && (dd >= 29))
                        {
                            test = false;
                        }
                        if ((lyear === true) && (dd > 29))
                        {
                            test = false;
                        }
                    }
                    if (mm > 12)
                        test = false;
                } else {
                    test = false;
                }
            } else {
                test = false;
            }
        } else {
            test = false;
        }
    } else
    {
        test = false;
    }
    return test;
}
function exporterList(url, titre) {
    window.parent.$.loader.open();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.setRequestHeader("x-auth-token", localStorage.getItem("x-auth-token"));
    xhr.setRequestHeader("Accept-Language", localStorage.getItem("langue"));
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
                var blob = this.response;
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveBlob(blob, titre);
                } else {
                    var downloadLink = window.document.createElement('a');
                    var contentTypeHeader = xhr.getResponseHeader("Content-Type");
                    downloadLink.href = window.URL.createObjectURL(new Blob([blob], {type: contentTypeHeader}));
                    downloadLink.download = titre;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }
            } else if (xhr.status === 409) {
                showNotification('Attention', JSON.parse(xhr.responseText).description, 'error', 2000);
            } else {
                showNotification('Attention', "Une erreur s'est produite", 'error', 2000);
            }
            $('#btnExporter').prop('disabled', '');
        } else if (xhr.readyState === 2) {
            if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204)
                xhr.responseType = "blob";
            else
                xhr.responseType = "text";
        }

        window.parent.$.loader.close();
    };
    xhr.send();
}
function formatCalendarWithTime(dat, formatter)
{
    var date;
    if (dat === null) {
        date = "";
    } else if (Array.isArray(dat))
    {
        if (formatter === "dd/mm/yyyy")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = day + '/' + mois + '/' + dat[0];
        } else if (formatter === "yyyy-mm-dd")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = dat[0] + '-' + mois + '-' + day;
        } else if (formatter === "yyyy/mm/dd")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = dat[0] + '/' + mois + '/' + day;
        } else if (formatter === "dd-mm-yyyy")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = day + '-' + mois + '-' + dat[0];
        }

    } else
    {
        if (formatter === "dd-mm-yyyy")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                var hour = dat.substr(11, 2);
                var minutes = dat.substr(14, 2);
                var seconds = dat.substr(17, 2);
                date = day + '-' + month + '-' + year;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = day + '-' + month + '-' + year;
            }
        } else if (formatter === "dd/mm/yyyy")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                var hour = dat.substr(11, 2);
                var minutes = dat.substr(14, 2);
                var seconds = dat.substr(17, 2);
                date = day + '/' + month + '/' + year;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = day + '/' + month + '/' + year;
            }
        } else if (formatter === "yyyy/mm/dd")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                var hour = dat.substr(11, 2);
                var minutes = dat.substr(14, 2);
                var seconds = dat.substr(17, 2);
                date = year + '/' + month + '/' + day;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = year + '/' + month + '/' + day;
            }
        } else if (formatter === "yyyy-mm-dd")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                var hour = dat.substr(11, 2);
                var minutes = dat.substr(14, 2);
                var seconds = dat.substr(17, 2);
                date = year + '-' + month + '-' + day;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = year + '-' + month + '-' + day;
            }
        }

    }

    return date;
}

function getDateServer() {
    window.parent.$.loader.open();
    var response = "";
    $.ajax({
        url: `${url_base}/fichier-base-core/api/server-date/date`,
        type: 'GET',
        async: false,
        success: function (data)
        {
            response = data;
            window.parent.$.loader.close();
        }
    });
    return response;
}
function getformatterdate(date) {
    var d = date.split('/');
    return d[2] + "-" + d[1] + "-" + d[0];
}

function getDateTime() {
    var response = "";
    $.ajax({
        url: `${url_base}/fichier-base-core/api/server-date/date-time`,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}
function getDate() {
    var response = "";
    $.ajax({
        url: '../../comptabilite-core/parametrage/getDate',
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}
function ConvertFromStringToDateTime(date) {
    var response = "";
    $.ajax({
        url: '../../comptabilite-core/parametrage/ConvertFromStringToDateTime?&date=' + date,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}


function findSocieteByCode() {
    var Societe = window.sessionStorage.getItem('Societe');
    var response = "";
    $.ajax({
        url: `${url_base}/fichier-base-core/api/societes/${Societe}?lazy=true`,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (data)
        {
            response = data;
        }
    });
    return response;
}
function isAlphaOrParen(str) {
    return /^[a-zA-Z()]$/.test(str);
}

function getTraceNotification() {
    var listTr = getTrace();
    var html = "";
    for (var i = 0; i < listTr.length; i++) {
        html += '                    <li id="list_trace_' + i + '">';
        html += '                        <span class="unread">';
        html += '                            <a href="javascript:void(0);" class="">';
        html += '                                <time>' + dateFormatter(listTr[i].tracePK.datOpe) + " " + timeFormatter(listTr[i].tracePK.heuOpe) + '</time>';
        html += '                                <span class="from">N° dossier:</strong>&nbsp&nbsp' + listTr[i].tracePK.numDoss + '<i class="icon-paperclip"></i></span>';
        html += '                                <span class="subject"><strong>N° chambre:</strong>&nbsp&nbsp' + listTr[i].tracePK.numCha + '<i class="icon-paperclip"></i></span>';
        html += '                                <span class="subject"><strong>PEC:</strong>&nbsp&nbsp' + listTr[i].tracePK.numSer + '<i class="icon-paperclip"></i></span>';
        html += '                                <span class="subject"><strong>N° fiche:</strong>&nbsp&nbsp' + listTr[i].numBon + '<i class="icon-paperclip"></i></span>';
        html += '                                <span class="subject"><strong>Motif:</strong>&nbsp&nbsp' + listTr[i].motif + '</span>';
        html += '                            </a>';
        html += '                        </span>';
        html += '                    </li>';
    }
    window.parent.$('.notification-body').html(html);
}
function showNotification(title, msg, type, delais) {

    var color;
    var icon;
    var sound;
    if (type === "error") {
        color = "#a90329";
        icon = "fa fa-times-circle fa-1x bounce animated";
        sound = "";
    } else if (type === "success") {
        color = "#296191";
        icon = "fa fa-thumbs-up fa-2x bounce animated";
        if (title === "")
            title = "Félicitation";
        sound = "bigbox";
    } else {
        color = "#e2a73f";
        icon = "fa  fa-thumbs-down fa-2x bounce animated";
        if (title === "")
            title = "Attention";
        sound = "";
    }

    window.parent.$.smallBox({
        title: title,
        content: msg,
        color: color,
        iconSmall: icon,
        timeout: delais,
        sound_file: sound
    });
}
function showAlertNotification(content) {

    window.parent.$.SmartMessageBox({
        title: "ATTENTION !",
        content: content,
        buttons: '[OK]'
    });
}
function showNumdossNotification() {
    window.parent.$.sound_on = false;
    window.parent.$.SmartMessageBox({
        title: "<i class='fa fa-refresh fa-spin' style='color:green'></i> VEUILLEZ CHOISIR UN PATIENT ",
        buttons: "[]"
    });
    window.parent.$(".botTempo").css("display", "none");
    window.parent.$.sound_on = false;
}
function showLoadingNotification() {
    window.parent.$.sound_on = false;
    window.parent.$.SmartMessageBox({
        title: "<i class='fa fa-refresh fa-spin' style='color:green'></i> VEUILLEZ PATIENTEZ QUELQUES SECONDES...",
        buttons: "[]"
    });
    window.parent.$(".botTempo").css("display", "none");
    window.parent.$.sound_on = false;
}
function showNotificationDialog() {
    window.parent.$.sound_on = false;
    window.parent.$.SmartMessageBox({
        title: "<i class='fa fa-refresh fa-spin' style='color:green'></i> LA LISTE DES DEMANDES DEJA CHOISIES SERA EFFECEE !",
        buttons: "[Annuler],[Confirmer]"
    });
    window.parent.$(".botTempo").css("display", "block");
    window.parent.$.sound_on = false;
}
function hideLoadingNotification() {
    window.parent.$(".botTempo").trigger("click");
    window.parent.$("#MsgBoxBack").removeClass("divMessageBox");
}
function createBackgridd(pageableGrid, idElement, gridColumns, collection, pagination, FocusableRow, CaptionFooter, classe) {
    var columns = gridColumns;
    if (pagination === true) {
        pageableGrid = new Backgrid.Grid({
            emptyText: "",
            columns: columns,
            row: FocusableRow,
            collection: collection,
            footer: Backgrid.Extension.Paginator.extend({
                template: _.template('<tr><td colspan="<@= colspan @>"><ul class="pagination"><@ _.each(handles, function (handle) { @><li <@ if (handle.className) { @>class="<@= handle.className @>"<@ } @>><a href="#" <@ if (handle.title) {@> title="<@= handle.title @>"<@ } @>><@= handle.label @></a></li><@ }); @></ul></td></tr>')
            }),
            className: 'table table-bordered table-striped table-editable no-margin table-hover'
        });
    } else if (classe !== undefined) {
        pageableGrid = new Backgrid.Grid({
            emptyText: "",
            columns: columns,
            row: FocusableRow,
            collection: collection,
            footer: CaptionFooter,
            className: 'table table-bordered table-striped table-editable no-margin table-hover ' + classe
        });
    } else {
        pageableGrid = new Backgrid.Grid({
            emptyText: "",
            columns: columns,
            row: FocusableRow,
            collection: collection,
            footer: CaptionFooter,
            className: 'table table-bordered table-striped table-editable no-margin table-hover'
        });
    }

    if (idElement === "_grid_employeParametrage") {
        var clientSideFilter = new Backgrid.Extension.ClientSideFilter({
            collection: collection,
            placeholder: "Rechercher",
            id: "rechercher_param",
            fields: ['userName'],
            //fields: null,
            wait: 150
        });
        $('#rechercher_param').remove();
        $("#_grid_employeParametrage").before(clientSideFilter.render().el);
        document.getElementById("search").focus();
    }

    $("#" + idElement).html(pageableGrid.render().$el);
    return pageableGrid;
}
function createBackgrid(pageableGrid, idElement, gridColumns, collection, pagination, FocusableRow) {
    var columns = gridColumns;
    if (pagination === true) {
        pageableGrid = new Backgrid.Grid({
            emptyText: "",
            columns: columns,
            row: FocusableRow,
            collection: collection,
            footer: Backgrid.Extension.Paginator.extend({
                template: _.template('<tr><td colspan="<@= colspan @>"><ul class="pagination"><@ _.each(handles, function (handle) { @><li <@ if (handle.className) { @>class="<@= handle.className @>"<@ } @>><a href="#" <@ if (handle.title) {@> title="<@= handle.title @>"<@ } @>><@= handle.label @></a></li><@ }); @></ul></td></tr>')
            }),
            className: 'table table-bordered table-striped table-editable no-margin table-hover',
        });
    } else {
        pageableGrid = new Backgrid.Grid({
            emptyText: "",
            columns: columns,
            row: FocusableRow,
            collection: collection,
            className: 'table table-bordered table-striped table-editable no-margin table-hover',
        });
    }

//    if (idElement === "listeDetailRubriqueBilanRecherche") {
//        var clientSideFilter = new Backgrid.Extension.ClientSideFilter({
//            collection: collection,
//            placeholder: "Rechercher",
//            id: "CompteRecherche",
//            fields: ['compte'],
//            wait: 150
//        });
//        $("#CompteRecherche").replaceWith(clientSideFilter.render().el);
//        $("#CompteRecherche").focus();
//        $("#CompteRecherche input").addClass('input-xs');
//        $(clientSideFilter.el).css({width: "100%"});
//        $('#search').css({width: "100%"});
//    }

    $("#" + idElement).html(pageableGrid.render().$el);
    return pageableGrid;
}
function removeTmpGrid(grid) {
    var models = grid.models;
    while (models.length > 0)
    {
        models[0].collection.remove(models[0]);
    }
}
function getUrlObjectParams() {
    var QueryString = function () {
        var query_string = {};
        var query = window.parent.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], pair[1]];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }
//console.log(query_string)
        return query_string;
    }();
    return QueryString;
}
function showDateFR() {
    window.parent.$("[name='_doss_date_cloturee']").hide();
    window.parent.$("#calendrier").show();
    window.parent.$("[name='_info_pat_rea_cloturee']").hide();
    window.parent.$("[name='_info_pat_rea']").show();
}
function hideAll() {
    window.parent.$("[name='_doss_date_cloturee']").hide();
    window.parent.$("#calendrier").hide();
    window.parent.$("[name='_info_pat_rea_cloturee']").hide();
    window.parent.$("[name='_info_pat_rea']").show();
}
function applyDatePresentation(idElement) {
    $('#' + idElement).datepicker({
//defaultDate: "+1w",
        changeMonth: true,
//        minDate: new Date(date_fin.split("/")[2], date_fin.split("/")[1]-1, date_fin.split("/")[0]),
        numberOfMonths: 1,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        closeText: 'Fermer',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        dateFormat: 'dd/mm/yy',
        beforeShow: function ()
        {
            setTimeout(function () {
                $('.ui-datepicker').css('z-index', 99999999999999);
            }, 0);
        },
    });
}
function getDayBeforeDays(date, nbrDays) {
    var today = new Date(date);
    var dateResult = new Date(date);
    dateResult.setDate(today.getDate() - nbrDays);
    var day = (dateResult.getDate().toString().length === 2) ? dateResult.getDate() : "0" + dateResult.getDate();
    var month = ((dateResult.getMonth() + 1).toString().length === 2) ? (dateResult.getMonth() + 1) : "0" + (dateResult.getMonth() + 1);
    var year = dateResult.getFullYear();
    return new Date(year + '/' + month + '/' + day);
}
function getDayAfterDays(date, nbrDays) {
    var today = new Date(date);
    var dateResult = new Date(date);
    dateResult.setDate(today.getDate() + nbrDays);
    var day = (dateResult.getDate().toString().length === 2) ? dateResult.getDate() : "0" + dateResult.getDate();
    var month = ((dateResult.getMonth() + 1).toString().length === 2) ? (dateResult.getMonth() + 1) : "0" + (dateResult.getMonth() + 1);
    var year = dateResult.getFullYear();
    return new Date(year + '/' + month + '/' + day);
}
function controlMatriculeee(idEle, nature) {
    var matricule = $(idEle).val();
    if (nature === "Matricule fiscal") {
        var m = matricule.trim();

        var Mat = m.slice(0, 7);// Left(matricule, 7);
        var num = m.slice(matricule.length - 3, m.length);//Right(matricule, 3);
        var Cle = m[7]; //Right(Left(matricule, 8), 1);
        var Tva = m[8];//Right(Left(matricule, 9), 1);
        var Cat = m[9];//Right(Left(matricule, 10), 1);
//        '1234567890123'[8];

        if (m.length !== 13) {
            return'Matricule doit être sur 13 caractères';
        } else if (!($.isNumeric(Mat))) {
            return'La partie identifiant doit être numérique';
        } else if ($.isNumeric(Cle)) {//else if (!isAlphaOrParen(Cle)) {
            return'Le Clé doit être alphabetique';
        } else if (Cle.toLowerCase() === 'i' || Cle.toLowerCase() === 'o' || Cle.toLowerCase() === 'u') {
            return'Le Clé ne doit être ni I,O,U';
        } else if (Cle.toLowerCase() !== cleMatriculeee(Mat).toLowerCase()) {
            if (cleMatriculeee(Mat).length !== 1) {
                return cleMatriculeee(Mat);
            } else {
                return'Clé invalid: ' + Cle + ' il aurait du être : ' + cleMatriculeee(Mat);
            }
        } else if ((Tva.toLowerCase() !== 'a') && (Tva.toLowerCase() !== 'b') && (Tva.toLowerCase() !== 'd') && (Tva.toLowerCase() !== 'p') && (Tva.toLowerCase() !== 'n')) {
            return 'Le code TVA doit être A, B, D, P, N';
        } else if ((Cat.toLowerCase() !== 'm') && (Cat.toLowerCase() !== 'p') && (Cat.toLowerCase() !== 'c') && (Cat.toLowerCase() !== 'n') && (Cat.toLowerCase() !== 'e')) {
            return 'La catégorie doit être M, P, C, N, E';
        } else if (!($.isNumeric(num))) {
            return'Le numéro d établissement doit être numérique';
        } else if ((num === '000') && (Cat.toLowerCase() === 'e')) {
            return'Incohérance entre numéro d établissement et catégorie';
        } else {
            return 'true';
        }
    } else if (nature === "Carte identité national") {
        var mat = matricule.trim();
        if (mat.length !== 8) {
            return'N° CIN doit être sur 8 caractères';
        } else if (!($.isNumeric(mat.trim()))) {
            return'Le numéro de CIN doit être numérique';
        } else {
            return 'true';
        }
    } else if (nature === "Carte séjour") {
        var mat = matricule.trim();
        if (mat.length === 0 || mat.length > 13) {
            return'Carte séjour doit être inférieur à 13 caractères';
        } else {
            return 'true';
        }
    } else if (nature === "Identifiant des personnes non domiciliées ni établies en Tunisie") {
        var mat = matricule.trim();
        if (mat.length === 0 || mat.length > 13) {
            return'Identifiant doit être inférieur à 13 caractères';
        } else {
            return 'true';
        }
    } else if (nature === "Veuillez choisir") {
        return"Vérifier le type de l'identifiant";
    } else {
        return 'Vérifier le type de la matricule';
    }
}
function cleMatriculeee(mat) {
    var cleMt = '';
    if (mat.length !== 7) {
        return'Identifiant invalide';
    }

    var list = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
    var ch0 = parseInt(mat.split("")[0]);
    var ch1 = parseInt(mat.split("")[1]);
    var ch2 = parseInt(mat.split("")[2]);
    var ch3 = parseInt(mat.split("")[3]);
    var ch4 = parseInt(mat.split("")[4]);
    var ch5 = parseInt(mat.split("")[5]);
    var ch6 = parseInt(mat.split("")[6]);
    var somme = ch0 * 7 + ch1 * 6 + ch2 * 5 + ch3 * 4 + ch4 * 3 + ch5 * 2 + ch6 * 1;
    var rest = Math.floor(somme % 23);
    var cleMt = list[rest];
    if (cleMt === '') {
        cleMt = 'Identifiant:Clé invalide';
    }
    return cleMt;
}
function showLoadingNotificationLettrage(msg) {
    window.parent.$("#MsgBoxBack").show();
    window.parent.$.sound_on = false;
    window.parent.$.SmartMessageBox({
        title: "<i class='fas fa-sync-alt fas fa-spin' style='color:green'></i> " + msg,
        buttons: "[]"
    });
    window.parent.$(".botTempo").css("display", "none");
    window.parent.$.sound_on = false;

}
function hideLoadingNotificationLettrage() {
    window.parent.$("#MsgBoxBack").hide();
//    window.parent.$("#MsgBoxBack").removeClass("divMessageBox");
}
function createBackgridSaisie(pageableGrid, idElement, gridColumns, collection, pagination, FocusableRow, CaptionFooter) {
    var footer = '';
    if (serverTier.valeur === '0') {
        footer = `<tr style="background-color: #f9f9f9;"><td style="width: 30%;border-right-color: #f9f9f9;"><spam id="libCompteFplan"></spam></td><td style="width: 10%;text-align:right;"><a style="color: #a90329;">Totaux</a></td><td id="totalDebit" style="width: 10%;color: #3276b7;    text-align: right;">0.000</td><td id="totalCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 30%;"></td></tr><tr style="background-color: #f9f9f9;"><td style="width: 40%;color: #3276b7;text-align:right;"><a style="color: #a90329;">Soldes</a></td><td id="soldeDebit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td id="soldeCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 30%;"></td></tr><tr>`;
    } else {
        footer = `<tr style="background-color: #f9f9f9;"><td style="width: 45%;border-right-color: #f9f9f9;"><spam id="libCompteFplan"></spam></td><td style="width: 5%;text-align:right;"><a style="color: #a90329;">Totaux</a></td><td id="totalDebit" style="width: 10%;color: #3276b7;    text-align: right;">0.000</td><td id="totalCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 30%;"></td></tr><tr style="background-color: #f9f9f9;"><td style="width: 50%;color: #3276b7;text-align:right;"><a style="color: #a90329;">Soldes</a></td><td id="soldeDebit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td id="soldeCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 30%;"></td></tr> <tr>`;
    }
    var columns = gridColumns;
    if (pagination === true) {
        pageableGrid = new Backgrid.Grid({
            emptyText: "",
            columns: columns,
            row: FocusableRow,
            collection: collection,
            footer: Backgrid.Extension.Paginator.extend({
                template: _.template(footer),
                events: {
                    "click a": function (e) {
                        var response = verifData();
                        if (response === true)
                        {
                            e.preventDefault();
                            var label = $(e.target).text();
                            var ffLabels = this.fastForwardHandleLabels;

                            var collection = this.collection;

                            if (ffLabels) {
                                switch (label) {
                                    case ffLabels.first:
                                        collection.getFirstPage();
                                        total(pageableGrid);
                                        return;
                                    case ffLabels.prev:
                                        if (collection.hasPrevious())
                                        {
                                            collection.getPreviousPage();
                                            total(pageableGrid);
                                        }
                                        return;
                                    case ffLabels.next:
                                        if (collection.hasNext())
                                        {
                                            collection.getNextPage();
                                            total(pageableGrid);
                                        }
                                        return;
                                    case ffLabels.last:
                                        collection.getLastPage();
                                        total(pageableGrid);
                                        return;
                                }
                            }

                            var state = collection.state;
                            var pageIndex = $(e.target).text() * 1 - state.firstPage;
                            collection.getPage(state.firstPage === 0 ? pageIndex : pageIndex + 1);
                            total(pageableGrid);
                        }
                    }},
            }),
            className: 'table table-bordered table-striped table-editable no-margin table-hover'
        });
    } else {
        pageableGrid = new Backgrid.Grid({
            emptyText: "",
            columns: columns,
            row: FocusableRow,
            collection: collection,
            footer: Backgrid.Footer.extend({
                render: function () {
                    this.el.innerHTML = footer;
                    return this;
                }

            }),
            className: 'table table-bordered table-striped table-editable no-margin table-hover'
        });
    }


    $("#" + idElement).html(pageableGrid.render().$el);
    return pageableGrid;
}
function verifData() {
    var test = true;
    var models = _.filter(pageableGridDetails.collection.models, function (num) {
        return num.get('compte') !== null;
    });
    var i = 0;
    for (var item of models) {
        if (item.get('compte') !== null) {
            if (item.get('libelle') === "")
            {
                var cell = pageableGridDetails.body.rows[i].cells[1];
                cell.enterEditMode();
                showNotification('Attention', "Veuillez saisir le libellé du compte", 'error', 3000);
                test = false;
            } else if ((item.get('codeTier') === null || item.get('codeTier') === "") && item.get("collectif") === true)
            {
                showNotification('', "Veuillez saisir un tier", 'error', 3000);
                test = false;
            }
            if (item.get('debit') === 0 && item.get('credit') === 0)
            {
                var cell = pageableGridDetails.body.rows[i].cells[3];
                cell.enterEditMode();
                showNotification('Attention', "Vous devez préciser un montant débit ou crédit", 'error', 3000);
                test = false;
            }
            i++;
        }
    }
    return test;
}
function createBackgridConsult(pageableGrid, idElement, gridColumns, collection, pagination, FocusableRow, CaptionFooter, classe) {
    var columns = gridColumns;
    var template;
    if (sessionStorage.getItem("typeConsultation") === 'update') {
        if (serverTier.valeur === '1') {
            template = `<tr style="background-color: #f9f9f9;"><td style="width: 35%;border-right-color: #f9f9f9;"><spam id="libCompteFplan"></spam></td><td style="width: 5%;text-align:left;"><a style="color: #a90329;">Totaux</a></td><td id="totalDebit" style="width: 10%;color: #3276b7;    text-align: right;">0.000</td><td id="totalCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 30%;"></td></tr><tr style="background-color: #f9f9f9;"><td style="width: 35%;border-right-color: #f9f9f9;"><spam id="libCompteFplan"></spam></td><td style="width: 5%;color: #3276b7;text-align:left;"><a style="color: #a90329;">Soldes</a></td><td id="soldeDebit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td id="soldeCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 30%;"></td></tr><tr><td style="text-align:left;" colspan="<@= colspan @>"><ul class="pagination"><@ _.each(handles, function (handle) { @><li <@ if (handle.className) { @>class="<@= handle.className @>"<@ } @>><a href="#" <@ if (handle.title) {@> title="<@= handle.title @>"<@ } @>><@= handle.label @></a></li><@ }); @></ul></td></tr>`;
        } else
        {
            template = `<tr style="background-color: #f9f9f9;"><td style="width: 25%;border-right-color: #f9f9f9;"><spam id="libCompteFplan"></spam></td><td style="width: 5%;text-align:left;"><a style="color: #a90329;">Totaux</a></td><td id="totalDebit" style="width: 10%;color: #3276b7;    text-align: right;">0.000</td><td id="totalCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 30%;"></td></tr><tr style="background-color: #f9f9f9;"><td style="width: 25%;border-right-color: #f9f9f9;"><spam id="libCompteFplan"></spam></td><td style="width: 5%;color: #3276b7;text-align:left;"><a style="color: #a90329;">Soldes</a></td><td id="soldeDebit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td id="soldeCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 30%;"></td></tr><tr><td style="text-align:left;" colspan="<@= colspan @>"><ul class="pagination"><@ _.each(handles, function (handle) { @><li <@ if (handle.className) { @>class="<@= handle.className @>"<@ } @>><a href="#" <@ if (handle.title) {@> title="<@= handle.title @>"<@ } @>><@= handle.label @></a></li><@ }); @></ul></td></tr>`;
        }
    } else
    {
        if (serverTier.valeur === '1') {
            template = `<tr style="background-color: #f9f9f9;"><td style="width: 35%;border-right-color: #f9f9f9;"><spam id="libCompteFplan"></spam></td><td style="width: 5%;text-align:left;"><a style="color: #a90329;">Totaux</a></td><td id="totalDebit" style="width: 10%;color: #3276b7;    text-align: right;">0.000</td><td id="totalCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 40%;"></td></tr><tr style="background-color: #f9f9f9;"><td style="width: 35%;border-right-color: #f9f9f9;"><spam id="libCompteFplan"></spam></td><td style="width: 5%;color: #3276b7;text-align:left;"><a style="color: #a90329;">Soldes</a></td><td id="soldeDebit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td id="soldeCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 40%;"></td></tr><tr><td style="text-align:left;" colspan="<@= colspan @>"><ul class="pagination"><@ _.each(handles, function (handle) { @><li <@ if (handle.className) { @>class="<@= handle.className @>"<@ } @>><a href="#" <@ if (handle.title) {@> title="<@= handle.title @>"<@ } @>><@= handle.label @></a></li><@ }); @></ul></td></tr>`;
        } else
        {
            template = `<tr style="background-color: #f9f9f9;"><td style="width: 25%;border-right-color: #f9f9f9;"><spam id="libCompteFplan"></spam></td><td style="width: 5%;text-align:left;"><a style="color: #a90329;">Totaux</a></td><td id="totalDebit" style="width: 10%;color: #3276b7;    text-align: right;">0.000</td><td id="totalCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 40%;"></td></tr><tr style="background-color: #f9f9f9;"><td style="width: 25%;border-right-color: #f9f9f9;"><spam id="libCompteFplan"></spam></td><td style="width: 5%;color: #3276b7;text-align:left;"><a style="color: #a90329;">Soldes</a></td><td id="soldeDebit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td id="soldeCredit" style="width: 10%;text-align:right;color: #3276b7;">0.000</td><td style="width: 40%;"></td></tr><tr><td style="text-align:left;" colspan="<@= colspan @>"><ul class="pagination"><@ _.each(handles, function (handle) { @><li <@ if (handle.className) { @>class="<@= handle.className @>"<@ } @>><a href="#" <@ if (handle.title) {@> title="<@= handle.title @>"<@ } @>><@= handle.label @></a></li><@ }); @></ul></td></tr>`;
        }

    }

    if (pagination === true && classe !== undefined) {
        pageableGrid = new Backgrid.Grid({
            emptyText: "-",
            columns: columns,
            row: FocusableRow,
            collection: collection,
            footer: Backgrid.Extension.Paginator.extend({

                template: _.template(template)
            }),
            className: 'table table-bordered table-striped table-editable no-margin table-hover ' + classe
        });

    } else if (classe !== undefined && pagination === false) {
        pageableGrid = new Backgrid.Grid({
            emptyText: "-",
            columns: columns,
            row: FocusableRow,
            collection: collection,
            footer: CaptionFooter,
            className: 'table table-bordered table-striped table-editable no-margin table-hover ' + classe
        });
    } else {
        pageableGrid = new Backgrid.Grid({
            emptyText: "-",
            columns: columns,
            row: FocusableRow,
            collection: collection,
            footer: CaptionFooter,
            className: 'table table-bordered table-striped table-editable no-margin table-hover'
        });
    }
    if (idElement === "_grid_employeParametrage") {
        var clientSideFilter = new Backgrid.Extension.ClientSideFilter({
            collection: collection,
            placeholder: "Rechercher",
            id: "rechercher_param",
            fields: ['userName'],
            //fields: null,
            wait: 150
        });
        $('#rechercher_param').remove();
        $("#_grid_employeParametrage").before(clientSideFilter.render().el);
        document.getElementById("search").focus();
    }

    $("#" + idElement).html(pageableGrid.render().$el);
    return pageableGrid;
}
function exportationList(url, id, titre, method, data) {
    window.parent.$.loader.open();
    $('#' + id).addClass('disabled');
    var xhr = new XMLHttpRequest();
    if (method === undefined) {
        xhr.open('GET', url, true);
    } else {
        xhr.open(method, url, true);
    }
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("x-auth-token", localStorage.getItem("x-auth-token"));
    xhr.setRequestHeader("Accept-Language", localStorage.getItem("langue"));
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
                var blob = this.response;
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveBlob(blob, titre);
                } else {
                    var downloadLink = window.document.createElement('a');
                    var contentTypeHeader = xhr.getResponseHeader("Content-Type");
                    downloadLink.href = window.URL.createObjectURL(new Blob([blob], {type: contentTypeHeader}));
                    downloadLink.download = titre;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }
            } else if (xhr.status === 409) {
                showNotification('Attention', JSON.parse(xhr.responseText).description, 'error', 2000);
            } else {
                showNotification('Attention', "Une erreur s'est produite", 'error', 2000);
            }
            $('#' + id).removeClass('disabled');
        } else if (xhr.readyState === 2) {
            if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204)
                xhr.responseType = "blob";
            else
                xhr.responseType = "text";
        }

        window.parent.$.loader.close();
    };
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}


function exportationListWithNotification(url, id, titre) {
    window.parent.$.loader.open();
    $('#' + id).addClass('disabled');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.setRequestHeader("x-auth-token", localStorage.getItem("x-auth-token"));
    xhr.setRequestHeader("Accept-Language", localStorage.getItem("langue"));
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
                if (xhr.response.message !== undefined) {
                    showNotification('Attention', xhr.response.message, 'warning', 2000);
                }
                var blob = b64toBlob(xhr.response.edition, 'application/vnd.ms-excel');
                ;
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveBlob(blob, titre);
                } else {
                    var downloadLink = window.document.createElement('a');
                    var contentTypeHeader = 'application/vnd.ms-excel';
                    downloadLink.href = window.URL.createObjectURL(new Blob([blob], {type: contentTypeHeader}));
                    downloadLink.download = titre;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }
            } else if (xhr.status === 409) {
                showNotification('Attention', JSON.parse(xhr.responseText).description, 'error', 2000);
            } else {
                showNotification('Attention', "Une erreur s'est produite", 'error', 2000);
            }
            $('#' + id).removeClass('disabled');
        } else if (xhr.readyState === 2) {
            if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204)
                xhr.responseType = "json";
            else
                xhr.responseType = "text";
        }

        window.parent.$.loader.close();
    };
    xhr.send();

}


function formatCalendar(dat, formatter)
{
    var date;
    if (Array.isArray(dat))
    {
        if (formatter === "dd/mm/yyyy")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = day + '/' + mois + '/' + dat[0];
        } else if (formatter === "yyyy-mm-dd")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = dat[0] + '-' + mois + '-' + day;
        } else if (formatter === "yyyy/mm/dd")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = dat[0] + '/' + mois + '/' + day;
        } else if (formatter === "dd-mm-yyyy")
        {
            var mois = dat[1] < 10 ? "0" + dat[1] : dat[1];
            var day = dat[2] < 10 ? "0" + dat[2] : dat[2];
            date = day + '-' + mois + '-' + dat[0];
        }

    } else
    {
        if (formatter === "dd-mm-yyyy")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                date = day + '-' + month + '-' + year;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = day + '-' + month + '-' + year;
            }
        } else if (formatter === "dd/mm/yyyy")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                date = day + '/' + month + '/' + year;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = day + '/' + month + '/' + year;
            }
        } else if (formatter === "yyyy/mm/dd")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                date = year + '/' + month + '/' + day;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = year + '/' + month + '/' + day;
            }
        } else if (formatter === "yyyy-mm-dd")
        {
            if (dat.indexOf("/") === 4 || dat.indexOf("-") === 4)
            {
                var day = dat.substr(8, 2);
                var month = dat.substr(5, 2);
                var year = dat.substr(0, 4);
                date = year + '-' + month + '-' + day;
            } else
            {
                var day = dat.substr(0, 2);
                var month = dat.substr(3, 2);
                var year = dat.substr(6, 4);
                date = year + '-' + month + '-' + day;
            }
        }
    }
    return date;
}
function isFloat(val) {
    var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    if (!floatRegex.test(val))
        return false;

    val = parseFloat(val);
    if (isNaN(val))
        return false;
    return true;
}
