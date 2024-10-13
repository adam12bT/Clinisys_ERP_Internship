<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.DateFormat"%>
<%
     DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    String date = dateFormat.format(new Date());
%>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>  
<spring:eval var="url_base" expression="@environment.url_base"/>
<spring:eval var="idModule" expression="@environment.idModule"/>
<spring:eval var="url_base_access" expression="@environment.url_base_access"/>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title> Template </title>
        <meta name="description" content="">
        <meta name="author" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <!-- #CSS Links -->
        <!-- Basic Styles -->
        <jsp:include page="../body_page/css_declare.jsp"/>
        <link href="css/index.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <div class="containerBody">
            <div style="">
                <div>
                    <div id="authentification-box">
                        <div class="authentHeader">
                            <h1 class="logoCsys">
                                <img src="img/CSYS_LOGO_2015.png" alt="me">
                            </h1>
                            <div class="choixLangue">
                                <!-- langue -->
                                <ul id="liste_choix_langue" class="header-dropdown-list hidden-xs">
                                    <li class="">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                            <img id="langue_en_cours" src="img/blank.gif"> <span></span>
                                            <i class="fa fa-angle-down"></i>
                                        </a>
                                        <ul class="dropdown-menu pull-right" id="liste_langue">
                                            <li lang="fr">
                                                <a href="javascript:void(0);">
                                                    <img abr="fr">
                                                    <%--<img src="img/blank.gif" class="flag flag-fr" alt="français" abr="fr">--%>
                                                    Français</a>
                                            </li>
                                            <li lang="en">
                                                <a href="javascript:void(0);">
                                                    <img abr="en">
                                                    <%--<img src="img/blank.gif" class="flag flag-gb" alt="anglais" abr="en">--%>
                                                    English</a>
                                            </li>
                                            <li lang="ar">
                                                <a href="javascript:void(0);">
                                                    <img abr="ar">العربية
                                                    <%--<img src="img/blank.gif" class="flag flag-sa" alt="arabe" abr="ar">العربية--%>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="authentBody">
                            <div class="logoClient">
                                <h1>
                                    <img src="img/fichBase.jpg" alt="" width="128" height="128"/>
                                </h1>
                            </div>
                            <div class="formContainer">
                                <form id="login-form" class="smart-form client-form"
                                      novalidate="novalidate">
                                    <fieldset>
                                        <section>
                                            <label class="input">
                                                <i class="icon-append fa fa-user"></i>
                                                <spring:message code="input.username" var="username_placeholder"/>
                                                <input id="username" placeholder="${username_placeholder}" type="text"
                                                       name="email">
                                            </label>
                                        </section> 
                                        <section>
                                            <label class="input">
                                                <i class="icon-append fa fa-lock"></i>
                                                <spring:message code="input.password" var="password_placeholder"/>
                                                <input id="password" placeholder="${password_placeholder}" type="password"
                                                       name="password">
                                            </label>
                                        </section>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                        <div class="authentFooter">
                            <button id="submit" class="btn btn-primary pull-right">
                                <spring:message code="button.submit"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            var url_base_Fichier_Base = "${url_base_Fichier_Base}";
            var url_base = "${url_base}";
            var idModule = "${idModule}";
            var url_base_access = "${url_base_access}";
        </script>
        <script src="js/jquery/jquery.min.js"></script>
        <script src="js/bootbox.min.js" type="text/javascript"></script>
        <script src="js/bootstrap/bootstrap.min.js"></script>
        <script src="js/notification/SmartNotification.min.js"></script>
        <script src="js/plugin/bootstrap-plugin/bootstrap-checkbox.js" type="text/javascript"></script>
        <script src="js/helper_functions.js"></script>
        <script src="body_page_js/authentification.js?version=<%=date%>"></script>
    </body>
</html>