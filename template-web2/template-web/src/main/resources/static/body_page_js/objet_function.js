
function ActionBouttonObjet() {


    $('#btn_Ajouter').unbind('click');
    $('#btn_Ajouter').bind('click', function (e) {
        confAddObjet();
    });


    $('#btn_Modifier').unbind('click');
    $('#btn_Modifier').bind('click', function (e) {
        var rowDde = $('#tableListObjet').find('tr.selectionnee');
        if (rowDde.length === 0)
        {
            showNotification('Avertissement', "Veuillez choisir un objet", 'error', 3000);
        } else
        {
            sessionStorage.setItem("typeParametrageObjet", 'modif');
            var code = rowDde.find('td').eq(0).text();
            majObjet(code);
        }

    });

    $('#btn_Annuler').unbind('click');
    $('#btn_Annuler').bind('click', function (e) {
        var rowDde = $('#tableListObjet').find('tr.selectionnee');
        if (rowDde.length === 0)
        {
            showNotification('Avertissement', "Veuillez choisir un objet", 'error', 3000);
        } else
        {
            sessionStorage.setItem("typeParametrageObjet", 'supp');
            var username = rowDde.find('td').eq(0).text();
            majObjet(username);
        }
    });

    $('#btnADDCategorie').unbind('click');
    $('#btnADDCategorie').bind('click', function () {
        window.parent.$.loader.open();
        setTimeout(function () {
            onclickBtnValider();
            window.parent.$.loader.close();
        }, 100);
    });
}
function confAddObjet() {
    sessionStorage.setItem("typeParametrageObjet", 'ajout');
    clearModalObjet();
    $('#labelTitre').text("Ajout d'un objet ");
    $('#modalIcon').removeClass().addClass("glyphicon glyphicon-plus");
    $('#modalObjet').modal('show');
}
function clearModalObjet() {
    $('#username').val('');
    $('.css-error').attr('style', 'border-width: 1px;');
    $('.css-error').removeClass("css-error");
    $('#password').val('');
    $('#password').prop("disabled", false);
    $('#description').prop("checked", true);
    $('#username').prop('disabled', false);
    $('#description').prop('disabled', '');
    $("#btnADDCategorie").show();
}
function majObjet(code) {
    var Objet = findObjetByCode(code);
    if (Objet !== null) {
        var lilelle = Objet.lilelle !== null ? Objet.lilelle : '';
       // var description = Objet.description;
     //   $('#description').val(description);
        $('#lilelle').val(lilelle);
    //    $('#username').val(username);
        if (sessionStorage.getItem("typeParametrageObjet") === 'modif') {
            modeModifObjet();
        }
        if (sessionStorage.getItem("typeParametrageObjet") === 'supp')
        {
            modeSuppObjet();
        }
        $('#modalObjet').modal('show');
    }
}
function modeModifObjet() {
    $('#labelTitre').html("Modification d'un objet ");
    $('#modalIcon').removeClass("glyphicon-trash");
    $('#modalIcon').removeClass("glyphicon-th-list");
    $('#modalIcon').removeClass("glyphicon-plus");
    $('#modalIcon').addClass("glyphicon-edit");
    $('.css-error').attr('style', 'border-width: 1px;');
    $('.css-error').removeClass("css-error");
  //  $('#username').prop("disabled", "disabled");
    $('#lilelle').prop("lilelle", false);
   // $('#description').prop("disabled", "");
    $("#btnADDCategorie").show();
}
function modeSuppObjet() {
    $('#labelTitre').html("Annulation d'un objet ");
    $('#modalIcon').removeClass("glyphicon-edit");
    $('#modalIcon').removeClass("glyphicon-th-list");
    $('#modalIcon').removeClass("glyphicon-plus");
    $('#modalIcon').addClass("glyphicon-trash");
    $('.css-error').attr('style', 'border-width: 1px;');
    $('.css-error').removeClass("css-error");
    $('#libelle').prop("disabled", "disabled");
    $("#btnADDCategorie").show();
}
function onclickBtnValider() {
    var booAddEdit = true;
    if (sessionStorage.getItem("typeParametrageObjet") === 'ajout' || sessionStorage.getItem("typeParametrageObjet") === 'modif') {
        if (($('#lilelle').val() === '')) {
            $('#lilelle').addClass('css-error');
            $('#lilelle').attr('style', 'border-width: 1px;background-color: #fff0f0;border-color: #A90329; ');
        } else {
            $('#lilelle').removeClass('css-error');
            $('#lilelle').attr('style', 'border-width: 1px; ');
        }
        /*   if (($('#password').val() === '')) {
         $('#password').addClass('css-error');
         $('#password').attr('style', 'border-width: 1px;background-color: #fff0f0;border-color: #A90329;  ');
         } else {
         $('#password').removeClass('css-error');
         $('#password').attr('style', 'border-width: 1px;  ');
         }*/
        if ($('.css-error').length > 0) {
            showNotification('Avertissement', "Veuillez vérifier le(s) champ(s) saisi(s) ! ", 'error', 3000);
            booAddEdit = false;
        }
        if (booAddEdit === false) {
            return false;
        }
        var payload = payloadObjet();
    }
    if (sessionStorage.getItem("typeParametrageObjet") === 'ajout') {
        addObjet(payload);
    } else {
        if (sessionStorage.getItem("typeParametrageObjet") === 'modif') {
            payload.code=$('#tableListObjet').find('tr.selectionnee').find('td').eq(0).text();
            updateObjet(payload);
        } else if (sessionStorage.getItem("typeParametrageObjet") === 'supp') {
                       var code=$('#tableListObjet').find('tr.selectionnee').find('td').eq(0).text();
            deleteObjet(code);
        }
    }
}
function DrawListObjet(idTable, idContainer) {
    showLoadingNotification();
    var List = [];
//    var varActif;
//    var etatActif = $('.filtreActif').find('.fa-check-circle').parent().find('span').eq(0).text();
//    if (etatActif === "Actif") {
//        varActif = "true";
//    } else if (etatActif === "Non actif") {
//        varActif = "false";
//    } else if (etatActif === "Tous") {
//        varActif = "true,false";
//    }
    List = findObjet();
    document.getElementById(idContainer).innerHTML = '';
    var table_list = "<table id='" + idTable + "' class='display dataTable projects-table table table-striped table-bordered table-hover' cellspacing='0'  width='100%' align='center'>";
    table_list += "</table>";
    $("#" + idContainer).html(table_list);
    var colDef = [2];
    table = $('#' + idTable).on('page.dt', function () {}).DataTable({
        "dom": 'frtip',
        "searching": true,
        destroy: false,
        bPaginate: true,
        sort: false,
        data: List,
        language: dataTablesLang,
        "pageLength": 10,
        columns: [
            {
                title: "code",
                data: 'code',
                render: function (data, type, row, meta) {
                    if (data !== null)
                        return data;
                    else
                        "";
                }
            },
            {
                title: "Lilelle ",
                data: 'lilelle',
                render: function (data) {
                    if (data === undefined)
                        return '';
                    else
                        return "<span title='" + data + "'>" + data + "</span>";
                }
            },
            {
                title: "DateCreation",
                data: 'dateCreation',
                render: function (data) {
                    if (data === undefined)
                        return '';
                    else
                        return formatCalendarWithTime(data, 'dd/mm/yyyy');
                }
            },
            {
                title: "Objet Creation",
                data: 'userCreation',
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
    $('#tableListObjet  tbody').delegate('tr', 'click', function (e) {
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
    $('#tableListObjet_info').css("padding", '0');
    $('#tableListObjet_filter').hide();
    hideLoadingNotification();
}
function findObjet() {
    var url = url_base + '/objets';

    var response = "";
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
function addObjet(list) {
    $.ajax({
        url: url_base + '/objets',
        type: 'POST',
        data: JSON.stringify(list),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data)
        {
            showNotification('Succès', "Ajout effectué avec succés", 'success', 3000);
            $('#modalObjet').modal('hide');
            DrawListObjet("tableListObjet", '_grid_ListObjet');
        }
    });
}
function findObjetByCode(code) {
    var response = "";
    $.ajax({
        url: url_base + '/objets/' + code,
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
function updateObjet(list) {
    $.ajax({
        url: url_base + '/objets',
        type: 'PUT',
        data: JSON.stringify(list),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data)
        {
            showNotification('Succès', "Modification effectuée avec succés", 'success', 3000);
            $('#modalObjet').modal('hide');
            DrawListObjet("tableListObjet", '_grid_ListObjet');
        }
    });
}
function deleteObjet(code) {
    $.ajax({
        url: url_base + '/objets/' + code,
        contentType: "text/html; charset=utf-8",
        type: 'DELETE',
        async: false,
        success: function (data)
        {
            showNotification('Succès', "Annulation effectuée avec succés", 'success', 3000);
            $('#modalObjet').modal('hide');
            DrawListObjet("tableListObjet", '_grid_ListObjet');
        }
    });
}
function payloadObjet() {
//    var actif = $('#actif').is(':checked') === true ? "true" : "false";
    var payload = {
        "lilelle": $('#lilelle').val(),
        "userCreation": "admin",
    };
    return payload;
}