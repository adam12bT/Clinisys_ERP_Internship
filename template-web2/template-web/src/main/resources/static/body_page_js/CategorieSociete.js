
$(function () {
    ActionBouttonCategorieSociete();
    window.parent.$.loader.open();
    setTimeout(function () {
        DrawListCategorieSociete("tableListCategorieSociete", '_grid_ListCategorieSociete');
        window.parent.$.loader.close();
    }, 100);

    $('#rafresh').unbind('click');
    $('#rafresh').bind('click', function (e) {
        showLoadingNotification();
        setTimeout(function () {
            DrawListCategorieSociete("tableListCategorieSociete", '_grid_ListCategorieSociete');
            hideLoadingNotification();
        }, 50);
    });

    $('.filtreActif').unbind('click');
    $('.filtreActif').bind('click', function (e) {
        $('.filtreActif').find('i').removeClass('fa-check-circle');
        $('.filtreActif').find('i').removeClass('fa-search');
        $('.filtreActif').find('i').addClass('fa-search');
        $(this).find('i').eq(0).removeClass('fa-search');
        $(this).find('i').eq(0).addClass('fa-check-circle');
        window.parent.$.loader.open();
        setTimeout(function () {
            DrawListCategorieSociete("tableListCategorieSociete", '_grid_ListCategorieSociete');
            window.parent.$.loader.close();
        }, 100);
    });

    $('#btnFermer').unbind('click');
    $('#btnFermer').bind('click', function (e) {
        window.parent.$('ul.ui-tabs-nav .active .closeRad').click();
    });
});

 