<!DOCTYPE html>
<div class="modal fade" id="sessionExpirationConfirm" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="display: none; margin-top: 10%;">
    <div class="modal-dialog centre_screen" style="width: 700px;">
        <div class="modal-content">
            <div class="modal-header" style="color: #1293b8;">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                <h4 style="" class="modal-title">
                    <i class="glyphicon glyphicon-log-out"></i> 
                    <span id="">Expiration de session</span>
                </h4>
            </div>
            <div id="popup_sessionExpiration" class="modal-body">
                <label>Votre session a expiré! Pour des raisons de sécurité, vous serez automatiquement déconnecté après 120 minutes</label>
            </div>
            <div class="modal-footer" style="padding: 1px 20px 4px;">
                <div class="row"><br>
                    <div style="padding: 1px 20px 4px;" align="right">
                        <button id="submitSessionExpiration" type="button" class="btn btn-default"><i class="fas fa-sign-in-alt"></i>&nbsp; Rester connecté</button>
                        <button id="cancelSessionExpiration" type="button" class="btn btn-default"><i class="fas fa-sign-out-alt"></i>&nbsp; Se déconnecter</button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</div>
<div class="modal fade" id="authentification" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="display: none; margin-top: 10%;">
    <div class="modal-dialog centre_screen" style="width: 700px;">
        <div class="modal-content">
            <div class="modal-header" style="color: #1293b8;">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
                <h4 style="" class="modal-title">
                    <span id="">Connexion</span>
                </h4>
            </div>
            <div class="modal-body">
                <div class="row   form-group" >
                    <div class="form-group col-md-6">
                        <label class="col-md-4 control-label"> Nom d'utilisateur</label>
                        <div class="col-md-6 input-group">
                            <input id="username"  type="text"
                                   name="email">
                        </div>
                    </div> 
                    <div class="form-group col-md-6" >
                        <label class="col-md-4 control-label" >Mot de passe</label>
                        <div class="col-md-6 input-group">
                            <input id="password"  type="password" name="password">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="padding: 1px 20px 4px;">
                <div class="row"><br>
                    <div style="padding: 1px 20px 4px;" align="right">
                        <button id="validerAuthentification" type="button" class="btn btn-default"><i class="fas fa-sign-in-alt"></i>   <spring:message code="button.submit"/></button>
                        <button id="cancelAuthentification" type="button" class="btn btn-default"><i class="fas fa-sign-out-alt"></i>Fermer</button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</div>
