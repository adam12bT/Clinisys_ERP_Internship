
$(function () {
    ActionBouttonUser();
    window.parent.$.loader.open();
    setTimeout(function () {
        DrawListUser("tableListUser", '_grid_ListUser');
        window.parent.$.loader.close();
    }, 100);

    $('#rafresh').unbind('click');
    $('#rafresh').bind('click', function (e) {
        showLoadingNotification();
        setTimeout(function () {
            DrawListUser("tableListUser", '_grid_ListUser');
            hideLoadingNotification();
        }, 50);
    });

    $('#btnFermer').unbind('click');
    $('#btnFermer').bind('click', function (e) {
        window.parent.$('ul.ui-tabs-nav .active .closeRad').click();
    });
});

 