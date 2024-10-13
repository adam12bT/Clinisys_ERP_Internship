$( document ).ready( function ( e ) {
    function showNotification ( title, msg, type, delais ) {
        window.parent.$( '#divSmallBoxes' ).html( '' );
        $( '#divSmallBoxes' ).html( '' );
        window.parent.$( '#divSmallBoxes' ).html( '' );
        $( '#divSmallBoxes' ).html( '' );
        $( ".SmallBox.animated" ).remove();
        var color;
        var icon;
        var sound;
        if ( type === "error" ) {
            color = "#a90329";
            icon = "fa fa-times-circle fa-2x bounce animated";
            if ( title === "" )
                title = "Attention";
            sound = "voice_alert";
        } else {
            color = "#296191";
            icon = "fa fa-thumbs-up fa-2x bounce animated";
            if ( title === "" )
                title = "Succès";
            sound = "bigbox";
        }
        window.parent.$.smallBox( {
            title: title,
            content: msg,
            color: color,
            iconSmall: icon,
            timeout: delais,
            sound_file: sound,
        } );
    }
    function authentification_acceuil ( user, password ) {
        var response = "";
        $.ajax( {
            url: "./Servlet?function=Authentification&user=" + user + "&param=0",
            type: 'POST',
            async: false,
            data: {
                password: password
            },
            error: function ( jqXHR, textStatus, errorThrown ) {
            },
            complete: function ( jqXHR, textStatus ) {
            },
            success: function ( data, textStatus, jqXHR ) {
                response = data;
            }
        } );
        return response;
    }
    $( "#submit" ).bind( "click", function ()
    {
        var user = $( "#user" ).val();
        var password = $( "#password" ).val();
        if ( user.length > 0 && password.length > 0 )
        {
            var resultat = "";
            var content = "";
            resultat = authentification_acceuil( user, password );
            if ( resultat.indexOf( 'succes' ) > -1 )
            {
                if ( $( 'input[type="checkbox"]' ).is( ':checked' ) ) {
                    window.localStorage.setItem( 'login', user );
                    window.localStorage.setItem( 'password', password );
                } else {
                    window.localStorage.removeItem( 'login' );
                    window.localStorage.removeItem( 'password' );
                }
                sessionStorage.setItem( 'stup', 0 );
                window.location.href = 'master_page/index.jsp';
            } else if ( resultat.indexOf( 'echec' ) > -1 ) {
                $( "#user" ).val( "" );
                $( "#password" ).val( "" );
                content = "Veuillez vérifier votre nom d'utilisateur/mot de passe.";
                showNotification( 'Avertissement', content, 'error', 2000 );
            } else if ( resultat.indexOf( 'noAction' ) > -1 ) {
                $( "#user" ).val( "" );
                $( "#password" ).val( "" );
                content = "Vous n'avez aucun droit! Veuillez contactez l'administrateur!";
                showNotification( 'Avertissement', content, 'error', 2000 );
            }
        } else if ( ( user.length === 0 || password.length === 0 ) ) {
            var content = "Veuillez saisir votre nom d'utilisateur/mot de passe";
            showNotification( 'Avertissement', content, 'error', 2000 );
        }
    } );
} );