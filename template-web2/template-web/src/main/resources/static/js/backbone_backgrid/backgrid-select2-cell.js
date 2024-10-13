/*
 backgrid-select2-cell
 http://github.com/wyuenho/backgrid
 
 Copyright (c) 2013 Jimmy Yuen Ho Wong and contributors
 Licensed under the MIT @license.
 */

(function (window, $, _, Backbone, Backgrid) {

    /**
     Select2CellEditor renders an HTML `<select>` fragment as the editor.
     
     @class Backgrid.Select2CellEditor
     @extends Backgrid.CellEditor
     */
    var Select2CellEditor = Backgrid.Select2CellEditor = Backgrid.CellEditor.extend({

        /** @property */
        tagName: "select2",

        /** @property */
        events: {
            "close": "save",
            "change": "save",
            "blur": "close",
            "keydown": "close"
        },
        /** @property */
        select2Options: null,

        initialize: function () {
            Backgrid.SelectCellEditor.prototype.initialize.apply(this, arguments);
            this.close = _.bind(this.close, this);
        },

        /**
         Sets the options for `select2`. Called by the parent Select2Cell during
         edit mode.
         */
        setSelect2Options: function (options) {
            this.select2Options = _.extend(options || {});
        },
        setUpdateData: function (updateData) {
            this.updateData = updateData;
        },
        render: function () {
            this.$el.empty();
            this.$el.select2(this.select2Options(this.model));
            this.delegateEvents();
            return this;
        },
        /**
         Attach event handlers to the select2 box and focus it.
         */
        postRender: function () {
            var self = this;
            this.$el.on("select2-selected", function (e) {
                if (!e.relatedTarget)
                    self.close(e);
            }).on("select2-close", function (e) {
                if (!e.relatedTarget)
                    self.close(e);
            }).on("keydown", this.close)
                    .attr("tabindex", -1).focus();
            this.$el.select2('open');
        },

        nextcell: true,
        /**
         Saves the value of the selected option to the model attribute.
         */
        save: function (e) {
            var model = this.model;
            var column = this.column;
//            model.set(column.get("name"), this.formatter.toRaw(this.$el.val(), model));
        },

        /**
         Triggers a `backgrid:edited` event from the model so the body can close
         this editor.
         */
        close: function (e) {
            var formatter = this.formatter;
            var model = this.model;
            var column = this.column;
            var command = new Backgrid.Command(e);
            var selecting = e.type === "select2-selected";
            var select2close = e.type === "select2-close";
            if (command.moveUp( ) || command.moveDown( ) || command.moveLeft( ) || command.moveRight( ) ||
                    command.save( ) || selecting) {

                e.preventDefault( );
                e.stopPropagation( );
                var val = this.$el.select2('data');
                var newValue = formatter.toRaw(val.objet, model);
                if (_.isUndefined(newValue)) {
                    model.trigger("backgrid:error", model, column, val);
                } else {
                    this.$el.off('select2-close');
                    this.$el.select2('destroy');
                    if (this.nextcell)
                        command.keyCode = 9;
//                    model.set(column.get("name"), newValue, {validate: true});
                    this.updateData(model, val.objet);
                    model.trigger("backgrid:edited", model, column, command);
                }
            } else if (command.cancel()) {
                this.$el.off('select2-close');
                this.$el.select2('destroy');
                e.preventDefault( );
                e.stopPropagation();
                model.trigger("backgrid:edited", model, column, command);
            } else if (select2close) {
                this.$el.off('select2-close');
                this.$el.select2('destroy');
                e.preventDefault( );
                e.stopPropagation();
                model.trigger("backgrid:edited", model, column, command);
            }
        },
        remove: function () {
            this.$el.select2("destroy");
            return Backgrid.SelectCellEditor.prototype.remove.apply(this, arguments);
        }


    });

    var Select2Cell = Backgrid.Select2Cell = Backgrid.Cell.extend({

        /** @property */
        className: "select2-cell",

        /** @property */
        editor: Select2CellEditor,

        /** @property */
        formatter: {
            fromRaw: function (rawValue, model) {
                return rawValue;
            },
            toRaw: function (formattedData, model) {
                return formattedData;
            }
        },

        /** @property */
        delimiter: ', ',
        /**
         Initializer.
         
         @param {Object} options
         @param {Backbone.Model} options.model
         @param {Backgrid.Column} options.column
         
         @throws {TypeError} If `optionsValues` is undefined.
         */
        initialize: function (options) {
            Select2Cell.__super__.initialize.apply(this, arguments);
            this.listenTo(this.model, "backgrid:edit", function (model, column, cell, editor) {
                if (column.get("name") == this.column.get("name")) {
                    editor.setSelect2Options(this.select2Options);
                    editor.setUpdateData(this.updateData);
                }
            });
        },
        render: function () {
            this.$el.empty();
            var model = this.model;
            var rawData = this.formatter.fromRaw(model.get(this.column.get("name")), model);
            this.$el.html(rawData);
            this.delegateEvents();
            return this;
        }

    });

}(window, jQuery, _, Backbone, Backgrid));
