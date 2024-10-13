<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %> 
<sec:csrfInput />
<spring:eval var="url_base" expression="@environment.url_base"/>
<spring:eval var="idModule" expression="@environment.idModule"/>
<spring:eval var="url_base_access" expression="@environment.url_base_access"/>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <jsp:include page="../body_page/css_declare.jsp"/>
        <link rel="stylesheet" type="text/css" media="all" href="css/accueil.css">
        <style>
            .jarvismetro-tile .iconbox span {
                display: block;
            }
            .select_depot .select2-results .select2-result-label{
                padding:0;
            }
            label{
                font-size: 12px;
                font-weight: 300;
            }
        </style> 
        <script src="js/bootbox.min.js" type="text/javascript"></script>
        <title><spring:message code="template.acceuil.acceuil"/></title> 
    </head>
    <body class="styleCsys"  id="my_body" ><!-- oncontextmenu="return false" -->
        <section id="widget-grid" class="">
            <div class="row">
                <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="module">
                        <a parent="principal"><i class="far fa-folder-open fa-2x"></i><p><spring:message code="title.module"/></p></a>

                    </div>

                    <div id="listModules" class="modulesContainer">
                        <ul>


                        </ul>
                    </div>      
                </article>
            </div>
            <!-- end widget div -->




        </section> 
        <jsp:include page="js_declare.jsp"/>
        <jsp:include page="EditionSessionExpire.jsp"/>
        <script>
            var url_base = "${url_base}";
            var idModule = "${idModule}";
            var url_base_access = "${url_base_access}";
            if (localStorage.getItem("langue") === "ar") {
                let url = "css/AR.css";
                let head = document.getElementsByTagName("head")[0];
                let link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                head.appendChild(link);
            }
        </script>
        <script src="js/jquery.animateNumber.min.js"></script>
        <script src="body_page_js/Acceuil.js"></script>
        <script src="body_page_js/Acceuil_function.js"></script>
        <script src="js/plugin/other-plugin/summernote.min.js"></script>
        <script src="js/helper_functions.js"></script>
        <script src="body_page_js/otherfunction.js" type="text/javascript"></script> 
    </body>
</html>