(function ($) {
    let title_lang = "Veuillez patienter quelques secondes ..";
    let langue = localStorage.getItem("langue").toLowerCase();
    if (langue === "fr")
        title_lang = "Veuillez patienter quelques secondes ..";
    else if (langue === "en")
        title_lang = "Please wait a moment ..";
    else if (langue === "ar")
        title_lang = "جاري تحميل البيانات ";

    $.loader_ext = {
        defaults: {
            autoCheck: 32,
            css: {},
            size: 32,
            bgColor: '#eee',
            bgOpacity: 0.5,
            fontColor: false,
            position: [0, 0, 0, 0],
            title: title_lang,
            isOnly: true,
            imgUrl: './img/loading[size].gif',
            onShow: function () {
            },
            onClose: function () {
            }
        },

        template: function (tmpl, data) {
            $.each(data, function (k, v) {
                tmpl = tmpl.replace('${' + k + '}', v);
            });
            return $(tmpl);
        },

        init: function (scope, options) {
            this.options = $.extend({}, this.defaults, options);
            this.scope = scope;

            if (this.scope.is(':hidden')) {
                return;
            }
            this.checkScope();
            this.check_position();
            this.check_unique();
            this.create();
            this.set_css();
            this.set_define();
            this.show();

            return this.loading;
        },

        checkScope: function () {
            if (!this.options.autoCheck) {
                return;
            }
            if (this.scope.is('body') || this.scope.is('div') || this.scope.is('form')) {
                this.options.size = this.options.autoCheck;
            }
            if (this.scope.is('input') || this.scope.is('button')) {
                this.options.title = '';
            }
        },

        check_position: function () {
            let pos = this.options.position;
            for (let i = 0; i < 4; i++) {
                if (pos[i] === undefined) {
                    pos[i] = 0;
                }
            }
            this.options.position = pos;
        },

        check_unique: function () {
            if (this.options.isOnly && this.loading !== undefined) {
                this.close();
            }
        },

        create: function () {
            let ops = this.options;
            ops.imgUrl = ops.imgUrl.replace('[size]', ops.size + 'x' + ops.size);
            this.loading = this.template($.loader.tmpl, {
                Class: 'x' + ops.size,
                Src: ops.imgUrl,
                Title: ops.title
            }).hide();
            this.loading.appendTo($('body'));
        },

        set_css: function () {
            let scope = this.scope,
                ops = this.options,
                loading = this.loading,
                height = scope.outerHeight(),
                width = scope.outerWidth(),
                top = scope.offset().top,
                left = scope.offset().left;

            loading.css('top', top);

            if (scope.is('body')) {
                height = $(window).height();
                width = $(window).width();
                loading.css('position', 'fixed');

                this.for_ie6();
            }

            loading.css({
                'height': height + ops.position[2],
                'width': width + ops.position[3],
                'left': left,
                'border-radius': scope.css('border-radius')
            }).css(ops.css);

            let loader = loading.children();
            loader.css({
                'margin-top': ((height - ops.size) / 2 + ops.position[0]) * 0.5,//modified by wafa
                'margin-left': (width - ops.size) / 2 + ops.position[1] - loader.find('span').outerWidth() / 2
            });
        },

        set_define: function () {
            let ops = this.options,
                loading = this.loading;
            if (!ops.bgColor) {
                loading.css('background', 'none');
            } else {
                loading.css({
                    'background-color': ops.bgColor,
                    'opacity': ops.bgOpacity,
                    'filter': 'alpha(opacity=' + ops.bgOpacity * 100 + ')'
                });
            }

            ops.fontColor && loading.find('span').css('color', ops.fontColor);

            let self = this;
            $(window).resize(function () {
                self.loading && self.set_css();
            });
        },

        for_ie6: function () {
            let loading = this.loading;
            if ($.browser && $.browser.msie && $.browser.version === '6.0') {
                loading.css({
                    'position': 'absolute',
                    'top': $(window).scrollTop()
                });

                $(window).scroll(function () {
                    loading.css("top", $(window).scrollTop());
                });
            }
        },

        show: function () {
            let ops = this.options;
            this.loading.show(1, function () {
                let loader = $(this).children();
                let left = loader.css('margin-left').replace('px', '');
                loader.css('margin-left', left - loader.find('span').outerWidth() / 2 + 50);
                ops.onShow(this.loading);
            });
        },

        close: function (all) {
            if (all) {
                let className = $($.loader.tmpl).attr('class');
                $('.' + className).remove();
            } else {
                if (this.loading !== undefined) {
                    this.loading.remove();
                    this.loading = undefined;
                }
            }
            this.options !== undefined && this.options.onClose();
        }
    };

    $.loader = {
        tmpl: '<div class="loading_wrp"><div class="loading ${Class}"><img src="${Src}" /><span>${Title}</span></div></div>',

        open: function (arg) {
            return $('body').loader(arg);
        },
        close: function (all) {
            $.loader_ext.close(all);
        }
    };

    $.fn.loader = function (arg) {
        if (!$(this).size()) {
            return;
        }
        if ($.type(arg) === "string") {
            arg = {
                title: arg
            };
        }
        let dom = $(this);
        if (dom.size() > 1) {
            dom = dom.parent();
        }
        return $.loader_ext.init(dom, arg);
    };

})(jQuery);