
$(function () {
    document.getElementById('userName').textContent = localStorage.getItem("username");
    $("#back").unbind("click");
    $("#back").bind("click", function (e) {
        window.location.href = "/template-web/index";
    });
    $("#submit").unbind("click");
    $("#submit").bind("click", function (e) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `${url_base}/fichier-base-core/logout`);
        xhr.responseType = "json";
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("x-auth-token", localStorage.getItem("x-auth-token"));
        xhr.onload = function () {
            if (xhr.status === 200) {
                localStorage.removeItem("username");
                window.localStorage.removeItem("x-auth-token");
                document.cookie = "";
                window.location.href = "/template-web/";
            }
        };
        xhr.send(JSON.stringify());

    });
});









