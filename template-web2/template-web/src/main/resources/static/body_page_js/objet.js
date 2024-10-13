
$(function () {
    ActionBouttonObjet();
    window.parent.$.loader.open();
    setTimeout(function () {
        DrawListObjet("tableListObjet", '_grid_ListObjet');
        window.parent.$.loader.close();
    }, 100);

    $('#rafresh').unbind('click');
    $('#rafresh').bind('click', function (e) {
        showLoadingNotification();
        setTimeout(function () {
            DrawListObjet("tableListObjet", '_grid_ListObjet');
            hideLoadingNotification();
        }, 50);
    });

    $('#btnFermer').unbind('click');
    $('#btnFermer').bind('click', function (e) {
        window.parent.$('ul.ui-tabs-nav .active .closeRad').click();
    });
});

 