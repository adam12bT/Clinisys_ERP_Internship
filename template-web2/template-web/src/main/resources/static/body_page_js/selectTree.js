let SelectedTreeData = [];
let SelectTreeCsys = [];
function filterDataSelect(data, search) {
    let searchTxt = search.toLowerCase();
    if (search.length === 0)
        return data;

    return out = _.filter(data, function (obj) {
        return Object.values(obj).some(function (el) {
            if (el === null)
                return false;
            if (typeof el === "string")
                return el.toLowerCase().indexOf(searchTxt) > -1;
            else if (typeof el === "boolean" || typeof el === "number")
                return el.toString().indexOf(searchTxt) > -1;
            else
                return false;
        });
    });
}
function prepareDropdown(object) {
    let elementSelect = object.selectElement;
    let widthDropdown = object.width;
    if (widthDropdown === undefined || widthDropdown === "auto")
        widthDropdown = ($("#" + elementSelect).width() - 20) + "px";

    let codeHTML = "";
    codeHTML += '<div class="select-body" id="select-body' + elementSelect + '">';
    codeHTML += '<div id="dropDown' + elementSelect + '" class="dropdownCsys" style="width: ' + widthDropdown + '">';
    codeHTML += "<div class='searchSelect smart-form'>";
    codeHTML += '<form class="smart-form">';
    codeHTML += '<fieldset>';
    codeHTML += '<section>';
    codeHTML += '<label class="input">';
    codeHTML += '<i class="icon-append fa fa-search"></i>';
    codeHTML += '<input id="input_' + elementSelect + '2" type="text" placeholder="Rechercher"></label>';
    codeHTML += '</section>';
    codeHTML += '</fieldset>';
    codeHTML += '</form>';
    codeHTML += '</div>';
    codeHTML += "<div class='table bodySelect'>";

    codeHTML += "<div id='" + object.treeElement + "' style='overflow-y: auto; max-height: 200px;'>";

    codeHTML += "</div>";
    codeHTML += '</div>';

    return codeHTML;
}
/**
 * Créer le selectTree dynamiquement à partir de l'objet envoyé
 * @memberOf SelectTree
 * @param object l'objet pour remplir le selectTree (à partir de selectTreeObject() )
 * @example
 */
function createSelectTree(object, el) {
    let elementSelect = object.selectElement;
    let codeHTML = '<div class="selectCSys-container select-container" style="width: calc(100% - 20px);">';
    codeHTML += '<div id="input_' + elementSelect + '1" class="select-choice">';
    codeHTML += '<span class="select-chosen"><label> </label></span>';
    codeHTML += '<span class="select-arrow">';
    codeHTML += '<b></b>';
    codeHTML += '</span>';
    codeHTML += '</div>';
    codeHTML += '</div>';

    $(el).html(codeHTML);
    object.treeElement = elementSelect + '_tree';

    let codeHTMLDropdown = prepareDropdown(object);
    if (document.getElementById("select-body" + elementSelect))
        document.getElementById("select-body" + elementSelect).remove();
    $("body").append(codeHTMLDropdown);

    object.selectedIcon = "glyphicon glyphicon-stop";
    $("#" + object.treeElement).treeview(object);
    SelectedTreeData[object.selectElement] = null;
    SelectTreeCsys[object.treeElement] = object;
    click_event(object, el);
    keyup_event(object, el);
    selectObject(object, el);
      setPositionDropDown(elementSelect, el);
}
/**
 * Sélectionner le noeud correspondant au prédicat
 * @memberOf SelectTree
 * @param object
 * @example
 */
function selectTreeRowByProperty(object) {
    let tree = $('#' + object.elementSelect + "_tree").treeview(true);
    if (object.designation) {
        let search = tree.search(object.designation, {
            exactMatch: true
        });
        if (search.length === 1)
            tree.selectNode(search[0].nodeId);
        else if (search.length > 1) {
            if (object.code) {
                let filtredList = _.filter(search, function (obj) {
                    return obj.code === object.code;
                });
                tree.selectNode(filtredList[0].nodeId);
            } else
                tree.selectNode(search[0].nodeId);
        }
    } else
        SelectedTreeData[object.elementSelect] = null;
}
function click_event(object, el) {
    let elementSelect = object.selectElement;
    $(el).find(".selectCSys-container span").off("click").on("click", function () {
        if (this.classList.contains('select-chosen') || this.classList.contains('select-arrow') || this.classList.contains('select-choice')) {
            let element;
            if (this.classList.contains('select-chosen') || this.classList.contains('select-arrow'))
                element = this.parentElement.parentElement;
            else
                element = this.parentElement;

            element.classList.add("openSelect");
            document.querySelector("#select-body" + elementSelect).style.display = "block";
            setPositionDropDown(elementSelect, el);
            document.querySelector("#select-body" + elementSelect).addEventListener("click", function (e) {
                if (e.target.classList.contains('select-body')) {
                    e.target.style.display = "none";
                    let x;
                    let y;
                    if (e.pageX || e.pageY) {
                        x = e.pageX;
                        y = e.pageY;
                    } else {
                        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    }
                    let elementClick = document.elementFromPoint(x, y);
                    if ($(elementClick).closest(el).length <= 0) {
                        elementClick.click();
                    }

                    element.classList.remove("openSelect");
                    var selectTree = SelectTreeCsys[elementSelect + '_tree'];
                    if (selectTree.closeTree !== undefined)
                        selectTree.closeTree();
                }
            });

            object.selectedIcon = "glyphicon glyphicon-stop";
            $("#" + object.treeElement).treeview(object);
            selectObject(object, el);

            //focus
            document.querySelector("#select-body" + elementSelect).querySelector("#input_" + elementSelect + "2").value = "";
            document.querySelector("#select-body" + elementSelect).querySelector("#input_" + elementSelect + "2").focus();
        } else if (this.classList.contains('select-clear')) {
            SelectedTreeData[object.selectElement] = null;
            el.getElementsByClassName("select-chosen")[0].textContent = "";
            el.children[0].classList.remove("openSelect");
            document.querySelector("#select-body" + elementSelect).style.display = "none";
            el.getElementsByClassName("select-clear")[0].style.display = "none";
        }
    });
}
function keyup_event(object, el) {
    let elementSelect = object.selectElement;
    document.getElementById("input_" + elementSelect + "2").addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            return false;
        } else {
            let search = document.getElementById("input_" + elementSelect + "2").value;
            $("#" + object.treeElement).find(".node-disabled").removeClass("node-disabled");
            $("#" + object.treeElement).treeview('expandAll');
            $("#" + object.treeElement).treeview('enableAll');

            if (search === "") {
                $("#" + object.treeElement).treeview('clearSearch');
                $("#" + object.treeElement).find(".node-disabled").removeClass("node-disabled");
                return false;
            }

            let options = {
                ignoreCase: true,
                exactMatch: false,
                revealResults: true
            };
            $("#" + object.treeElement).treeview('search', [search, options]);
            $("#" + object.treeElement).scrollTop(0);
            if ($("#" + object.treeElement + ' ul li.search-result').first().position() !== undefined) {
                $("#" + object.treeElement).scrollTop($("#" + object.treeElement + ' ul li.search-result').first().position().top - 50);
            }
        }
    });
}
function selectObject(object, el) {
    $('#' + object.treeElement).on('nodeSelected', function (event, data) {
        let selectedRow = data;
        let elementSelect = object.selectElement;
        let elementUnselected = object.elementUnselected;
        let element = el.querySelector(".selectCSys-container");
        SelectedTreeData[elementSelect] = selectedRow;
        if (selectedRow !== null && selectedRow[object.champsSelection] !== undefined) {
            el.querySelector(".select-chosen").innerHTML = '<label class="select-text" code="' + selectedRow.code + '" title="' + selectedRow[object.champsSelection] + '">' + selectedRow[object.champsSelection] + '</label><span class="select-clear"><i class="fa fa-times"></i></span>';
            element.classList.remove("openSelect");
            document.querySelector("#select-body" + elementSelect).style.display = "none";
            $(el.querySelector(".select-chosen>.select-clear")).off("click").on("click", function (event) {
                event.stopPropagation();
                el.querySelector(".select-chosen").innerHTML = "<label></label>";
                SelectedTreeData[elementSelect] = null;
                el.children[0].classList.remove("openSelect");
                elementUnselected(selectedRow, SelectedTreeData[elementSelect]);
            });
            let elementSelected = object.elementSelected;
            if (elementSelected !== undefined)
                elementSelected(selectedRow);
        } else {
            document.getElementById(elementSelect).querySelector(".select-chosen").innerHTML = "<label></label>";
            document.querySelector("#select-body" + elementSelect).style.display = "none";
        }
    });
}
function setPositionDropDown(elementSelect, el) {
    if (localStorage.getItem("langue") === "ar") {
        let $window = $(window);
        let isCurrentlyAbove = $('#dropDown' + elementSelect).hasClass('selectCsys-dropdown--above');
        let isCurrentlyBelow = $('#dropDown' + elementSelect).hasClass('selectCsys-dropdown--below');
        let newDirection = null;
        let offset = $(el).find('.select-container').offset();
        offset.right = ($window.width() - ($(el).find('.select-container').offset().left + $('#' + elementSelect + ' .select-container').outerWidth()));

        offset.bottom = offset.top + $(el).find('.select-container').outerHeight(false);

        let container = {
            height: $(el).find('.select-container').outerHeight(false)
        };

        container.top = offset.top;
        container.bottom = offset.top + container.height;

        let dropdown = {
            height: $('#dropDown' + elementSelect).outerHeight(false)
        };

        let viewport = {
            top: $window.scrollTop(),
            bottom: $window.scrollTop() + $window.height()
        };

        let enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
        let enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

        let css = {
            right: offset.right,
            top: container.bottom
        };

        // Determine what the parent element is to use for calciulating the offset
        let $offsetParent = $('#dropDown' + elementSelect).parent();

        // For statically positoned elements, we need to get the element
        // that is determining the offset
        if ($offsetParent.css('position') === 'static') {
            $offsetParent = $offsetParent.offsetParent();
        }
        let widthTable = $('#dropDown' + elementSelect + ' #tableSelect_' + elementSelect).outerWidth();
        let width = $(el).find('.select-container').outerWidth();
        if (width > $('#dropDown' + elementSelect).outerWidth()) {
            css.width = width;
        }
        if (widthTable + 10 > $('#dropDown' + elementSelect).outerWidth() && width < widthTable + 10) {
            css.width = widthTable + 17;
        }
        let parentOffset = $offsetParent.offset();
        parentOffset.right = ($window.width() - ($offsetParent.offset().left + $offsetParent.outerWidth()));
        css.top -= parentOffset.top;
        css.right -= parentOffset.right;

        if (!isCurrentlyAbove && !isCurrentlyBelow) {
            newDirection = 'below';
        }

        if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
            newDirection = 'above';
        } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
            newDirection = 'below';
        }

        if (newDirection === 'above' || (isCurrentlyAbove && newDirection !== 'below')) {
            css.top = container.top - parentOffset.top - dropdown.height;
        } else {
            css.top -= 6;
        }
        if (newDirection !== null) {
            $('#dropDown' + elementSelect)
                    .removeClass('selectCsys-dropdown--below selectCsys-dropdown--above')
                    .addClass('selectCsys-dropdown--' + newDirection);
            $(el)
                    .removeClass('selectCsys-container--below selectCsys-container--above')
                    .addClass('selectCsys-container--' + newDirection);
        }
        $('#dropDown' + elementSelect).css(css);
    } else {
        let $window = $(window);
        let isCurrentlyAbove = $('#dropDown' + elementSelect).hasClass('selectCsys-dropdown--above');
        let isCurrentlyBelow = $('#dropDown' + elementSelect).hasClass('selectCsys-dropdown--below');
        let newDirection = null;
        let offset = $(el).find('.select-container').offset();

        offset.bottom = offset.top + $(el).find('.select-container').outerHeight(false);

        let container = {
            height: $(el).find('.select-container').outerHeight(false)
        };

        container.top = offset.top;
        container.bottom = offset.top + container.height;

        let dropdown = {
            height: $('#dropDown' + elementSelect).outerHeight(false)
        };

        let viewport = {
            top: $window.scrollTop(),
            bottom: $window.scrollTop() + $window.height()
        };

        let enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
        let enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

        let css = {
            left: offset.left,
            top: container.bottom
        };

        // Determine what the parent element is to use for calciulating the offset
        let $offsetParent = $('#dropDown' + elementSelect).parent();

        // For statically positoned elements, we need to get the element
        // that is determining the offset
        if ($offsetParent.css('position') === 'static') {
            $offsetParent = $offsetParent.offsetParent();
        }
        let widthTable = $('#dropDown' + elementSelect + ' #tableSelect_' + elementSelect).outerWidth();
        let width = $(el).find('.select-container').outerWidth();
        if (width > $('#dropDown' + elementSelect).outerWidth()) {
            css.width = width;
        }
        if (widthTable + 10 > $('#dropDown' + elementSelect).outerWidth() && width < widthTable + 10) {
            css.width = widthTable + 17;
        }
        let parentOffset = $offsetParent.offset();

        css.top -= parentOffset.top;
        css.left -= parentOffset.left;

        if (!isCurrentlyAbove && !isCurrentlyBelow) {
            newDirection = 'below';
        }

        if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
            newDirection = 'above';
        } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
            newDirection = 'below';
        }

        if (newDirection === 'above' || (isCurrentlyAbove && newDirection !== 'below')) {
            css.top = container.top - parentOffset.top - dropdown.height;
        } else {
            css.top -= 6;
        }
        if (newDirection !== null) {
            $('#dropDown' + elementSelect)
                    .removeClass('selectCsys-dropdown--below selectCsys-dropdown--above')
                    .addClass('selectCsys-dropdown--' + newDirection);
            $(el)
                    .removeClass('selectCsys-container--below selectCsys-container--above')
                    .addClass('selectCsys-container--' + newDirection);
        }
        $('#dropDown' + elementSelect).css(css);
    }

    window.addEventListener('resize', function (event) {

    });
}
/**
 * Désactiver le selectTree
 * @memberOf SelectTree
 * @param elementSelect l'objet selectTree
 * @example
 */
function disableSelectTree(elementSelect, el) {
    let selectTreeJquery = $(el);
    selectTreeJquery.find(".selectCSys-container span").off("click");
    selectTreeJquery.find(".selectCSys-container").addClass("disabled");
    selectTreeJquery.find(".select-chosen>.select-clear").off("click");
}
/**
 * Activer le Select
 * @memberOf Select
 * @param {String} elementSelect le nom du Select
 * @example
 */
function enableSelectTree(elementSelect, el) {
    let Select = SelectTreeCsys[elementSelect];
    $(el).find(".selectCSys-container span").off("click").on('click', function () {
        if (this.classList.contains('select-chosen') || this.classList.contains('select-arrow') || this.classList.contains('select-choice')) {
            let element;
            if (this.classList.contains('select-chosen') || this.classList.contains('select-arrow'))
                element = this.parentElement.parentElement;
            else
                element = this.parentElement;

            element.classList.add("openSelect");
            document.querySelector("#select-body" + elementSelect).style.display = "block";
            setPositionDropDown(elementSelect);
            document.querySelector("#select-body" + elementSelect).addEventListener("click", function (e) {
                if (e.target.classList.contains('select-body')) {
                    e.target.style.display = "none";
                    let x;
                    let y;
                    if (e.pageX || e.pageY) {
                        x = e.pageX;
                        y = e.pageY;
                    } else {
                        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    }
                    let elementClick = document.elementFromPoint(x, y);
                    if ($(elementClick).closest("#" + elementSelect).length <= 0) {
                        elementClick.click();
                    }

                    element.classList.remove("openSelect");
                }
            });
            Select.selectedIcon = "glyphicon glyphicon-stop";
            $("#" + Select.treeElement).treeview(Select);
            selectObject(Select, el);

            //focus
            document.querySelector("#select-body" + elementSelect).querySelector("#input_" + elementSelect + "2").value = "";
            document.querySelector("#select-body" + elementSelect).querySelector("#input_" + elementSelect + "2").focus();
        } else if (this.classList.contains('select-clear')) {
            SelectedTreeData[Select.selectElement] = null;
            el.getElementsByClassName("select-chosen")[0].textContent = "";
            el.children[0].classList.remove("openSelect");
            document.querySelector("#select-body" + elementSelect).style.display = "none";
            el.getElementsByClassName("select-clear")[0].style.display = "none";
        }
    });
    $(el).find(".selectCSys-container").removeClass("disabled");
}


function destroySelectTree(elementSelect, el) {
    delete SelectedTreeData[elementSelect];
    $(el).html('');
    if (document.getElementById("select-body" + elementSelect))
        document.getElementById("select-body" + elementSelect).remove();

}



