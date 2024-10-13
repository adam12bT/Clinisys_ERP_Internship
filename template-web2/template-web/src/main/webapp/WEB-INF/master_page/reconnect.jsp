<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>

<spring:eval var="url_base" expression="@environment.url_base"/>
<spring:eval var="idModule" expression="@environment.idModule"/>
<spring:eval var="url_base_access" expression="@environment.url_base_access"/>
<spring:eval var="currencyScale" expression="@environment.currencyScale"/> 
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>template</title>
        <meta name="description" content="">
        <meta name="author" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"> 
        <!-- #CSS Links -->
        <!-- Basic Styles -->
        <link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" media="screen" href="css/font-awesome.min.css"> 
        <!-- SmartAdmin Styles : Caution! DO NOT change the order -->
        <link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-production-plugins.min.css">
        <link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-production.min.css">
        <link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-skins.min.css"> 
        <!-- SmartAdmin RTL Support -->
        <link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-rtl.min.css">  
        <!-- We recommend you use "your_style.css" to override SmartAdmin
             specific styles this will also ensure you retrain your customization with each SmartAdmin update.
        <link rel="stylesheet" type="text/css" media="screen" href="css/your_style.css"> --> 
        <!-- Demo purpose only: goes with demo.js, you can delete this css when designing your own WebApp -->
        <link rel="stylesheet" type="text/css" media="screen" href="css/demo.min.css"> 
        <!-- page related CSS -->
        <link rel="stylesheet" type="text/css" media="screen" href="css/lockscreen.min.css"> 
        <!-- #FAVICONS -->
        <link rel="shortcut icon" href="img/favicon/favicon.ico" type="image/x-icon">
        <link rel="icon" href="img/favicon/favicon.ico" type="image/x-icon">
        <!-- #GOOGLE FONT -->
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700"> 
        <!-- #APP SCREEN / ICONS -->
        <!-- Specifying a Webpage Icon for Web Clip 
                 Ref: https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html -->
        <link rel="apple-touch-icon" href="img/splash/sptouch-icon-iphone.png">
        <link rel="apple-touch-icon" sizes="76x76" href="img/splash/touch-icon-ipad.png">
        <!--<link rel="apple-touch-icon" sizes="120x120" href="img/splash/touch-icon-iphone-retina.png">-->
        <!--<link rel="apple-touch-icon" sizes="152x152" href="img/splash/touch-icon-ipad-retina.png">--> 
        <!-- iOS web-app metas : hides Safari UI Components and Changes Status Bar Appearance -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black"> 
        <!-- Startup image for web apps -->
        <link rel="apple-touch-startup-image" href="img/splash/ipad-landscape.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)">
        <link rel="apple-touch-startup-image" href="img/splash/ipad-portrait.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)">
        <link rel="apple-touch-startup-image" href="img/splash/iphone.png" media="screen and (max-device-width: 320px)">
        <style>
            @media (max-width: 767px)
            {
                #modal {
                    margin-top: 50px!important;
                }
            }
        </style>
    </head>  
    <body> 
        <div style=" margin-left: 0px; "> 
            <!-- MAIN CONTENT --> 
            <div class="lockscreen animated flipInY">
                <!--div class="logo">
                        <h1 class="semi-bold"><img src="img/logo-o.png" alt="" /> Controle de gestion </h1>
                </div-->
                <div class="logo">
                    <!--h1 class="semi-bold">Demande Laboratoire </h1-->
                    <div >
                        <!--<h1 class="semi-bold">Appel d'offre </h1>-->
                        <div id="logo-group" style="width: 125px;" class="activity-dropdown">
                            <span name="logoClinisys" style="/* width: 300px; */"> 
                                <img class="_avatar_patient" src="img/CLINISYS_LOGO_2015.png" alt="me" style="height: 40px; width: 150px; margin-top: 7px; margin-left: 3px;vertical-align: top" onclick="javascript:uploadImagePatient()">
                            </span>
                        </div>
                        <div id="dateAffiche" class="project-context hidden-xs" style="width:190px; font-weight: 500;margin-top: -1px;margin-left: 10px;">
                            <span style=" text-align: left; font-size: 19px;color: black;">
                                <h1> <small> Template</small></h1>
                            </span>
                        </div>
                    </div>
                </div>
                <div id="modal">
                    <img src="img/fichBase.jpg" alt="" width="120" height="120" />
                    <div>
                        <h1><i class="fa fa-user fa-3x text-muted air air-top-right hidden-mobile"></i>
                            <div id="userName"></div>
                            <small><i class="fa fa-lock text-muted"></i> Utilisateur Connecté</small></h1> 
                        <br>
                        <a ><button id="back" class="btn btn-primary" style="margin-left: 15%; ">
                                Retour
                            </button></a>
                        <a ><button id="submit" class="btn btn-danger" style="margin-left: 15%; ">
                                Déconnexion
                            </button></a>
                    </div> 
                </div>
                <p class="font-xs margin-top-5">
                    Copyright Computer Systems 2016.
                </p>
            </div> 
        </div>
        <script> 
            var url_base = "${url_base}";
            var idModule = "${idModule}";
            var url_base_access = "${url_base_access}";
            var currencyScale = ${currencyScale}; 
        </script> 
        <!-- BOOTSTRAP JS -->
        <script src="js/jquery/jquery.min.js"></script>
        <script src="js/jquery/jquery-ui.min.js"></script>
        <script src="body_page_js/reconnect.js"></script>
    </body>

</html>
