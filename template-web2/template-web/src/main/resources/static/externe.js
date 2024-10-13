var QueryString = getUrlObjectParams();
if (QueryString.login !== "" && QueryString.password !== "" && QueryString.dossier !== "")
{
    var resultat = authentification_acceuil(QueryString.login, QueryString.password, "normal");
    if (resultat.indexOf('succes') > -1)
    {
        window.location.href = './master_page/index.jsp';
    } else
        alert('echec')
}

function getUrlObjectParams()
{
    var QueryString = function () {
        var query_string = {};
        var query = window.parent.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], pair[1]];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }

        return query_string;
    }();

    return QueryString;
}



function getSession_externe(url)
{
    var listRep;
    $.ajax({
        url: "./" + url + "?type=consult&function=getSession",
        type: 'POST',
        async: false,
        error: function (jqXHR, textStatus, errorThrown) {

        },
        complete: function (jqXHR, textStatus) {

        },
        success: function (data, textStatus, jqXHR) {

            listRep = eval('(' + data + ')');
        }


    });
    return listRep;
}
function authentification_acceuil(user, password) {
    var response = "";
    $.ajax({
        url: "./Servlet?function=Authentification&user=" + user + "&param=0",
        type: 'POST',
        async: false,
        data: {

            password: password,

        },
        error: function (jqXHR, textStatus, errorThrown) {
        },
        complete: function (jqXHR, textStatus) {

        },
        success: function (data, textStatus, jqXHR) {

            response = data;
        }
    });
    return response;
}

   