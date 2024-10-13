
function ActionBouttonUser() {
  

    $('#btn_Ajouter').unbind('click');
    $('#btn_Ajouter').bind('click', function (e) {
        confAddUser();
    });

   
    $('#btn_Modifier').unbind('click');
    $('#btn_Modifier').bind('click', function (e) {
        var rowDde = $('#tableListUser').find('tr.selectionnee');
        if (rowDde.length === 0)
        {
            showNotification('Avertissement', "Veuillez choisir un utilisateur", 'error', 3000);
        } else
        {
            sessionStorage.setItem("typeParametrageUser", 'modif');
            var username = rowDde.find('td').eq(0).text();
            majUser(username);
        }

    });

    $('#btn_Annuler').unbind('click');
    $('#btn_Annuler').bind('click', function (e) {
        var rowDde = $('#tableListUser').find('tr.selectionnee');
        if (rowDde.length === 0)
        {
            showNotification('Avertissement', "Veuillez choisir un utilisateur", 'error', 3000);
        } else
        {
            sessionStorage.setItem("typeParametrageUser", 'supp');
            var username = rowDde.find('td').eq(0).text();
            majUser(username);
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
function confAddUser() {
    sessionStorage.setItem("typeParametrageUser", 'ajout');
    clearModalUser();
    $('#labelTitre').text("Ajout d'un utilisateur ");
    $('#modalIcon').removeClass().addClass("glyphicon glyphicon-plus");
    $('#modalUser').modal('show');
}
function clearModalUser() {
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
function majUser(username) {
    var User = findUserByCode(username);
    if (User !== null) {
        var password = User.password !== null ? User.password : '';
        var description = User.description;
        $('#description').val(description);
        $('#password').val(password);
        $('#username').val(username);
        if (sessionStorage.getItem("typeParametrageUser") === 'modif') {
            modeModifUser();
        }
        if (sessionStorage.getItem("typeParametrageUser") === 'supp')
        {
            modeSuppUser();
        }
        $('#modalUser').modal('show');
    }
}
function modeModifUser() {
    $('#labelTitre').html("Modification d'un utilisateur ");
    $('#modalIcon').removeClass("glyphicon-trash");
    $('#modalIcon').removeClass("glyphicon-th-list");
    $('#modalIcon').removeClass("glyphicon-plus");
    $('#modalIcon').addClass("glyphicon-edit");
    $('.css-error').attr('style', 'border-width: 1px;');
    $('.css-error').removeClass("css-error");
    $('#username').prop("disabled", "disabled");
    $('#password').prop("disabled", false);
    $('#description').prop("disabled", "");
    $("#btnADDCategorie").show();
}
function modeSuppUser() {
    $('#labelTitre').html("Annulation d'un utilisateur ");
    $('#modalIcon').removeClass("glyphicon-edit");
    $('#modalIcon').removeClass("glyphicon-th-list");
    $('#modalIcon').removeClass("glyphicon-plus");
    $('#modalIcon').addClass("glyphicon-trash");
    $('.css-error').attr('style', 'border-width: 1px;');
    $('.css-error').removeClass("css-error");
    $('#username').prop("disabled", "disabled");
    $('#password').prop("disabled", "disabled");
    $('#description').prop("disabled", "disabled");
    $("#btnADDCategorie").show();
}
function onclickBtnValider() {
    var booAddEdit = true;
    if (sessionStorage.getItem("typeParametrageUser") === 'ajout' || sessionStorage.getItem("typeParametrageUser") === 'modif') {
        if (($('#username').val() === '')) {
            $('#username').addClass('css-error');
            $('#username').attr('style', 'border-width: 1px;background-color: #fff0f0;border-color: #A90329; ');
        } else {
            $('#username').removeClass('css-error');
            $('#username').attr('style', 'border-width: 1px; ');
        }
        if (($('#password').val() === '')) {
            $('#password').addClass('css-error');
            $('#password').attr('style', 'border-width: 1px;background-color: #fff0f0;border-color: #A90329;  ');
        } else {
            $('#password').removeClass('css-error');
            $('#password').attr('style', 'border-width: 1px;  ');
        }
        if ($('.css-error').length > 0) {
            showNotification('Avertissement', "Veuillez vérifier le(s) champ(s) saisi(s) ! ", 'error', 3000);
            booAddEdit = false;
        }
        if (booAddEdit === false) {
            return false;
        }
        var payload = payloadUser();
    }
    if (sessionStorage.getItem("typeParametrageUser") === 'ajout') {
        addUser(payload);
    } else {
        if (sessionStorage.getItem("typeParametrageUser") === 'modif') {
            updateUser(payload);
        } else if (sessionStorage.getItem("typeParametrageUser") === 'supp') {
            deleteUser($('#username').val());
        }
    }
}
function DrawListUser(idTable, idContainer) {
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
    List = findUser();
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
                title: "Login",
                data: 'username',
                render: function (data, type, row, meta) {
                    if (data !== null)
                        return data;
                    else
                        "";
                }
            },
            {
                title: "Mot de passe ",
                data: 'password',
                render: function (data) {
                    if (data === undefined)
                        return '';
                    else
                        return "<span title='" + data + "'>" + data + "</span>";
                }
            },
            {
                title: "Description",
                data: 'description',
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
    $('#tableListUser  tbody').delegate('tr', 'click', function (e) {
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
    $('#tableListUser_info').css("padding", '0');
    $('#tableListUser_filter').hide();
    hideLoadingNotification();
}
function findUser() {
    var url = url_base + '/users';
    
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
function addUser(list) {
    $.ajax({
        url: url_base+ '/users' ,
        type: 'POST',
        data: JSON.stringify(list),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data)
        {
            showNotification('Succès', "Ajout effectué avec succés", 'success', 3000);
           $('#modalUser').modal('hide');
            DrawListUser("tableListUser", '_grid_ListUser');
        }
    });
}
function findUserByCode(username) {
    var response = "";
    $.ajax({
        url: url_base + '/users/' + username,
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
function updateUser(list) {
    $.ajax({
        url: url_base+ '/users' ,
        type: 'PUT',
        data: JSON.stringify(list),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data)
        {
            showNotification('Succès', "Modification effectuée avec succés", 'success', 3000);
            $('#modalUser').modal('hide');
            DrawListUser("tableListUser", '_grid_ListUser');
        }
    });
}
function deleteUser(username) {
    $.ajax({
        url: url_base+ '/users/' + username ,
        contentType: "text/html; charset=utf-8",
        type: 'DELETE',
        async: false,
        success: function (data)
        {
            showNotification('Succès', "Annulation effectuée avec succés", 'success', 3000);
            $('#modalUser').modal('hide');
            DrawListUser("tableListUser", '_grid_ListUser');
        }
    });
}
function payloadUser() {
//    var actif = $('#actif').is(':checked') === true ? "true" : "false";
    var payload = {
        "username": $('#username').val(),
        "password": $('#password').val(),
        "description": $('#description').val(),
    };
    return payload;
}