var op;
var dictionnaire;
var dictionnaire_local;
var dataTablesLang;
var currentDate;
var DatePer_Mois;
$(document).ready(function (e) {
    if (localStorage.getItem("langue_index") === "2") {
        document.body.classList.add('smart-rtl');
    }
    $.ajax({
        url: `./translation`,
        type: 'GET',
        async: false,
        dataType: "json",
        error: function (jqXHR, textStatus, errorThrown) {
        },
        complete: function (jqXHR, textStatus) {

        },
        success: function (data, textStatus, jqXHR) {
            dictionnaire_local = data;
        }
    });
    $.ajax({
        url: `./locales/${localStorage.getItem("langue")}/${localStorage.getItem("langue")}-dataTables.json`,
        type: 'GET',
        async: false,
        dataType: "json",
        error: function (jqXHR, textStatus, errorThrown) {
        },
        complete: function (jqXHR, textStatus) {

        },
        success: function (data, textStatus, jqXHR) {
            dataTablesLang = data;
        }
    });
//    var module = findModuleByCode();
//    $("#numModule").html(' - ' + module.versionDatabase);
    $("#titleModule").html(dictionnaire_local["title.module"]);
    $("#userName").html(localStorage.getItem("username"));
    $("#globaldeconnexion").attr("title", dictionnaire_local["global.deconnexion"]);
    $("#globalpleinEcran").attr("title", dictionnaire_local["global.pleinEcran"]);
    $("#globalpleinEcran").unbind("click");
    $("#globalpleinEcran").bind('click', function (e) {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    });
    $("#acceuil").unbind("click");
    $("#acceuil").bind('click', function (e) {
        $('.actif').removeClass('slideInLeft');
        $('.actif').addClass('slideOutLeft');
        $('.actif').removeClass('actif');
        $('.menuActive').removeClass('menuActive');
        window.parent.$(".global_breadcrumbs").html("<li>" + dictionnaire_local['template.acceuil.acceuil'] + "</li>");
        $('#CancelConfirm').modal('hide');
        ouvrirOnglet(dictionnaire_local['template.acceuil.acceuil'], "Acceuil", false, 'parent', '', 'Accueil');
        var iframe = window.parent.$('iframe[namePage="Accueil"]').contents();
        iframe.find('.tile.subMenu').css('display', 'none');
        iframe.find('.subMenu.principal').css('display', '');
        iframe.find('a[parent="principal"]').nextAll().remove();
    });

//    $("#globaldeconnexion").unbind("click");
//    $("#globaldeconnexion").bind("click", function (e) {
//        let xhr = new XMLHttpRequest();
//        xhr.open("GET", `${url_base}/fichier-base-core/logout`);
//        xhr.responseType = "json";
//        xhr.setRequestHeader("Content-type", "application/json");
//        xhr.setRequestHeader("x-auth-token", localStorage.getItem("x-auth-token"));
//        xhr.onload = function () {
//            if (xhr.status === 200) {
//                localStorage.removeItem("username");
//                window.localStorage.removeItem("x-auth-token");
//                document.cookie = "";
//                window.location.href = "/template-web/";
//            }
//        };
//        xhr.send(JSON.stringify());
//
//    });
});
function showNotification(title, msg, type, delais) {
    var index;
    var langue = localStorage.getItem("langue");
    window.parent.$('#divSmallBoxes').empty();
    $('#divSmallBoxes').empty();
    $(".SmallBox.animated").remove();
    var color;
    var icon;
    var sound;
    if (type === "error") {
        color = "#a90329";
        icon = "fa fa-times-circle fa-2x bounce animated";
        sound = "voice_alert";
    } else if (type === "notification") {
        color = "#296191";
        icon = "fa fa-thumbs-up fa-2x bounce animated";
        sound = "bigbox";
    } else if (type === "avertissement") {
        color = "#e2a73f";
        icon = "fa  fa-thumbs-down fa-2x bounce animated";
        sound = "voice_alert";
    } else {
        color = "#296191";
        icon = "fa fa-thumbs-up fa-2x bounce animated";
        sound = "bigbox";
        window.parent.$(".SmallBox.animated").remove();
    }
    if (langue === "fr") {
        index = 0;
        if (type === "error")
            title = "Attention";
        else if (type === "notification")
            title = "Attention";
        else if (type === "avertissement")
            title = "Attention";
        else
            title = "Succès";
    } else if (langue === "en") {
        index = 1;
        if (type === "error")
            title = "Attention";
        else if (type === "notification")
            title = "Attention";
        else if (type === "avertissement")
            title = "Attention";
        else
            title = "Succes";
    } else if (langue === "ar") {
        index = 2;
        if (type === "error")
            title = "تحذير";
        else if (type === "notification")
            title = "تحذير";
        else if (type === "avertissement")
            title = "تحذير";
        else
            title = "نجاح";
    }

    window.parent.$.smallBox({
        title: title,
        content: msg,
        color: color,
        iconSmall: icon,
        timeout: delais,
        sound_file: sound
    });
    if (langue === "ar") {
        let width = $(window).width() - 450;
        window.parent.$(".SmallBox").css("right", width + "px");
//        window.parent.$(".SmallBox").find('.miniIcono .miniPic').css("left", "12px");
//        window.parent.$(".SmallBox").find('.miniIcono .miniPic:before').css("text-align", "left");
    }
}

function showAlertNotification(content) {

    window.parent.$.SmartMessageBox({
        title: "ATTENTION !",
        content: content,
        buttons: '[OK]'
    });
    window.parent.$('#MsgBoxBack').find('button').unbind('click');
    window.parent.$('#MsgBoxBack').find('button').bind('click', function (e) {
        window.parent.window.location.href = '../index.jsp';
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

function createGridNotifications(idTable, idContainer, codeSoc, exercice) {
    listNotifs = getNotifications(codeSoc, exercice);
    document.getElementById(idContainer).innerHTML = '';
    var table_list = "<table id='" + idTable + "' class='display projects-table table table-striped table-bordered table-hover' cellspacing='0'  width='100%'>";
    table_list += "</table>";
    $("#" + idContainer).html(table_list);
    var columns = [

        {
            data: 'numCpt',
            title: "Compte",
            name: "Compte"
        },
        {
            data: 'libCpt',
            title: "Notification"
        }
    ];

    table = $('#' + idTable).on('page.dt', function () {}).DataTable({
        "dom": 'frtip',
        "searching": false,
        destroy: false,
        bPaginate: false,
        data: listNotifs,
        "order": [],
        scrollCollapse: true,
        scrollX: false,
        autoWidth: true,
        language: {
            processing: "Traitement en cours...",
            search: '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>',
            lengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
            info: "",
            infoEmpty: "",
            infoFiltered: "",
            infoPostFix: "",
            loadingRecords: "Chargement en cours...",
            zeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
            emptyTable: "Aucune donnée disponible dans le tableau",
            paginate: {
                first: "Premier",
                previous: "Pr&eacute;c&eacute;dent",
                next: "Suivant",
                last: "Dernier"
            },
            aria: {
                sortAscending: ": activer pour trier la colonne par ordre croissant",
                sortDescending: ": activer pour trier la colonne par ordre décroissant"
            }
        },
        columns: columns

    });

    $('#' + idTable + ' tbody').delegate('tr', 'click', function (e) {
        var highlightColor = '#d9edf7';
        var css = $(this).attr('style');
        if (css !== 'border-color: rgb(217, 237, 247); background-color: rgb(217, 237, 247)') {
            $('#' + idTable + ' > tbody > tr').removeAttr('style');
            $('#' + idTable + ' > tbody > tr').removeClass('selectionnee');
            $(this).addClass('selectionnee');
            $(this).css('background-color', highlightColor);
            $(this).css('border-color', highlightColor);
        } else {
            $(this).removeAttr('style');
        }
        $('#' + idTable + ' tbody > tr').focus();
    });
}
//function findModuleByCode() {
//    var response = "";
//    $.ajax({
//        url: url_base + `/fichier-base-core/api/modules/${idModule}`,
//        headers: {
//            'x-auth-token': localStorage.getItem("x-auth-token"),
//            'Accept-Language': localStorage.getItem("langue")
//        },
//        contentType: "text/html; charset=utf-8",
//        type: 'GET',
//        dataType: "json",
//        async: false,
//        success: function (data)
//        {
//            response = data;
//        }
//    });
//    return response;
//}

