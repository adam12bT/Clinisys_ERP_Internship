var royal_tab_api = null;

function addEventMouse(btn, cont) {
    cont.$(btn).bind("mouseenter", function (e) {
        $(this).removeClass('fa-times');
        $(this).addClass('fa-times-circle');
    });
    cont.$(btn).bind("mouseleave", function (e) {
        $(this).removeClass('fa-times-circle');
        $(this).addClass('fa-times');
        $(this).removeAttr('style');
        $(this).css('margin', '5px');
    });
}
function ouvrirOnglet(titre, src, repetee, container, param, namePage) {
    var test = false;
    if (container === 'parent') {
        var cont = window;
    } else {
        cont = window.parent;
    }
    if (royal_tab_api === null) {
        royal_tab_api = new Royal_Tab_Api(cont.$('div.royal_tab'));
    }
    if (param === undefined) {
        param = '';
    }
    var nb = cont.$('#main').find('iframe[namePage=' + namePage + ']').length;
    if (!repetee) {
        if (nb === 0)
        {
            royal_tab_api.add(0, true, titre, '<iframe id="' + namePage + '" namePage="' + namePage + '" src="' + src + param + '" width="100%" height="3000" frameborder="0"/>');
            test = true;
            if (src !== "Acceuil") {
                cont.$('.ui-tabs-nav').find('li').eq(0).append("<span class='fa fa-times closeRad' style='margin: 5px;color: black;'></span>");
                addEventMouse(".closeRad", cont);
                cont.$(".closeRad").unbind('click');
                cont.$(".closeRad").bind('click', function () {
                    var indx = $(this).parents('li').index();
                    royal_tab_api.remove(indx);
                    cont.$(".ui-tabs-nav").find('li').eq(indx).click();
                });
            }

        } else {
            var index = cont.$('iframe[namePage=' + namePage + ']').parent('div').parent('div').index();
            royal_tab_api.open(index);
            test = false;
        }

    } else {
        royal_tab_api.add(0, true, titre, '<iframe id="' + namePage + '" namePage="' + namePage + '" src="' + src + param + '" width="100%" height="3000" frameborder="0" style="display:none;" onload="this.style.display = \'block\';"/>');
        test = true;
        cont.$('.ui-tabs-nav').find('li').eq(0).append("<span class='fa fa-times closeRad' style='margin: 5px;color: black;'></span>");
        addEventMouse(".closeRad", cont);
        cont.$(".closeRad").unbind('click');
        cont.$(".closeRad").bind('click', function () {
            var indx = $(this).parents('li').index();
            royal_tab_api.remove(indx);
            cont.$(".ui-tabs-nav").find('li').eq(indx).click();
        });
    }
    if (cont.$('div iframe[namePage=' + namePage + ']').contents().find('#rafresh').length === 1)
        cont.$('div iframe[namePage=' + namePage + ']').contents().find('#rafresh').click();
    titre = titre.toUpperCase();
    cont.$(".global_breadcrumbs").find('li').eq(0).html(titre);
    cont.$(".ui-tabs-nav").find('li').bind("click", function (event) {
        var title = $(this).text().toUpperCase();
        cont.$(".global_breadcrumbs").find('li').eq(0).html(title);

    });
    return test;
}
function fermerOngletActif(container, indx) {
    if (container === 'parent') {
        var cont = window;
    } else {
        cont = window.parent;
    }
    if (royal_tab_api === null) {
        royal_tab_api = new Royal_Tab_Api(cont.$('div.royal_tab'));
    }
    royal_tab_api.remove(indx);
}