$(function () {
    ouvrirOnglet("Acceuil", "Acceuil", false, 'parent', '', 'Accueil');

    $('.minifyme').click();
    $('.minifyme').remove();
    $('#hide-menu').remove();
    $('.minifyme').click();
    window.parent.$(".global_breadcrumbs").html("<li>" + dictionnaire_local['template.acceuil.acceuil'] + "</li>");
});
