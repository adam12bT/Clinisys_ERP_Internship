var EditorDate = Backgrid.InputCellEditor.extend({
    attributes: {
        type: "text",
        style: "width:90%;border: 1px solid #3498db;"
    },
    validate: function (newValue) {
        return true;
    },
    nextcell: true,
    selectOnFocus: false,
    saveOrCancel: function (e) {

        var formatter = this.formatter;
        var model = this.model;
        var column = this.column;
        var command = new Backgrid.Command(e);
        var blurred = e.type === "blur";
        if (command.moveUp() || command.moveDown() || command.moveLeft() || command.moveRight() ||
                command.save() || blurred) {

            e.preventDefault();
            e.stopPropagation();
            var val = this.$el.val();
            var newValue = formatter.toRaw(val, model);
            if (_.isUndefined(newValue) || !(this.validate(newValue))) {
                model.trigger("backgrid:error", model, column, val);
            } else {
                if (command.save() && this.nextcell)
                    command.keyCode = 9;
                model.set(column.get("name"), newValue, {validate: true});
                model.trigger("backgrid:edited", model, column, command);
            }
        }
        // esc
        else if (command.cancel()) {
            // undo
            e.stopPropagation();
            model.trigger("backgrid:edited", model, column, command);
        }

    },
    postRender: function (model, column) {
        if (column === null || column.get("name") === this.column.get("name")) {
            // move the cursor to the end on firefox if text is right aligned
            if (this.$el.css("text-align") === "right") {
                var val = this.$el.val();
                if (this.selectOnFocus)
                    this.$el.focus().val(null).val(val).select().mask("99/99/9999");
                else
                    this.$el.focus().val(null).val(val).mask("99/99/9999");
            } else
            if (this.selectOnFocus)
                this.$el.focus().select().mask("99/99/9999");
            else
                this.$el.focus().mask("99/99/9999");
        }
        return this;
    }

});
var EditorString = Backgrid.InputCellEditor.extend({
    attributes: {
        type: "text",
        style: "width:90%;    border: 1px solid #3498db;" // ferou9
    },
    validate: function (newValue) {
        return true;
    },
    nextcell: true,
    selectOnFocus: true,
    saveOrCancel: function (e) {

        var formatter = this.formatter;
        var model = this.model;
        var column = this.column;
        var command = new Backgrid.Command(e);
        var blurred = e.type === "blur";
        if (command.moveUp() || command.moveDown() || command.moveLeft() || command.moveRight() ||
                command.save() || blurred) {
            e.preventDefault();
            e.stopPropagation();
            var val = this.$el.val();
            var newValue = formatter.toRaw(val, model);
            if (_.isUndefined(newValue) || !(this.validate(newValue))) {
                model.trigger("backgrid:error", model, column, val);
            } else {
                if (command.save() && this.nextcell)
                    command.keyCode = 9;
                model.set(column.get("name"), newValue, {validate: true});
                model.trigger("backgrid:edited", model, column, command);
            }
        }
        // esc
        else if (command.cancel()) {
            // undo
            e.stopPropagation();
            model.trigger("backgrid:edited", model, column, command);
        }

    },
    postRender: function (model, column) {
        if (column === null || column.get("name") === this.column.get("name")) {
            // move the cursor to the end on firefox if text is right aligned
            if (this.$el.css("text-align") === "right") {
                var val = this.$el.val();
                if (this.selectOnFocus)
                    this.$el.focus().val(null).val(val).select();
                else
                    this.$el.focus().val(null).val(val);
            } else
            if (this.selectOnFocus)
                this.$el.focus().select();
            else
                this.$el.focus();
        }
        return this;
    }

});

var EditorCodePostal = Backgrid.InputCellEditor.extend({
    attributes: {
        type: "text",
        style: "width:90%;    border: 1px solid #3498db;" // ferou9
    },
    validate: function (newValue) {
        return true;
    },
    nextcell: true,
    selectOnFocus: true,
    saveOrCancel: function (e) {

        var formatter = this.formatter;
        var model = this.model;
        var column = this.column;
        var command = new Backgrid.Command(e);
        var blurred = e.type === "blur";
        if (command.moveUp() || command.moveDown() || command.moveLeft() || command.moveRight() ||
                command.save() || blurred) {
            e.preventDefault();
            e.stopPropagation();
            var val = this.$el.val();
            var newValue = formatter.toRaw(val, model);
            if (_.isUndefined(newValue) || !(this.validate(newValue))) {
                model.trigger("backgrid:error", model, column, val);
            } else {
                if (command.save() && this.nextcell)
                    command.keyCode = 9;
                model.set(column.get("name"), newValue, {validate: true});
                model.trigger("backgrid:edited", model, column, command);
            }
        }
        // esc
        else if (command.cancel()) {
            // undo
            e.stopPropagation();
            model.trigger("backgrid:edited", model, column, command);
        }

    },
    postRender: function (model, column) {
        if (column === null || column.get("name") === this.column.get("name")) {
            // move the cursor to the end on firefox if text is right aligned
            if (this.$el.css("text-align") === "right") {
                var val = this.$el.val();
                if (this.selectOnFocus)
                    this.$el.focus().val(null).val(val).select();
                else
                    this.$el.focus().val(null).val(val);
            } else
            if (this.selectOnFocus)
                this.$el.focus().select();
            else
                this.$el.focus();
        }
        return this;
    }

});
var codePostalformatter = {
    fromRaw: function (rawData, model) {
        return rawData;
    },
    toRaw: function (formattedData, model) {
        var villes = findSouRegByCp(formattedData);
        if (villes.length > 0) {

            model.set("codregion", villes[0].codregion);
            model.set("desregion", villes[0].desregion);
            model.set("codsoureg", villes[0].codsoureg);
            model.set("dessoureg", villes[0].dessoureg);
            if ((_.filter(model.collection.models, function (num) {
                return num.get('codregion') === null;
            }).length) < 1) {
                pageTableListAdresse.collection.add({codregion: null});
            }
            return formattedData;
        } else {
            showNotification('Avertissement', "Le code postal est erroné !", 'error', 3000);
            return undefined;
        }
    }

};


var EditorNumber = Backgrid.InputCellEditor.extend({
    attributes: {
        type: "text",
        style: "width:90%;border: 1px solid #3498db;text-align:right;"  // ferou9
    },
    validate: function (newValue) {
        return true;
    },
    nextcell: true,
    selectOnFocus: true,
    saveOrCancel: function (e) {

        var formatter = this.formatter;
        var model = this.model;
        var column = this.column;
        var command = new Backgrid.Command(e);
        var blurred = e.type === "blur";
        if (command.moveUp() || command.moveDown() || command.moveLeft() || command.moveRight() ||
                command.save() || blurred) {
            e.preventDefault();
            e.stopPropagation();
            var val = this.$el.val();
            var newValue = formatter.toRaw(val, model);
            if (_.isUndefined(newValue) || !(this.validate(newValue))) {
                model.trigger("backgrid:error", model, column, val);
            } else {
                if (command.save() && this.nextcell)
                    command.keyCode = 9;
                model.set(column.get("name"), newValue, {validate: true});
                model.trigger("backgrid:edited", model, column, command);
            }
        }
        // esc
        else if (command.cancel()) {
            // undo
            e.stopPropagation();
            model.trigger("backgrid:edited", model, column, command);
        }

    },
    postRender: function (model, column) {
        if (column === null || column.get("name") === this.column.get("name")) {
            // move the cursor to the end on firefox if text is right aligned
            if (this.$el.css("text-align") === "right") {
                var val = this.$el.val();
                if (this.selectOnFocus)
                    this.$el.focus().val(null).val(val.replaceAll(' ', '')).select();
                else
                    this.$el.focus().val(null).val(val.replaceAll(' ', ''));
            } else
            if (this.selectOnFocus)
                this.$el.focus().select();
            else
                this.$el.focus();
        }
        return this;
    }
});



var EditorNombre = Backgrid.InputCellEditor.extend({
    attributes: {
        type: "number",
        style: "width:90%;border: 1px solid #3498db;text-align:right;"  // ferou9
    },
    validate: function (newValue) {
        return true;
    },
    nextcell: true,
    selectOnFocus: true,
    saveOrCancel: function (e) {

        var formatter = this.formatter;
        var model = this.model;
        var column = this.column;
        var command = new Backgrid.Command(e);
        var blurred = e.type === "blur";
        if (command.moveUp() || command.moveDown() || command.moveLeft() || command.moveRight() ||
                command.save() || blurred) {
            e.preventDefault();
            e.stopPropagation();
            var val = this.$el.val();
            var newValue = formatter.toRaw(val, model);
            if (_.isUndefined(newValue) || !(this.validate(newValue))) {
                model.trigger("backgrid:error", model, column, val);
            } else {
                if (command.save() && this.nextcell)
                    command.keyCode = 9;
                model.set(column.get("name"), newValue, {validate: true});
                model.trigger("backgrid:edited", model, column, command);
            }
        }
        // esc
        else if (command.cancel()) {
            // undo
            e.stopPropagation();
            model.trigger("backgrid:edited", model, column, command);
        }

    },
    postRender: function (model, column) {
        if (column === null || column.get("name") === this.column.get("name")) {
            // move the cursor to the end on firefox if text is right aligned
            if (this.$el.css("text-align") === "right") {
                var val = this.$el.val();
                if (this.selectOnFocus)
                    this.$el.focus().val(null).val(val.replaceAll(' ', '')).select();
                else
                    this.$el.focus().val(null).val(val.replaceAll(' ', ''));
            } else
            if (this.selectOnFocus)
                this.$el.focus().select();
            else
                this.$el.focus();
        }
        return this;
    }
});
var NombrePanierformatter = {
    fromRaw: function (rawData, model) {
        return rawData;
    },
    toRaw: function (formattedData, model) {
        if (isNaN(formattedData) || formattedData === "") {
            return '1';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le nombre!", 'error', 3000);
            return undefined;
        } else
            return formattedData;
    }

};
var Observationformatter = {
    fromRaw: function (rawData, model) {
        return rawData;
    },
    toRaw: function (formattedData, model) {
        return formattedData;
    }

};
var Deprixventeformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (parseFloat(formattedData) >= parseFloat(model.get('auprixvente')) && parseInt(model.get('auprixvente')) !== 0) {
            showNotification('Avertissement', "Prix de vente minimal doit être inférieur au prix de vente maximal", 'error', 3000);
            return undefined;
        } else
            return formattedData;
    }
};
var Auprixventeformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant!", 'error', 3000);
            return undefined;
        } else if (parseFloat(formattedData) <= parseFloat(model.get('deprixvente'))) {
            showNotification('Avertissement', "Prix de vente minimal doit être inférieur au prix de vente maximal", 'error', 3000);
            return undefined;
        } else
            return formattedData;
    }
};
var Majorationformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(2);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {

        if (isNaN(formattedData)) {
            return '0.00';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (parseFloat(model.get('deprixvente')) > parseFloat(model.get('auprixvente'))) {
            showNotification('Avertissement', "Prix de vente minimal doit être inférieur au prix de vente maximal ", 'error', 3000);
            return undefined;
        } else
            return formattedData;
    }
};
var Qteformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {

        if (isNaN(formattedData) || formattedData === "") {
            return '0';
        }
        if (parseFloat(formattedData) <= 0) {
            showNotification('Attention', "La quantité doit être supérieur à zéro !", 'error', 3000);
            return undefined;
        } else
            return formattedData;
    }
};
var PrixPublicformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {

        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else
            return formattedData;
    }
};
var prixAchatformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {

        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (parseFloat(formattedData) < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (parseFloat(formattedData) === 0) {
            showNotification('Attention', "Le prix d'achat ne doit pas être égale à zéro  !", 'error', 3000);
            return undefined;
        } else
            return formattedData;
    }
};
var prixconventionformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        var prixpublic = model.get('prixpublic');
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (formattedData !== model.get("prixconvention")) {
            if (parseFloat(prixpublic) < parseFloat(formattedData)) {
                model.set('remise', 0.00);
                var prix_conv = ((formattedData) / prixpublic - 1) * 100;
                model.set('majoration', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
                return formattedData;
            } else {
                model.set('majoration', "0.00");
                var prix_conv = (1 - (formattedData / prixpublic)) * 100;
                model.set('remise', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
                return formattedData;
            }
        } else
            return  formattedData;
    }
};

var prixconventionhonoraireformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        var prixhonoraire = model.get('prixhonoraire');
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (formattedData !== model.get("prixconventionhonoraire")) {
            if (parseFloat(prixhonoraire) < parseFloat(formattedData)) {
                model.set('remisehonoraire', 0.00);
                var prix_conv = ((formattedData) / prixhonoraire - 1) * 100;
                model.set('majorationhonoraire', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
                return formattedData;
            } else {
                model.set('majorationhonoraire', "0.00");
                var prix_conv = (1 - (formattedData / prixhonoraire)) * 100;
                model.set('remisehonoraire', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
                return formattedData;
            }
        } else {
            return  formattedData;
        }
    }
};

var MajorationPresformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(3);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        formattedData = parseFloat(formattedData);
        var prixpublic = model.get('prixpublic');
        var majoration = formattedData;
        var remise = model.get('remise');
        var prix_conv = 0;
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if ((parseFloat(majoration) !== 0) && (model.get('codeprestexamen') !== null || model.get('codeprest') !== null || model.get('codeprestexamenradth') !== null)) {
            prix_conv = (prixpublic * (1 + (majoration / 100))) * ((1 - (remise / 100)));
            model.set('prixconvention', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
            return formattedData.toFixed(3);
        } else if (model.get('codeprestexamen') !== null || model.get('codeprest') !== null || model.get('codeprestexamenradth') !== null) {
            prix_conv = (prixpublic * ((1 - (remise / 100))));
            model.set('prixconvention', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
            return formattedData.toFixed(3);
        } else
            return formattedData.toFixed(3);
    }
};

var Majorationformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(2);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        formattedData = parseFloat(formattedData);
        var prixpublic = model.get('prixpublic');
        var majoration = formattedData;
        var remise = model.get('remise');
        var prix_conv = 0;
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if ((parseFloat(majoration) !== 0) && (model.get('codeprestexamen') !== null || model.get('codeprest') !== null || model.get('codeprestexamenradth') !== null)) {
            prix_conv = (prixpublic * (1 + (majoration / 100))) * ((1 - (remise / 100)));
            model.set('prixconvention', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
            return formattedData.toFixed(3);
        } else if (model.get('codeprestexamen') !== null || model.get('codeprest') !== null || model.get('codeprestexamenradth') !== null) {
            prix_conv = (prixpublic * ((1 - (remise / 100))));
            model.set('prixconvention', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
            return formattedData.toFixed(3);
        } else
            return formattedData.toFixed(3);
    }
};



var majorationhonoraireformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(3);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        formattedData = parseFloat(formattedData);
        var prixpublic = model.get('prixhonoraire');
        var majoration = formattedData;
        var remise = model.get('remisehonoraire');
        var prix_conv = 0;
        if (isNaN(majoration)) {
            return '0.00';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (parseFloat(majoration) !== 0) {
            prix_conv = (prixpublic * (1 + (majoration / 100))) * ((1 - (remise / 100)));
            model.set('prixconventionhonoraire', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
            return formattedData.toFixed(3);
        } else {
            prix_conv = (prixpublic * ((1 - (remise / 100))));
            model.set('prixconventionhonoraire', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
            return formattedData.toFixed(3);
        }
    }
};


var remisehonoraireformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(3);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        formattedData = parseFloat(formattedData);
        var prixpublic = model.get('prixhonoraire');
        var majoration = model.get('majorationhonoraire');
        var prix_conv = 0;
        if (isNaN(formattedData)) {
            return '0.00';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (formattedData > 100)
        {
            model.set('remisehonoraire', '0.00');
            showNotification('Avertissement', "Remise doit être inférieure ou égale à 100%", 'error', 3000);
            return undefined;
        } else if (formattedData !== 0) {
            prix_conv = (prixpublic * (1 + (majoration / 100))) * ((1 - (formattedData / 100)));
            model.set('prixconventionhonoraire', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
            return formattedData.toFixed(3);
        } else {
            prix_conv = prixpublic * (1 + (majoration / 100));
            model.set('prixconventionhonoraire', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
            return formattedData.toFixed(3);
        }
    }
};


var remiseformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(2);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        formattedData = parseFloat(formattedData);
        var prixpublic = model.get('prixpublic');
        var majoration = model.get('majoration');

        var prix_conv = 0;
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (formattedData > 100)
        {
            model.set('remise', '0.00');
            showNotification('Avertissement', "Remise doit être inférieure ou égale à 100%", 'error', 3000);
            return undefined;
        } else if ((formattedData !== 0) && (model.get('codeprestexamen') !== null || model.get('codeprest') !== null || model.get('codeprestexamenradth') !== null)) {
            prix_conv = (prixpublic * (1 + (majoration / 100))) * ((1 - (formattedData / 100)));
            model.set('prixconvention', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
            return formattedData.toFixed(3);
        } else if ((model.get('codeprestexamen') !== null || model.get('codeprest') !== null || model.get('codeprestexamenradth') !== null)) {
            prix_conv = prixpublic * (1 + (majoration / 100));
            model.set('prixconvention', parseFloat(isFinite(prix_conv) ? prix_conv : 0).toFixed(3));
            return formattedData.toFixed(3);
        } else
            return  formattedData.toFixed(3);
    }
};
var prixconventionCnamformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        formattedData = parseFloat(formattedData).formatMoney(3, '.', ' ');
        var remise = model.get('remise');
        var prixconvention = formattedData;
        if (isNaN(prixconvention)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (formattedData === 0) {
            showNotification('Attention', "Prix convention ne doit pas être égale à zéro  !", 'error', 3000);
            return undefined;
        } else if (parseFloat(prixconvention).toFixed(3) > 0) {
            model.set('prixpublic', parseFloat(prixconvention * (1 - (remise / 100))).toFixed(3));
            model.set('prixconvention', parseFloat(prixconvention).toFixed(3));
            return formattedData;
        } else {
            model.set('prixpublic', "0.000");
            model.set('prixconvention', "0.000");
            return formattedData;
        }
    }
};
var ribformatter = {

    fromRaw: function (rawData, model) {
        if (rawData !== "" && !isNaN(rawData)) {
            return (rawData);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {

        if (isNaN(formattedData) || formattedData === "") {
            return "";
        }
        if (formattedData === "") {
            showNotification('Attention', "Veuillez saisir un rib !", 'error', 3000);
            return undefined;
        } else
            return formattedData;
    }



};
var remiseCnamformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(2);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        formattedData = parseFloat(formattedData);
        var prixconvention = model.get('prixconvention');
        var remise = formattedData;
        if (isNaN(remise)) {
            return '0.00';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (formattedData > 100) {
            showNotification('Attention', "Le remise ne doit pas être supérieur à 100!", 'error', 3000);
            return undefined;
        } else if (parseFloat(remise) > 0)
        {
            model.set('prixpublic', parseFloat((prixconvention * ((1 - (remise / 100))))).toFixed(3));
            model.set('remise', parseFloat(remise).toFixed(2));
            return formattedData.toFixed(2);
        } else {
            model.set('prixpublic', parseFloat(prixconvention).toFixed(3));
            model.set('remise', "0.00");
            return formattedData.toFixed(2);
        }
    }
};
var remisePersonnelleformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(2);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        formattedData = parseFloat(formattedData);
        var remise = formattedData;
        if (isNaN(remise)) {
            return '0.00';
        }
        if (remise < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (remise > 100) {
            showNotification('Attention', "Le remise ne doit pas être supérieur à 100!", 'error', 3000);
            return undefined;
        } else if (remise === 0) {
            showNotification('Attention', "Veuillez saisir une remise", 'error', 3000);
            return undefined;
        } else
            return formattedData.toFixed(2);

    }
};

var totalforfaitformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {

        var pec = model.get('partiepec');
        var totalForfait = formattedData;
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (formattedData === 0) {
            showNotification('Attention', "Le montant total du forfait doit être supérieur à zéro!", 'error', 3000);
            return undefined;
        } else if (parseFloat(totalForfait).toFixed(3) > 0) {
            model.set('partiepatient', ((parseFloat(totalForfait) - parseFloat(pec)) > 0 ? (parseFloat(totalForfait) - parseFloat(pec)) : 0).toFixed(3));
            return formattedData;
        }
    }
};


var partiepecformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {

        var pec = formattedData;
        var totalForfait = model.get('totalforfait');
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else
        if (parseFloat(totalForfait).toFixed(3) > 0) {
            model.set('partiepatient', ((parseFloat(totalForfait) - parseFloat(pec)) > 0 ? (parseFloat(totalForfait) - parseFloat(pec)) : 0).toFixed(3));
            return formattedData;
        }
    }
};


var partiepatientformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {

        if (isNaN(formattedData)) {
            return '0.000';
        }

    }
};

//////////////////convention & maquette convention
var Select2ListTypeForfait = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:20%'><span title='" + item.objet.codtyp + "'>" + item.objet.codtyp + "</span></td>" +
                                "<td class='desArt' style='width:80%'><span title='" + item.objet.destyp + "'>" + item.objet.destyp + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'> Code </th>" +
                        "<th style='width:80%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listForfaitSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codtyp) || rex.test(objet.destyp);

                });
                _.sortBy(responseFiltre, 'codtyp');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codtyp, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codtyp;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('codtyp');
        }).indexOf(objet.codtyp) < 0) {
            model.set("codtyp", objet.codtyp);
            model.set("designation", objet.destyp);
            model.set("totalforfait", '0.000');
            model.set("partiepec", '0.000');
            model.set("partiepatient", '0.000');
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codtyp') === null;
            }).length < 1) {
                model.collection.add({codtyp: null});
            }
        } else {
            model.set("codtyp", null);
            showNotification('Attention', "Le code existe déja", 'error', 3000);
        }
        $('#listTypeForfait > table > tbody').animate({
            scrollTop: $('#listTypeForfait > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }
});
var Select2ListListDepot = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='coddep' style='width:20%'><span title='" + item.objet.coddep + "'>" + item.objet.coddep + "</span></td>" +
                                "<td class='desdep' style='width:80%'><span title='" + item.objet.desdep + "'>" + item.objet.desdep + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_LDepot",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'>Code</th>" +
                        "<th style='width:80%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(depotEconomatSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.coddep) || rex.test(objet.desdep);

                });
                _.sortBy(responseFiltre, 'coddep');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].coddep, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.coddep;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('coddep');
        }).indexOf(objet.coddep) < 0) {
            model.set("coddep", objet.coddep);
            model.set("designation", objet.desdep);
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('coddep') === null;
            }).length < 1) {
                model.collection.add({coddep: null});
            }
        } else {
            model.set("coddep", null);
            showNotification('Attention', "Dépôt existe déja", 'error', 3000);
        }
        $('#listDepot > table > tbody').animate({
            scrollTop: $('#listDepot > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    },
    editor: Backgrid.Select2CellEditor.extend({
        nextcell: false
    })
});

var Select2ListTypePrixExamenRadTh = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='desArt' style='width:30%'><span title='" + item.objet.designation + "'>" + item.objet.designation + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_LType",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: false,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:30%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(typeSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.designation);

                });
                _.sortBy(responseFiltre, 'typePrix');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].designation, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.designation;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (objet, model) {
            var list = model.collection.models.filter(function (item) {
                return item !== model;
            }).filter(function (item) {
                return model.get('codeprestexamenradth') === item.get('codeprestexamenradth') && objet.code === item.get('idTypePrix');
            });
            if (list.length === 0) {
                return objet;
            } else {
                showNotification('Attention', "Type déja choisi! Veuillez saisir un autre type", 'error', 3000);
                return undefined;
            }
        }
    },
    updateData: function (model, objet) {

        var prixCorrespondant = model.get("examenradth")[objet.correspondant];
        model.set("idTypePrix", objet.code);
        model.set("typePrix", objet.designation);
        model.set("prixconvention", prixCorrespondant);
        model.set("prixpublic", prixCorrespondant);
        model.set("remise", '0.00');
        model.set("majoration", '0.00');

    },
    render: function () {

        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }

});
var Select2ListConventionPh = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:20%'><span title='" + item.objet.famArt + "'>" + item.objet.famArt + "</span></td>" +
                                "<td class='desArt' style='width:80%'><span title='" + item.objet.desFam + "'>" + item.objet.desFam + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'> Code </th>" +
                        "<th style='width:80%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listFamArt, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.famArt) || rex.test(objet.desFam);

                });
                _.sortBy(responseFiltre, 'famArt');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].famArt, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.famArt;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        model.set("codeprest", objet.famArt);
        model.set("designation", objet.desFam);
        model.set("deprixvente", '0.000');
        model.set("auprixvente", '0.000');
        model.set("majoration", '0.00');
        model.set("remise", '0.00');
        model.set("action", '');
        if (_.filter(model.collection.models, function (num) {
            return num.get('codeprest') === null;
        }).length < 1) {
            model.collection.add({codeprest: null});
        }

        $('#listfamart > table > tbody').animate({
            scrollTop: $('#listfamart > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }
});
var Select2ListConventionPres = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:10%'><span title='" + item.objet.numSer + "'>" + item.objet.numSer + "</span></td>" +
                                "<td class='desArt' style='width:40%'><span title='" + item.objet.desSer + "'>" + item.objet.desSer + "</span></td>" +
                                "<td class='desArt' style='width:40%'><span title='" + item.objet.codFam.desFam + "'>" + item.objet.codFam.desFam + "</span></td>" +
                                "<td class='desArt' style='width:10%;text-align: right;'><span title='" + parseFloat(item.objet.priSer).toFixed(3) + "'>" + parseFloat(item.objet.priSer).toFixed(3) + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:10%'> Code </th>" +
                        "<th style='width:40%'>Désignation</th>" +
                        "<th style='width:40%'>Famille</th>" +
                        "<th style='width:10%'>Prix</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listService, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.numSer) || rex.test(objet.desSer) || rex.test(objet.desFampres) || rex.test(parseFloat(objet.priSer).toFixed(3));
                });
                _.sortBy(responseFiltre, 'numSer');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].numSer, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.numSer;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('codeprest');
        }).indexOf(objet.numSer) < 0) {
            model.set("codeprest", objet.numSer);
            model.set("designation", objet.desSer);
            model.set("remise", '0.00');
            model.set("majoration", '0.00');
            model.set("prixconvention", parseFloat(objet.priSer).toFixed(3));
            model.set("prixpublic", parseFloat(objet.priSer).toFixed(3));
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codeprest') === null;
            }).length < 1) {
                model.collection.add({codeprest: null, codeprestfamille: null, codeprestexamen: null, coderetenu: null, codeprestexamenradth: null});
            }
        } else {
            model.set("codeprest", null);
            showNotification('Attention', "Le code existe déja", 'error', 3000);
        }
        $('#listparprestation > table > tbody').animate({
            scrollTop: $('#listparprestation > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    },
    editor: Backgrid.Select2CellEditor.extend({
        nextcell: false
    })


});
var Select2ListConventionPresFamille = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:20%'><span title='" + item.objet.codFam + "'>" + item.objet.codFam + "</span></td>" +
                                "<td class='desArt' style='width:80%'><span title='" + item.objet.desFam + "'>" + item.objet.desFam + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'> Code </th>" +
                        "<th style='width:80%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listFamPres, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codFam) || rex.test(objet.desFam);

                });
                _.sortBy(responseFiltre, 'codFam');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codFam, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codFam;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('codeprestfamille');
        }).indexOf(objet.codFam) < 0) {
            model.set("codeprestfamille", objet.codFam);
            model.set("designation", objet.desFam);
            model.set("remise", '0.00');
            model.set("majoration", '0.00');
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codeprestfamille') === null;
            }).length < 1) {
                model.collection.add({codeprest: null, codeprestfamille: null, codeprestexamen: null, coderetenu: null, codeprestexamenradth: null});
            }
        } else {
            model.set("codeprestfamille", null);
            showNotification('Attention', "Le code existe déja", 'error', 3000);
        }
        $('#listparfamille > table > tbody').animate({
            scrollTop: $('#listparfamille > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    },
    editor: Backgrid.Select2CellEditor.extend({
        nextcell: false
    })


});
var Select2ListConventionPresExamen = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:10%'><span title='" + item.objet.codExam + "'>" + item.objet.codExam + "</span></td>"
                                + "<td class='desArt' style='width:40%'><span title='" + item.objet.desExam + "'>" + item.objet.desExam + "</span></td>"
                                + "<td class='desSer' style='width:25%'><span title='" + item.objet.prest + "'>" + item.objet.prest + "</span></td>"
                                + "<td class='prixExam' style='width:10%'><span title='" + parseFloat(item.objet.prixExam).toFixed(3) + "'>" + parseFloat(item.objet.prixExam).toFixed(3) + "</span></td>"
                                + "<td class='prixHon' style='width:15% ; text-align: right;'><span title='" + parseFloat(item.objet.prixHon).toFixed(3) + "'>" + parseFloat(item.objet.prixHon).toFixed(3) + "</span></td>"
                                + "<td class='code' style='display:none;'><span title='" + item.objet.code + "'>" + item.objet.code + "</span></td>"
                                + "<td class='nature' style='display:none;'><span title='" + item.objet.nature + "'>" + item.objet.nature + "</span></td>"
                                + "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:10%'> Code </th>" +
                        "<th style='width:40%'>Désignation</th>" +
                        "<th style='width:25%'>Famille</th>" +
                        "<th style='width:10%'>Prix</th>" +
                        "<th style='width:15%'>Montant honoraire</th>" +
                        "<th style='display:none;'>Code Exam</th>" +
                        "<th style='display:none;'>Nature</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listExam, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codExam) || rex.test(objet.desExam);
                });
                _.sortBy(responseFiltre, 'codExam');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codExam, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codExam;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('codeprestexamen');
        }).indexOf(objet.codExam) < 0) {
            model.set("codeprestexamen", objet.codExam);
            model.set("designation", objet.desExam);
            model.set("remise", '0.000');
            model.set("majoration", '0.000');
            model.set("majorationhonoraire", '0.000');
            model.set("remisehonoraire", '0.000');
            model.set("prixhonoraire", parseFloat(objet.prixHon).toFixed(3));
            model.set("prixconventionhonoraire", parseFloat(objet.prixHon).toFixed(3));
            model.set("prixconvention", parseFloat(objet.prixExam).toFixed(3));
            model.set("prixpublic", parseFloat(objet.prixExam).toFixed(3));
            model.set("codeExamConv", objet.code);
            model.set("nature", objet.nature);
            model.set("type", objet.type);
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codeprestexamen') === null;
            }).length < 1) {
                model.collection.add({codeprest: null, codeprestfamille: null, codeprestexamen: null, codeprestexamenradth: null});
            }
        } else {
            model.set("codeprestexamen", null);
            showNotification('Attention', "Le code existe déja", 'error', 3000);
        }
        $('#listparexamen > table > tbody').animate({
            scrollTop: $('#listparexamen > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }


});
var Select2ListConventionPresExamenRadTh = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:10%'><span title='" + item.objet.codexam + "'>" + item.objet.codexam + "</span></td>" +
                                "<td class='desArt' style='width:40%'><span title='" + item.objet.desexam + "'>" + item.objet.desexam + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },

            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'>Code</th>" +
                        "<th style='width:80%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listExamenRadioTHSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codexam) || rex.test(objet.desexam);

                });
                _.sortBy(responseFiltre, 'codexam');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codexam, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codexam;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {


        model.set("codeprestexamenradth", objet.codexam);
        model.set("designation", objet.desexam);
        model.set("examenradth", objet);
        model.set("typePrix", null);
        model.set("remise", '0.000');
        model.set("majoration", '0.000');
        model.set("prixconvention", "0.000");
        model.set("prixpublic", "0.000");
        model.set("action", '');
        if (_.filter(model.collection.models, function (num) {
            return num.get('codeprestexamenradth') === null;
        }).length < 1) {
            model.collection.add({codeprest: null, codeprestfamille: null, codeprestexamen: null, codeprestexamenradth: null});
        }

        $('#listparexamenradth > table > tbody').animate({
            scrollTop: $('#listparexamenradth > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {


        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();

        return this;
    }


});
var Select2ListConventionPresCnam = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:10%'><span title='" + item.objet.numSer + "'>" + item.objet.numSer + "</span></td>" +
                                "<td class='desArt' style='width:40%'><span title='" + item.objet.desSer + "'>" + item.objet.desSer + "</span></td>" +
                                "<td class='desArt' style='width:40%'><span title='" + item.objet.codFam.desFam + "'>" + item.objet.codFam.desFam + "</span></td>" +
                                "<td class='desArt' style='width:10%;text-align: right;'><span title='" + parseFloat(item.objet.priSer).toFixed(3) + "'>" + parseFloat(item.objet.priSer).toFixed(3) + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:10%'> Code </th>" +
                        "<th style='width:40%'>Désignation</th>" +
                        "<th style='width:40%'>Famille</th>" +
                        "<th style='width:10%'>Prix</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listService, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.numSer) || rex.test(objet.desSer) || rex.test(objet.desFampres) || rex.test(parseFloat(objet.priSer).toFixed(3));
                });
                _.sortBy(responseFiltre, 'numSer');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].numSer, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.numSer;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('codeprest');
        }).indexOf(objet.numSer) < 0) {
            model.set("codeprest", objet.numSer);
            model.set("designation", objet.desSer);
            model.set("remise", '0.00');
            model.set("prixconvention", parseFloat(objet.priSer).toFixed(3));
            model.set("prixpublic", parseFloat(objet.priSer).toFixed(3));
            model.set("parametrage", 'AJOUT');
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codeprest') === null;
            }))
                ;
        } else {
            model.set("codeprest", null);
            showNotification('Attention', "Le code existe déja", 'error', 3000);
        }

    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }


});
var Select2ListConventionPersonnelle = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:20%'><span title='" + item.objet.codFam + "'>" + item.objet.codFam + "</span></td>" +
                                "<td class='desArt' style='width:80%'><span title='" + item.objet.desFam + "'>" + item.objet.desFam + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'> Code </th>" +
                        "<th style='width:80%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listFampresSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codFam) || rex.test(objet.desFam);

                });
                _.sortBy(responseFiltre, 'codFam');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codFam, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codFam;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('codeprest');
        }).indexOf(objet.codFam) < 0) {
            model.set("codeprest", objet.codFam);
            model.set("designation", objet.desFam);
            model.set("remise", '0.00');
            model.set("majoration", '0.00');
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codeprest') === null;
            }).length < 1) {
                model.collection.add({codeprest: null});
            }
        } else {
            model.set("codeprestfamille", null);
            showNotification('Attention', "Famille prestation existe déja !", 'error', 3000);
        }
        $('#listparfamille > table > tbody').animate({
            scrollTop: $('#listparfamille > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }


});



var Select2ListFrs = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:20%'><span title='" + item.objet.codfrs + "'>" + item.objet.codfrs + "</span></td>" +
                                "<td class='desArt' style='width:80%'><span title='" + item.objet.raiSoc + "'>" + item.objet.raiSoc + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "50%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'>Code</th>" +
                        "<th style='width:80%'>Raison sociale</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(fournisseurSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codfrs) || rex.test(objet.raiSoc);
                });
                _.sortBy(responseFiltre, 'codfrs');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codfrs, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codfrs;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {
        if (model.collection.models.map(function (item) {
            return item.get('codfrs');
        }).indexOf(objet.codfrs) < 0) {
            model.set("codfrs", objet.codfrs);
            model.set("raiSoc", objet.raiSoc);
            model.set("prixAchat", '0.000');
            model.set("tauTVA", null);
            model.set("remise", '0.00');
            model.set("datpropos", '');
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codfrs') === null;
            }).length < 1) {
                model.collection.add({codfrs: null});
            }
        } else {
            model.set("codfrs", null);
            showNotification('Attention', "Le code existe déja", 'error', 3000);
        }
        $('#listFournisseur > table > tbody').animate({
            scrollTop: $('#listFournisseur > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }
});

var Select2ListFamArts = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:20%'><span title='" + item.objet.famArt + "'>" + item.objet.famArt + "</span></td>" +
                                "<td class='desArt' style='width:80%'><span title='" + item.objet.desFam + "'>" + item.objet.desFam + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'> Code </th>" +
                        "<th style='width:80%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(list_famArts, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.famArt) || rex.test(objet.desFam);

                });
                _.sortBy(responseFiltre, 'codfamArt');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].famArt, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.famArt;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('codeprest');
        }).indexOf(objet.famArt) < 0) {
            model.set("codfamArt", objet.famArt);
            model.set("desFam", objet.desFam);
            if (_.filter(model.collection.models, function (num) {
                return num.get('codfamArt') === null;
            }).length < 1) {
                model.collection.add({codfamArt: null});
            }
        } else {
            model.set("codfamArt", null);
            showNotification('Attention', "Le code existe déja", 'error', 3000);
        }
        $('#listfamart > table > tbody').animate({
            scrollTop: $('#listfamart > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }
});
var remiseCnamformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(2);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        formattedData = parseFloat(formattedData);
        var remise = formattedData;
        var prix_conv = 0;
        if (isNaN(remise)) {
            return '0.00';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else if (parseFloat(remise) > 100)
        {
            model.set('remise', '0.00');
            showNotification('Avertissement', "Veuillez saisir une remise inférieure à 100%", 'error', 3000);
            return undefined;
        }
    }
};

var Select2ListDetail = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:20%'><span title='" + item.objet.codRet + "'>" + item.objet.codRet + "</span></td>" +
                                "<td class='desArt' style='width:80%'><span title='" + item.objet.desRet + "'>" + item.objet.desRet + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'> Code </th>" +
                        "<th style='width:80%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listRetenuSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codRet) || rex.test(objet.desRet);

                });
                _.sortBy(responseFiltre, 'codRet');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codRet, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codRet;
            }
        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }
        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('coderetenu');
        }).indexOf(objet.codRet) < 0) {
            model.set("coderetenu", objet.codRet);
            model.set("designation", objet.desRet);
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('coderetenu') === null;
            }).length < 1) {
                model.collection.add({coderetenu: null, codeprest: null, codeprestfamille: null});
            }
        } else {
            model.set("coderetenu", null);
            showNotification('Attention', "Le code existe déja", 'error', 3000);
        }
        $('#listRetenu > table > tbody').animate({
            scrollTop: $('#listRetenu > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    },
    editor: Backgrid.Select2CellEditor.extend({
        nextcell: false
    })


});
var Adresseformatter = {
    fromRaw: function (rawData, model) {
        return rawData;
    },
    toRaw: function (formattedData, model) {
        if (formattedData === "")
            showNotification('Avertissement', "Veuillez saisir une adresse! ", 'error', 3000);
        else
            return formattedData;
    }

};
var Select2ListGouvernorat = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:50%'><span title='" + item.objet.codregion + "'>" + item.objet.codregion + "</span></td>" +
                                "<td class='desArt' style='width:50%'><span title='" + item.objet.desregion + "'>" + item.objet.desregion + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:50%'> Code région </th>" +
                        "<th style='width:50%'>Désignation région</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listGouvernorat, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codregion) || rex.test(objet.desregion);
                });
                _.sortBy(responseFiltre, 'codregion');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codregion, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {

                return item.objet.desregion;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        model.set("codregion", objet.codregion);
        model.set("desregion", objet.desregion);
        model.set("codVille", '');
        if ((_.filter(model.collection.models, function (num) {
            return num.get('codregion') === null;
        }).length) < 1) {
            pageTableListAdresse.collection.add({adrs: null});
        }
        ;
        model.set("action", '');


    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }
});
var Select2ListVille = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        var response = [];
        $.ajax({
            url: url_base + '/fichier-base-core/api/souregfrs/filter?codGouv=' + model.get("codregion") + '&actifs=true',
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            dataType: "json",
            async: false,
            headers: {
                'x-auth-token': localStorage.getItem("x-auth-token"),
                'Accept-Language': localStorage.getItem("langue")
            },
            success: function (data, textStatus, jqXHR) {
                response = _.sortBy(data, 'codVille');
            },
            complete: function (jqXHR, textStatus) {
            }
        });
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:50%'><span title='" + item.objet.codVille + "'>" + item.objet.codVille + "</span></td>" +
                                "<td class='desArt' style='width:50%'><span title='" + item.objet.ville + "'>" + item.objet.ville + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:50%'> Code ville </th>" +
                        "<th style='width:50%'>Désignation ville</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(response, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codVille) || rex.test(objet.ville);
                });
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codVille, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.ville;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        model.set("codVille", objet.codVille);
        model.set("ville", objet.ville);
        model.set("cp", findSouRegFrsByCodVille(objet.codVille)[0].cp);
        model.set("action", '');
        if (_.filter(model.collection.models, function (num) {
            return num.get('codVille') === null;
        }))
            ;

    },
    render: function () {
        if (this.model.get("codregion") !== null && this.model.get("codregion") !== undefined) {
            this.$el.empty();
            var model = this.model;
            var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
            var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
            this.$el.html(text);
            this.delegateEvents();
        } else {
            this.$el.empty().html("");
        }
        return this;
    }
});

function updateListArticlePanier(withParamFixe) {
    var totAchat = 0;
    var totVente = 0;
    var listePanier = pageModelPanier.collection.models.filter(function (item) {
        return item.get('codPan') !== null;
    });
    var list1 = [];
    for (var cmp = 0; cmp < listePanier.length; cmp++) {
        var model = listePanier[cmp];
        var fac1 = {};
        fac1["codPan"] = model.get("codPan");
        fac1["nombre"] = model.get("nombre");
        list1.push(fac1);
    }
    var compos = findCompositionArticleOperat(list1);
    compos.map(function (item) {
        item["valAchat"] = item.priach;
        item["valVente"] = item.priuni;
        item["valAchatUni"] = item.priach;
        item["valVenteUni"] = item.priuni;
        totAchat = totAchat + item.priach * item.qte;
        totVente = totVente + item.priuni * item.qte;
    });
    pageModelArticle.collection.reset(compos);
    if (withParamFixe === "0") {
        pageModelArticle.collection.add({codArt: null});
    }
    total();
}
var Select2ListArticle = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codart' style='width:20%'><span title='" + item.objet.codart + "'>" + item.objet.codart + "</span></td>" +
                                "<td class='desart' style='width:50%'><span title='" + item.objet.desart + "'>" + item.objet.desart + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:10%'> Code </th>" +
                        "<th style='width:40%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(ArticleSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codart) || rex.test(objet.desart);
                });
                _.sortBy(responseFiltre, 'codart');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codart, objet: responseFiltre[index]});
                }
                query.callback(data);
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('codArt');
        }).indexOf(objet.codart) < 0) {
            model.set("codArt", objet.codart);
            model.set("desart", objet.desart);
            model.set("codPan", objet.codPan);
            model.set("codeModele", objet.codeModele);
            model.set("qte", 0);
            model.set("qtePans", 0);
            model.set("qteAnest", 0);
            model.set("priach", objet.priach);
            model.set("priuni", objet.priuni);
            model.set("valAchat", '0.000');
            model.set("valVente", '0.000');
            model.set("valAchatUni", objet.priach);
            model.set("valVenteUni", objet.priuni);
            model.set("marge", objet.marge.toFixed(3));
            model.set("total", '0.000');
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codArt') === null;
            }).length < 1) {
                model.collection.add({codArt: null});
            }
        } else {
            model.set("codArt", null);
            showNotification('Attention', "code existe déja", 'error', 3000);
        }
        $('#tableModelArticle > table > tbody').animate({
            scrollTop: $('#tableModelArticle > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }


});
var Quantiteformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData) && rawData !== "") {
            return parseFloat(rawData);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {


        var prixAchat = model.get('valAchatUni');
        var prixVente = model.get('valVenteUni');
        var prix_achat = parseFloat(prixAchat) * parseFloat(formattedData);
        var prix_vente = parseFloat(prixVente) * parseFloat(formattedData);

        if (isNaN(parseFloat(formattedData))) {
            return "1";
        }
        if (parseFloat(formattedData) < 0) {
            showNotification('Attention', "Veuillez vérifier la quantité !", 'error', 3000);
            return undefined;
        } else if (parseFloat(formattedData) !== model.get("qte"))
        {
            model.set('valAchat', prix_achat.toFixed(3));
            model.set('valVente', prix_vente.toFixed(3));
            total();
            return parseFloat(formattedData);
        } else
            return parseFloat(formattedData);

    }

};
var QuantitePansformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData) && rawData !== "") {
            return parseFloat(rawData);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {


        var prixAchat = model.get('valAchatUni');
        var prixVente = model.get('valVenteUni');
        var qteAnest = model.get('qteAnest');
        var quantite = parseFloat(formattedData) + parseFloat(qteAnest);
        var prix_achat = quantite * parseFloat(prixAchat);
        var prix_vente = quantite * parseFloat(prixVente);



        if (isNaN(parseFloat(formattedData))) {
            return "0";
        }
        if (parseFloat(formattedData) < 0) {
            showNotification('Attention', "Veuillez vérifier la quantité !", 'error', 3000);
            return undefined;
        } else if (parseFloat(formattedData) !== parseFloat(model.get("qtePans")))
        {
            model.set('valAchat', prix_achat.toFixed(3));
            model.set('valVente', prix_vente.toFixed(3));
            total();
            return parseFloat(formattedData);
        } else
            return parseFloat(formattedData);

    }

};
var QuantiteAnestformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData) && rawData !== "") {
            return parseFloat(rawData);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {


        var prixAchat = model.get('valAchatUni');
        var prixVente = model.get('valVenteUni');
        var qtePans = model.get('qtePans');
        var quantite = parseFloat(formattedData) + parseFloat(qtePans);
        var prix_achat = quantite * parseFloat(prixAchat);
        var prix_vente = quantite * parseFloat(prixVente);



        if (isNaN(parseFloat(formattedData))) {
            return "0";
        }
        if (parseFloat(formattedData) < 0) {
            showNotification('Attention', "Veuillez vérifier la quantité !", 'error', 3000);
            return undefined;
        } else if (parseFloat(formattedData) !== parseFloat(model.get("qteAnest")))
        {
            model.set('valAchat', prix_achat.toFixed(3));
            model.set('valVente', prix_vente.toFixed(3));
            total();
            return parseFloat(formattedData);
        } else
            return parseFloat(formattedData);

    }

};




var QuantiteModelePanierformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData) && rawData !== "") {
            return parseFloat(rawData);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {



        var prixVente = model.get('priuni');
        var total = parseFloat(prixVente) * parseFloat(formattedData);


        if (isNaN(parseFloat(formattedData))) {
            return "1";
        }
        if (parseFloat(formattedData) < 0) {
            showNotification('Attention', "Veuillez vérifier la quantité !", 'error', 3000);
            return undefined;
        } else if (parseFloat(formattedData) !== model.get("qte"))
        {
            model.set('total', total.toFixed(3));

            totalModelPanier();
            return parseFloat(formattedData);
        } else
            return parseFloat(formattedData);

    }

};
var QuantitePansModelePanierformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData) && rawData !== "") {
            return parseFloat(rawData);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {



        var prixVente = model.get('priuni');
        var qteAnest = model.get('qteAnest');
        var quantite = parseFloat(formattedData) + parseFloat(qteAnest);
        var total = quantite * parseFloat(prixVente);



        if (isNaN(parseFloat(formattedData))) {
            return "0";
        }
        if (parseFloat(formattedData) < 0) {
            showNotification('Attention', "Veuillez vérifier la quantité !", 'error', 3000);
            return undefined;
        } else if (parseFloat(formattedData) !== parseFloat(model.get("qtePans")))
        {

            model.set('total', total.toFixed(3));
            totalModelPanier();
            return parseFloat(formattedData);
        } else
            return parseFloat(formattedData);

    }

};
var QuantiteAnestModelePanierformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData) && rawData !== "") {
            return parseFloat(rawData);
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {


        var prixVente = model.get('priuni');
        var qtePans = model.get('qtePans');
        var quantite = parseFloat(formattedData) + parseFloat(qtePans);
        var total = quantite * parseFloat(prixVente);



        if (isNaN(parseFloat(formattedData))) {
            return "0";
        }
        if (parseFloat(formattedData) < 0) {
            showNotification('Attention', "Veuillez vérifier la quantité !", 'error', 3000);
            return undefined;
        } else if (parseFloat(formattedData) !== parseFloat(model.get("qteAnest")))
        {
            model.set('total', total.toFixed(3));
            totalModelPanier();
            return parseFloat(formattedData);
        } else
            return parseFloat(formattedData);

    }

};










var prixhonoraireformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        var prixClin = model.get('prixClin');

        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else {
            var prix = parseFloat(formattedData) + parseFloat(prixClin);
            model.set('prix', parseFloat(prix > 0 ? prix : 0).toFixed(3));
            return formattedData;
        }
    }
};
var prixClinformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).formatMoney(3, '.', ' ');
        } else {
            return "";
        }

    },
    toRaw: function (formattedData, model) {
        var prixhonoraire = model.get('prixhonoraire');

        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else {
            var prix = parseFloat(formattedData) + parseFloat(prixhonoraire)
            model.set('prix', parseFloat(prix > 0 ? prix : 0).toFixed(3));
            return formattedData;
        }
    }
};
function total() {
    var totalvalAchat = 0;
    var totalvalVente = 0;
    var pageabale;
    pageabale = pageModelArticle.collection.models;
    for (var i = 0; i < pageabale.length; i++) {
        var model = pageabale[i];
        if (model.get('valAchat') !== undefined) {
            totalvalAchat = totalvalAchat + parseFloat(model.get('valAchat'));
        }
        if (model.get('valVente') !== undefined) {
            totalvalVente = totalvalVente + parseFloat(model.get('valVente'));
        }
    }

    $('#totalvalAchat').text(totalvalAchat.toFixed(3));
    $('#totalvalVente').text(totalvalVente.toFixed(3));
}
var Select2ListPrestComplementaire = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codart' style='width:20%'><span title='" + item.objet.numSer + "'>" + item.objet.numSer + "</span></td>" +
                                "<td class='desart' style='width:50%'><span title='" + item.objet.desSer + "'>" + item.objet.desSer + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:10%'> Code </th>" +
                        "<th style='width:40%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listPrestationSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.numSer) || rex.test(objet.designation);
                });
                _.sortBy(responseFiltre, 'numSer');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].numSer, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.numSer;
            }
        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }
        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {
        if (model.collection.models.map(function (item) {
            return item.get('numSer');
        }).indexOf(objet.numSer) < 0) {
            model.set("numSer", objet.numSer);
            model.set("desSer", objet.desSer);
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('numSer') === null;
            }).length < 1) {
                model.collection.add({numSer: null});
            }
        } else {
            model.set("numSer", null);
            showNotification('Attention', "Préstation existe déja", 'error', 3000);
        }
        $('#tablePrestComplementaire > table > tbody').animate({
            scrollTop: $('#tablePrestComplementaire > table > tbody > tr').length * 29
        }, 10);

    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    },
    editor: Backgrid.Select2CellEditor.extend({
        nextcell: false
    })
});
var Select2ListCnam = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codart' style='width:20%'><span title='" + item.objet.codeCNAM + "'>" + item.objet.codeCNAM + "</span></td>" +
                                "<td class='desart' style='width:50%'><span title='" + item.objet.libelle + "'>" + item.objet.libelle + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:10%'> Code </th>" +
                        "<th style='width:40%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(CNAMSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codeCNAM) || rex.test(objet.designation);
                });
                _.sortBy(responseFiltre, 'codeCNAM');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codeCNAM, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codeCNAM;
            }
        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }
        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {
        if (model.collection.models.map(function (item) {
            return item.get('codeCNAM');
        }).indexOf(objet.codeCNAM) < 0) {
            model.set("codeCNAM", objet.codeCNAM);
            model.set("libelle", objet.libelle);
            if (sessionStorage.getItem("Operation") === "ajout") {
                $("#codeOperat").val(objet.codeCNAM);
                $("#DesOperat").val(objet.libelle);
                $("#koperat").val(objet.coefficient);
            }

        } else {
            model.set("codeCNAM", null);
            showNotification('Attention', "Préstation existe déja", 'error', 3000);
        }
        $('#tablePrestComplementaire > table > tbody').animate({
            scrollTop: $('#tablePrestComplementaire > table > tbody > tr').length * 29
        }, 10);

    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }
});

var Select2ListAdresse = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codart' style='width:20%'><span title='" + item.objet.codart + "'>" + item.objet.codart + "</span></td>" +
                                "<td class='desart' style='width:50%'><span title='" + item.objet.desart + "'>" + item.objet.desart + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:10%'> Code </th>" +
                        "<th style='width:40%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(ArticleSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codart) || rex.test(objet.desart);
                });
                _.sortBy(responseFiltre, 'codart');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codart, objet: responseFiltre[index]});
                }
                query.callback(data);
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('codArt');
        }).indexOf(objet.codart) < 0) {
            model.set("codArt", objet.codart);
            model.set("desart", objet.desart);
            model.set("codPan", objet.codPan);
            model.set("codeModele", objet.codeModele);
            model.set("qte", 0);
            model.set("qtePans", 0);
            model.set("qteAnest", 0);
            model.set("priach", objet.priach);
            model.set("priuni", objet.priuni);
            model.set("valAchat", 0);
            model.set("valVente", 0);
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codArt') === null;
            }).length < 1) {
                model.collection.add({codArt: null});
            }
        } else {
            model.set("codArt", null);
            showNotification('Attention', "code existe déja", 'error', 3000);
        }
        $('#tableModelArticle > table > tbody').animate({
            scrollTop: $('#tableModelArticle > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }


});







var Select2ListGouvernoratEco = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:50%'><span title='" + item.objet.codregion + "'>" + item.objet.codregion + "</span></td>" +
                                "<td class='desArt' style='width:50%'><span title='" + item.objet.desregion + "'>" + item.objet.desregion + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:50%'> Code région </th>" +
                        "<th style='width:50%'>Désignation région</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listGouvernoratEco, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codregion) || rex.test(objet.desregion);
                });
                _.sortBy(responseFiltre, 'codregion');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codregion, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {

                return item.objet.desregion;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {
        model.set("codregion", objet.codregion);
        model.set("desregion", objet.desregion);
        model.set("codsoureg", null);
        model.set("dessoureg", "");
        model.set("cp", "");
        model.set("action", '');
        if ((_.filter(model.collection.models, function (num) {
            return num.get('codregion') === null;
        }).length) < 1) {
            pageTableListAdresse.collection.add({codregion: null});
        }



    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }
});
var Select2ListVilleEco = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        var response = [];
        $.ajax({
            url: url_base_economat + '/parametrage-economat-core/api/souregeconomats/filter?codregion=' + model.get("codregion"),
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            dataType: "json",
            async: false,
            headers: {
                'x-auth-token': localStorage.getItem("x-auth-token"),
                'Accept-Language': localStorage.getItem("langue")
            },
            success: function (data, textStatus, jqXHR) {
                response = _.sortBy(data, 'codVille');
            },
            complete: function (jqXHR, textStatus) {
            }
        });
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:50%'><span title='" + item.objet.codsoureg + "'>" + item.objet.codsoureg + "</span></td>" +
                                "<td class='desArt' style='width:50%'><span title='" + item.objet.dessoureg + "'>" + item.objet.dessoureg + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:50%'> Code ville </th>" +
                        "<th style='width:50%'>Désignation ville</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(response, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codsoureg) || rex.test(objet.dessoureg);
                });
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codsoureg, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.ville;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {
        model.set("codsoureg", objet.codsoureg);
        model.set("dessoureg", objet.dessoureg);
        model.set("cp", objet.cp);
        model.set("action", '');
        if ((_.filter(model.collection.models, function (num) {
            return num.get('codregion') === null;
        }).length) < 1) {
            pageTableListAdresse.collection.add({codregion: null});
        }
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }
});







var dateProposeformatter = {
    fromRaw: function (rawData, model) {
        if (rawData === null) {
            return  "";
        } else {
            return rawData;
        }

    },
    toRaw: function (formattedData, model) {

        if (verif_date(formattedData) && formattedData !== "") {
            return  formattedData;
        } else {
            showNotification('Attention', 'Veuillez saisir une date du dernier achat valide', 'error', 5000);
            return undefined;
        }
    }
};

var Select2ListTVA = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:50%'><span title='" + item.objet.tauTVA + "'>" + item.objet.tauTVA + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_LTVA",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:30%'>TVA</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(tvaSelect, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.tauTVA);

                });
                _.sortBy(responseFiltre, 'tauTVA');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].tauTVA, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.tauTVA;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {
        model.set("codTvaFrs", objet.codTVA);
        model.set("tauTVA", objet.tauTVA);
    },
    render: function () {

        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }

});
var Select2ListTypeMontant = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codart' style='width:20%'><span title='" + item.objet.code + "'>" + item.objet.code + "</span></td>" +
                                "<td class='desart' style='width:50%'><span title='" + item.objet.designation + "'>" + item.objet.designation + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "200px",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'>Code</th>" +
                        "<th style='width:50%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listeTypeMontant, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.code) || rex.test(objet.designation);
                });
                _.sortBy(responseFiltre, 'code');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].code, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.code;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {
        if (model.collection.models.map(function (item) {
            return item.get('code');
        }).indexOf(objet.code) < 0) {
            model.set("Typemontant", objet.code);
            if (_.filter(model.collection.models, function (num) {
                return num.get('code') === null;
            }).length < 1) {
            }
            if (objet.code === "M") {
                model.set("kope", "0");
                model.set("prixKope", "0.000");
            } else {
                model.set("montant", "0.000");
            }
        }
        $('#ListTableActeParfam > table > tbody').animate({
            scrollTop: $('#ListTableActeParfam > table > tbody > tr').length * 29
        }, 10);

    }

});
var EditorNumber = Backgrid.InputCellEditor.extend({
    attributes: {
        type: "text",
        style: "width:90%;border: 1px solid #3498db;text-align:right;"  // ferou9
    },
    validate: function (newValue) {
        return true;
    },
    nextcell: true,
    selectOnFocus: true,
    saveOrCancel: function (e) {

        var formatter = this.formatter;
        var model = this.model;
        var column = this.column;
        var command = new Backgrid.Command(e);
        var blurred = e.type === "blur";
        if (command.moveUp() || command.moveDown() || command.moveLeft() || command.moveRight() ||
                command.save() || blurred) {
            e.preventDefault();
            e.stopPropagation();
            var val = this.$el.val();
            var newValue = formatter.toRaw(val, model);
            if (_.isUndefined(newValue) || !(this.validate(newValue))) {
                model.trigger("backgrid:error", model, column, val);
            } else {
                if (command.save() && this.nextcell)
                    command.keyCode = 9;
                model.set(column.get("name"), newValue, {validate: true});
                model.trigger("backgrid:edited", model, column, command);
            }
        }
        // esc
        else if (command.cancel()) {
            // undo
            e.stopPropagation();
            model.trigger("backgrid:edited", model, column, command);
        }

    },
    postRender: function (model, column) {
        if (column === null || column.get("name") === this.column.get("name")) {
            // move the cursor to the end on firefox if text is right aligned
            if (this.$el.css("text-align") === "right") {
                var val = this.$el.val();
                if (this.selectOnFocus)
                    this.$el.focus().val(null).val(val.replaceAll(' ', '')).select();
                else
                    this.$el.focus().val(null).val(val.replaceAll(' ', ''));
            } else
            if (this.selectOnFocus)
                this.$el.focus().select();
            else
                this.$el.focus();
        }
        return this;
    }
//    exitEditMode: function () {
//        if (this.model.get("debit") === null)
//            Backgrid.Cell.prototype.exitEditMode.apply(this, arguments);
//    }
});
var PrixPublicformatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(3);
        } else {
            return "";
        }
    },
    toRaw: function (formattedData, model) {
        formattedData = parseFloat(formattedData).toFixed(3);
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else
            return formattedData;
    }
};
var Type = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return (rawData);
        } else {
            return "M";
        }
    },
    toRaw: function (formattedData, model) {
        if (isNaN(formattedData)) {
            return 'M';
        }
        if (formattedData === "") {
            showNotification('Attention', "Vous devez vérifier le type montant !", 'error', 3000);
            return undefined;
        } else
            return formattedData;
    }
};
var NombreKope = {
    fromRaw: function (rawData, model) {
        return rawData;
    },
    toRaw: function (formattedData, model) {
        var montant = model.get('montant');
        var prixKope = model.get('prixKope');
        if (isNaN(formattedData)) {
            return '1';
        }
        if (formattedData <= 0) {
            showNotification('Attention', "Vous devez vérifier le nombre!", 'error', 3000);
            return undefined;
        } else
            model.set('montant', montant);
        model.set('prixKope', prixKope);
        model.set('kope', parseInt(formattedData));
        totalMonatantForfait();
        return parseInt(formattedData);
    }
};
var MontantForfaitParMonatant = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(3);
        } else {
            return "";
        }
    },
    toRaw: function (formattedData, model) {

        formattedData = parseFloat(formattedData).toFixed(3);
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else
            var montant = formattedData;
        var prixKope = model.get('prixKope');
        var kope = model.get('kope');
        model.set('montant', montant);
        model.set('prixKope', prixKope);
        model.set('kope', kope);
        totalMonatantForfait();
        return formattedData;
    }
};
var MontantForfaitParPrixKope = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(3);
        } else {
            return "";
        }
    },
    toRaw: function (formattedData, model) {

        formattedData = parseFloat(formattedData).toFixed(3);
        if (isNaN(formattedData)) {
            return '0.000';
        }
        if (formattedData < 0) {
            showNotification('Attention', "Vous devez vérifier le montant !", 'error', 3000);
            return undefined;
        } else
            var montant = model.get('montant');
        ;
        var prixKope = formattedData;
        var kope = model.get('kope');
        model.set('montant', montant);
        model.set('prixKope', prixKope);
        model.set('kope', kope);
        totalMonatantForfait();
        return formattedData;
    }
};

function totalMonatantForfait() {
    var montantforfait = 0;
    pageModelParFamille.collection.models.forEach(function (item, i) {
        if (item.get('codefamilleprestation') !== null) {
            var pageabale;
            pageabale = pageModelParFamille.collection.models;
            if (item.get('montant') !== undefined) {
                montantforfait = montantforfait + parseFloat(item.get('montant'));
            }
            if (item.get('prixKope') !== undefined && item.get('kope') !== undefined) {
                montantforfait = montantforfait + (parseFloat(item.get('prixKope') * item.get('kope')));
            }

            $('#montantforfaitCalculer').val(montantforfait.toFixed(3));
            $('#montantforfait').val(montantforfait.toFixed(3));
        }
    });
}
var Select2ListSociete = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codart' style='width:20%'><span title='" + item.objet.numSoc + "'>" + item.objet.numSoc + "</span></td>" +
                                "<td class='desart' style='width:80%'><span title='" + item.objet.desSoc + "'>" + item.objet.desSoc + "</span>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "350px !important;",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'>Code</th>" +
                        "<th style='width:80%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listSociete, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.numSoc) || rex.test(objet.desSoc);
                });
                _.sortBy(responseFiltre, 'numSoc');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].numSoc, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.numSoc;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('numSoc');
        }).indexOf(objet.numSoc) < 0) {
            model.set("numSoc", objet.numSoc);
            model.set("desSoc", objet.desSoc);
            model.set("prixClin", '0.000');
            model.set("prixhonoraire", '0.000');
            model.set("prix", '0.000');
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('numSoc') === null;
            }).length < 1) {
                model.collection.add({numSoc: null});
            }
        } else {
            model.set("numSoc", null);
            showNotification('Attention', "Societé existe déja", 'error', 3000);
        }
        $('#ListTableActeParSoc > table > tbody').animate({
            scrollTop: $('#ListTableActeParSoc > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }



});
var Select2ListDetailForfaitPresFamille = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:20%'><span title='" + item.objet.codFam + "'>" + item.objet.codFam + "</span></td>" +
                                "<td class='desArt' style='width:80%'><span title='" + item.objet.desFam + "'>" + item.objet.desFam + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "200px",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'>Code</th>" +
                        "<th style='width:80%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listFamPres, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codFam) || rex.test(objet.desFam);
                });
                _.sortBy(responseFiltre, 'codFam');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codFam, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codFam;
            }

        };
    },
    updateData: function (model, objet) {
        if (model.collection.models.map(function (item) {
            return item.get('codFam');
        }).indexOf(objet.codFam) < 0) {
            model.set("codFam", objet.codFam);
            model.set("designation", objet.desFam);
            model.set("prix", '0.000');
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codFam') === null;
            }).length < 1) {
                model.collection.add({codFam: null});
            }
        } else {
            model.set("codFam", null);
            showNotification('Attention', "Le code existe déja", 'error', 3000);
        }
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }


});



var Select2ListDetailForfaitActePresFamille = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:20%'><span title='" + item.objet.codFam + "'>" + item.objet.codFam + "</span></td>" +
                                "<td class='desArt' style='width:80%'><span title='" + item.objet.desFam + "'>" + item.objet.desFam + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "200px",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:20%'>Code</th>" +
                        "<th style='width:80%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listFamPres, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codFam) || rex.test(objet.desFam);
                });
                _.sortBy(responseFiltre, 'codefamilleprestation');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codFam, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codFam;
            }

        };
    },
    updateData: function (model, objet) {
        if (model.collection.models.map(function (item) {
            return item.get('codefamilleprestation');
        }).indexOf(objet.codFam) < 0) {
            model.set("codefamilleprestation", objet.codFam);
            model.set("designation", objet.desFam);
            model.set("montant", '0.00');
            model.set("prixKope", '0.00');
            model.set("typeMontant", '');
            model.set("kope", '0');
            model.set("iscumule", false);
            model.set("ismodifie", false);
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codefamilleprestation') === null;
            }).length < 1) {
                model.collection.add({codefamilleprestation: null});
            }
        } else {
            model.set("codefamilleprestation", null);
            showNotification('Attention', "Famille existe déja", 'error', 3000);
        }
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    },
    editor: Backgrid.Select2CellEditor.extend({
        nextcell: false
    })


});






var Select2Medecin = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='cod' style='width:30%'><span title='" + item.objet.codMed + "'>" + item.objet.codMed + "</span></td>" +
                                "<td class='des' style='width:70%'><span title='" + item.objet.nomMed + "'>" + item.objet.nomMed + "</span></td>" +
                                "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "200px",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table select_content no-margin' ><thead><th style='width:20%'>Code</th><th style='width:50%'>Nom et prénom</th></thead>";
                data.results.push(item);
                var term = query.term;
                var responseFiltre = _.filter(medecinSelect, function (objet) {
                    var rex = new RegExp(term, 'i');
                    return rex.test(objet.codMed) || rex.test(objet.nomMed);
                });
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codMed, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codMed;
            }

        };
    },
    updateData: function (model, objet) {
        if (objet.codMed !== $('#medecin').val() && model.collection.models.map(function (item) {
            return item.get('detail');
        }).indexOf(objet.codMed) < 0) {
            model.set("detail", objet.codMed);
            model.set("nomMed", objet.nomMed);
            model.set("pourcent", '0.00');
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('detail') === null;
            }).length < 1) {
                model.collection.add({detail: null});
            }

        } else {
            model.set("detail", null);
            showNotification('Attention', "Le médecin existe déja", 'error', 3000);
        }
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    }
});

var PoucentageFormatter = {
    fromRaw: function (rawData, model) {
        if (rawData !== undefined && !isNaN(rawData)) {
            return parseFloat(rawData).toFixed(7);
        } else {
            return "";
        }
    },
    toRaw: function (formattedData, model) {

        formattedData = parseFloat(formattedData).toFixed(7);
        if (isNaN(formattedData)) {
            return '0.0000000';
        }
        if (formattedData <= 0 || formattedData >= 100) {
            showNotification('Attention', "Vous devez vérifier les pourcentages !", 'error', 3000);
            return undefined;
        } else {
            return formattedData;
        }

    }
};


var Select2ListForfaitWithExam = Backgrid.Select2Cell.extend({
    select2Options: function (model) {
        return {
            formatResult: function (item) {
                if (item) {
                    if (item.compteur === 0) {
                        return  item.entete;
                    } else {
                        return "<table class='table no-margin table-bordered select_content' ><tr>" +
                                "<td class='codArt' style='width:30%'><span title='" + item.objet.codExam + "'>" + item.objet.codExam + "</span></td>"
                                + "<td class='desArt' style='width:70%'><span title='" + item.objet.desExam + "'>" + item.objet.desExam + "</span></td>"
                                + "</tr></table>";
                    }
                }
            },
            dropdownCssClass: "myDropDoxnStyle_L",
            width: "100%",
            minimumResultsForSearch: 1,
            closeOnSelect: true,
            query: function (query) {
                var data = {results: []};
                var item = {};
                item["compteur"] = 0;
                item["entete"] = "<table class='table no-margin' >" +
                        "<thead>" +
                        "<th style='width:30%'> Code </th>" +
                        "<th style='width:70%'>Désignation</th>" +
                        "</thead>" +
                        "<table>";
                data.results.push(item);
                var responseFiltre = _.filter(listExamenConvention, function (objet) {
                    var rex = new RegExp(query.term, 'i');
                    return rex.test(objet.codExam) || rex.test(objet.desExam);
                });
                _.sortBy(responseFiltre, 'codExam');
                var len = responseFiltre.length > 100 ? 100 : responseFiltre.length;
                for (var index = 0; index < len; index++) {
                    data.results.push({compteur: index + 1, id: responseFiltre[index].codExam, objet: responseFiltre[index]});
                }
                query.callback(data);
            },
            formatSelection: function (item) {
                return item.objet.codExam;
            }

        };
    },
    formatter: {
        fromRaw: function (rawValue, model) {
            if (rawValue !== null) {
                return rawValue;
            } else {
                return rawValue;
            }

        },
        toRaw: function (formattedData, model) {
            return formattedData;
        }
    },
    updateData: function (model, objet) {

        if (model.collection.models.map(function (item) {
            return item.get('codExam');
        }).indexOf(objet.codExam) < 0) {
            model.set("codExam", objet.codExam);
            model.set("designation", objet.desExam);
            model.set("type", objet.type);
            model.set("action", '');
            if (_.filter(model.collection.models, function (num) {
                return num.get('codExam') === null;
            }).length < 1) {
                model.collection.add({codExam: null});
            }
        } else {
            model.set("codExam", null);
            showNotification('Attention', "Le code existe déja", 'error', 3000);
        }
        $('#gridplafondparexamen > table > tbody').animate({
            scrollTop: $('#gridplafondparexamen > table > tbody > tr').length * 29
        }, 10);
    },
    render: function () {
        this.$el.empty();
        var model = this.model;
        var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
        var text = _.isUndefined(rawData) || _.isNull(rawData) || (_.isString(rawData) && rawData.length === 0) ? "+" : rawData;
        this.$el.html(text);
        this.delegateEvents();
        return this;
    },
    editor: Backgrid.Select2CellEditor.extend({
        nextcell: false
    })


});

function totalModelPanier() {

    var total = 0;
    var pageabale;
    pageabale = pageModelArticle.collection.models;
    for (var i = 0; i < pageabale.length; i++) {
        var model = pageabale[i];
        if (model.get('total') !== undefined) {
            total = total + parseFloat(model.get('total'));
        }

    }
    $('#total').text(total.toFixed(3));

}