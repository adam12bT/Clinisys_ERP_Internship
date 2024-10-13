<%@taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page contentType="text/html" pageEncoding="UTF-8" session="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" type="text/css" media="all" href="css/dataTable.css">
<style>
    #gridListNotifications table thead > tr th:nth-child(1),
    #gridListNotifications table tbody > tr td:nth-child(1){
        width: 30%!important;
    }
    #gridListNotifications table thead > tr th:nth-child(2),
    #gridListNotifications table tbody > tr td:nth-child(2){
        width: 70%!important;
    }
    #gridListNotifications table  tbody {
        flex: 1 1 auto;
        width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        min-height: 200px;
        max-height: 200px;
        height:auto !important;
    }
    #gridListNotifications table {
        display: flex;
        flex-flow: column;
        height: 100%;
        width: 100%;
    }
    #gridListNotifications table thead, #gridListNotifications table tbody tr {
        display: table;
        table-layout: fixed;
    }
    #gridListNotifications table thead {
        width: calc(100% -  6px) !important;
        flex: 0 0 auto;
    }
    #gridListNotifications table tbody tr {
        width: 100%;
    }

    #gridListNotifications table > tbody > tr > td,
    #gridListNotifications table > tbody > tr > th,
    #gridListNotifications table > tfoot > tr > td,
    #gridListNotifications table > tfoot > tr > th,
    #gridListNotifications table > thead > tr > td,
    #gridListNotifications table > thead > tr > th {
        padding: 5px;
        font-size: 12px;
    }
    .global_breadcrumbs>li{
        text-align: center;
        justify-content: center;
        width: 100%;
    }
</style>
<header class="header">
    <div style="width: 7vw;">
        <h1 style=" text-align: right; color: white; font-size: 25px;">
            <small style=" color: white;font-size:20px;">CliniSys<span style=" color: rgb(215, 214, 214);">Erp</span>
            </small>
        </h1>
    </div>
    <div class="nameModule hidden-xs" style=" width: 50vw;">
        <h1 style=" text-align: right; color: white; margin-top: 5px; display: inline-block;">
            <small style=" color: white;"><span id="titleModule"></span>
               </small>
        </h1>
        <div class="global_breadcrumbs" style="width: 50%;"></div>                
    </div>
    <div class="hidden-xs" style="width: 18vw;">
        <div id="logout" class="btn-header transparent pull-right">
            <span> <a data-action="logout" id="globaldeconnexion" href="logout"><i
                        class="fas fa-power-off"></i></a> </span>
            <!--            <div id="refresh" class="btn-header transparent pull-right">
                            <span> <a data-action="refresh"  href="menu"><i class="fa fa-exchange-alt" ></i></a> </span>
                        </div>-->
        </div>        <div id="fullscreen" class="btn-header transparent pull-right">
            <span> <a href="javascript:void(0);" id="globalpleinEcran"><i class="fas fa-arrows-alt"></i></a> </span>
        </div>

        <div id="acceuil" class="btn-header transparent pull-right">
            <span> <a data-action="acceuil" id="globalAcceuil"><i class="fas fa-home"></i></a> </span>
        </div>

        <div id="userAffiche" class="btn-header transparent pull-right" style="">
            <span name="_user" class="" style="margin-top: 8px;color: white;display: inline-block;">
                <span style="font-size: 17px; font-family: serif;">
                    <i class="fas fa-user"></i>
                    <span id="userName"></span>
                </span>
            </span>
        </div>     

    </div> 
    <!--    <div class="hidden-xs" style="width: 25vw;">
            <h1 style="text-align: right;color: white;margin-top: 5px;display: inline-block; margin-left:10px; ">
                <small style=" color: white;"> <span id="societe"> </span><span id="exercice"></span></small>
            </h1> 
    
        </div>     -->
    <jsp:include page="body_page/EditionModal.jsp"/> 

</header>