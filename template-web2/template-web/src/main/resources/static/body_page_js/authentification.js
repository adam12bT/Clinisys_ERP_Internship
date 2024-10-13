let username, password, validate;
let url_authentification = `${url_base_access}/gestion-access-core/login`;

let url_menu = "/template-web/menu";

$(document).ready(function (e) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${url_base_Fichier_Base}/fichier-base-core/api/utilisateur/is-authenticated`);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("x-auth-token", localStorage.getItem("x-auth-token"));
    xhr.onload = function () {
        if (xhr.status === 200 && xhr.response !== null) {
            window.location.href = "/template-web/reconnect";
        }
    };
    xhr.send(JSON.stringify());
    NodeList.prototype.forEach = Array.prototype.forEach;
    if (window.sessionStorage) {
        $("#username").val(window.localStorage.getItem('loginTemplate'));
        $("#password").val(window.localStorage.getItem('passwordTemplate'));
    }
    username = document.getElementById("username");
    password = document.getElementById("password");
    validate = document.getElementById("submit");

    if (username !== null)
        username.focus();

    if (validate !== null)
        validate.addEventListener("click", validerAuthentification, true);

    document.addEventListener("keypress", function (e) {
        let key = e.keyCode || e.which;
        if (key === 13)
            validerAuthentification();
    });

    langue();

    if (document.getElementById("liste_langue") !== null) {
        document.getElementById("liste_langue").addEventListener("click", function (e) {
            let imgElement = e.target.querySelectorAll("img")[0];
            let abr = imgElement.getAttribute("abr");

            localStorage.setItem("langue", abr);
            if (abr === "fr")
                localStorage.setItem("langue_index", 0);
            else if (abr === "en")
                localStorage.setItem("langue_index", 1);
            else if (abr === "ar")
                localStorage.setItem("langue_index", 2);

            window.location.href = window.location.origin + window.location.pathname + "?lang=" + abr;
        });
    }
});
/**
 * Affecter langue de l'application (FR par défaut si aucune langue trouvée dans la session
 */
function langue() {
    let lang = localStorage.getItem("langue");
    let element;
    if (lang !== null) {
        element = document.querySelectorAll("#liste_langue > li[lang=" + lang + "]")[0];
        if (element !== undefined)
            element.classList.add("active");
    } else {
        element = document.querySelectorAll("#liste_langue > li[lang=fr]")[0];
        if (element !== undefined)
            element.classList.add("active");
        localStorage.setItem("langue", "fr");
        localStorage.setItem("langue_index", 0);
    }

    if (element !== undefined) {
        let imgElement = element.querySelectorAll("img")[0];
        let abr = imgElement.getAttribute("abr");
        let class_img = imgElement.getAttribute("class");
        let alt = imgElement.getAttribute("alt");

        let langue_en_cours = document.getElementById("langue_en_cours");
        langue_en_cours.setAttribute("class", class_img);
        langue_en_cours.setAttribute("alt", alt);
        langue_en_cours.setAttribute("abr", abr);
        langue_en_cours.parentElement.querySelectorAll("span")[0].innerHTML = abr;
    }
}
/**
 * Valider champs authentification
 */
function validerAuthentification() {
    let data = {};
    data["user"] = username.value;
    data["pass"] = password.value;


    authenticate(data);
//    localStorage.setItem("username", data["user"]);
}
/**
 * Effectuer l'authentification
 * @param data contient le nom d'utilisateur et le password saisis
 * @example
 * data = {
 user = "",
 pass= "",
 };
 */
function authenticate(data) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url_authentification, true);
    xhr.setRequestHeader("Accept-Language", sessionStorage.getItem("langue"));
    xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if ($('input[type="checkbox"]').is(':checked')) {
                    window.localStorage.setItem('loginTemplate', data["user"]);
                    window.localStorage.setItem('passwordTemplate', data["pass"]);
                }
                localStorage.setItem("username", data["user"]);
                let token = xhr.responseText;
                window.localStorage.setItem("x-auth-token", token);
                document.cookie = "x-auth-token=" + token + ";path=/";
    window.location.href = url_menu;
            } else {
                showNotification('Attention', "Veuillez vérifier votre nom d'utilisateur / mot de passe ! ", 'error', 3000);
            }
        }
    });

    let params = "username=" + data["user"] + "&password=" + encodeURIComponent(data["pass"].toLowerCase()) + "&submit=Login";
    xhr.send(params);
}

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
    }
}