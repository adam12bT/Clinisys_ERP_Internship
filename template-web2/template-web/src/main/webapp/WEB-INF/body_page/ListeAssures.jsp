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
<spring:eval var="currencyScale" expression="@environment.currencyScale"/>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <jsp:include page="../body_page/css_declare.jsp"/>   
        <title>Assurance</title>
        <style>
            .css-error{
                border-width: 1px!important;
                background-color: #fff0f0!important;
                border-color: #A90329!important;
            }
            .myDropDoxnStyle_L .select2-results .select2-result-label{
                padding:0;
            }
            #sessionExpirationConfirm{
                z-index:999999999;
            }
            .longtd,input{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size:12px;
            }
            label{
                font-size: 12px;
                font-weight: 300;
            }


            .nav-tabs.bordered {
                background: #3276b1;
            }
            .smart-form fieldset {
                padding: 0px 14px 5px; 
            }
            .well{
                padding-top: 0;
            }
            [class^="select2"],select{
                font-size: 11px;
            }
            .form-group {
                margin-bottom: 5px;
            }

            legend {
                margin: 0px 0 10px;
            }          
            .input-xs {
                height: 25px;
                font-size: 12px;
            }
            .btn-circle {
                width: 25px;
                height: 25px;
                padding: 4px 0px;
                font-size: 12px;
            }
            .smart-form .inline-group .radio {
                float: left;
                margin-right: 5px;
            }

            .form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
                background-color: #fff;
            }
            .control-label{
                top: 5px;
            }
            .hover {
                background: #eee; 
            }
            .selectionne{
                background-color: #BAD2E4;
            }
            .champOblig{
                color: red;
            }

            .btn-group,  .btn-group-vertical {
                position: relative;
                display: block; 
                vertical-align: middle;
            }

            .select2-container {
                width:100%;   
            }
            .select2-container a.select2-choice {
                font-size: 11px;
                height: 25px;
                padding: 4px 12px;
                line-height: 1.42857;
            }
            .select2-container .select2-choice .select2-arrow {
                padding-top:6px;
                width: 25px;
            }
            .input-group-addon {
                padding: 4px 6px;
            }

            #filter_ListeAssures{
                z-index: 0 !important;
            }
            td {
                vertical-align: middle !important;
            }
            #tableListListeAssures >thead > tr th:nth-child(1),
            #tableListListeAssures >tbody > tr td:nth-child(1){
                width: 10%!important;
            }
            #tableListListeAssures >thead > tr th:nth-child(2),
            #tableListListeAssures >tbody > tr td:nth-child(2){
                width: 30%!important;
            }      
            #tableListListeAssures >thead > tr th:nth-child(3),
            #tableListListeAssures >tbody > tr td:nth-child(3){
                width: 25%!important;
            }           
            #tableListListeAssures >thead > tr th:nth-child(4),
            #tableListListeAssures >tbody > tr td:nth-child(4){
                width: 25%!important;
            }    
            #tableListListeAssures >thead > tr th:nth-child(5),
            #tableListListeAssures >tbody > tr td:nth-child(5){
                width: 10%!important;
            }              
            #tableListListeAssures  >tbody {
                flex: 1 1 auto;
                width: 100%;
                display: block;
                overflow-y: scroll;
                overflow-x: hidden;
                min-height: 20px;
                max-height: calc(100vh - 245px);
                height:auto !important;
            }
            #tableListListeAssures {
                display: flex;
                flex-flow: column;
                height: 100%;
                width: 100%;
            }
            #tableListListeAssures >thead, #tableListListeAssures >tbody tr {
                display: table;
                table-layout: fixed;
            }
            #tableListListeAssures >thead {
                /* head takes the height it requires, 
                and it's not scaled when table is resized */
                width: calc(100% - 0.4em ) !important;
                flex: 0 0 auto;
            }
            #tableListListeAssures >tbody tr {
                width: 100%;
            }

            #tableListListeAssures > tbody > tr > td,
            #tableListListeAssures > tbody > tr > th,
            #tableListListeAssures > tfoot > tr > td,
            #tableListListeAssures > tfoot > tr > th,
            #tableListListeAssures > thead > tr > td,
            #tableListListeAssures > thead > tr > th {
                padding: 3px 5px!important;
                font-size: 12px;
            } 
            .btn.filtreActif{
                background-color: white;
                color: black;
                border-left-width: 5px;
                border-bottom-color: #0000003b;
                border-top-color: #0000003b;
                border-right-color: #0000003b;
                margin: 0px 2px!important;
                border-radius: 1px;
                box-sizing: border-box;
                width: calc(33.33% - 8px);
            }
            #tableListRassemblant  thead > tr th:nth-child(1),
            #tableListRassemblant  tbody > tr td:nth-child(1){
                width: 30%!important;
            }
            #tableListRassemblant  thead > tr th:nth-child(2),
            #tableListRassemblant  tbody > tr td:nth-child(2){
                width: 70%!important;
            }      
            #tableListRassemblant  tbody {
                flex: 1 1 auto;
                width: 100%;
                display: block;
                overflow-y: scroll;
                overflow-x: hidden;
                min-height: 20px;
                max-height: 108px;
                height:auto !important;
            }
            #tableListRassemblant {
                /* display: flex;*/
                flex-flow: column;
                height: 100%;
                width: 100%;
            }
            #tableListRassemblant  thead, #tableListRassemblant  tbody tr {
                display: table;
                table-layout: fixed;
            }
            #tableListRassemblant  thead {
                /* head takes the height it requires, 
                and it's not scaled when table is resized */
                width: calc(100% - 6px ) !important;
                flex: 0 0 auto;
            }
            #tableListRassemblant  tbody tr {
                width: 100%;
            }

            #tableListRassemblant > tbody > tr > td,
            #tableListRassemblant > tbody > tr > th,
            #tableListRassemblant > tfoot > tr > td,
            #tableListRassemblant > tfoot > tr > th,
            #tableListRassemblant > thead > tr > td,
            #tableListRassemblant > thead > tr > th {
                padding: 5px;
                font-size: 12px;
            }
            .widget-body{
                z-index: 0;
            }
        </style>
    </head>
    <body class="styleCsys" > 
        <section id="widget-grid" >

            <!-- row -->
            <div class="row hidden-print screen">
                <article class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-right: 2px;">
                    <div class="jarviswidget jarviswidget-color-redLight"  data-widget-editbutton="false" data-widget-deletebutton="false">
                        <header class='screen' id="bntContainer">
                            <a class="btn btn-default  pull-left" id="rafresh" > 
                                <span class="widget-icon"><i class="glyphicon glyphicon-refresh"></i></span>  
                            </a>
                            <h2><strong>Gestion des assurés</strong></h2>
                            <a class="btn btn-default accessCtrl pull-right" id="btnFermer"> 
                                <span class="widget-icon"><i class="glyphicon btn-danger glyphicon-log-out"></i> <spring:message code="template.global.fermer"/></span>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-primary" id="btn_Exporter" style="float: right;"> <span class="widget-icon"><i class="fa fa-list"></i></span>&nbsp;&nbsp; Excel</a>
                        </header>
                        <!-- widget div-->
                        <div style="min-height: calc(100vh - 55px);">
                            <div class="widget-body screen col-md-12">
                                <div class="row" >
                                    <div class="col-md-2 form-group">
                                        <label class="input">
                                            <div class="icon-addon addon-md">
                                                <input class="form-control" id="search" type="text"
                                                       placeholder="<spring:message code="template.Acceuil.Rechercher"/>">
                                                <label class="glyphicon glyphicon-search" rel="tooltip" title="" style="padding: 10px 0;"></label>
                                            </div>
                                        </label>
                                    </div>     
                                    <div class="col-md-7 form-group">
                                    </div>    
                                    <div class="col-md-3 form-group" style="">
                                        <label class="btn btn-default active filtreActif" style="font-size:12px;">
                                            <i class="fa fa-search" style="/*font-size: 1.5em;*/"></i>
                                            <span>Tous</span>
                                        </label>
                                        <label class="btn btn-info filtreActif"  style="font-size:12px;">
                                            <i class="fa fa-check-circle " style="/*font-size: 1.5em;*/"></i>
                                            <span>Actif</span>
                                        </label>
                                        <label class="btn btn-success filtreActif"  style="font-size:12px;">
                                            <i class="fa fa-search" style="/*font-size: 1.5em;*/"></i>
                                            <span>Non actif</span>
                                        </label>

                                    </div>
                                </div>
                                <div class="row">
                                    <div  id="_grid_ListListeAssures" >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>  

        <div class="modal fade screen" id="addConfirm" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog centre_screen" style="width: 40%;">
                <div class="modal-content">
                    <div class="modal-header"  style="color: #1293b8;"  >
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                        <h4  class="modal-title"><i style="font-size: 20px;" id="modalIcon1" class="glyphicon glyphicon-check"></i> <span id="addlabelTitre">Confirmation d'ajout</span><label id="addLabelFich" style="display: none"> </label></h4>
                    </div>
                    <div id="add_popup_div" class="modal-body">
                        <label id="add_msg"></label>
                        <div class="row">
                            <div  id="_grid_ListRassemblant" style=""> 
                            </div>
                        </div>
                        <label id="add_msg_confirm"></label>
                    </div>
                    <div  class="modal-footer" style="padding: 1px 20px 4px;">
                        <div class="row"><br>
                            <div style="padding: 1px 20px 4px;" align="right">
                                <button id="submitAdd" type="button" class="btn btn-default"><i class="fa fa-check"></i>&nbsp; Valider</button>
                                <button type="button" class="btn btn-default" onClick="$('#addConfirm').modal('hide');$('#modalListeAssures').modal('show');"><i class="fa fa-times"></i>&nbsp; Fermer</button>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <div class="modal fade screen" id="modalListeAssures" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog centre_screen" style="width: 50%;">
                <div class="modal-content">
                    <div class="modal-header"  style="color: #1293b8;"  >
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                        <h4  class="modal-title">
                            <i style="font-size: 20px;" id="modalIcon" class="glyphicon glyphicon-plus"></i> 
                            <span id="labelTitre"></span>
                            <label id="LabelFich" style="display: none"> </label>
                        </h4>
                    </div>
                    <div id="popup_div" class="modal-body" style='padding-bottom: 50px;'>
                        <div class="widget-body screen col-md-12">
                            <fieldset>
                                <div class="row   form-group" style="margin-bottom: 0px; padding-bottom: 0px;" >
                                    <div class="row">
                                        <div class="form-group col-md-4">
                                            <label class="col-md-4 control-label">Code<span class="champOblig">*</span></label>
                                            <div class="col-md-6  input-group">
                                                <input id="code" type="text"   data-mask-clearifnotmatch="true" class="form-control input-xs input-code">
                                            </div>
                                        </div>
                                        <div class="form-group col-md-6" > 
                                            <label class="col-md-3 control-label">Désignation<span class="champOblig">*</span></label>
                                            <div class="col-md-8 input-group">
                                                <input  id="des" maxlength="100" type="text"   data-mask-clearifnotmatch="true" class="form-control input-xs" >
                                            </div>
                                        </div>
                                        <div id="" class="form-group col-md-2">
                                            <label>
                                                <input id='actif'  type="checkbox" class="checkbox" name="terms" checked="checked">
                                                <span style=" font-size: 12px;">Actif
                                                </span>
                                            </label>
                                        </div>
                                    </div>   
                                </div>
                            </fieldset>
                        </div>                   
                    </div>
                    <div  class="modal-footer" id="modalFooter" style="padding-top: 5px;padding-bottom: 5px;">                                                
                        <button id="btnADDCategorie" type="button" class="btn btn-default"><i class="fa fa-check"></i>&nbsp; Valider</button>
                        <button id="btnCloseModalCategorie" type="button" class="btn btn-default" onClick="$('#modalListeAssures').modal('hide');"><i class="fa fa-times"></i>&nbsp; Fermer</button>                                       
                    </div> 
                </div>
            </div>
        </div>

        <div class="modal fade " id="sessionExpirationConfirm" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog centre_screen" style="width: 530px;">
                <div class="modal-content">
                    <div class="modal-header bg-color-redLight txt-color-white"   >
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                        <h4  class="modal-title"><i style="font-size: 20px;" class="glyphicon glyphicon-log-out"></i> <label>Expiration de session</label></h4>
                    </div>
                    <div id="popup_sessionExpiration" class="modal-body">
                        <label>Votre session a expiré! Pour des raisons de sécurité, vous serez automatiquement déconnecté après <span id="SecondsUntilExpire"></span> secondes</label>
                    </div>

                    <div  class="modal-footer" style="padding: 1px 20px 4px;">
                        <div class="row"><br>
                            <div style="padding: 1px 20px 4px;" align="right">
                                <button id="submitSessionExpiration" type="button" class="btn btn-success"><i class="fa fa-sign-in"></i>&nbsp; Rester connecté</button>
                                <button id="cancelSessionExpiration" type="button" class="btn btn-danger" ><i class="fa fa-sign-out"></i>&nbsp; Se déconnecter</button>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div> 

        <jsp:include page="EditionModal.jsp"/>       
        <jsp:include page="js_declare.jsp"/>
        <jsp:include page="EditionSessionExpire.jsp"/>
        <script>
            var url_base = "${url_base}";
            var idModule = "${idModule}";
            var url_base_access = "${url_base_access}";
            var currencyScale = ${currencyScale};
        </script>        
        <script src="js/backbone_backgrid/underscore-min.js"></script>        
        <script src="body_page_js/otherfunction.js?version=<%=date%>"></script>
        <script src="body_page_js/BackGridEditor.js?version=<%=date%>"></script> 
        <script src="body_page_js/ListeAssures.js?version=<%=date%>"></script>
        <script src="body_page_js/ListeAssures_function.js?version=<%=date%>"></script>
        <script src="js/plugin/other-plugin/summernote.min.js"></script>  
    </body>
</html>
