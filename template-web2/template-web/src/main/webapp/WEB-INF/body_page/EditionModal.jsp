<!DOCTYPE html>
<div class="modal fade" id="modalimprimer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog centre_screen" style="width: 100%;height: 500px;margin-top: 0px;top: 5px;bottom: 5px;">
        <div class="modal-content" style="width: 100%;">
            <%-- Modal Content --%>  
            <div class="modal-body body-edtion" dir='ltr' style="width: 100%; height: 510px;">
                <div id="iframeedition" class="holds-the-iframe" style="width: 100%; height:100%">
                    <iframe id="iframe_content" src="" style="width: 100%; height:100%" >
                    </iframe>      
                </div>  
            </div>
            <div class="modal-footer">
                <div style="padding: 3px 0px 3px;" class="pull-right">
                    <button type="button" class="btn btn-default" data-dismiss="modal" onClick="$('#modalimprimer').modal('hide');" style="color: #a90329;">
                        <i class="fa fa-times custom" style="margin-left: 3px;"></i>Fermer
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
