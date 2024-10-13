
function ActionBouttonCategorieSociete() {
    $('#submitAdd').unbind('click');
    $('#submitAdd').bind('click', function (e) {
        var payload = payloadCategorieSociete();
        addCategorieSociete(payload);
    });

    $('#btn_Ajouter').unbind('click');
    $('#btn_Ajouter').bind('click', function (e) {
        confAddCategorieSociete();
    });

    $('#btn_Imprimer').unbind('click');
    $('#btn_Imprimer').bind('click', function (e) {
        var varActif;
        var etatActif = $('.filtreActif').find('.fa-check-circle').parent().find('span').eq(0).text();
        if (etatActif === "Actif") {
            varActif = "true";
        } else if (etatActif === "Non actif") {
            varActif = "false";
        } else if (etatActif === "Tous") {
            varActif = "true,false";
        }
        var type = "PDF";
        var url = url_base_Fichier_Base + '/fichier-base-core/api/categoriesocietes/print?actifs= ' + varActif + '&user=' + window.localStorage.getItem('username') + '&type=' + type;
        impressionListe(url);
    });

    $("#btn_Exporter").unbind("click");
    $("#btn_Exporter").bind("click", function (e) {
        var varActif;
        var etatActif = $('.filtreActif').find('.fa-check-circle').parent().find('span').eq(0).text();
        if (etatActif === "Actif") {
            varActif = "true";
        } else if (etatActif === "Non actif") {
            varActif = "false";
        } else if (etatActif === "Tous") {
            varActif = "true,false";
        }
        var type = "Excel";
        var url = url_base_Fichier_Base + '/fichier-base-core/api/categoriesocietes/print?actifs= ' + varActif + '&user=' + window.localStorage.getItem('username') + '&type=' + type;
        exporterList(url, "CATÉGORIES DES SOCIÉTÉS");
    });

    $('#btn_Modifier').unbind('click');
    $('#btn_Modifier').bind('click', function (e) {
        var rowDde = $('#tableListCategorieSociete').find('tr.selectionnee');
        if (rowDde.length === 0)
        {
            showNotification('Avertissement', "Veuillez choisir une catégorie de société", 'error', 3000);
        } else
        {
            sessionStorage.setItem("typeParametrageCategorieSociete", 'modif');
            var code = rowDde.find('td').eq(0).text();
            majCategorieSociete(code);
        }

    });

    $('#btn_Annuler').unbind('click');
    $('#btn_Annuler').bind('click', function (e) {
        var rowDde = $('#tableListCategorieSociete').find('tr.selectionnee');
        if (rowDde.length === 0)
        {
            showNotification('Avertissement', "Veuillez choisir une catégorie de société", 'error', 3000);
        } else
        {
            sessionStorage.setItem("typeParametrageCategorieSociete", 'supp');
            var code = rowDde.find('td').eq(0).text();
            majCategorieSociete(code);
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
function confAddCategorieSociete() {
    sessionStorage.setItem("typeParametrageCategorieSociete", 'ajout');
    clearModalCategorieSociete();
    $('#labelTitre').text("Ajout d'une catégorie de société ");
    $('#modalIcon').removeClass().addClass("glyphicon glyphicon-plus");
    $('#modalCategorieSociete').modal('show');
}
function clearModalCategorieSociete() {
    $('#code').val('');
    $('.css-error').attr('style', 'border-width: 1px;');
    $('.css-error').removeClass("css-error");
    $('#des').val('');
    $('#des').prop("disabled", false);
    $('#actif').prop("checked", true);
    $('#code').prop('disabled', false);
    $('#actif').prop('disabled', '');
    $("#btnADDCategorie").show();
}
function majCategorieSociete(code) {
    var CategorieSociete = findCategorieSocieteByCode(code);
    if (CategorieSociete !== null) {
        var codCateg = CategorieSociete.codCateg !== null ? CategorieSociete.codCateg : '';
        var desCateg = CategorieSociete.desCateg !== null ? CategorieSociete.desCateg : '';
        var actif = CategorieSociete.actif;
        $('#code').val(codCateg);
        $('#des').val(desCateg);
        if (actif === true) {
            $('#actif').prop("checked", "checked");
        } else {
            $('#actif').prop("checked", "");
        }
        if (sessionStorage.getItem("typeParametrageCategorieSociete") === 'modif') {
            modeModifCategorieSociete();
        }
        if (sessionStorage.getItem("typeParametrageCategorieSociete") === 'supp')
        {
            modeSuppCategorieSociete();
        }
        $('#modalCategorieSociete').modal('show');
    }
}
function modeModifCategorieSociete() {
    $('#labelTitre').html("Modification d'une catégorie de société ");
    $('#modalIcon').removeClass("glyphicon-trash");
    $('#modalIcon').removeClass("glyphicon-th-list");
    $('#modalIcon').removeClass("glyphicon-plus");
    $('#modalIcon').addClass("glyphicon-edit");
    $('.css-error').attr('style', 'border-width: 1px;');
    $('.css-error').removeClass("css-error");
    $('#code').prop("disabled", "disabled");
    $('#des').prop("disabled", false);
    $('#actif').prop("disabled", "");
    $("#btnADDCategorie").show();
}
function modeSuppCategorieSociete() {
    $('#labelTitre').html("Annulation d'une catégorie de société ");
    $('#modalIcon').removeClass("glyphicon-edit");
    $('#modalIcon').removeClass("glyphicon-th-list");
    $('#modalIcon').removeClass("glyphicon-plus");
    $('#modalIcon').addClass("glyphicon-trash");
    $('.css-error').attr('style', 'border-width: 1px;');
    $('.css-error').removeClass("css-error");
    $('#code').prop("disabled", "disabled");
    $('#des').prop("disabled", "disabled");
    $('#actif').prop("disabled", "disabled");
    $("#btnADDCategorie").show();
}
function onclickBtnValider() {
    var booAddEdit = true;
    if (sessionStorage.getItem("typeParametrageCategorieSociete") === 'ajout' || sessionStorage.getItem("typeParametrageCategorieSociete") === 'modif') {
        if (($('#code').val() === '')) {
            $('#code').addClass('css-error');
            $('#code').attr('style', 'border-width: 1px;background-color: #fff0f0;border-color: #A90329; ');
        } else {
            $('#code').removeClass('css-error');
            $('#code').attr('style', 'border-width: 1px; ');
        }
        if (($('#des').val() === '')) {
            $('#des').addClass('css-error');
            $('#des').attr('style', 'border-width: 1px;background-color: #fff0f0;border-color: #A90329;  ');
        } else {
            $('#des').removeClass('css-error');
            $('#des').attr('style', 'border-width: 1px;  ');
        }
        if ($('.css-error').length > 0) {
            showNotification('Avertissement', "Veuillez vérifier le(s) champ(s) saisi(s) ! ", 'error', 3000);
            booAddEdit = false;
        }
        if (booAddEdit === false) {
            return false;
        }
        var payload = payloadCategorieSociete();
    }
    if (sessionStorage.getItem("typeParametrageCategorieSociete") === 'ajout') {
        addCategorieSociete(payload);
    } else {
        if (sessionStorage.getItem("typeParametrageCategorieSociete") === 'modif') {
            updateCategorieSociete(payload);
        } else if (sessionStorage.getItem("typeParametrageCategorieSociete") === 'supp') {
            deleteCategorieSociete($('#code').val());
        }
    }
}
function DrawListCategorieSociete(idTable, idContainer) {
    showLoadingNotification();
    var List = [];
    var varActif;
    var etatActif = $('.filtreActif').find('.fa-check-circle').parent().find('span').eq(0).text();
    if (etatActif === "Actif") {
        varActif = "true";
    } else if (etatActif === "Non actif") {
        varActif = "false";
    } else if (etatActif === "Tous") {
        varActif = "true,false";
    }
    List = findCategorieSocieteByActif(varActif, undefined);
    document.getElementById(idContainer).innerHTML = '';
    var table_list = "<table id='" + idTable + "' class='display dataTable projects-table table table-striped table-bordered table-hover' cellspacing='0'  width='100%' align='center'>";
    table_list += "</table>";
    $("#" + idContainer).html(table_list);
    var colDef = [2];
    var pageLength = parseInt(($(document).height() - 220) / 34);
    table = $('#' + idTable).on('page.dt', function () {}).DataTable({
        "dom": 'frtip',
        "searching": true,
        destroy: false,
        bPaginate: true,
        sort: false,
        data: List,
        language: dataTablesLang,
        "pageLength": pageLength,
        columns: [
            {
                title: "Code",
                data: 'codCateg',
                render: function (data, type, row, meta) {
                    if (data !== null)
                        return data;
                    else
                        "";
                }
            },
            {
                title: "Désignation",
                data: 'desCateg',
                render: function (data) {
                    if (data === undefined)
                        return '';
                    else
                        return "<span title='" + data + "'>" + data + "</span>";
                }
            },
            {
                title: "Créé par",
                data: 'userCreation',
                render: function (data) {
                    if (data === undefined)
                        return '';
                    else
                        return "<span title='" + data + "'>" + data + "</span>";
                }
            }, {
                data: 'dateCreation',
                title: 'Date de création',
                render: function (data) {
                    if (data === null || data === undefined)
                        return '';
                    else
                        return formatCalendarWithTime(data, 'dd/mm/yyyy');
                }
            },
            {
                data: 'actif',
                title: 'Actif',
                sortable: false,
                render: function (data, type, row, meta) {
                    var check = data === true ? "checked" : "unchecked";
                    return '<form><label style="display: flex;justify-content: center;align-items: center; "><input type="checkbox" class="checkbox" disabled="" ' + check + '><span></span></label></form>';

                }
            }
        ],
        "aoColumnDefs": [{
                'bSortable': false,
                'aTargets': colDef
            }],
        "order": [[0, "asc"]]
    });
    $('#tableListCategorieSociete  tbody').delegate('tr', 'click', function (e) {
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
    $('#tableListCategorieSociete_info').css("padding", '0');
    $('#tableListCategorieSociete_filter').hide();
    hideLoadingNotification();
}
function findCategorieSocieteByActif(actif, designation) {
    var url = url_base_Fichier_Base + '/fichier-base-core/api/categoriesocietes/filter';
    if (actif !== undefined && designation !== undefined) {
        url = url + '?actifs=' + actif + '&designation=' + designation;
    } else if (actif !== undefined) {
        url = url + '?actifs=' + actif;
    } else if (designation !== undefined) {
        url = url + '?designation=' + designation;
    }
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
function addCategorieSociete(list) {
    $.ajax({
        url: url_base_Fichier_Base + '/fichier-base-core/api/categoriesocietes?user=' + window.localStorage.getItem('username'),
        type: 'POST',
        data: JSON.stringify(list),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data)
        {
            showNotification('Succès', "Ajout effectué avec succés", 'success', 3000);
            $('#addConfirm').modal('hide');
            $('#modalCategorieSociete').modal('hide');
            DrawListCategorieSociete("tableListCategorieSociete", '_grid_ListCategorieSociete');
        }
    });
}
function generateCodeAutoByparam(param) {
    var response = "";
    $.ajax({
        url: url_base_Fichier_Base + '/fichier-base-core/api/paramcodetables?param=' + param,
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
function findCategorieSocieteByCode(codCateg) {
    var response = "";
    $.ajax({
        url: url_base_Fichier_Base + '/fichier-base-core/api/categoriesocietes?codCateg=' + codCateg,
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
function updateCategorieSociete(list) {
    $.ajax({
        url: url_base_Fichier_Base + '/fichier-base-core/api/categoriesocietes?user=' + window.localStorage.getItem('username'),
        type: 'PUT',
        data: JSON.stringify(list),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data)
        {
            showNotification('Succès', "Modification effectuée avec succés", 'success', 3000);
            $('#modalCategorieSociete').modal('hide');
            DrawListCategorieSociete("tableListCategorieSociete", '_grid_ListCategorieSociete');
        }
    });
}
function deleteCategorieSociete(codCateg) {
    $.ajax({
        url: url_base_Fichier_Base + '/fichier-base-core/api/categoriesocietes?codCateg=' + codCateg + '&user=' + window.localStorage.getItem('username'),
        contentType: "text/html; charset=utf-8",
        type: 'DELETE',
        async: false,
        success: function (data)
        {
            showNotification('Succès', "Annulation effectuée avec succés", 'success', 3000);
            $('#modalCategorieSociete').modal('hide');
            DrawListCategorieSociete("tableListCategorieSociete", '_grid_ListCategorieSociete');
        }
    });
}
function payloadCategorieSociete() {
    var actif = $('#actif').is(':checked') === true ? "true" : "false";
    var payload = {
        "codCateg": $('#code').val(),
        "desCateg": $('#des').val(),
        "actif": actif
    };
    return payload;
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
                data: 'codCateg',
                render: function (data, type, row, meta) {
                    if (data !== null)
                        return data;
                    else
                        "";
                }
            },
            {
                title: "Libellé",
                data: 'desCateg',
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
}