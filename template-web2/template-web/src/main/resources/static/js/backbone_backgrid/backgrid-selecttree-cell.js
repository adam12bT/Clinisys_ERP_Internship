/*
 backgrid-selectTree-cell
 http://github.com/wyuenho/backgrid
 
 Copyright (c) 2013 Jimmy Yuen Ho Wong and contributors
 Licensed under the MIT @license.
 */

(function (window, $, _, Backbone, Backgrid) {

    /**
     SelectTreeCellEditor renders an HTML `<select>` fragment as the editor.
     
     @class Backgrid.SelectTreeCellEditor
     @extends Backgrid.CellEditor
     */
    var SelectTreeCellEditor = Backgrid.SelectTreeCellEditor = Backgrid.CellEditor.extend({

        /** @property */
        tagName: "selectTree",

        /** @property */
        events: {
            "close": "save",
            "change": "save",
            "blur": "close",
            "keydown": "close"
        },
        /** @property */
        selectTreeOptions: null,

        initialize: function () {
            Backgrid.SelectCellEditor.prototype.initialize.apply(this, arguments);
            this.close = _.bind(this.close, this);
        },

        /**
         Sets the options for `selectTree`. Called by the parent SelectTreeCell during
         edit mode.
         */
        setSelectTreeOptions: function (options) {
            this.selectTreeOptions = _.extend(options || {});
        },
        setUpdateData: function (updateData) {
            this.updateData = updateData;
        },
        render: function () {
            this.$el.empty();
            var selectTree = this.selectTreeOptions(this.model);
            var close = this.close;
            selectTree.selectElement = this.cid;
            selectTree.treeElement = this.cid;
            selectTree.elementSelected = function (element) {
                close("selectTree-selected");
            };
            selectTree.elementUnselected = function (element) {
                close("selectTree-unselect");
            };
            selectTree.closeTree=function () {
                  close("selectTree-close");
            }
            createSelectTree(selectTree, this.el);
            $(this.el).find(".selectCSys-container span").click();
            this.delegateEvents();
            return this;
        },

        nextcell: true,
        /**
         Saves the value of the selected option to the model attribute.
         */
        save: function (e) {
            var model = this.model;
            var column = this.column;
            model.set(column.get("name"), this.formatter.toRaw(SelectedTreeData[this.cid], model));
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
            var selecting = e === "selectTree-selected";
            var selectTreeclose = e === "selectTree-close";
            if (selecting) {
                var val = SelectedTreeData[this.cid];
                var newValue = formatter.toRaw(val, model);
                if (_.isUndefined(newValue)) {
                    model.trigger("backgrid:error", model, column, val);
                } else {
                    if (this.nextcell)
                        command.keyCode = 9;
                    model.set(column.get("name"), newValue, {validate: true});
                    this.updateData(model, val);
                    model.trigger("backgrid:edited", model, column, command);
                }
            } else if (selectTreeclose) {
                model.trigger("backgrid:edited", model, column, command);
            }
        },
        remove: function () {
            destroySelectTree(this.el, this.cid);
            return Backgrid.SelectCellEditor.prototype.remove.apply(this, arguments);
        }


    });

    var SelectTreeCell = Backgrid.SelectTreeCell = Backgrid.Cell.extend({

        /** @property */
        className: "selectTree-cell",

        /** @property */
        editor: SelectTreeCellEditor,

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
            SelectTreeCell.__super__.initialize.apply(this, arguments);
            this.listenTo(this.model, "backgrid:edit", function (model, column, cell, editor) {
                if (column.get("name") == this.column.get("name")) {
                    editor.setSelectTreeOptions(this.selectTreeOptions);
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
