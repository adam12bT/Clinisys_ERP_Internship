<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %> 
<spring:eval var="url_base" expression="@environment.url_base"/>
<spring:eval var="idModule" expression="@environment.idModule"/>
<spring:eval var="url_base_access" expression="@environment.url_base_access"/>
<spring:eval var="currencyScale" expression="@environment.currencyScale"/>
<!DOCTYPE html>
<html  style="overflow: hidden!important;">
    <head>  
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Template</title>
        <meta name="description" content="">
        <meta name="author" content=""> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <jsp:include page="../body_page/css_declare.jsp"/>
        <link rel="stylesheet" type="text/css" media="all" href="css/menu.css">
        <link rel="stylesheet" type="text/css" media="all" href="css/menuCsys.css">
        <link rel="stylesheet" type="text/css" media="all" href="css/styleCsys.css">
        <style>
            .demo{
                visibility:hidden !important;
            }
            @media all and (max-device-width: 768px) 
            {
                #width_image
                {
                    width: 90% !important;
                }
            }

            @media screen and (min-width: 1200px) 
            {
                #width_image
                {
                    width: 50% !important;
                }
            }
            .ajax-dropdown:after,
            .ajax-dropdown:before{
                left: 67%;
            }
            .dropdown-menu {
                background-color: #EFEFEF;
                font-family: serif
            }
            #ribbon > div, #ribbon > div > div{
                height : 100%;
            }
            #ribbon{
                position: fixed;
                right: 0px;
                left: 0px;
                bottom: 0px;
                top: 38px;
            }
            .views, .views div{
                height:100%;
            }
            .views div iframe{
                height: calc(100% - 9px) !important;
            }
            #alert{
                position: relative;  
            }  
            #sideAlert {
                height: 100%; /* 100% Full-height */
                width: 0; /* 0 width - change this with JavaScript */
                position: fixed; /* Stay in place */
                z-index: 1; /* Stay on top */
                top: 0;
                right: 0;
                background-color: white;
                overflow-x: hidden; /* Disable horizontal scroll */
                /* Place content 60px from the top */
                transition: 1.5s; /* 0.5 second transition effect to slide in the sidenav */
                box-shadow: -6px 0px 7px -1px rgba(0,0,0,0.75);
            }

            #sideAlert b { 
                position: absolute;
                right:0;
            }
            #sideAlert li { 
                position: relative;
                white-space: nowrap;
                padding: 8px 16px;
                border-bottom: 1px solid #ddd;
                font-weight: 700;
            }
            #sideAlert ul {
                list-style-type: none;
                padding: 0;
                border: 1px solid #ddd;
                padding: 8px 16px;
                border-bottom: 1px solid #ddd;

            }


            #sideAlert ul li:last-child {
                border-bottom: none   
            }
            .global_breadcrumbs {
                padding: 8px 15px;
                list-style: none;
                border-radius: 2px;
                display: inline-block;
            }
            .global_breadcrumbs>li {
                display: inline-block;
                color: white;
            }
            .global_breadcrumbs>li+li:before {
                content: "/\00a0";
                padding: 0 5px;
                color: #ccc;
            }
            .global_breadcrumbs>.active {
                color: #999;
            }
        </style>

    </head>
    <body class="fixed-header styleCsys" > 
        <c:import url='/header'/>
        <!-- #MAIN PANEL -->
        <div id="main" role="main" style="height: 616px;"> 
            <!-- #MAIN CONTENT -->
            <div id="ribbon" style=" padding-right: 0px; padding-left: 0px;">
                <div class="right_col">
                    <div class="royal_tab" data-position="top" data-alignment="left" data-animation="slide" data-keyboard="true"  >
                        <div class="tabs pull-left" id="tabs">
                            <ul class="ui-tabs-nav">
                            </ul>
                        </div>
                        <div class="views" >

                        </div>
                    </div>
                </div>
            </div> 
            <!-- END #MAIN CONTENT --> 
        </div>
        <!-- END #MAIN PANEL --> 
        <!-- Loading... -->
        <div class="divMessageBox " id="MsgLoading" style="display: none;">
            <div class="MessageBoxContainer " id="Msg1">
                <div class="MessageBoxMiddle">
                    <span class="MsgTitle">
                        <i class="fa fa-refresh fa-spin" style="color:green"></i><spring:message code="pharmacie.global.VEUILLEZPATIENTERQUELQUESSECONDES"/> 
                    </span>
                    <p class="pText"></p>
                    <div class="MessageBoxButtonSection">
                    </div>
                </div>
            </div>
        </div>
        <div id="testExit" style="display: none;">false</div>
        <div id="pageDest" style="display: none;"></div>
        <!-- END Loading... -->
        <jsp:include page="../body_page/js_declare.jsp"/>
        <script>
            var url_base = "${url_base}";
            var idModule = "${idModule}";
            var url_base_access = "${url_base_access}";
            var currencyScale = ${currencyScale};
            if (localStorage.getItem("langue") === "ar") {
                let url = "css/AR.css";
                let head = document.getElementsByTagName("head")[0];
                let link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                head.appendChild(link);
            }
//            $(document).ready(function (e) {
//                if (window.sessionStorage.getItem('Exercice') === null || window.sessionStorage.getItem('NomSociete') === null || window.sessionStorage.getItem('Societe') === null) {
//                    window.location.href = "/template-web/index";
//                }
//            });
        </script>

        <script src="js/plugin/datatables/jquery.dataTables.min.js"></script>
        <script src="js/plugin/datatables/dataTables.colVis.min.js"></script>
        <script src="js/plugin/datatables/dataTables.tableTools.min.js"></script>
        <script src="js/plugin/datatables/dataTables.bootstrap.min.js"></script>
        <script src="js/plugin/datatable-responsive/datatables.responsive.min.js"></script>  
        <script src="body_page_js/otherfunction.js" type="text/javascript"></script>
        <script src="js/plugin/other-plugin/mymenu.js"></script>  
    </body>
</html>