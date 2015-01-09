(function ($, window) {
    var topNamespace = window;
    //************************************************************************
    //模板格式化（正则替换）
    //************************************************************************
    var formatModel = function (str, model) {
        for (var k in model) {
            var re = new RegExp("{" + k + "}", "g");
            str = str.replace(re, model[k]);
        }
        return str;
    };
    var ieSelectFix = function (e) {
        if (e)
            e.preventDefault();
        return false;
    };
    //************************************************************************
    //JS获取年月日
    //************************************************************************
    function getDateWeek() {
        var todayDate = new Date();
        var date = todayDate.getDate();
        var month = todayDate.getMonth() + 1;
        var year = todayDate.getYear();
        var dateweek = "";
        if (navigator.appName == "Netscape")
            dateweek = dateweek + (1900 + year) + "年" + month + "月" + date + "日 ";
        if (navigator.appVersion.indexOf("MSIE") != -1) {
            if (year <= 1900) year += 1900;
            dateweek = dateweek + year + "年" + month + "月" + date + "日 ";
        }
        switch (todayDate.getDay()) {
            case 0: dateweek += "星期日"; break;
            case 1: dateweek += "星期一"; break;
            case 2: dateweek += "星期二"; break;
            case 3: dateweek += "星期三"; break;
            case 4: dateweek += "星期四"; break;
            case 5: dateweek += "星期五"; break;
            case 6: dateweek += "星期六"; break;
        }
        return dateweek;
    }
    //************************************************************************
    //JS动态加载图片（图片加载完成后自动调用回调函数）
    //************************************************************************
    function SImage(callback) {
        var img = new Image();
        this.img = img;
        var appname = navigator.appName.toLowerCase();
        if (appname.indexOf("netscape") == -1) {
            img.onreadystatechange = function () {
                if (img.readyState == "complete") { callback(img); }
            };
        } else {
            img.onload = function () {
                if (img.complete == true) { callback(img); }
            }
        }
    }

    SImage.prototype.get = function (url) {
        this.img.src = url;
    }

    //************************************************************************
    //ui模块包 组件基类
    //************************************************************************
    $.Package(function (J) {
        J.ui = J.ui || {};
        J.ui.KEY = {
            UP: 38,
            DOWN: 40,
            DEL: 46,
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8,
            SPACE: 32
        };


        var componetConfig = {
            events: {}
        }
        J.ui.componet = J.Class({
            init: function (config) {
                var componetOption = J.extend({}, componetConfig, config);
                var context = this;
                for (var i in componetOption.events) {
                    if (componetOption.events[i])
                        J(context).bind(i, J.proxy(componetOption.events[i].fn, componetOption.events[i].scope))
                }
                context.el = document.body;
                if (config && config.id)
                    context.id = config.id;
                else
                    context.id = "";
            },
            addEvent: function (name, fn, scope) {
                if (!scope) scope = this;
                J(this).bind(name, J.proxy(fn, scope));
            },
            removeEvent: function (name, fn, scope) {
                if (!scope) scope = this;
                J(this).unbind(name, J.proxy(fn, scope));
            },
            on: function (name, fn, scope) {
                this.addEvent(name, fn, scope);
            },
            un: function (name, fn, scope) {
                this.removeEvent(name, fn, scope);
            }
        });
    });

    //************************************************************************
    //Window 模块(类)
    //************************************************************************
    $.Package(function (J) {
        var id = 1000, zIndex = 38, currentWindow = null, btnId = 1,
		winConfig = {
		    title: "窗口标题1",
		    height: 300, width: 300,
		    top: 150, left: 300,
		    minH: 200, minW: 300, html: '',
		    max: false, mask: false,
		    visible: false, iscenter: false,
		    resizeable: true, dragable: true,
		    maxable: true, minable: true, closeable: true,
		    fresh: true, total: 20,
		    isShowIcon: false, IconSrc: "",
		    renderTo: document.body,
		    buttons: [],
		    events: {
		        winInit: { fn: function () { }, scope: this },
		        winMaxsize: { fn: function () { }, scope: this },
		        winMinimize: { fn: function () { }, scope: this },
		        winRestore: { fn: function () { }, scope: this },
		        winClose: { fn: function () { }, scope: this },
		        winShow: { fn: function () { }, scope: this },
		        winActive: { fn: function () { }, scope: this },
		        winDragStart: { fn: function () { }, scope: this },
		        winDragMove: { fn: function () { }, scope: this },
		        winDragEnd: { fn: function () { }, scope: this },
		        winResize: { fn: function () { }, scope: this }
		    }
		},
		html = '<div id="appWindow_{id}" class="window" style="width:{width}px;height:{height}px;left:{left}px;top:{top}px; display: block; visibility: visible; z-index:{zIndex};">\
					<div class="window_outer" id="window_outer_{id}" style="padding:10px; height: 558px; z-index:64;">\
						<div class="window_inner" id="window_inner_{id}" style="z-index:96;">\
							<div id="window_bg_container_{id}" class="window_bg_container"></div>\
							<div class="window_content">\
								<div class="window_titleBar" id="window_titleBar_{id}">\
									<div class="window_toolButtonBar" id="window_toolButtonBar_{id}"></div>\
									<div class="window_titleButtonBar" id="window_titleButtonBar_{id}">\
										<a id="ui_button_close_{id}" class="ui_button window_action_button window_close" title="关闭" hidefocus="" href="###" style="display: block;"></a>\
										<a id="ui_button_max_{id}" class="ui_button window_action_button window_max" title="最大化" hidefocus="" href="###" style="display: block;"></a>\
										<a id="ui_button_restore_{id}" class="ui_button window_action_button window_restore" title="还原" hidefocus="" href="###" _olddisplay="" style="display: none;"></a>\
										<a id="ui_button_min_{id}" class="ui_button window_action_button window_min" title="最小化" hidefocus="" href="###" style="display: block;"></a>\
									</div>\
									<div class="window_title titleText" id="window_title_{id}">\
										{title}\
									</div>\
								</div>\
								<div class="window_bodyOuter" id="window_body_outer_{id}" style="width: 825px; top: 25px; height: 532px;">\
									<div class="window_toolBar" id="window_toolBar_{id}"></div>\
									<div style="display:none" class="app_toolbar_icon app_toolbar_toggle app_toolbar_toggle_up" id="window_toggleToolbar_{id}"></div>\
									<div class="window_bodyArea" id="window_body_{id}" style="width: 825px; height: 532px;">{html}\
										<div class="iframeDragResizeMask" id="iframeApp_dragResizeMask_{id}" style="display: none;"></div>\
									</div>\
								</div>\
								<div class="window_controlArea" id="window_controlArea_{id}" _olddisplay=""></div>\
							</div>\
						</div>\
					</div>\
				</div>';
        var maskLayer = '<div id="ui_maskLayer" class="ui_maskLayer " style="opacity: 0.5; z-index: 300030; display: block;" _olddisplay="block">\
							<div class="ui_maskLayerBody" id="ui_maskLayerBody_0"></div>\
						</div>'
        getId = function () {
            return id++;
        },
		getZIndex = function () {
		    return zIndex++;
		},
		initWindow = function (context, option) {
		    var height = option.height > option.minH ? option.height : option.minH;
		    var width = option.width > option.minW ? option.width : option.minW;
		    height = height > J(window).height() ? J(window).height() : height;
		    width = width > J(window).width() ? J(window).width() : width;

		    context.el.height(height + "px");
		    context.el.width(width + "px");
		    context.height = height;
		    context.width = width;
		    if (option.iscenter) {
		        var iTop = (J(window).height() - context.el.height()) / 2;
		        context.el.css({
		            left: (J(window).width() - context.el.width()) / 2,
		            top: iTop > 0 ? iTop : 0
		        });
		    }
		    layoutWindow(context);
		    if (option.IconSrc && option.IconSrc.length > 0) {
		        J(".window_title", context.el).prepend('<img title="' + option.title + '" src="' + option.IconSrc + '"/>');
		    }
		    if (option.closeable)
		        J("a.window_close", context.el).bind("click", J.proxy(context.close, context)).show();
		    else
		        J("a.window_close", context.el).hide();
		    J(context.el).bind("click", J.proxy(context.active, context));
		    if (option.minable) {
		        J("a.window_min", context.el).bind("click", J.proxy(context.minimize, context)).show();
		    } else {
		        J("a.window_min", context.el).hide();
		    }
		    if (option.maxable) {
		        J("a.window_max", context.el).bind("click", J.proxy(context.maxsize, context)).show();
		        J("a.window_restore", context.el).bind("click", J.proxy(context.restore, context));
		        J(".window_titleBar", context.el).dblclick(function () {
		            if (J("a.window_restore", context.el).is(":hidden"))
		                J("a.window_max", context.el).trigger("click");
		            else
		                J("a.window_restore", context.el).trigger("click");
		        });
		    } else J("a.window_max", context.el).hide();
		    if (option.resizeable) {
		        var r = new J.ui.Resize({
		            apperceiveEl: J(".window_inner", context.el)[0], effectEl: context.el[0],
		            minWidth: option.minW, minHeight: option.minH,
		            start: { fn: function () { context.el.find(".iframeDragResizeMask").show(); } },
		            resize: { fn: resizeWindow, scope: context },
		            finish: { fn: function () { context.el.find(".iframeDragResizeMask").hide(); } }
		        });
		        J(context.el).data("resize", r);
		    }
		    if (option.dragable) {
		        var p = new J.ui.Drag({
		            apperceiveEl: J(".window_titleBar", context.el)[0], effectEl: context.el[0],
		            start: { fn: function () { context.el.trigger("click"); context.el.find(".iframeDragResizeMask").show(); } },
		            move: { fn: moveWindow, scope: context },
		            finish: { fn: function () { context.el.find(".iframeDragResizeMask").hide(); } }
		        });
		        J(context.el).data("drag", p);
		    }
		    if (option.max) context.maxsize();
		    if (option.visible) {
		        J(context.el).show();
		    } else
		        J(context.el).hide();
		    if (option.mask) {
		        if (!J("#ui_maskLayer")[0]) {
		            J(option.renderTo).append(maskLayer);
		            J("#ui_maskLayer").bind("contextmenu", function (e) { return false; });
		        }
		        J("#ui_maskLayer").show();
		        J(context.el).css({ zIndex: "300031" });
		        J("a.window_min", context.el).hide();
		        J("a.window_max", context.el).hide();
		    }
		    if (option.buttons && option.buttons.length > 0) {
		        for (var i in option.buttons) {
		            if (typeof option.buttons[i].text == "string" && option.buttons[i].text.length > 0
					&& J.isFunction(option.buttons[i].handler)) {
		                var btnHtml = '<a style="display: block;" href="###" hidefocus="" title="" class="ui_button window_button window_ok" id="ui_button_' + btnId + '">' + option.buttons[i].text + '</a>';
		                J(".window_controlArea", context.el).prepend(btnHtml);
		                J("#ui_button_" + btnId, context.el).bind("click", function () {
		                    var btn = this;
		                    option.buttons[i].handler(context, J(btn).html());
		                });
		                btnId++;
		            }
		        }
		        if (J(".window_controlArea", context.el).html())
		            J(".window_controlArea", context.el).show();
		    }
		},
		layoutWindow = function (context) {
		    J(".window_outer", context.el).css({ height: (J(context.el).height() - 18) + "px" });
		    J(".window_bodyOuter", context.el).css({ width: (J(context.el).width() - 30) + "px", height: (J(context.el).height() - 46) + "px" });
		    J(".window_bodyArea", context.el).css({ width: (J(context.el).width() - 30) + "px", height: (J(context.el).height() - 45) + "px" });
		},
		resizeWindow = function (e, width, height) {
		    var context = this;
		    var y = parseInt(J(context.el).css("top"));
		    if (y <= -10) {
		        var h = -10 - y;
		        J(context.el).css({ top: "-10px", height: (J(context.el).height() - h) + "px" });
		    }
		    layoutWindow(this);
		    J(context).trigger("winResize", [context]);
		},
		moveWindow = function (e, x, y) {
		    if (y <= 30) { J(this.el).css({ top: "20px" }) }
		    if (y + J(".window_titleBar", this.el).outerHeight() > $(window).height() - 10) {
		        J(this.el).css({ top: $(window).height() - J(".window_titleBar", this.el).outerHeight() - 10 });
		    }
		    if (x <= -J(".window_titleBar", this.el).outerWidth() * 2 / 3) {
		        J(this.el).css({ left: parseInt(-J(".window_titleBar", this.el).outerWidth() * 2 / 3) });
		    }
		    if (x + J(".window_titleBar", this.el).outerWidth() / 3 > $(window).width()) {
		        J(this.el).css({ left: parseInt($(window).width() - J(".window_titleBar", this.el).outerWidth() / 3) });
		    }
		};

        J.ui.window = J.Class({ extend: J.ui.componet }, {
            init: function (config) {
                var winOptions = J.extend({}, winConfig, config);
                var context = this;
                winOptions.id = getId();
                winOptions.zIndex = getZIndex();
                J(winOptions.renderTo).append(formatModel(html, winOptions));
                context.el = J("#appWindow_" + winOptions.id, winOptions.renderTo);
                initWindow(context, winOptions);
                J(context).trigger("winInit", [context]);
            },
            show: function () {
                var context = this;
                context.active();
                J(context.el).show();
                J(context).trigger("winShow", [context]);
            },
            hide: function () {
                J(this.el).hide();
            },
            close: function () {
                var context = this;
                J(context.el).remove();
                J("#ui_maskLayer").hide();
                J(context).trigger("winClose", [context]);
            },
            maxsize: function () {
                var context = this;
                var deskTopW = J(window).width() + 20;
                var deskTopH = J(window).height() - 8;
                if (!(J(context.el).width() == deskTopW && J(context.el).height() == deskTopH)) {
                    J(context.el).data("original", {
                        top: J(context.el).css("top"),
                        left: J(context.el).css("left"),
                        width: J(context.el).css("width"),
                        height: J(context.el).css("height")
                    });
                    J(context.el).css({ top: "20px", left: "-10px", width: deskTopW + "px", height: deskTopH + "px" });
                    layoutWindow(context);
                }
                J("a.window_max", context.el).hide();
                J("a.window_restore", context.el).show();
                J(context.el).data("drag").lock();
                J(context.el).data("resize").lock();
                context.show();
                J(context).trigger("winMaxsize", [context]);
            },
            restore: function () {
                var context = this;
                var original = J(context.el).data("original");
                var dwidth = parseInt(original.width);
                var dheight = parseInt(original.height);
                J("a.window_max", context.el).show();
                J("a.window_restore", context.el).hide();

                J(context.el).css({ top: original.top, left: original.left, width: dwidth, height: dheight });
                layoutWindow(context);

                J(context.el).data("drag").unlock();
                J(context.el).data("resize").unlock();
                J(context).trigger("winRestore", [context]);
            },
            minimize: function () {
                var context = this;
                J(context.el).hide();
                J(context).trigger("winMinimize", [context]);
            },
            active: function (e) {
                var context = this;
                if (currentWindow) {
                    if (!J("#ui_maskLayer").is(":visible"))
                        J(currentWindow.el).css({ zIndex: J(context.el).css("zIndex") }); //.removeClass("window_current");
                }
                if (!J("#ui_maskLayer").is(":visible"))
                    J(context.el).css({ zIndex: "58000" }); //.addClass("window_current");
                if (!J("#ui_maskLayer").is(":visible"))
                    currentWindow = context;
                J(context).trigger("winActive", [context]);
            },
            isVisible: function () {
                return J(this.el).is(":visible");
            },
            isActive: function () {
                context = this;
                return (currentWindow == context);
            }
        });
    });

    //************************************************************************
    //MessageBox(提示框类)
    //************************************************************************
    $.Package(function (J) {
        //默认消息按钮
        J.ui.MSGBUTTON = {
            OK: "确定",
            CANCEL: "取消",
            OKCANCEL: "确定|取消",
            YESNO: "是|否",
            YESNOCANCEL: "是|否|取消"
        };
        J.ui.MSGICON = {
            ERROR: "错误",
            INFO: "信息",
            QUESTION: "提问",
            WARNING: "警告"
        };
        var msgBoxId = 0;
        var configOption = {
            title: '温馨提示',
            msg: '确认保存',
            buttons: J.ui.MSGBUTTON.OKCANCEL,
            fn: function () { },
            icon: J.ui.MSGICON,
            width: 260,
            height: 128
        };
        J.ui.messageBox = {
            show: function (config) {
                var option = J.extend({}, configOption, config);
                var buttonArray = [];
                if (typeof option.buttons == "string" && option.buttons.length > 0) {
                    if (option.buttons.indexOf("|") == -1) {
                        var btnObj = {
                            text: option.buttons,
                            handler: function (win, btnText) {
                                option.fn(btnText);
                                win.close();
                            }
                        }
                        buttonArray.push(btnObj);
                    } else {
                        var btnArray = option.buttons.split("|");
                        for (var i in btnArray) {
                            var btnObj = {
                                text: btnArray[i],
                                handler: function (win, btnText) {
                                    option.fn(btnText);
                                    win.close();
                                }
                            }
                            buttonArray.push(btnObj);
                        }
                    }
                };
                var msgWin = new J.ui.window({
                    id: "msgBox_" + (++msgBoxId),
                    title: option.title,
                    html: '<div style="text-align: center;line-height: 52px;" class="ui_messageBox" id="ui_messageBox_' + msgBoxId + '">' + option.msg + '</div>',
                    width: option.width,
                    height: option.height,
                    minH: option.height,
                    minW: option.width,
                    mask: true,
                    resizeable: false,
                    buttons: buttonArray,
                    iscenter: true,
                    renderTo: "#desktop"
                });
                if (msgWin) msgWin.show();

            }
        };
    });

    //************************************************************************
    //Menu(菜单,右键菜单) 模块(类)
    //************************************************************************
    $.Package(function (J) {
        var menuConfig = {
            renderTo: "#desktop",
            left: 567,
            top: 84,
            width: 140,
            zIndex: 300000,
            items: []
        };

        J.ui.menu = J.Class({ extend: J.ui.componet }, {
            init: function (config) {
                var context = this;
                var menuOption = J.extend({}, menuConfig, config);
                context.renderTo = menuOption.renderTo;
                context.zIndex = menuOption.zIndex;
                context.index = 0;
                context.initMenuItem(menuOption.items);
                context.initMenuEvent();
                context.el = J("#context_menu_0", menuOption.renderTo);

                if (menuOption.left + menuOption.width >= J(window).width()) {
                    menuOption.left = menuOption.left - menuOption.width;
                }
                if (menuOption.top + context.el.height() >= J(window).height()) {
                    menuOption.top = menuOption.top - context.el.height();
                }
                context.el.css({
                    left: menuOption.left + "px",
                    top: menuOption.top + "px",
                    width: menuOption.width + "px"
                }).show();

                J(document).bind("click", J.proxy(function (e) {
                    var target = this;
                    target.remove();
                }, context));
            },
            initMenuItem: function (itemArray) {
                var context = this;
                if (!J.isArray(itemArray) || !itemArray.length) return;
                var menuHtml = '<div id="context_menu_' + context.index + '" class="context_menu" style="display: none;z-index:' + (context.zIndex++) + '">\
									<div class="context_menu_container">\
										<ul class="context_menu_item_list" id="context_menu_' + context.index + '_body">';
                for (var i in itemArray) {
                    if (itemArray[i] == "-") {
                        menuHtml = menuHtml + '<li class="context_menu_separator_container">\
												<span class="context_menu_separator"></span>\
											</li>';
                    } else if (typeof itemArray[i] == "object") {
                        var subico = '';
                        var dataObj = { fn: itemArray[i].fn, scope: itemArray[i].scope };
                        if (J.isArray(itemArray[i].items) && itemArray[i].items.length > 0) {
                            subico = '<span class="context_menu_item_subicon"></span>';
                            context.index++;
                            dataObj.subMenu = "#context_menu_" + context.index;
                            context.initMenuItem(itemArray[i].items);
                        }
                        var itemico = (typeof itemArray[i].ico == "string" && itemArray[i].ico.length > 0) ? '<span class="context_menu_item_icon ' + itemArray[i].ico + '"></span>' : '';
                        var disabledCls = (itemArray[i].disabled && itemArray[i].disabled == true) ? 'context_menu_item_disable' : '';
                        menuHtml = menuHtml + '<li class="context_menu_item_container ' + disabledCls + '">\
												<a title="' + itemArray[i].text + '" href="javascript:void(0);" class="context_menu_item">\
													' + itemico + '\
													<span class="context_menu_item_text">' + itemArray[i].text + '</span>\
													' + subico + '\
												</a>\
											</li>';
                        J(context).data(itemArray[i].text, dataObj)
                    }
                };
                menuHtml = menuHtml + '</ul>\
								</div>\
							</div>';
                J(context.renderTo).append(menuHtml);
            },
            initMenuEvent: function () {
                var context = this;
                J(".context_menu_item", context.renderTo).hover(function (e) {
                    if (J(this).parent().hasClass("context_menu_item_disable")) { J(this).parents(".context_menu").show(); return false; }
                    var key = J(this).attr("title");
                    var menuData = J(context).data(key);
                    if (menuData) {
                        var subMenu = menuData.subMenu;
                        if (typeof subMenu == "string" && subMenu.length > 0) {
                            if (J(this).offset().left == 0)
                                J(this).parents(".context_menu").show();
                            var left = J(this).offset().left;
                            var top = J(this).offset().top - 2;
                            var width = J(this).parent().width();

                            if (left + width + J(subMenu).width() > J(window).width()) {
                                left = left - width;
                            } else {
                                left = left + width;
                            }

                            J(subMenu).css({
                                left: left + "px",
                                top: top + "px",
                                zIndex: context.zIndex
                            }).show();
                            if (!J(subMenu).data("parentMenu"))
                                J(subMenu).data("parentMenu", J(this).parent());
                        }
                    }
                }, function (e) {
                    if (J(this).parent().hasClass("context_menu_item_disable")) return false;
                    var menuData = J(context).data(J(this).attr("title"));
                    if (menuData) {
                        var subMenu = menuData.subMenu;
                        if (typeof subMenu == "string" && subMenu.length > 0) {
                            J(subMenu).hide();
                        }
                    }
                }).click(function (e) {
                    if (J(this).parent().hasClass("context_menu_item_disable")) return false;
                    var menuData = J(context).data(J(this).attr("title"));
                    if (menuData) {
                        var fn = menuData.fn;
                        var scope = menuData.scope;
                        if (J.isFunction(fn)) {
                            fn.call(scope);
                        }
                    }
                    context.remove();
                    return false;
                });
                J(".context_menu[id!=context_menu_0]").hover(function (e) {
                    J(this).show()
                    var parentMenu = J(this).data("parentMenu");
                    if (parentMenu) {
                        var baseMenu = parentMenu.parents(".context_menu[id!=context_menu_0]");
                        if (baseMenu) {
                            baseMenu.show();
                            baseParentMenu = J(baseMenu[0]).data("parentMenu");
                            if (baseParentMenu)
                                baseParentMenu.addClass("context_menu_item_hover");
                        }
                        parentMenu.addClass("context_menu_item_hover");
                    }
                }, function (e) {
                    J(this).hide();
                    var parentMenu = J(this).data("parentMenu");
                    if (parentMenu) {
                        parentMenu.removeClass("context_menu_item_hover")
                    }
                });
            },
            remove: function () {
                var context = this;
                J(".context_menu", context.renderTo).remove();
            }
        });
    });

    // ***********************************************************************
    // 哈希表类
    // ***********************************************************************
    $.Package(function (J) {
        topNamespace.WebOs = {};
        topNamespace.WebOs.hashTable = function () { this.items = new Array(); this.itemsCount = 0; };
        topNamespace.WebOs.hashTable.prototype = {
            containsKey: function (key) {
                return typeof (this.items[key]) != "undefined";
            },
            put: function (key, value) {
                if (!this.containsKey(key)) {
                    this.items[key] = value;
                    this.itemsCount += 1;
                }
            },
            get: function (key) {
                if (this.containsKey(key)) {
                    return this.items[key];
                } else {
                    return null;
                }
            },
            remove: function (key) {
                if (this.containsKey(key)) {
                    delete this.items[key];
                    this.itemsCount -= 1;
                }
            },
            containsValue: function (value) {
                for (var key in this.items) {
                    if (this.items[key] == value) {
                        return true;
                    }
                }
                return false;
            },
            contains: function (val) {
                return this.containsKey(val) || this.containsValue(val);
            },
            clear: function () {
                this.items = new Array();
                this.itemsCount = 0;
            },
            size: function () {
                return this.itemsCount;
            },
            isEmpty: function () {
                return this.size() == 0;
            },
            keys: function () {
                var keys = new Array();
                for (var key in this.items) {
                    if ("remove" != key && "indexOf" != key) {
                        keys.push(key);
                    }
                }
                return keys;
            },
            values: function () {
                var values = new Array();
                for (var key in this.items) {
                    if ("remove" != key && "indexOf" != key) {
                        values.push(this.items[key]);
                    }
                }
                return values;
            }
        }
    });

    //-------------------------------------------------------------
    //-----------------IM窗体扩展类--------------------------------
    //-------------------------------------------------------------
    $.Package(function (J) {
        var winConfig = { bgImgPath: "" };
        topNamespace.WebOs.BaseIMWin = J.Class({ extend: J.ui.window }, {
            init: function (config) {
                var context = this;
                var winOption = J.extend({}, winConfig, config);
                if (context.el) { J(".window_outer", context.el).addClass("eIM_window") }
                if (winOption.bgImgPath && winOption.bgImgPath.length > 0) {
                    J(".window_bg_container", context.el).css({ background: 'url("' + winOption.bgImgPath + '?t=20111011001") repeat-x scroll 0% 0% #f3f6fc' })
                }
            }
        });
    });

    // ***********************************************************************
    // 工具栏模块(DockBar类)
    // ***********************************************************************
    $.Package(function (J) {
        var dockBarHtml = ' <div class="dock_taskBarBg"></div>\
                            <div id="dockContainer" class="dock_container">\
                                <div class="fresh"></div>\
                                <img width="64" class="stack" src="">\
                                <ul class="stack_ul" style="bottom: 50px;">\
                                    <li><a href=""><span>Aperture</span><img alt="Aperature" src=""></a></li>\
                                    <li><a href="#"><span>All&nbsp;Examples</span><img alt="Photoshop" src=""></a></li>\
			                        <li><a href="example3.html"><span>Example&nbsp;3</span><img alt="Safari" src=""></a></li>\
                                    <li><a href="example2.html"><span>Example&nbsp;2</span><img alt="Coda" src=""></a></li>\
                                    <li><a href="index.html"><span>Example&nbsp;1</span><img alt="Finder" src=""></a></li>\
                                </ul>\
                            </div>\
							<div class="dock_taskRight" style="margin-right: 100px">\
								<div class="app_dockShortCut smallShortCut" style="display:none;">\
									<div class="clear" style="width:175px;height: 5px"></div>\
									<div id="smallShort" style="overflow:hidden;position:relative;height: 95px;margin-top: 14px">\
										<div id="smallShortCut" style="width:140px;height: 100%;margin:5px 0 0 18px;">\
											<img width="64" class="smallStack" style="display:none" src="/content/webdesk/images/stack.png">\
										</div>\
										<div id="000" class="scrollBar" style="margin-top: 0px; height: 0pt; display: none;" _olddisplay=""></div>\
									</div>\
								</div>\
							</div>\
                            <div class="dock_taskRight">\
								<img alt="" src="http://asset.gleasy.com/platform/os/assets/stylesheets/os/images/ico_msg.png">\
                            </div>\
						    <div class="dock_item_title" style="left: 624px; bottom: 135px; display: none;">Mail</div>';
        var dockBarConfig = {
            renderTo: "#desktop",
            position: "top",
            appDockItem: [],
            appItem: [],
            appDockItemCount: 2,
            appItemCount: 5,
            events: {
                dockBarInit: { fn: function () { }, scope: this },
                dockItemAdd: { fn: function () { }, scope: this },
                dockBarShow: { fn: function () { }, scope: this },
                dockBarHide: { fn: function () { }, scope: this },
                dockBarRgClick: { fn: function () { }, scope: this },
                dockBarLock: { fn: function () { }, scope: this },
                dockBarUnLock: { fn: function () { }, scope: this },
                dockItemClick: { fn: function () { }, scope: this },
                dockItemRgClick: { fn: function () { }, scope: this },
                dockItemRemove: { fn: function () { }, scope: this }
            }
        };
        var appCount;
        var initAppItem = function (context, options) {
            options.appDockItemCount = (options.appDockItem.length > options.appDockItemCount) ? options.appDockItemCount : options.appDockItem.length;
            options.appItemCount = (options.appItem.length > options.appItemCount) ? options.appItemCount : options.appItem.length;

            for (var i = 0; i < options.appDockItemCount; i++) {
                if (!options.appDockItem[i]) continue;
                context.addShortCutItem(options.appDockItem[i]);
                context.shortCutItem.get(options.appDockItem[i].AppID).attr("remove", "no");
            }
            for (var j = 0; j < options.appItemCount; j++) {
                if (!options.appItem[j]) continue;
                context.addShortCutItem(options.appItem[j]);
                context.shortCutItem.get(options.appItem[j].AppID).attr("remove", "no");
            }
            $(".stack").next().css({ left: $(".stack").offset().left - 11, bottom: $(".stack").width() - 4 });
            $(".stack").next().find('li a>img').css({ width: ($(".stack").width() - 6) });
        };
        topNamespace.WebOs.dockBar = J.Class({ extend: J.ui.componet }, {
            init: function (config) {
                var dockBarOption = J.extend({}, dockBarConfig, config);
                var context = this;
                context.shortCutItem = new topNamespace.WebOs.hashTable();
                context.shortCutSmallItem = new topNamespace.WebOs.hashTable();
                J(dockBarOption.renderTo).append(dockBarHtml);
                if (!dockBarOption.position)
                    dockBarOption.position = "top";

                context.el = J("#dockContainer");
                context.position = dockBarOption.position;
                initAppItem(context, dockBarOption);

                var iWid = 128, iWidth = 64;

                $("*").mousemove(function (e) {
                    var oEvent = e || event;
                    var oMenu = document.getElementById('dockContainer');
                    var aImg = $("#dockContainer img");
                    aImg.each(function () {
                        var imgItem = this;
                        var imgX = imgItem.offsetLeft + oMenu.offsetLeft + imgItem.offsetWidth / 2;
                        var imgY = imgItem.offsetTop + oMenu.offsetTop + imgItem.offsetHeight / 2;
                        var a = imgX - oEvent.clientX;
                        var b = imgY - oEvent.clientY;
                        var c = Math.sqrt(a * a + b * b);
                        var scale = 1 - c / 300;
                        if (scale < 0.5) {
                            scale = 0.5;
                        }
                        imgItem.width = Math.ceil(iWid * scale);
                    });
                    /*var $el = $(".stack");
                    if (!$el.next().hasClass('openStack')) {
                    $el.next().find('li a>img').css({ width: ($el.width() - 6) });
                    $el.next().css({ left: $el.offset().left - 11, bottom: $el.width() - 4 });
                    }*/
                });

                $('#dockContainer .stack ,#desktopWrapper .stack_ul').mouseout(function (e) {
                    /*var $el = $(".stack");
                    if ($el.next().hasClass('openStack')) {
                    $el.next().removeClass('openStack').children('li').animate({ top: '10px', left: '-10px' }, 300);
                    $el.next().find('li a>img').animate({ width: '40px', marginLeft: '0' }, 300);
                    }*/
                });
                $('.showSmallBtn').live('click', function () {
                    context.showAppShortCut();
                });
                $('#dockContainer> img').live('mousemove', function () {
                    var el = $(this);
                    var offset = el.offset();
                    var x = offset.left;
                    var y = offset.top;
                    var title = el.attr("title")
                    if (title && title.length > 0)
                        $('.dock_item_title').css({ left: x + 12, top: y - 30 }).html(title).show();
                });
                $('#dockContainer> img').live('mouseout', function () {
                    $('.dock_item_title').hide();
                });
                $('#dockContainer > img').live('click', function () {
                    //跳跃动画函数
                    function vibrant() {
                        if (y > 5) {
                            y -= y * 0.45
                            $(this).animate({ "margin-bottom": 0 }, 90)
                            .animate({ "margin-bottom": y }, 90, vibrant);
                        } else {
                            $(this).animate({ "margin-bottom": 0 })
                        }
                    }

                    var y = 90;
                    $(this).animate({ "margin-bottom": 90 }, 200, vibrant);
                    J(context).trigger("dockItemClick", [J(this).attr("appid")]);

                }).live("contextmenu", function (e) {
                    var target = this;
                    J(context).trigger("dockItemRgClick", [e, J(this).attr("appid")]);
                });
                $('#smallShortCut > img').live('click', function () {
                    J(context).trigger("dockItemClick", [J(this).attr("appid")]);
                });

                // Stack initialize(我得把这个东西给弄掉)
                var openspeed = 300;
                var closespeed = 300;
                function showImg($el) {
                    var vertical = 55;
                    var horizontal = 0;
                    $el.next().children().each(function () {
                        $(this).animate({ top: '-' + vertical + 'px', left: horizontal + 'px' }, openspeed);
                        vertical = vertical + 55;
                        horizontal = (horizontal + .75) * 2;
                    });
                    $el.next().animate({ left: $el.offset().left - 11, bottom: "50px" }, openspeed).addClass('openStack')
                    .find('li a>img').animate({ width: '50px', marginLeft: '9px' }, openspeed);
                    $el.animate({ paddingTop: '0' });
                }
                function hideImg($el) {
                    $el.next().removeClass('openStack').children('li').animate({ top: '10px', left: '-10px' }, closespeed);
                    $el.next().find('li a>img').animate({ width: ($el.width() - 6), marginLeft: '0' }, closespeed);
                    $el.next().css({ left: $el.offset().left - 11, bottom: $el.width() - 4 });
                }
                $('.stack').toggle(function () {
                    var $el = $(this);
                    showImg($el);
                }, function () {
                    var $el = $(this);
                    hideImg($el)
                });

                // Stacks additional animation
                $('.stack_ul li a').hover(function () {
                    //$("img", this).animate({ width: '56px' }, 100);
                    $("span", this).animate({ marginRight: '30px' });
                }, function () {
                    //$("img", this).animate({ width: '50px' }, 100);
                    $("span", this).animate({ marginRight: '0' });
                });
                J(context).trigger("dockBarInit", [context]);
            },
            show: function () {
                J(this.el).show();
                J(this).trigger("dockBarShow", [this]);
            },
            hide: function () {
                J(this.el).hide();
                J(this).trigger("dockBarHide", [this]);
            },
            lock: function () {
                J(this).trigger("dockBarLock", [this]);
            },
            unlock: function () {
                J(this).trigger("dockBarUnLock", [this]);
            },
            getPosition: function () {
                return this.position;
            },
            showShortCutItemNotify: function (appID, notify) {
                var context = this;
                var shortcut = context.shortCutItem.get(appID);
                if (shortcut) {
                    shortcut.showNotify(notify);
                }
            },
            hideShortCutItemNotify: function (appID) {
                var context = this;
                var shortcut = context.shortCutItem.get(appID);
                if (shortcut) {
                    shortcut.hideNotify();
                }
            },
            removeShortCutItem: function (appID) {
                var context = this;
                var shortcut = context.shortCutItem.get(appID);
                var shortcutSmall = context.shortCutSmallItem.get(appID);
                if (shortcut && shortcut.attr("remove") != "no") {
                    context.shortCutItem.remove(appID);
                    context.shortCutSmallItem.remove(appID);
                    shortcut.remove();
                    shortcutSmall.remove();
                    context.showAppCount(context);
                    context.appShortCutScroll();
                }
            },
            addShortCutItem: function (config) {
                var context = this;
                if (!config) return;
                if (context.shortCutItem.get(config.AppID)) return;
                var index = config.AppIco.lastIndexOf('/');
                var icoSrc = config.AppIco.substring(0, index + 1) + "big.png";
                var smallIcoSrc = config.AppIco.substring(0, index + 1) + "small.png";
                J("#dockContainer .stack").before('<img width="64" class="appDockItem" id="taskItem_' + config.AppID + '" appid="' + config.AppID + '" title="' + config.AppName + '" src="' + icoSrc + '">');
                J(".smallStack").before('<img width="16" class="appDocksmallItem" id="taskSmallItem_' + config.AppID + '" appid="' + config.AppID + '" title="' + config.AppName + '" src="' + smallIcoSrc + '">');
                context.showAppCount(context);
                context.shortCutItem.put(config.AppID, J("#taskItem_" + config.AppID));
                context.shortCutSmallItem.put(config.AppID, J("#taskSmallItem_" + config.AppID));
                context.appShortCutScroll();
                J(context).trigger("dockItemAdd", [context, config.AppID]);
            },
            showAppCount: function (context) {
                appCount = parseInt(J(window).width() / 200 + (J(window).width() / 2 - 150) / 100);
                if (parseInt(context.shortCutItem.size()) > appCount)
                    J(".appDockItem:gt(" + (appCount - 1) + ")").hide();
                J(".appDockItem:lt(" + appCount + ")").show();
            },
            showAppShortCut: function () {
                if (J(".smallShortCut").is(":hidden"))
                    J(".smallShortCut").show();
                else
                    J(".smallShortCut").hide();
            },
            appShortCutScroll: function () {
                var context = this;
                var ContainerH = J('#smallShort').height();
                var scrollH = J('#smallShort')[0].scrollHeight;
                var scrollBar = J('#smallShort').find(".scrollBar");
                var my = 0, marginTop = 0;
                if (scrollH > ContainerH) {
                    var rate = ContainerH / scrollH;
                    scrollBar.height(Math.ceil(Math.max(1 * .5, rate * ContainerH) + 1)).show();
                    var scrollBarMove = function (e) {
                        marginTop = marginTop + (e.pageY - my);
                        scrollBar = J(e.data.scrollBar);
                        if (marginTop < 0) marginTop = 0;
                        if ((marginTop + scrollBar.height()) > ContainerH) marginTop = ContainerH - scrollBar.height();

                        scrollBar.css({ marginTop: marginTop + "px" });

                        J('#smallShortCut').css({ marginTop: "-" + marginTop * scrollH / ContainerH + "px" });

                        return false;
                    };
                    var scrollBarUp = function (e) {
                        J(document).unbind("mousemove", scrollBarMove);
                        J(document).unbind("mouseup", scrollBarUp);
                        return false;
                    };
                    scrollBar.bind("mousedown", function (e) {
                        marginTop = parseInt(J(this).css("marginTop"));
                        my = e.pageY;
                        J(document).bind("mousemove", { scrollBar: this }, scrollBarMove);
                        J(document).bind("mouseup", scrollBarUp);
                        return false;
                    });
                } else
                    scrollBar.hide();
            }
        });
    });

    // ***********************************************************************
    // 快捷图标模块(shortcut类)
    // ***********************************************************************
    $.Package(function (J) {
        var shortcutHtml = '<div style="left:{left}px; top:{top}px;" title="{AppName}" class="appButton" uid="app_{AppID}" id="alloy_icon_app_{AppID}_{AppCategoryID}" type="app" fileid="{AppID}" appid="{AppID}">\
							<div class="appButton_appIcon " id="alloy_icon_app_{AppID}_{AppCategoryID}_icon_div" style="">\
								<img id="alloy_icon_app_{AppID}_{AppCategoryID}_img" class="appButton_appIconImg" src="{AppIco}" alt="{AppName}">\
							</div>\
							<div class="appButton_appName">\
								<div id="alloy_icon_app_{AppID}_{AppCategoryID}_name" class="appButton_appName_inner">{AppName}</div>\
								<div class="appButton_appName_inner_right"></div>\
							</div>\
							<div style="display: none;" _olddisplay="" class="appButton_notify appButton_notify_2" id="alloy_icon_app_{AppID}_{AppCategoryID}_notify">\
								<span class="appButton_notify_inner">{AppNotify}</span>\
							</div>\
							<div class="appButton_delete" id="alloy_icon_app_{AppID}_{AppCategoryID}_delete" title="卸载应用"></div>\
						</div>';
        var shortCutConfig = {
            AppID: 45,
            AppCategoryID: 63,
            AppName: "QQ阅读",
            AppIco: "http://5.web.qstatic.com/webqqpic/pubapps/0/45/images/big.png",
            AppNotify: 0,
            renderTo: "#desktop",
            left: null,
            top: null,
            events: {
                shortCutInit: { fn: function (e) { }, scope: this },
                shortCutClick: { fn: function (e) { }, scope: this },
                shortCutRgClick: { fn: function (e) { }, scope: this },
                shortCutRemove: { fn: function () { }, scope: this }
            }
        };
        topNamespace.WebOs.shortcut = J.Class({ extend: J.ui.componet }, {
            init: function (config) {
                var shortCutOption = J.extend({}, shortCutConfig, config);
                var context = this;
                J(shortCutOption.renderTo).append(formatModel(shortcutHtml, shortCutOption));
                context.el = J(">.appButton:last-child", shortCutOption.renderTo);
                if (!shortCutOption.left || !shortCutOption.top) { context.el.removeAttr("style"); }
                if (shortCutOption.AppNotify > 0) { context.el.find(".appButton_notify").show(); }
                J(context.el).bind("click", J.proxy(function (e) {
                    var target = this;
                    J(target).trigger("shortCutClick", [target]);
                    target.el.find(".appButton_notify").hide();
                }, context)).bind("contextmenu", J.proxy(function (e) {
                    var target = this;
                    J(target).trigger("shortCutRgClick", [e, target]);
                    return false;
                }, context));
                J(context).trigger("shortCutInit", [context]);
            },
            remove: function () {
                J(this).trigger("shortCutRemove", [this]);
                J(this.el).remove();
            },
            show: function () {
                J(this.el).show();
            },
            showNotify: function (notify) {
                var context = this;
                if (notify > 0) {
                    context.el.find(".appButton_notify_inner").html(notify);
                    context.el.find(".appButton_notify").show();
                }
            },
            hideNotify: function () {
                var context = this;
                context.el.find(".appButton_notify").hide();
            },
            css: function (cssConfig) {
                if (!cssConfig) return false;
                var context = this;
                context.el.css(cssConfig);
            },
            addClass: function (className) {
                if (!className || className.length <= 0) return false;
                var context = this;
                context.el.addClass(className);
            },
            removeClass: function (className) {
                if (!className || className.length <= 0) return false;
                var context = this;
                context.el.removeClass(className);
            }
        });
    });


    // ***********************************************************************
    // appManagePanel模块(appManagePanel类)
    // ***********************************************************************
    $.Package(function (J) {
        var appManagePanelHtml = '<div id="appManagerPanel" class="appManagerPanel" style="display: none;">\
										<a href="###" class="aMg_close"></a>\
										<div index="2" customacceptdrop="1" class="aMg_dock_container"></div>\
										<div class="aMg_line_x"></div>\
										<div class="aMg_folder_container" style="height: 550px;">\
											<div class="folderItem folderItem_turn">\
												<div class="folder_bg folder_bg1"></div>\
												<div index="0" customacceptdrop="1" class="folderOuter">\
													<div index="0" customacceptdrop="1" class="folderInner" style="height: 100%; overflow: hidden;"></div>\
													<div class="scrollBar" style="margin-top: 0px; height: 0pt; display: none;" _olddisplay=""></div>\
												</div>\
											</div>\
											<div class="folderItem  folderItem_turn">\
												<div class="folder_bg folder_bg2"></div>\
												<div index="1" customacceptdrop="1" class="folderOuter">\
													<div index="1" customacceptdrop="1" class="folderInner" style="height: 100%; overflow: hidden;"></div>\
													<div class="scrollBar" style="margin-top: 0px; height: 0pt; display: none;" _olddisplay=""></div>\
												</div>\
												<div class="aMg_line_y"></div>\
											</div>\
										</div>\
									</div>';
        var appManagePanelConfig = {
            renderTo: "#dockBar",
            items: [],
            events: {
                onInit: { fn: function () { }, scope: this },
                onShow: { fn: function () { }, scope: this },
                onHide: { fn: function () { }, scope: this },
                onRemove: { fn: function () { }, scope: this },
                onAddItem: { fn: function () { }, scope: this },
                onClickItem: { fn: function () { }, scope: this },
                onRemoveItem: { fn: function () { }, scope: this }
            }
        };
        var containerLayOut = function () {
            var dockContainerH = J("#appManagerPanel >.aMg_dock_container").height();
            var folderContainer = J("#appManagerPanel >.aMg_folder_container");
            var folderContainerH = J(window).height() - dockContainerH - 22;
            folderContainer.height(folderContainerH);
            folderContainer.children(".folderItem").each(function () {
                var offsetH = J(this).find(".folderInner").height(); //list高度
                var scrollH = J(this).find(".folderInner")[0].scrollHeight; //总高度
                var scrollBar = J(this).find(".scrollBar");
                var my = 0, marginTop = 0;
                if (scrollH > offsetH) {
                    var rate = offsetH / scrollH; //计算比率
                    scrollBar.height(Math.ceil(Math.max(1 * .5, rate * offsetH) + 1)).show();
                    var scrollBarMove = function (e) {
                        marginTop = marginTop + (e.pageY - my);
                        scrollBar = J(e.data.scrollBar);
                        if (marginTop < 0) marginTop = 0;
                        offsetH = scrollBar.siblings(".folderInner").height();
                        if ((marginTop + scrollBar.height()) > offsetH) marginTop = offsetH - scrollBar.height();
                        scrollBar.css({ marginTop: marginTop + "px" });
                        return false;
                    };
                    var scrollBarUp = function (e) {
                        J(document).unbind("mousemove", scrollBarMove);
                        J(document).unbind("mouseup", scrollBarUp);
                        return false;
                    };
                    scrollBar.bind("mousedown", function (e) {
                        marginTop = parseInt(J(this).css("marginTop"));
                        my = e.pageY;
                        J(document).bind("mousemove", { scrollBar: this }, scrollBarMove);
                        J(document).bind("mouseup", scrollBarUp);
                        return false;
                    });
                } else
                    scrollBar.hide();
            });
        };
        var initAppItem = function (context, appManagePanelOption) {
            var items = appManagePanelOption.items;
            for (var i in items) {
                if (items[i].renderTo && items[i].renderTo.length > 0) {
                    items[i].id = items[i].AppID;
                    if (items[i].renderTo.indexOf("dockBar") >= 0) {
                        context.addDockItem(items[i]);
                    } else {
                        if (items[i].renderTo.indexOf("appPage") >= 0) {
                            var pageIndex = items[i].renderTo.split("_")[1];
                            context.addPageItem(items[i], pageIndex);
                        }
                    }
                }
            }
        };
        topNamespace.WebOs.appManagePanel = J.Class({ extend: J.ui.componet }, {
            init: function (config) {
                var context = this;
                context.items = new topNamespace.WebOs.hashTable();
                var appManagePanelOption = J.extend({}, appManagePanelConfig, config);
                J(appManagePanelOption.renderTo).append(appManagePanelHtml);
                context.el = J("#appManagerPanel");
                context.el.find(">.aMg_close").bind("click", J.proxy(context.hide, context));
                initAppItem(context, appManagePanelOption);
                J(window).bind("resize", containerLayOut);
                J(context).trigger("onInit", [context]);
            },
            show: function () {
                var context = this;
                context.el.show();
                containerLayOut();
                J(context).trigger("onShow", [context]);
            },
            hide: function () {
                var context = this;
                context.el.hide();
                J(context).trigger("onHide", [context]);
            },
            remove: function () {
                var context = this;
                context.el.remove();
                J(context).trigger("onRemove", [context]);
            },
            addDockItem: function (MixParam) {
                var context = this;
                if (!MixParam) return false;
                if (typeof MixParam == "object") {
                    var renderTo = "#appManagerPanel >.aMg_dock_container";
                    var dockItem = null; MixParam = J.extend({}, MixParam);
                    if (MixParam.constructor == topNamespace.WebOs.shortcut) {
                        if (MixParam.el) {
                            dockItem = MixParam;
                            dockItem.el.appendTo(renderTo);
                        }
                    } else {
                        MixParam.renderTo = renderTo;
                        dockItem = new topNamespace.WebOs.shortcut(MixParam);
                    }
                    if (dockItem) {
                        dockItem.un("shortCutClick");
                        dockItem.on("shortCutClick", function (e, shortItem) { context.hide(); J(context).trigger("onClickItem", [shortItem]); });
                        context.items.put(dockItem.id, dockItem);
                        J(context).trigger("onAddItem", [context, dockItem, MixParam]);
                    }
                }
            },
            addPageItem: function (MixParam, pageIndex) {
                var context = this;
                if (!MixParam) return false;
                if (isNaN(pageIndex)) return false;
                if (typeof MixParam == "object") {
                    var renderTo = "#appManagerPanel >.aMg_folder_container >.folderItem_turn:eq(" + (pageIndex) + ") .folderInner";
                    var pageItem = null; MixParam = J.extend({}, MixParam);
                    if (MixParam.constructor == topNamespace.WebOs.shortcut) {
                        if (MixParam.el) {
                            pageItem = MixParam;
                            pageItem.el.appendTo(renderTo);
                        }
                    } else {
                        MixParam.renderTo = renderTo;
                        pageItem = new topNamespace.WebOs.shortcut(MixParam);
                    }
                    if (pageItem) {
                        pageItem.addClass("amg_folder_appbutton");
                        pageItem.un("shortCutClick");
                        pageItem.on("shortCutClick", function (e, shortItem) { context.hide(); J(context).trigger("onClickItem", [shortItem]); });
                        context.items.put(pageItem.id, pageItem);
                        J(context).trigger("onAddItem", [context, pageItem, MixParam]);
                    }
                }
            },
            removeItem: function (itemId) {
                var context = this;
                if (!itemId) return false;
                if (context.items.containsKey(itemId)) {
                    var item = context.items.get(itemId);
                    if (item) item.remove();
                    context.items.remove(itemId);
                    J(context).trigger("onRemoveItem", [context, item]);
                }
            }
        });
    });

    /*
    //************************************************************************
    //滚动条类
    //************************************************************************
    $.Package(function (J) {
    var scrollHtml='<div class="scrollBarC" style="margin-top: 0px; height: 0pt; display: none;" _olddisplay=""></div>';
    var scrollConfig={
    renderTo:"#deskTop",
    events: {
    onInit: { fn: function () { }, scope: this },
    onShow: { fn: function () { }, scope: this },
    onHide: { fn: function () { }, scope: this },
    onScrollMove: { fn: function () { }, scope: this }
    }
    }
    var renderContainer = function(){
    var scrollContainer = J('.scrollBarC').parent();
    var containerH = J('.scrollBarC').parent().children().height();
    var containerScrollH = J('.scrollBarC').parent()[0].scrollHeight;
    var scrollBar = J(this).find(".scrollBarC");
    J('.scrollBarC').parent().height(containerH);				
    var my = 0, marginTop = 0;
    if (containerScrollH > containerH) {	
    var rate = containerH / containerScrollH; 
    console.log(rate);
    scrollBar.height(Math.ceil(Math.max(1 * .5, rate * containerH) + 1)).show();
    var scrollMove = function (e) {
    marginTop = marginTop + (e.pageY - my);
    scrollBar = J(e.data.scrollBar);
    if (marginTop < 0) marginTop = 0;
    containerH = J('.scrollBarC').parent().height();
    if ((marginTop + scrollBar.height()) > containerH) marginTop = containerH - scrollBar.height();

    scrollBar.css({ marginTop: marginTop + "px" });
    return false;
    };
    scrollBar.bind("mousedown", function (e) {
    marginTop = parseInt(J(this).css("marginTop"));
    my = e.pageY;
    J(document).bind("mousemove", { scrollBar: this }, scrollMove);
    return false;
    });
    }else
    scrollBar.hide();		
    }
    topNamespace.WebOs.scrollContainer = J.Class({ extend: J.ui.componet },{
    init: function(config){
    var context = this;
    var scrollOption = J.extend({}, scrollConfig, config);
    J(scrollOption.renderTo).append(scrollHtml);
    renderContainer();
    J(context).trigger("onInit", [context]);
    },
    show: function(){
    var context = this;
    context.el.show();    
    renderContainer();
    J(context).trigger("onShow", [context]);
    },
    ScrollMove: function(){
    renderContainer();
    }
    });
    });*/

    //************************************************************************
    //desktopContainer模块(用来装载shortcut图标)
    //************************************************************************
    $.Package(function (J) {
        var desktopContainerHtml = '<div id="desktopWrapper">\
										<div style="top: 0px; width: 1293px; height: 521px;" class="desktopsContainer" id="desktopsContainer">\
											<div style="width: 1293px; height: 521px;" class="desktopContainer" index="0">\
												<div style="display: block; width: 1265px; height: 475px; margin-top: 40px; opacity: 1;" _olddisplay="block" index="0" customacceptdrop="1" class="appListContainer">\
													<div _olddisplay="block" style="height: 0pt; display: none; top: 0px;" class="scrollBar"></div>\
													<div style="left: 27px; top: 12px;" screen="0" title="添加" class="appButton addQuickLinkButton">\
														<div class="addQuickLinkButtonInner"></div>\
														<div class="appButton_appName">\
															<div class="appButton_appName_inner">添加</div>\
															<div class="appButton_appName_inner_right"></div>\
														</div>\
													</div>\
												</div>\
											</div>\
											<div style="width: 1293px; height: 521px;" class="desktopContainer" index="1">\
												<div style="display: block; width: 1265px; height: 475px; margin-top: 40px; opacity: 1;" _olddisplay="block" index="1" customacceptdrop="1" class="appListContainer">\
													<div _olddisplay="block" style="height: 0pt; display: none; top: 0px;" class="scrollBar"></div>\
													<div style="left: 27px; top: 12px;" screen="1" title="添加" class="appButton addQuickLinkButton">\
														<div class="addQuickLinkButtonInner"></div>\
														<div class="appButton_appName">\
															<div class="appButton_appName_inner">添加</div>\
															<div class="appButton_appName_inner_right"></div>\
														</div>\
													</div>\
												</div>\
											</div>\
											<div style="width: 1293px; height: 521px;" class="desktopContainer" index="2">\
												<div style="display: block; width: 1265px; height: 475px; margin-top: 40px; opacity: 1;" _olddisplay="block" index="2" customacceptdrop="1" class="appListContainer">\
													<div _olddisplay="block" style="height: 0pt; display: none; top: 0px;" class="scrollBar"></div>\
													<div style="left: 27px; top: 348px;" screen="2" title="添加" class="appButton addQuickLinkButton">\
														<div class="addQuickLinkButtonInner"></div>\
														<div class="appButton_appName">\
															<div class="appButton_appName_inner">添加</div>\
															<div class="appButton_appName_inner_right"></div>\
														</div>\
													</div>\
												</div>\
											</div>\
											<div style="width: 1293px; height: 521px;" class="desktopContainer" index="3">\
												<div style="display: block; width: 1265px; height: 475px; margin-top: 40px; opacity: 1;" _olddisplay="block" index="3" customacceptdrop="1" class="appListContainer">\
													<div _olddisplay="block" style="height: 0pt; display: none; top: 0px;" class="scrollBar"></div>\
													<div style="left: 27px; top: 12px;" screen="3" title="添加" class="appButton addQuickLinkButton">\
														<div class="addQuickLinkButtonInner"></div>\
														<div class="appButton_appName">\
															<div class="appButton_appName_inner">添加</div>\
															<div class="appButton_appName_inner_right"></div>\
														</div>\
													</div>\
												</div>\
											</div>\
											<div style="width: 1293px; height: 521px;" class="desktopContainer" index="4">\
												<div style="display: block; width: 1265px; height: 475px; margin-top: 40px; opacity: 1;" _olddisplay="block" index="4" customacceptdrop="1" class="appListContainer">\
													<div _olddisplay="block" style="height: 0pt; display: none; top: 0px;" class="scrollBar"></div>\
													<div style="left: 27px; top: 12px;" screen="4" title="添加" class="appButton addQuickLinkButton">\
														<div class="addQuickLinkButtonInner"></div>\
														<div class="appButton_appName">\
															<div class="appButton_appName_inner">添加</div>\
															<div class="appButton_appName_inner_right"></div>\
														</div>\
													</div>\
												</div>\
											</div>\
										</div>\
									</div>';
        var desktopContainerConfig = {
            left: 73,
            top: 0,
            right: 0,
            bottom: 64,
            index: 2,
            icoType: "big",
            renderTo: document.body,
            items: [],
            events: {
                onInit: { fn: function () { }, scope: this },
                onShow: { fn: function () { }, scope: this },
                onHide: { fn: function () { }, scope: this },
                onRemove: { fn: function () { }, scope: this },
                onItemInit: { fn: function () { }, scope: this },
                onItemAdd: { fn: function () { }, scope: this },
                onItemRemove: { fn: function () { }, scope: this },
                onItemClick: { fn: function () { }, scope: this },
                onItemRgClick: { fn: function () { }, scope: this },
                onQuickButtonClick: { fn: function () { }, scope: this }
            }
        };

        var initItems = function (context, items) {
            if (!J.isArray(items) || items.length <= 0) return false;
            for (var i = 0; i < items.length; i++) {
                if (items[i].renderTo.toString().indexOf("appPage") == -1 || isNaN(items[i].renderTo.split("_")[1])) continue;
                if (context.items.get(items[i].AppID)) continue;
                var index = items[i].renderTo.split("_")[1];
                context.addItem(items[i], index);
            }
        }
        topNamespace.WebOs.desktopContainer = J.Class({ extend: J.ui.componet }, {
            init: function (config) {
                var context = this;
                var desktopContainerOption = J.extend({}, desktopContainerConfig, config);
                J(desktopContainerOption.renderTo).append(desktopContainerHtml);
                context.el = J("#desktopWrapper", desktopContainerOption.renderTo);
                context.items = new topNamespace.WebOs.hashTable();
                context.setItemIco(desktopContainerOption.icoType);
                context.el.find(".addQuickLinkButton")
					.css({ left: context.ItemLeft, top: context.ItemTop })
					.bind("click", J.proxy(desktopContainerOption.events.onQuickButtonClick.fn,
									desktopContainerOption.events.onQuickButtonClick.scope));
                context.el.children(".appListContainer")
					.css({ marginLeft: context.containerMargeLeft, marginTop: context.containerMargeTop });
                initItems(context, desktopContainerOption.items);
                context.setIndex(desktopContainerOption.index);
                context.index = desktopContainerOption.index;
                context.setContainerPos(desktopContainerOption.left, desktopContainerOption.top, desktopContainerOption.right, desktopContainerOption.bottom);
                J(window).bind("resize", J.proxy(context.setContainerPos, context));
                J(context).trigger("onInit", [context]);
            },
            setItemIco: function (icoType) {
                var context = this;
                context.containerMargeLeft = 0; context.containerMargeTop = 40;
                if (icoType == "big") {
                    context.ItemLeft = 27; context.ItemTop = 12;
                    context.ItemMargeLeft = 142; context.ItemMargeTop = 102;
                    context.itemWidth = 90; context.itemHeight = 90;
                    context.el.find("#desktopsContainer").removeClass("desktopSmallIcon");
                } else {
                    context.ItemLeft = 15; context.ItemTop = 15;
                    context.ItemMargeLeft = 90; context.ItemMargeTop = 90;
                    context.itemWidth = 60; context.itemHeight = 60;
                    context.el.find("#desktopsContainer").addClass("desktopSmallIcon");
                }
                context.icoType = icoType;
                context.repositionItem();
            },
            setIndex: function (index) {
                var context = this;
                if (isNaN(index)) return false;
                if (context.index == index) return false;
                var context = this;
                context.el.find(".desktopContainer:eq(" + index + ")").stop().animate({ left: "0px" }, 800).show();
                if (context.index != undefined) {
                    if (context.index > index) {
                        context.el.find(".desktopContainer:eq(" + context.index + ")").stop().animate({ left: "2000px" }, 800);
                    } else {
                        context.el.find(".desktopContainer:eq(" + context.index + ")").stop().animate({ left: "-2000px" }, 800);
                    }
                }
                context.index = index;
            },
            setContainerPos: function (left, top, right, bottom) {
                context = this;
                if (!isNaN(left)) context.el.css({ left: left + "px" });
                if (!isNaN(right)) context.el.css({ right: right + "px" });
                if (!isNaN(top)) context.el.children("#desktopsContainer").css({ top: top + "px" })
                if (!isNaN(bottom)) context.bottom = bottom;

                var leftPos = parseInt(J("#desktopWrapper").css("left"));
                var rightPos = parseInt(J("#desktopWrapper").css("right"));
                var topPos = parseInt(J("#desktopsContainer").css("top"));
                var width = J(window).width() - leftPos - rightPos - 40;
                var height = J(window).height() - topPos - context.bottom - 40;
                var appContainerW = width - context.containerMargeLeft;
                var appContainerH = height - context.containerMargeTop;

                J("#desktopsContainer,.desktopContainer", context.el).css({ width: width + "px", height: height + "px" });
                J(".appListContainer", context.el).css({ width: appContainerW + "px", height: appContainerH + "px" });
                context.repositionItem();
            },
            addItem: function (MixParam, index) {
                if (!MixParam) return false; if (isNaN(index)) return false;
                var context = this; var item = null;
                var renderTo = "#desktopsContainer >.desktopContainer:eq(" + (index) + ") .appListContainer";
                var left = parseInt(J(">.addQuickLinkButton", renderTo).css("left"));
                var top = parseInt(J(">.addQuickLinkButton", renderTo).css("top"));
                if (MixParam.constructor == topNamespace.WebOs.shortcut) {
                    if (MixParam.el) {
                        item = MixParam;
                        item.el.css({ left: left + "px", top: top + "px" }).appendTo(renderTo);
                    }
                } else {
                    MixParam.renderTo = renderTo;
                    MixParam.id = MixParam.AppID;
                    MixParam.left = left; MixParam.top = top;
                    item = new topNamespace.WebOs.shortcut(MixParam);
                }
                if (item) {
                    top += context.ItemMargeTop;
                    if (top + context.itemHeight >= J(renderTo).height()) {
                        top = context.ItemTop;
                        left += context.ItemMargeLeft;
                    }
                    if (left + context.itemWidth >= J(renderTo).width()) {
                        left = context.ItemLeft;
                    }
                    item.on("shortCutInit", function (e, shortcutItem) { J(context).trigger("onItemInit", [shortcutItem]); });
                    item.on("shortCutClick", function (e, shortcutItem) { J(context).trigger("onItemClick", [shortcutItem]); });
                    item.on("shortCutRgClick", function (e, evt, shortcutItem) { J(context).trigger("onItemRgClick", [evt, shortcutItem]); });
                    item.on("shortCutRemove", function (e, shortcutItem) { J(context).trigger("onItemRemove", [shortcutItem]); });
                    context.items.put(item.id, item);
                    J(">.addQuickLinkButton", renderTo).css({ left: left + "px", top: top + "px" });
                    J(context).trigger("onItemAdd", [context, item, MixParam]);
                    return item;
                }
            },
            removeItem: function (itemId) {
                if (!itemId) return false;
                var context = this;
                if (context.items.containsKey(itemId)) {
                    var item = context.items.get(itemId);
                    if (item) item.remove();
                    context.items.remove(itemId);
                    context.repositionItem();
                    J(context).trigger("onRemoveItem", [context, itemId]);
                }
            },
            repositionItem: function () {
                var context = this;
                context.el.find(".desktopContainer").each(function () {
                    var container = this;
                    var left = context.ItemLeft;
                    var top = context.ItemTop;
                    J(container).find(">.appListContainer .appButton:gt(0)").each(function () {
                        var item = this;
                        J(item).css({ left: left + "px", top: top + "px" });
                        top += context.ItemMargeTop;
                        if (top + context.itemHeight >= J(item).parent(".appListContainer").height()) {
                            top = context.ItemTop;
                            left += context.ItemMargeLeft;
                        }
                        if (left + context.itemWidth >= J(item).parent(".appListContainer").width()) {
                            left = context.ItemLeft;
                        }
                    });
                    J(container).find(">.appListContainer .appButton:eq(0)").css({ left: left + "px", top: top + "px" });
                });
            }
        });
    });

    //************************************************************************
    //NavBar模块
    //************************************************************************
    $.Package(function (J) {
        var navBarHtml = '<div id="navbar">\
                            <div class="bottomBarBg"></div>\
                            <div class="bottomNav">\
                                <ul>\
                                    <li><a target="_blank" href="#">下载帮助手册</a></li>\
                                    <li><a target="_blank" href="#">下载人人通</a></li>\
                                    <li><a href="#">关于教育云平台</a></li>\
                                </ul>\
                            </div>\
                            <div id="navbartool" style="float:right;width:auto">\
                                <div class="dock_tool_item">\
							        <a title="主题设置" cmd="Theme" class="dock_tool_icon dock_tool_theme" href="###"></a>\
                                    <a class="dock_tool_icon indicator_search" href="###" hidefocus="true" cmd="search" title="搜索"></a>\
                                    <a class="dock_tool_icon logout_button" title="注销当前用户" cmd="logout" href="###"></a>\
						        </div>\
                                <div class="indicator_wrapper">\
							        <div class="indicator_container" id="indicatorContainer">\
                                        <a class="indicator indicator_1" href="###" hidefocus="true" customacceptdrop="1" cmd="switch" index="0">\
									        <span class="indicator_icon_bg"></span>\
									        <span class="indicator_icon indicator_icon_1">1</span>\
								        </a>\
								        <a class="indicator indicator_2" href="###" hidefocus="true" customacceptdrop="1" cmd="switch" index="1">\
									        <span class="indicator_icon_bg"></span>\
									        <span class="indicator_icon indicator_icon_2">2</span>\
								        </a>\
							        </div>\
						        </div>\
                                <span class="indicator_header_name">davie</span>\
                                <div class="indicator indicator_header" cmd="user">\
						            <img src="http://0.web.qstatic.com/webqqpic/style/images/avatar.png" alt="完善个人资料" class="indicator_header_img" id="navbarHeaderImg">\
					            </div>\
                            </div>\
						    <div class="dock_tool_item2">\
							    <a title="点击这里开始" class="dock_tool_icon dock_tool_start" href="###"></a>\
						    </div>\
					    </div>\
					    <div class="indicator_prev"></div>\
					    <div class="indicator_next"></div>';
        var navBarConfig = {
            renderTo: "#desktop",
            userPhoto: "",
            userName: "davie",
            pageCount: 2,
            currentPageIndex: 0,
            events: {
                onInit: { fn: function () { }, scope: this },
                onUserPhotoClick: { fn: function () { }, scope: this },
                onChagePageIndex: { fn: function () { }, scope: this },
                onClickAppManageBtn: { fn: function () { }, scope: this },
                onClickAppSearchBtn: { fn: function () { }, scope: this },
                onNavToolItemClick: { fn: function () { }, scope: this },
                onNavMainToolItemClick: { fn: function () { }, scope: this }
            }
        };
        var switchAppContainer = function (e) {
            var context = this;
            var target = e.target;
            var index = 0, currentPageIndex = parseInt(context.el.attr("currentPageIndex"));
            if (target.tagName.toLowerCase() == "span") {
                target = J(target).parent();
                index = parseInt(J(target).attr("index"));
            } else if (target.tagName.toLowerCase() == "div") {
                if (target.className == "indicator_prev")
                    index = currentPageIndex - 1;
                else if (target.className == "indicator_next")
                    index = currentPageIndex + 1;
                if (index < 0) index = 1;
                if (index > 1) index = 0;
            }

            if (index != currentPageIndex) {
                J("#indicatorContainer").removeClass().addClass("indicator_container nav_current_" + (index + 1));
                J(context).trigger("onChagePageIndex", [index])
                context.currentPageIndex = index;
                context.el.attr("currentPageIndex", index);
            }
        };
        var SearchApp = function () {
            var seoapp = new topNamespace.WebOs.searchAppManager();
        }

        topNamespace.WebOs.navBar = J.Class({ extend: J.ui.componet }, {
            init: function (config) {
                var navBarOption = J.extend({}, navBarConfig, config);
                var context = this;
                J(navBarOption.renderTo).append(navBarHtml);
                context.el = J("#navbar");
                if (navBarOption.userPhoto && navBarOption.userPhoto.length > 0)
                    context.el.find("#navbarHeaderImg").attr("src", navBarOption.userPhoto);
                if (navBarOption.userName && navBarOption.userName.length > 0)
                    context.el.find(".indicator_header_name").html(navBarOption.userName);
                context.el.find("#navbarHeaderImg").bind("click", J.proxy(navBarOption.events.onUserPhotoClick.fn, navBarOption.events.onUserPhotoClick.scope))
                if (isNaN(navBarOption.currentPageIndex))
                    navBarOption.currentPageIndex = 0;
                else {
                    if (navBarOption.currentPageIndex < navBarOption.pageCount) {
                        context.currentPageIndex = parseInt(navBarOption.currentPageIndex);
                    } else
                        context.currentPageIndex = navBarOption.pageCount - 1;
                }

                J("#navbar").attr("currentPageIndex", navBarOption.currentPageIndex).find(".indicator_container").addClass("nav_current_" + (context.currentPageIndex + 1));
                J("#navbar .indicator_manage").bind("click", J.proxy(navBarOption.events.onClickAppManageBtn.fn, navBarOption.events.onClickAppManageBtn.scope));
                J("#indicatorContainer a[cmd=switch]").bind("click", J.proxy(switchAppContainer, context));
                J("#navbar .indicator_search").bind("click", J.proxy(navBarOption.events.onClickAppSearchBtn.fn, navBarOption.events.onClickAppSearchBtn.scope));
                J(".indicator_prev").bind("click", J.proxy(switchAppContainer, context));
                J(".indicator_next").bind("click", J.proxy(switchAppContainer, context));
                J(".dock_tool_item a", "#navbar").bind("click", J.proxy(function (e) {
                    var target = this;
                    J(target).trigger("onNavToolItemClick", [e.target]);
                }, context));
                J(".dock_tool_item2 a", "#desktop").bind("click", J.proxy(function (e) {
                    var target = this;
                    J(target).trigger("onNavMainToolItemClick", [e.target]);
                }, context));
                J(".bottomNav ul li a", "#navbar").bind("click", function (e) {
                    if (this.innerHTML == "关于教育云平台") {
                        if (!J("#about_cloud")[0]) {
                            var aboutCloudHtml = '<div id="about_cloud" class="about_cloud">\
                                                <a href="#" class="about_error"></a>\
                                                <img  src="/Content/images/about_cloud2.png"/>\
                                            </div>'
                            J("#desktop").append(aboutCloudHtml);
                            var p = new J.ui.Drag({ apperceiveEl: J("#about_cloud")[0], effectEl: J("#about_cloud")[0] });
                            J(".about_error", "#about_cloud").click(function (e) { J("#about_cloud").hide(); });
                        }
                        J("#about_cloud").css({ left: (J(window).width() - 558) / 2, top: (J(window).height() - 325) / 2 }).show();
                    }
                });
                J(context).trigger("onInit", [context]);
            },
            setIndex: function (index) {
                var context = this;
                if (isNaN(index)) return;
                context.currentPageIndex = parseInt(index);
                context.el.attr("currentPageIndex", context.currentPageIndex).find(".indicator_container")[0].className = "indicator_container nav_current_" + (context.currentPageIndex + 1);
            },
            setUserPhoto: function (imgPath) {
                var context = this;
                if (typeof imgPath == "string" && imgPath.length > 0) {
                    context.el.find("#navbarHeaderImg").attr("src", imgPath);
                }
            }
        });
    });

    //************************************************************************
    //搜索应用
    //************************************************************************
    $.Package(function (J) {
        var searchHtml = '<div id="pagelet_search_bar" class="pagelet_search_bar" _olddisplay="block" style="display: block; left: 614.5px; top: 45px;">\
							<input id="pageletSearchInput" class="pagelet_search_input" value="搜索应用...">\
							<input id="pageletSearchButton" class="pagelet_search_button" type="button" title="搜索...">\
						</div>';
        var searchResultHtml = '<div class="pagelet_search_suggest" id="pagelet_search_suggest" style="display: block; left: 1022px; top: 66px;" _olddisplay="block">\
									<ul id="sb_resultBox" _olddisplay="block" style="display: block;">\
									</ul>\
									<div idx="-2" class="sb_resultList sb_app">\
										<a href="#">\
											<span class="sb_appTxt">去应用市场搜索...</span>\
										</a>\
									</div>\
								</div>';

        var searchAppConfig = {
            renderTo: "#desktop",
            target: "#navbar",
            direct: "right",
            url: "http://www.baidu.com",
            events: {
                onInit: { fn: function () { }, scope: this },
                onShow: { fn: function () { }, scope: this },
                onHide: { fn: function () { }, scope: this },
                onRemove: { fn: function () { }, scope: this },
                onSelect: { fn: function () { }, scope: this }
            }
        };

        topNamespace.WebOs.searchAppManager = J.Class({ extend: J.ui.componet }, {
            init: function (config) {
                var searchAppOption = J.extend({}, searchAppConfig, config);
                var context = this;
                J(searchAppOption.renderTo).append(searchHtml);
                context.el = J("#pagelet_search_bar");
                context.target = searchAppOption.target;
                context.direct = searchAppOption.direct;
                context.renderTo = searchAppOption.renderTo;
                context.url = searchAppOption.url;
                context.suggest = null;
                context.index = -1;
                J(document).bind("click", function (e) {
                    var cls = e.target.className;

                    if (!(cls.indexOf("pagelet_search_bar") != -1 ||
						cls.indexOf("pagelet_search_input") != -1 ||
						cls.indexOf("sb_resultList") != -1 ||
						cls.indexOf("sb_pageTxt") != -1 ||
						cls.indexOf("listInner") != -1 ||
						cls.indexOf("pagelet_search_button") != -1)) {
                        context.hide();
                    }
                });
                J("#pageletSearchInput").blur(function () {
                    if (J(this).val().length <= 0) J("#pageletSearchInput").val("搜索应用...");
                }).click(function () {
                    if (J(this).val() == "搜索应用...") J(this).val("");
                    context.showResult(J(this).val());
                }).bind("keyup", J.proxy(function (e) {
                    var target = this;
                    var val = e.target.value;
                    switch (e.keyCode) {
                        case J.ui.KEY.UP:
                            target.index--;
                            if (target.index < 0) target.index = 0;
                            J(".sb_resultList a", target.suggest).removeClass("rsSeledBg");
                            J(".sb_resultList:eq(" + target.index + ") a", target.suggest).addClass("rsSeledBg");
                            break;
                        case J.ui.KEY.DOWN:
                            target.index++;
                            if (target.index >= J(".sb_resultList", target.suggest).length)
                                target.index = J(".sb_resultList", target.suggest).length - 1;
                            J(".sb_resultList a", target.suggest).removeClass("rsSeledBg");
                            J(".sb_resultList:eq(" + target.index + ") a", target.suggest).addClass("rsSeledBg");
                            break;
                        case J.ui.KEY.ENTER:
                            target.select(J(".sb_resultList:eq(" + target.index + ")").attr("idx"));
                            break;
                        default:
                            target.showResult(val);
                            break;
                    }
                }, context));

                J(context).trigger("onInit", [context]);
            },
            select: function (idx) {
                var context = this;
                context.hide();
                J(context).trigger("onSelect", [idx, context]);
            },
            show: function () {
                var context = this;
                var top = J(context.target).offset().top;
                var left = J(context.target).offset().left;
                if (top <= (J(window).height() / 2)) {
                    context.el.removeClass("pagelet_search_bar_top");
                    top = top + J(context.el).height() - 3;
                } else {
                    context.el.addClass("pagelet_search_bar_top");
                    top = top - J(context.target).height();
                }
                if (context.direct == "right")
                    left = left + (J(context.target).width() - context.el.width() - 20);
                context.el.css({
                    "top": top + "px",
                    "left": left + "px"
                }).show();
                if (J("#pageletSearchInput").val().length <= 0)
                    J("#pageletSearchInput").val("搜索应用...")
                if (context.suggest)
                    context.suggest.hide();
                J(context).trigger("onShow", [context]);
            },
            showResult: function (val) {
                var context = this;
                if (typeof val != "string") return;
                if (val.length <= 0) {
                    if (context.suggest) context.suggest.hide(); return;
                }
                if (!context.suggest) {
                    J(context.renderTo).append(searchResultHtml);
                    context.suggest = J("#pagelet_search_suggest", context.renderTo);
                }
                J("ul li", context.suggest).remove();
                J(".sb_resultList a", context.suggest).removeClass("rsSeledBg");
                context.index = -1;
                var top = J(context.el).offset().top;
                var left = J(context.el).offset().left;

                J.ajax({
                    type: "post",
                    url: context.url,
                    data: { q: val, limit: 10 },
                    beforeSend: function (XMLHttpRequest) { J("#sb_resultBox_key", context.suggest).html(val + "-"); },
                    success: function (data, textStatus) {
                        var items = data.split("\n");
                        for (var i in items) {
                            if (!items[i] || typeof items[i] != "string" || items[i].length <= 0) continue;
                            var id = items[i].split("|")[2];
                            var name = items[i].split("|")[1];
                            if (!id || id.length <= 0 || !name || name.length <= 0) continue;
                            var item = '<li idx="' + id + '" class="sb_resultList">\
											<a title="' + name + '" href="#">\
												<div class="listInner">' + name + '</div>\
											</a>\
										</li>'
                            J("ul", context.suggest).append(item);
                        }
                    },
                    complete: function (XMLHttpRequest, textStatus) {
                        if (context.el[0].className.indexOf("pagelet_search_bar_top") != -1) {
                            context.suggest.addClass("pagelet_search_suggest_top");
                            top = top - context.suggest.height();
                        } else {
                            context.suggest.removeClass("pagelet_search_suggest_top");
                            top = top + context.el.height();
                        }
                        J(".sb_resultList", context.suggest).unbind().bind("click", J.proxy(function (e) {
                            var target = this;
                            var cls = e.target.className;
                            var idx = 0;
                            if (cls.indexOf("sb_resultList") == -1)
                                idx = J(e.target).parents(".sb_resultList").attr("idx");
                            target.select(idx);
                            return false;
                        }, context));
                        context.suggest.css({
                            "top": top - 3 + "px",
                            "left": left + 8 + "px"
                        }).show();
                    },
                    error: function () { }
                });
            },
            hide: function () {
                var context = this;
                context.el.hide();
                if (context.suggest)
                    context.suggest.hide();
                J(context).trigger("onHide", [context]);
            },
            reomve: function () {
                var context = this;
                J(context).trigger("onRemove", [context]);
            }
        });
    });

    //************************************************************************
    //主题设置类
    //************************************************************************
    $.Package(function (J) {
        var index = 0;
        var wallpaperHtml = '<div id="zoomWallpaperGrid" class="zoomWallpaperGrid" style="position: absolute; z-index: -10; left: 0px; top: 0px; overflow: hidden; height: 800px; width: 1152px;">\
								<img class="zoomWallpaper" id="zoomWallpaper">\
							</div>';
        var themeManagerConfig = {
            renderTo: document.body,
            wallpaperSrc: "/Content/images/wallpapers/wood1.jpg",
            themeSrc: "/Content/css/ThemeCss/Wood.css",
            wallpaperPos: "tile",
            event: {
                onInit: { fn: function () { }, scope: this },
                onSetWallpaper: { fn: function () { }, scope: this },
                onSetThemeCss: { fn: function () { }, scope: this },
                onSetTheme: { fn: function () { }, scope: this }
            }
        };
        topNamespace.WebOs.themeManager = J.Class({ extend: J.ui.componet }, {
            init: function (config) {
                var context = this;
                var themeManagerOption = J.extend({}, themeManagerConfig, config);
                if (typeof themeManagerOption.wallpaperSrc == "string" && themeManagerOption.wallpaperSrc.length > 0)
                    context.wallpaperSrc = themeManagerOption.wallpaperSrc;
                else
                    context.wallpaperSrc = "/Content/images/wallpapers/wood1.jpg";
                if (typeof themeManagerOption.themeSrc == "string" && themeManagerOption.themeSrc.length > 0)
                    context.themeSrc = themeManagerOption.themeSrc;
                else
                    context.themeSrc = "/Content/css/ThemeCss/Wood.css";
                if (typeof themeManagerOption.wallpaperPos == "string" && themeManagerOption.wallpaperPos.length > 0)
                    context.wallpaperPos = themeManagerOption.wallpaperPos;
                else
                    context.wallpaperPos = "tile";
                J("body").append(wallpaperHtml);
                context.setThemeCss(context.themeSrc);
                context.setWallpaper(context.wallpaperSrc, context.wallpaperPos);
                J(context).trigger("onInit", [context]);
            },
            setWallpaper: function (imgPath, imgPos) {
                var context = this;
                var width = J(window).width(); //浏览器宽度
                var height = J(window).height(); //浏览器高度
                if (!imgPos || typeof imgPos != "string") imgPos = "tile";
                imgPos = imgPos.toLowerCase();
                var img = new SImage(icall);
                img.get(imgPath);
                var bgCss = {
                    backgroundImage: "url('" + imgPath + "')",
                    backgroundRepeat: "repeat"
                };
                function icall(obj) {
                    //alert("加载完成==" + obj.width);
                    if (imgPos == "tile") {
                        bgCss.backgroundRepeat = "repeat";
                        J("body").css({
                            backgroundImage: "url('" + obj.src + "')",
                            backgroundRepeat: "repeat"
                        });
                        J("#zoomWallpaperGrid").hide();
                    } else if (imgPos == "stretch") {
                        J("#zoomWallpaperGrid").width(width);
                        J("#zoomWallpaperGrid").height(height);
                        J("#zoomWallpaper").width(width);
                        J("#zoomWallpaper").height(height);
                        J("#zoomWallpaper").attr("src", obj.src);
                        J("#zoomWallpaperGrid").show();
                    } else {
                        J("body").css({
                            backgroundImage: "url('" + obj.src + "')",
                            backgroundRepeat: "none-repeat",
                            backgroundPosition: "center center"
                        });
                        J("#zoomWallpaperGrid").hide();
                    }
                }

                context.wallpaperSrc = imgPath;
                context.wallpaperPos = imgPos;
                J(context).trigger("onSetWallpaper", [context]);
            },
            getWallpaper: function () {
                var context = this;
                return context.wallpaerSrc;
            },
            setThemeCss: function (cssPath) {
                var context = this;
                if (cssPath && cssPath.length > 0) {
                    context.themeSrc = cssPath;
                    J("head").append('<link id="style' + index + '" type="text/css" charset="utf-8" rel="stylesheet" href="' + cssPath + '"/>')
                    index++;
                    J(context).trigger("onSetThemeCss", [cssPath, context]);
                }
            },
            getThemeCss: function () {
                var context = this;
                return context.themeSrc;
            },
            setTheme: function (imgPath, cssPath, imgPos) {
                var context = this;
                if (!imgPos || imgPos.length <= 0) imgPos = context.wallpaperPos;
                if (!imgPath || imgPath.length <= 0) imgPath = context.wallpaerSrc;
                if (!cssPath || cssPath.length <= 0) cssPath = context.themeSrc;
                context.setWallpaper(imgPath, imgPos);
                context.setThemeCss(cssPath);
                J(context).trigger("onSetTheme", [imgPath, cssPath, imgPos, context]);
            },
            getTheme: function () {
                var context = this;
                var imgPath = context.getWallpaper();
                var cssPath = context.getThemeCss();
                var imgPos = context.wallpaperPos;
                return { imgPath: imgPath, cssPath: cssPath, imgPos: imgPos };
            }
        });
    });

    //************************************************************************
    //用户退出模块类
    //************************************************************************
    $.Package(function (J) {
        var logoutHtml = '<div id="startMenuContainer" class="taskbar_start_menu_container" _olddisplay="block" >\
							<div id="taskbar_start_menu_body" class="startMenuImg taskbar_start_menu_body">\
								<div id="startMenuSelfInfo" class="taskbar_start_menu_selfinfo" uin="0">\
									<div id="startMenuSelfNick" class="taskbar_start_menu_nick" title="编辑个人资料" uin="386084935">\
									</div>\
									</a> &nbsp;<a class="startMenuImg startMenuTopControl_lock" title="锁定" href="###"cmd="lock"></a>\
								</div>\
								<ul class="taskbar_start_menu">\
									<li id="favorite" cmd="favorite"><a title="添加到收藏夹" href="###">添加到收藏夹</a> </li>\
									<li cmd="shortcut" id="upPwd"><a title="修改登录密码" target="_blank" >修改登录密码</a> </li>\
									<li id="tglSchool" cmd="download"><a title="切换平台" href="###">切换平台</a> </li>\
									<li id="noviceLi" cmd="helper"><a title="新手指导" >新手指导</a> </li>\
								</ul>\
							</div>\
						</div>';
        var logoutConfig = {
            logoutUrl: "",
            renderTo: "#desktop",
            desktop: null,
            events: {
                onUserPhotoClick: {
                    fn: function() {
                    },
                    scope: this
                }
            }
        };
        topNamespace.WebOs.logoutManager = J.Class({ extend: J.ui.componet }, {
            init: function (config) {
                var context = this;
                var logoutOption = J.extend({}, logoutConfig, config);
                J(logoutOption.renderTo).append(logoutHtml);
                context.el = J("#startMenuContainer", logoutOption.renderTo);
                if (logoutOption.desktop)
                    context.desktop = logoutOption.desktop;
                J(document).bind("click", function (e) {
                    if (!(e.target.className && e.target.className.indexOf("dock_tool_icon") != -1))
                        context.hide();
                });
                context.LockDeskTopPwd = null;
                context.el.find("#favorite").bind("click", function () { context.addfavorite(); return false; });
                context.el.find("#upPwd").bind("click", function () { context.upPassword(); return false; });
            },
            show: function () {
                var context = this;
                var left = context.desktop.dockBar.el.offset().left;
                var top = context.desktop.dockBar.el.offset().top;
                var width = context.desktop.dockBar.el.width();
                var height = context.desktop.dockBar.el.height();
                var Logoutwidth = context.el.width();
                var Logoutheight = context.el.height();
                context.el.find("#startMenuSelfNick").html(context.desktop.userInfo.userLoginName);
                context.el.find("#startMenuSelfNick").bind("click", function () {
                    try {
                        context.desktop.loadJs("setUserInfo", "/Content/scripts/JqueryWin_SetUserInfo.js", "topNamespace.WebOs.SetUserInfo", "/Content/css/SetUserInfo/CSS_SetUserInfo.css");
                        context.el.hide();
                    } catch (e) { }
                });
                context.el.find(".startMenuTopControl_lock").bind("click", function () { context.userlock(); });
                context.el.show();
            },
            userlock: function () {
                var context = this;
                var lockHtml = '<div id="ui_messageBox_2" class="ui_messageBox" style="text-align: center;line-height: inherit;height:174px">\
									<div class="toLockWin screenLocker">\
										<div class="tipTitle">&nbsp;</div>\
										<div class="lockerPwdInput">\
											<label for="lockPassword">输入密码：</label>\
											<input id="lockPassword" type="password" name="lockPassword">\
										</div>\
										<div class="lockerPwdInput">\
											<label for="confirmLockPassword">确认密码：</label>\
											<input id="confirmLockPassword" type="password" name="confirmLockPassword">\
										</div>\
										<div id="toLockPwdTip" class="tip"></div>\
										<div class="tip2">（避免安全隐患，解锁密码请不要与平台密码相同）</div>\
									</div>\
								</div>';
                var lockingHtml = '<div id="ui_messageBox_4" class="ui_messageBox" style="text-align: center;line-height: inherit;height:174px">\
										<div class="unLockWin screenLocker">\
											<div class="userInfo">\
												<img id="unLockAvatar" src="">\
												<span id="unLockNick"></span>\
											</div>\
											<div id="unLockButtonArea">\
												<a id="unLockButton" href="###">解&#12288;锁</a>\
											</div>\
											<div id="unLockInputArea">\
												<div class="lockerPwdInput">\
													<label for="unLockPassword">解锁密码：</label>\
													<input id="unLockPassword" type="password" name="unLockPassword">\
												</div>\
												<div id="unLockPwdTip" class="tip"></div>\
											</div>\
										</div>\
									</div>';
                if (!context.desktop.deskWindows.get("userlock")) {
                    if (J("head").find("#Ldesktopcss")[0] == undefined)
                        J("head").append('<link id="Ldesktopcss" type="text/css" charset="utf-8" rel="stylesheet" href="/Content/webdesk/css/lockdesktop.css"/>');
                }
                context.desktop.createWindow({
                    id: "userlock", title: "锁定教育云平台", renderTo: "#desktop",
                    minable: false, maxable: false, width: 362, height: 247,
                    resizeable: false, html: lockHtml, iscenter: true, mask: true,
                    events: {
                        winInit: { fn: function (e, item) {
                            var btnHtml = '<a id="Escbtn" class="ui_button window_button window_cancel" title="" hidefocus="" href="###" style="display: block;">取消</a>\
										<a id="OKbtn" class="ui_button window_button window_ok" title="" hidefocus="" href="###" style="display: block;">确定</a>';
                            item.el.find(".window_controlArea").append(btnHtml).show();
                            item.el.find("#OKbtn").bind("click", function () {
                                var Lpwd = item.el.find("#lockPassword").val();
                                var dbLpwd = item.el.find("#confirmLockPassword").val();
                                if (Lpwd == "")
                                    item.el.find("#toLockPwdTip").html("密码不能为空");
                                else {
                                    if (Lpwd != dbLpwd)
                                        item.el.find("#toLockPwdTip").html("两次密码不一致");
                                    else {
                                        context.LockDeskTopPwd = Lpwd;
                                        item.el.find(".ui_messageBox").remove();
                                        item.el.find(".window_bodyArea").append(lockingHtml);
                                        item.el.find(".window_controlArea").hide();
                                        J("#ui_maskLayer")[0].style.backgroundImage = "url(" + context.desktop.themeManager.wallpaperSrc + ")";
                                        J("#ui_maskLayer")[0].style.opacity = 1;
                                        item.el.find("#OKbtn").remove();
                                        item.el.find("#Escbtn").remove();
                                        item.el.find(".ui_messageBox").css({ height: "174" });
                                        var unlockbtn = '<a id="ui_button_unlcok" class="ui_button window_button window_ok" title="" hidefocus="" href="###" style="display: block;">确定</a>';
                                        item.el.find(".window_controlArea").append(unlockbtn);
                                        item.el.find("#unLockNick").html(context.desktop.userInfo.userLoginName + "(" + context.desktop.userInfo.userID + ")");
                                        item.el.find("#unLockAvatar")[0].src = context.desktop.userInfo.userPhoto;
                                        item.el.find("#unLockButton").bind("click", function () {
                                            item.el.find(".ui_messageBox").css({ height: "174" })
                                            item.el.find("#unLockButtonArea").hide();
                                            item.el.find("#unLockInputArea").show();
                                            item.el.find(".window_controlArea").show();
                                            item.el.find("#ui_button_unlcok").bind("click", function () {
                                                var enterlockpwd = item.el.find("#unLockPassword").val();
                                                if (enterlockpwd != context.LockDeskTopPwd)
                                                    item.el.find("#unLockPwdTip").html("解锁密码错误");
                                                else {
                                                    J("#ui_maskLayer")[0].style.backgroundImage = "";
                                                    J("#ui_maskLayer")[0].style.opacity = 0.5;
                                                    item.close();
                                                }
                                            });
                                        });
                                    }
                                }
                            });
                            item.el.find("#Escbtn").bind("click", function () {
                                J("#ui_maskLayer")[0].style.backgroundImage = "";
                                J("#ui_maskLayer")[0].style.opacity = 0.5;
                                item.close();
                            });
                        }
                        }
                    }
                });
            },
            hide: function () {
                var context = this;
                context.el.hide();
            },
            remove: function (cssPath) {
                var context = this;
                context.el.remove();
            },
            winlogout: function () {
                var context = this;
                context.el.hide();
                var userlogoutHtml = '<div id="ui_messageBox_5" class="ui_messageBox" style="text-align: center;line-height: 52px;">您确认要注销登录吗？</div>';
                context.desktop.createWindow({
                    id: "userlogout", title: "温馨提示", renderTo: "#desktop",
                    minable: false, maxable: false, width: 362, height: 130, minH: 130,
                    resizeable: false, html: userlogoutHtml, iscenter: true, mask: true,
                    events: {
                        winInit: { fn: function (e, item) {
                            var outbtnHtml = '<a id="winlogoutbtnEsc" class="ui_button window_button window_cancel" title="" hidefocus="" href="###" style="display: block;">取消</a>\
												<a id="winlogoutbtnOK" class="ui_button window_button window_ok" title="" hidefocus="" href="###" style="display: block;">确定</a>';
                            item.el.find(".window_controlArea").append(outbtnHtml).show();
                            item.el.find("#winlogoutbtnEsc").bind("click", function () {
                                item.close();
                            });
                            item.el.find("#winlogoutbtnOK").bind("click", function () {
                                context.desktop.isLogOut = true;
                                window.location = "/Login/logout";
                            });
                        }
                        }
                    }
                });
            },
            addfavorite: function () {
                var context = this;
                context.el.hide();
                var url = document.URL.split('/');
                if (url) url = url[0] + "//" + url[1] + url[2] + "/User/Login";
                if (document.all) {
                    window.external.addFavorite(url, '界学教育云平台');
                    return false;
                }
                else if (window.sidebar) {
                    window.sidebar.addPanel('界学教育云平台', url, "");
                    return false;
                } else if (window.opera && window.print) {
                    return true;
                }
            },
            upPassword: function () {
                var context = this;
                var upPwHtml = '<div id="ui_messageBox_2" class="ui_messageBox" style="text-align: center;line-height: inherit;height:174px">\
									<div class="toLockWin screenLocker">\
										<div class="tipTitle">&nbsp;</div>\
										<div class="lockerPwdInput">\
											<label for="Password">输入原密码：</label>\
											<input id="Password" type="password">\
										</div>\
										<div class="lockerPwdInput">\
											<label for="Password">输入新密码：</label>\
											<input id="onePassword" type="password">\
										</div>\
										<div class="lockerPwdInput">\
											<label for="Password">确认新密码：</label>\
											<input id="towPassword" type="password">\
										</div>\
										<div id="toPwdTip" class="tip"></div>\
									</div>\
								</div>';

                var btnHtml = '<a id="Escbtn" class="ui_button window_button window_cancel" title="" hidefocus="" href="###" style="display: block;">取消</a>\
										<a id="OKbtn" class="ui_button window_button window_ok" title="" hidefocus="" href="###" style="display: block;">确定</a>';
                if (!context.desktop.deskWindows.get("userlock")) {
                    if (J("head").find("#Ldesktopcss")[0] == undefined)
                        J("head").append('<link id="Ldesktopcss" type="text/css" charset="utf-8" rel="stylesheet" href="/Content/webdesk/css/lockdesktop.css"/>');
                }
                context.desktop.createWindow({
                    id: "userUpPw", title: "修改个人密码", renderTo: "#desktop",
                    minable: false, maxable: false, width: 362, height: 247,
                    resizeable: false, html: upPwHtml, iscenter: true, mask: true,
                    events: {
                        winInit: { fn: function (e, item) {
                            item.el.find(".window_controlArea").append(btnHtml).show();
                            item.el.find("#OKbtn").bind("click", function () {
                                var Lpwd = item.el.find("#onePassword").val();
                                var dbLpwd = item.el.find("#towPassword").val();
                                var pwd = item.el.find("#Password").val();
                                if (pwd == "")
                                    item.el.find("#toPwdTip").html("原密码不能为空!");
                                else if (Lpwd == "")
                                    item.el.find("#toPwdTip").html("新密码不能为空!");
                                else if (Lpwd.length < 6)
                                    item.el.find("#toPwdTip").html("新密码长度不能小于6!");
                                else if (Lpwd != dbLpwd)
                                    item.el.find("#toPwdTip").html("两次密码不一致!");
                                else {
                                    J.ajax({
                                        type: "post",
                                        url: "/Login/ResetPassword/" + topNamespace.cloudDeskTop.userInfo.guid,
                                        dataType: "json",
                                        data: {
                                            userid: topNamespace.cloudDeskTop.userInfo.userID,
                                            newPwd: dbLpwd,
                                            oldPwd: pwd
                                        },
                                        success: function (data, textStatus) {
                                            if (data.success) {
                                                if (data.Message == "修改密码成功") {
                                                    item.el.find("#toPwdTip").html("");
                                                    alert(data.Message);
                                                    item.close();
                                                } else {
                                                    item.el.find("#toPwdTip").html(data.Message);
                                                }
                                            } else {
                                                alert("由于系统繁忙，请稍后再次修改");
                                                item.close();
                                            }

                                        }
                                    });
                                }
                            });
                            item.el.find("#Escbtn").bind("click", function () {
                                item.close();
                            });
                        }
                        }
                    }
                });

            }
        });
    });

    //************************************************************************
    //消息便签
    //************************************************************************
    //	$.Package(function(J){
    //		var noteBookHtml = '<div id="noteBookDiv" class="noteBook">\
    //								<div class="title">\
    //									<ul>\
    //										<li>课程</li>\
    //										<li>会议</li>\
    //										<li>任务</li>\
    //										<li>全部</li>\
    //									</ul>\
    //								</div>\
    //								<div class="content">\
    //									<div class="date">2012年7月26日 星期四</div>\
    //									<div class="info">\
    //										<dl>\
    //										  <dt><span count="0">当前消息0条</span>消息中心</dt>\
    //										</dl>\
    //										<div class="pager">\
    //										  <a href="#" class="prev">&lt;&lt;</a>\
    //										  <a href="#" class="next">&gt;&gt;</a>\
    //										</div>\
    //									</div>\
    //									<div class="info">\
    //										<dl>\
    //										  <dt><span count="0">当前消息0条</span>消息中心</dt>\
    //										</dl>\
    //										<div class="pager">\
    //										  <a href="#" class="prev">&lt;&lt;</a>\
    //										  <a href="#" class="next">&gt;&gt;</a>\
    //										</div>\
    //									</div>\
    //									<div class="info">\
    //										<dl>\
    //										  <dt><span count="0">当前消息0条</span>消息中心</dt>\
    //										</dl>\
    //										<div class="pager">\
    //										  <a href="#" class="prev">&lt;&lt;</a>\
    //										  <a href="#" class="next">&gt;&gt;</a>\
    //										</div>\
    //									</div>\
    //									<div class="info">\
    //										<dl>\
    //										  <dt><span count="0">当前消息0条</span>消息中心</dt>\
    //										</dl>\
    //										<div class="pager">\
    //										  <a href="#" class="prev">&lt;&lt;</a>\
    //										  <a href="#" class="next">&gt;&gt;</a>\
    //										</div>\
    //									</div>\
    //								</div>\
    //							</div>';
    //		var moveNoteBook = function (e, x, y) {
    //		    if (y <= 30) { J(this.el).css({ top: "20px" }) }
    //		    if (y > $(window).height() - 30) {
    //		        J(this.el).css({ top: $(window).height() - 30 });
    //		    }
    //		    if (x <= -J(this.el).outerWidth() * 2 / 3) {
    //		        J(this.el).css({ left: parseInt(-J(this.el).outerWidth() * 2 / 3) });
    //		    }
    //		    if (x + J(this.el).outerWidth() / 3 > $(window).width()) {
    //		        J(this.el).css({ left: parseInt($(window).width() - J(this.el).outerWidth() / 3) });
    //		    }
    //		};					
    //		topNamespace.WebOs.noteBook = J.Class({ extend: J.ui.componet }, {
    //            init: function (config) {
    //				var context = this;
    //				J("#desktop").append(noteBookHtml);
    //				context.el = J("#noteBookDiv");
    //				var p = new J.ui.Drag({
    //		            apperceiveEl: J("#noteBookDiv")[0],effectEl: J("#noteBookDiv")[0],
    //					move: { fn: moveNoteBook, scope: context }
    //		        });
    //				context.el.css({left:J(window).width() - 230,top:J(window).height() - 348});
    //				J(".date",context.el).html(getDateWeek());
    //				context.showMsgTab(3);
    //				$(".noteBook li","#desktop").each(function(i){
    //					$(this).css({"background-position":"-"+(i*27+1)+"px -300px","top":($(".noteBook li").length-i-1)*38+"px"});
    //					$(this).click(function(){
    //						context.showMsgTab(i);
    //					});
    //				});
    //				J("#noteBookDiv .info .pager a").click(function(e){
    //					var marginTop = parseInt(J(this).parent().prev().children("dt").css("marginTop"));
    //					var totolHeight = J(this).parent().prev()[0].scrollHeight;
    //					marginTop = -marginTop;
    //					if(!marginTop) marginTop = 0;
    //					if(this.className == "prev"){
    //						if(marginTop - 162 >= 0){
    //							marginTop -= 162;
    //							J(this).parent().prev().children("dt").css({marginTop:(-marginTop)+"px"});
    //						}
    //					}else if(this.className == "next"){
    //						totolHeight += marginTop;
    //						if(marginTop + 162 < totolHeight){
    //							marginTop += 162;
    //							J(this).parent().prev().children("dt").css({marginTop:(-marginTop)+"px"});
    //						}
    //					}
    //				});
    //			},
    //			show:function(){
    //				var context = this;
    //				context.el.show();
    //			},
    //			hide:function(){
    //				var context = this;
    //				context.el.hide();
    //			},
    //			showMsgTab:function(tabIndex){
    //				var context = this;
    //				$(".noteBook li").css({"left":"24px","z-index":"0"});
    //				$(".noteBook shape").css("z-index","0");
    //				$(".noteBook li:eq("+tabIndex+")").css({"left":"22px","z-index":"2"});
    //				$(".noteBook li:eq("+tabIndex+")").prevUntil("li").css("z-index","2");
    //				$(".noteBook .info").hide();
    //				$(".noteBook .info").eq(tabIndex).show();
    //			},
    //			showMsg:function(msg,msgType){
    //				var context = this;
    //				if(msg && msgType){
    //					var allCount = J(".info:last dl > dt > span",context.el).attr("count");
    //					J(".info:last dl > dt > span",context.el).attr("count",(++allCount)).html("当前任务"+(allCount)+"条");
    //					if(msg.length > 10)
    //						J(".info:last dl > dt",context.el).after('<dd><span>1.</span><a href="#" title="'+msg+'">'+msg.substr(0,10)+'...'+'</a></dd>');
    //					else{
    //						J(".info:last dl > dt",context.el).after('<dd><span>1.</span><a href="#" title="'+msg+'">'+msg+'</a></dd>');
    //					}
    //					var liIndex = 0;
    //					J(".title ul li",context.el).each(function(){
    //						if(this.innerHTML == msgType){
    //							var count = J(".info:eq("+liIndex+") dl > dt > span",context.el).attr("count");
    //							J(".info:eq("+liIndex+") dl > dt > span",context.el).attr("count",(++count)).html("当前任务"+(count)+"条");
    //							if(msg.length > 10){
    //								J(".info:eq("+liIndex+") dl > dt",context.el).after('<dd><span>1.</span><a href="#" title="'+msg+'">'+msg.substr(0,10)+'...'+'</a></dd>');
    //							}else{
    //								J(".info:eq("+liIndex+") dl > dt",context.el).after('<dd><span>1.</span><a href="#" title="'+msg+'">'+msg+'</a></dd>');	
    //							}
    //						}
    //						liIndex++;
    //					});
    //					J(".info dl",context.el).each(function(){
    //						var index = 1;
    //						J(this).children("dd").each(function(){
    //							J(this).children("span").html(index+".");
    //							index++;
    //						});
    //						if(J(this).children("dd").size() > 5){
    //							J(this).parent().find(".pager").show();
    //						}
    //					});
    //				}
    //			}
    //		});
    //	});
    //	//************************************************************************
    //    //新手指引
    //    //************************************************************************
    //	$.Package(function (J) {
    //		noviceGuidelinesHtml = '<div id="ui_masknovice" class="ui_masknovice " style="opacity: 1; z-index: 300021; display: none;" _olddisplay="block">\
    //									<div class="noviceMask noviceTop" style="float:left" id="noviceTop"></div>\
    //									<div class="noviceMask noviceLeft" style="float:left" id="noviceLeft"></div>\
    //									<div id="noviceGuidelines" style="float:left"></div>\
    //									<div class="noviceMask noviceRight" style="float:left" id="noviceRight"></div>\
    //									<div class="noviceMask noviceBottom" style="float:left" id="noviceBottom"></div>\
    //									<div id="noviceContent" class="wokao" style="position: absolute;z-index:300033">\
    //										<img src="" />\
    //										<div id="noviceTitle" class="kaowo" style="position: absolute;">\
    //											<div id="noviceNext" style="cursor: pointer;"><img src="../../../Content/images/novice_next.png" /></div>\
    //											<div id="noviceStop" style="cursor: pointer;"><img src="../../../Content/images/novice_close.png" /></div>\
    //										</div>\
    //									</div>\
    //								</div>\
    //								<div id="ui_masknoviceAll" class="ui_masknoviceAll " style="opacity: 0.5; z-index: 300021; display: none;" _olddisplay="block">\
    //									<div class="novicelogin">\
    //										<img id="noviceESC" src="../../../Content/images/noviceESC.png" style="margin-left:317px;margin-top:2px;cursor: pointer;">\
    //										<div id="noviceDockBar" style="margin-left:220px;margin-top:50px;cursor: pointer;"><img src="../../../Content/images/noviceDockBar.png"></div>\
    //										<div id="noviceNavBar" style="margin-left:220px;margin-top:40px;cursor: pointer;"><img src="../../../Content/images/noviceNavBar.png"></div>\
    //										<div id="noviceDeskTop" style="margin-left:220px;margin-top:40px;cursor: pointer;"><img src="../../../Content/images/noviceDeskTop.png"></div>\
    //										<div id="noviceToBtn" style="margin-left:100px;cursor: pointer;"><img src="../../../Content/images/noviceToBtn.png"></div>\
    //									</div>\
    //								</div>';
    //		noviceGuidelinesConfig = {
    //			isFirst: true,
    //			NoviceItem: [".dock_tool_item2",".indicator_header",".indicator_wrapper",".dock_tool_theme",".indicator_manage",".indicator_search",".logout_button","#taskItem_7","#taskItem_224"],
    //			NoviceItmeBgImg: ["MainMenu","noviceUserInfo","novicewrapper","novicetheme","novicemanage","novicesearch","novicelogout","noviceappmarket","noviceresource"],
    //			NoviceNavBarCount: 7,
    //			NoviceDockBarCount: 2,
    //			nowNoviceCount: 0,
    //			LoginCount:0,
    //			showNoviceCount: 0,
    //			events: {
    //                onInit: { fn: function () { }, scope: this }	
    //			}
    //		};
    //		var NoviceMaskPosition = function(config,count){
    //			var context = this;
    //			var elName = config.NoviceItem[count];			
    //			var el = J(elName);
    //			J("#noviceGuidelines").css({width:el.width()-6,height:el.height()-6});
    //			J(".noviceTop").css({width:"100%",height:el.offset().top});
    //			J(".noviceLeft").css({width:el.offset().left,height:el.height()});
    //			J(".noviceRight").css({width:J(window).width()-el.offset().left-el.width(),height:el.height()});
    //			J(".noviceBottom").css({width:"100%",height:J(window).height()-el.height()-el.offset().top});
    //			if(count!=4){
    //				J("#noviceContent").find("img")[0].src = "../../../Content/images/"+config.NoviceItmeBgImg[count]+"BG.png";	
    //			}else{
    //				J("#noviceContent").find("img")[0].src = "";
    //			}			
    //			J("#noviceContent").attr("class","").addClass(config.NoviceItmeBgImg[count]+"BG");
    //			if(count>6){
    //				J("#noviceContent").attr("class","").css({top:J(window).height()-el.height()-180,left:el.offset().left-100});
    //			}
    //			J("#noviceTitle").attr("class","").addClass(config.NoviceItmeBgImg[count]+"BGT").css({"background-image":"Url(../images/"+config.NoviceItmeBgImg[count]+".png)"});
    //			J("#noviceNext").attr("class","").addClass(config.NoviceItmeBgImg[count]+"Next");
    //			J("#noviceStop").attr("class","").addClass(config.NoviceItmeBgImg[count]+"Stop");
    //		};
    //		topNamespace.WebOs.noviceGuidelinesPanel = J.Class({ extend: J.ui.componet }, {
    //			init: function(config){
    //				var context = this;
    //				var noviceGuidelinesOption = J.extend({}, noviceGuidelinesConfig, config);
    //				noviceGuidelinesOption.showNoviceCount = noviceGuidelinesOption.NoviceNavBarCount + noviceGuidelinesOption.NoviceDockBarCount;
    //				J("#desktop").append(noviceGuidelinesHtml); 
    //				context.el = J("#ui_masknovice");
    //				if(noviceGuidelinesOption.LoginCount <= 1 || !noviceGuidelinesOption.isFirst)
    //					context.allShow();				
    //				J("#noviceDockBar").bind('click',function(){
    //					noviceGuidelinesOption.nowNoviceCount = noviceGuidelinesOption.NoviceNavBarCount;
    //					noviceGuidelinesOption.nowNoviceCount = 7;
    //					NoviceMaskPosition(noviceGuidelinesOption,noviceGuidelinesOption.nowNoviceCount);
    //					noviceGuidelinesOption.nowNoviceCount++;
    //					context.allHide();
    //					context.show();
    //				});
    //				J("#noviceNavBar").bind('click',function(){
    //					noviceGuidelinesOption.showNoviceCount = noviceGuidelinesOption.NoviceNavBarCount;	
    //					noviceGuidelinesOption.nowNoviceCount = 0;					
    //					NoviceMaskPosition(noviceGuidelinesOption,noviceGuidelinesOption.nowNoviceCount);
    //					noviceGuidelinesOption.nowNoviceCount++;
    //					context.allHide();
    //					context.show();
    //				});
    //				J("#noviceDeskTop").bind('click',function(){
    //					noviceGuidelinesOption.nowNoviceCount = 0;
    //					NoviceMaskPosition(noviceGuidelinesOption,noviceGuidelinesOption.nowNoviceCount);
    //					noviceGuidelinesOption.nowNoviceCount++;
    //					context.allHide();
    //					context.show();
    //				});
    //				J("#noviceToBtn").bind('click',function(){
    //					noviceGuidelinesOption.nowNoviceCount = 0;
    //					NoviceMaskPosition(noviceGuidelinesOption,noviceGuidelinesOption.nowNoviceCount);
    //					noviceGuidelinesOption.nowNoviceCount++;
    //					context.allHide();
    //					context.show();
    //				});
    //				J("#noviceESC").bind('click',function(){
    //					context.allHide();
    //				});
    //				J("#noviceNext").bind('click',function(){
    //					context.nextNovice(noviceGuidelinesOption);
    //				});
    //				J("#noviceStop").bind('click',function(){
    //					context.close();
    //				});
    //			},
    //			nextNovice: function(cinfig){
    //				var context = this;	
    //				if(cinfig.nowNoviceCount < cinfig.showNoviceCount)
    //					NoviceMaskPosition(cinfig,cinfig.nowNoviceCount);
    //				else
    //					context.noviceRemove();
    //				cinfig.nowNoviceCount++;
    //			},
    //			close: function(){
    //				var context = J("#ui_masknovice");
    //				context.hide();
    //			},
    //			allShow: function(){
    //				var context = J("#ui_masknoviceAll");
    //				context.show();
    //			},
    //			allHide: function(){
    //				var context = J("#ui_masknoviceAll");
    //				context.hide();
    //			},
    //			show: function(){
    //				var context = J("#ui_masknovice");
    //				context.show();				
    //			},
    //			noviceRemove: function(){
    //				var context = J("#ui_masknovice");
    //				context.remove();
    //			}
    //		});
    //	});
    //************************************************************************
    //桌面模块
    //************************************************************************
    $.Package(function (J) {
        var desktopHtml = '<div id="desktop" class="EIM_Container"></div>';

        var deskTopConfig = {};
        //-----------------------------------------------------
        //--------------创建右键菜单---------------------------
        //-----------------------------------------------------
        /***快捷图标右键菜单***/
        var createShortCutMenu = function (context, evt, shortcutItem) {
            var moveShortCut = function (context, id, pageIndex) {
                var app = context.deskApps.get(id);
                if (app) {
                    J.ajax({
                        type: "post",
                        url: "/Main/InsertUserApp/" + context.userInfo.guid,
                        data: {
                            UserID: context.userInfo.userID,
                            AppID: app.AppID,
                            renderTo: "appPage_" + pageIndex
                        },
                        success: function (response, options) {
                            context.desktopContainer.removeItem(id);
                            context.dockBar.removeShortCutItem(id);
                            context.appManagePanel.removeItem(id);
                            context.desktopContainer.addItem(app, pageIndex);
                            context.appManagePanel.addPageItem(J.extend(app, { left: null, right: null }), pageIndex);
                        },
                        error: function () {
                            alert('连接服务器失败，请稍后再登录');
                        }
                    });
                }
            }
            var menuItem = [
								{ text: "打开应用", fn: function () { context.openApp(shortcutItem.id) }, scope: context },
								"-",
								{ text: "移动应用到", items: [
									{ text: "桌面1", fn: function () { moveShortCut(context, shortcutItem.id, 0) }, scope: context },
									{ text: "桌面2", fn: function () { moveShortCut(context, shortcutItem.id, 1) }, scope: context }
								]
								},
								{ text: "卸载应用", fn: function () { context.removeShortCut(shortcutItem.id) }, scope: context }
							];
            menuItem[2].items[context.navBar.currentPageIndex].disabled = true;
            var appItem = context.deskApps.get(shortcutItem.id);
            if (appItem) {
                if (typeof appItem.canMove != "undefind" && appItem.canMove == false) {
                    menuItem.splice(2, 1);
                }
                if (typeof appItem.canRemove != "undefind" && appItem.canRemove == false)
                    menuItem[menuItem.length - 1].disabled = true;
            }
            var shortCutRgMenu = new J.ui.menu({ left: evt.pageX, top: evt.pageY, items: menuItem });
        }

        var createDockBarItemMenu = function (context, evt, appid) {
            var menuItem = [{ text: "打开", fn: function () { context.openApp(appid) }, scope: context },
							"-",
							{ text: "最大化", fn: function () { context.windowMax(appid) }, scope: context },
							"-",
							{ text: "最小化", fn: function () { context.windowMin(appid) }, scope: context },
							"-",
							{ text: "关闭", fn: function () { context.windowClose(appid) }, scope: context },
							];
            var DockBarItemRgMenu = new J.ui.menu({ left: evt.pageX, top: evt.pageY, items: menuItem });
        }

        /***dockBar右键菜单***/
        var createDockBarMenu = function (context, evt) {
            var savePos = function (pos) {
                context.dockBar.setPosition(pos);
                if (context.userSet.dockBar && context.userSet.dockBar.pos != pos) {
                    context.userSet.dockBar.pos = pos;
                    context.saveUserSet();
                }
            };
            var menuItem = [
				{ text: "向左停靠", fn: function () { savePos("left") }, scope: context },
				{ text: "向上停靠", fn: function () { savePos("top"); }, scope: context },
				{ text: "向右停靠", fn: function () { savePos("right") }, scope: context }
			];
            if (context.dockBar.position == "left")
                menuItem[0].ico = "dock_menu_item_left";
            else if (context.dockBar.position == "top")
                menuItem[1].ico = "dock_menu_item_top"
            else
                menuItem[2].ico = "dock_menu_item_right";
            var shortCutRgMenu = new J.ui.menu({ left: evt.pageX, top: evt.pageY, items: menuItem });
        }

        //-------------------------------------------------------------
        //--------------dockBar模块操作--------------------------------
        //-------------------------------------------------------------
        var getPos = function (pos) {
            var left = 40, right = 0, top = 0;
            if (pos.toLowerCase() == "top") {
                left = 0; right = 0; top = 40;
            } else if (pos.toLowerCase() == "left") {
                left = 40; right = 0; top = 0;
            } else {
                left = 0; right = 40; top = 0;
            }
            return { left: left, right: right, top: top };
        };

        var initAppArray = function (context, deskTopOption) {
            var appItemHash = [];
            var appDockItemHash = [];
            var appArrayHash = [];

            for (var i in deskTopOption.appArray) {
                if (context.deskApps.containsKey(deskTopOption.appArray[i].AppID)) continue;
                if (deskTopOption.appArray[i].renderTo) {
                    if (deskTopOption.appArray[i].renderTo.indexOf("dockBar") >= 0)
                        appItemHash.push(deskTopOption.appArray[i]);
                    else {
                        appArrayHash.push(deskTopOption.appArray[i]);
                    }
                } else {
                    deskTopOption.appArray[i].renderTo = "appPage_0";
                    appArrayHash.push(deskTopOption.appArray[i]);
                }
                context.deskApps.put(deskTopOption.appArray[i].AppID, deskTopOption.appArray[i]);
            }

            for (var j in deskTopOption.appItem) {
                if (context.deskApps.containsKey(deskTopOption.appItem[j].AppID)) continue;
                deskTopOption.appItem[j].renderTo = "dockBar";
                deskTopOption.appItem[j].canRemove = false;
                deskTopOption.appItem[j].canMove = false;
                appDockItemHash.push(deskTopOption.appItem[j])
                context.deskApps.put(deskTopOption.appItem[j].AppID, deskTopOption.appItem[j]);
            }
            return { appItem: appItemHash, appDockItem: appDockItemHash, appArray: appArrayHash };
        };

        //-------------------------------------------------------------
        //-----------------桌面类模块----------------------------------
        //-------------------------------------------------------------
        topNamespace.WebOs.deskTop = J.Class({ extend: J.ui.componet }, {
            init: function (config) {
                var context = this;
                context.deskWindows = new topNamespace.WebOs.hashTable();
                context.deskApps = new topNamespace.WebOs.hashTable();
                context.userInfo = { guid: "", ticket: "", userID: "", userName: "", userPhoto: "" };
                context.userSet = {
                    theme: {
                        bgImg: "/Content/webdesk/images/wallpapers/3.jpg",
                        //bgImg:context.userInfo.userSet.theme.bgImg,
                        cssFile: "/Content/webdesk/css/ThemeCss/Dream.css",
                        bgImgPos: "tile"
                    },
                    dockBar: { pos: "left" },
                    navBar: { index: 0 },
                    shortCut: { icoType: "big" },
                    im: { headSize: "1" }
                };
                context.isLogOut = false;
                context.isRefresh = false;
                var deskTopOption = J.extend({}, deskTopConfig, config);
                if (deskTopOption.userInfo)
                    J.extend(context.userInfo, deskTopOption.userInfo);
                if (typeof deskTopOption.userSet == "string" && deskTopOption.userSet.length > 0) {
                    try {
                        J.extend(context.userSet, J.parseJSON(deskTopOption.userSet));
                    } catch (e) { }
                } else {
                    context.saveUserSet();
                }

                //设置domain域
                try { document.domain = "localhost"; }
                catch (e) {
                    try { document.domain = "yun-edu.com"; } catch (e) {
                        try { document.domain = "yun-edu.cn"; } catch (e) { }
                    }
                }

                //初始化数组	
                var appItems = initAppArray(context, deskTopOption);

                //创建桌面
                J(document.body).append(desktopHtml);
                context.el = J("#desktop");
                context.searchAppBar = null;

                //创建墙纸
                context.themeManager = new topNamespace.WebOs.themeManager({
                    renderTo: document.body,
                    wallpaperSrc: context.userSet.theme.bgImg,
                    themeSrc: context.userSet.theme.cssFile,
                    wallpaperPos: context.userSet.theme.bgImgPos,
                    events: {
                        onSetTheme: { fn: function (e, imgPath, cssPath, imgPos) {
                            context.userSet.theme.bgImg = imgPath;
                            context.userSet.theme.cssFile = cssPath;
                            context.userSet.theme.bgImgPos = imgPos;
                            context.saveUserSet();
                        }
                        },
                        onSetThemeCss: { fn: function (e, cssPath) {
                            if (context.userSet.theme != cssPath) {
                                context.userSet.theme.cssFile = cssPath;
                                context.saveUserSet();
                            }
                        }
                        }
                    }
                });

                //创建appManagePanel
                context.appManagePanel = new topNamespace.WebOs.appManagePanel({
                    renderTo: document.body,
                    items: context.deskApps.values(),
                    events: {
                        onShow: { fn: function () { var target = this; context.el.hide(); }, scope: context },
                        onHide: { fn: function () { var target = this; context.el.show(); }, scope: context },
                        onAddItem: { fn: function () { }, scope: this },
                        onClickItem: { fn: function (e, item) { context.openApp(item.id) }, scope: context },
                        onRemoveItem: { fn: function () { }, scope: this }
                    }
                });

                //创建工具栏
                context.dockBar = new topNamespace.WebOs.dockBar({
                    position: context.userSet.dockBar.pos,
                    appDockItem: appItems.appDockItem,
                    appItem: appItems.appItem,
                    events: {
                        dockBarInit: { fn: function (e, item) { }, scope: context },
                        dockBarMoveEnd: { fn: function (e, pos, w, h) {
                            var context = this;
                            if (context.desktopContainer)
                                context.desktopContainer.setContainerPos(getPos(pos).left, getPos(pos).top, getPos(pos).right);
                            if (context.userSet.dockBar && context.userSet.dockBar.pos != pos) {
                                context.userSet.dockBar.pos = pos;
                                context.saveUserSet();
                            }
                            context.setTaskBarWidth();
                        }, scope: context
                        },
                        dockItemAdd: { fn: function () { } },
                        dockBarRgClick: { fn: function (e, evt, item) { createDockBarMenu(context, evt) }, scope: context },
                        dockItemClick: { fn: function (e, param) { if (param) context.openApp(param) }, scope: context },
                        dockItemRgClick: { fn: function (e, evt, appid) { createDockBarItemMenu(context, evt, appid); } },
                        onUserPhotoClick: { fn: function () { var context = this; context.loadJs("setUserInfo", "/Content/scripts/JqueryWin_SetUserInfo.js", "topNamespace.WebOs.SetUserInfo", "/Content/css/SetUserInfo/CSS_SetUserInfo.css") } }
                    }
                });

                /*//创建工具栏滚动条
                context.scrollOption = new topNamespace.WebOs.scrollContainer({
                renderTo: "#smallShort",
                events: {
                onScrollMove: { fn: function () { }, scope: this }
                }
                });*/

                //创建快捷图标
                context.desktopContainer = new topNamespace.WebOs.desktopContainer({
                    renderTo: "#desktop",
                    index: context.userSet.navBar.index,
                    items: appItems.appArray,
                    left: getPos(context.userSet.dockBar.pos).left,
                    right: getPos(context.userSet.dockBar.pos).right,
                    top: getPos(context.userSet.dockBar.pos).top,
                    icoType: context.userSet.shortCut.icoType,
                    events: {
                        onInit: { fn: function () { } },
                        onItemClick: { fn: function (e, item) { context.openApp(item.id); } },
                        onItemRgClick: { fn: function (e, evt, item) { createShortCutMenu(context, evt, item); } },
                        onQuickButtonClick: { fn: function () { context.openApp(7); } }
                    }
                });

                //创建分页导航栏
                context.navBar = new topNamespace.WebOs.navBar({
                    currentPageIndex: context.userSet.navBar.index,
                    userPhoto: deskTopOption.userInfo.userPhoto,
                    userName: context.userInfo.userName,
                    events: {
                        onInit: { fn: function () {
                            var context = this;
                            context.desktopContainer.setIndex(context.userSet.navBar.index);
                        }, scope: context
                        },
                        onChagePageIndex: { fn: function (e, index) {
                            if (context.userSet.navBar && context.userSet.navBar.index != index) {
                                context.userSet.navBar.index = index;
                                context.desktopContainer.setIndex(index);
                                context.saveUserSet();
                            }
                        }
                        },
                        onUserPhotoClick: { fn: function () { var context = this; context.loadJs("setUserInfo", "/Content/scripts/JqueryWin_SetUserInfo.js", "topNamespace.WebOs.SetUserInfo", "/Content/css/SetUserInfo/CSS_SetUserInfo.css") }, scope: context },
                        onClickAppManageBtn: { fn: function () { var target = this; target.show(); }, scope: context.appManagePanel },
                        onClickAppSearchBtn: { fn: function () {
                            var target = this;
                            if (!target.searchAppBar)
                                target.searchAppBar = new topNamespace.WebOs.searchAppManager({
                                    url: "/AppStore/SeoAppNameXiala/" + target.userInfo.guid,
                                    events: {
                                        onSelect: { fn: function (e, idx, item) {
                                            var target = this;
                                            if (target.deskApps.containsKey(idx))
                                                target.openApp(idx);
                                            else
                                                target.openApp(7, { appID: idx });
                                        }, scope: context
                                        }
                                    }
                                });
                            target.searchAppBar.show();
                            return false;
                        }, scope: context
                        },
                        onNavToolItemClick: { fn: function (e, item) {
                            if (item.className.indexOf("dock_tool_theme") != -1) {
                                var config = {
                                    id: "themeManager",
                                    title: "主题设置",
                                    renderTo: "#desktop",
                                    minable: false,
                                    maxable: false,
                                    width: 590,
                                    height: 499,
                                    resizeable: false,
                                    iscenter: true,
                                    url: "/QoPreference/QoPreference/"
                                };
                                context.createWindow(config);
                            } else if (item.className.indexOf("dock_tool_setting") != -1) {
                                context.loadJs("SystemSettings", "/Content/scripts/JqueyWin_SystemSettings.js", "topNamespace.WebOs.SystemSettings", "/Content/css/SystemSettings/CSS_SystemSettings.css"); return false;
                            } else if (item.className.indexOf("logout_button") != -1) {
                                if (!context.logoutManager) {
                                    context.logoutManager = new topNamespace.WebOs.logoutManager({
                                        renderTo: "#desktop",
                                        desktop: context
                                    });
                                }
                                context.logoutManager.winlogout();
                            }
                        }
                        },
                        onNavMainToolItemClick: { fn: function (e, item) { context.logout(); } }
                    }
                });
                // context.userInfoPanel = new topNamespace.WebOs.userInfoPanel({
                // userInfo:deskTopOption.userInfo,
                // isHide: true,
                // events: {
                // onUserImgClick: { 
                // fn: function () {context.loadJs("setUserInfo", "/Content/scripts/JqueryWin_SetUserInfo.js", "topNamespace.WebOs.SetUserInfo", "/Content/css/SetUserInfo/CSS_SetUserInfo.css") } 
                // }
                // }
                // });
                //context.noteBook = new topNamespace.WebOs.noteBook();
                //context.noviceGuidelinesPanel = new topNamespace.WebOs.noviceGuidelinesPanel({LoginCount: context.userInfo.LoginCount});
                context.Url = "/Login/Logout";
                if (window.location !== window.top.location) { window.top.location = window.location; }
                window.onbeforeunload = function (evt) {
                    if (!context.isLogOut && !context.isRefresh) {
                        evt = window.event || evt;
                        if (window.event) {
                            evt.returnValue = "确认离开?";
                        }
                        return ("确认离开?");
                    }
                };
                window.onunload = function () {
                    context.isLogOut = true;
                    //if (J.isFunction(delete_cookie) && !context.isRefresh)
                    //    delete_cookie('yun-edu', '/', '');
                    window.onbeforeunload = null;

                    //window.location = context.Url;
                };

                J(document).mousedown(function (ev) {
                    var tags = ['a', 'button', 'input', 'select'];
                    if (!J(ev.target).closest(tags).length) { ev.stopPropagation(); }
                }).bind('contextmenu', J.proxy(function (e) {
                    var target = this;
                    var saveIcoType = function (icoType) {
                        if (target.userSet.shortCut && target.userSet.shortCut.icoType != icoType) {
                            target.userSet.shortCut.icoType = icoType;
                            target.desktopContainer.setItemIco(icoType);
                            target.saveUserSet();
                        }
                    };
                    var menuItem = [
								{ text: "显示桌面", fn: function () { target.minimizeWindows(); } },
								{ text: "锁定", fn: function () {
								    if (!target.logoutManager) {
								        target.logoutManager = new topNamespace.WebOs.logoutManager({
								            renderTo: "#desktop",
								            desktop: target
								        });
								    }
								    if (target.logoutManager) {
								        target.logoutManager.userlock();
								    }
								}
								},
								{ text: "添加应用", fn: function () { target.openApp(7); }, ico: "add_app_icon" },
								"-",
								{ text: "主题设置", fn: function () {
								    var config = {
								        id: "themeManager", title: "主题设置",
								        renderTo: "#desktop", minable: false,
								        maxable: false, width: 590, height: 499,
								        resizeable: false, iscenter: true, url: "/QoPreference/QoPreference/"
								    }
								    target.createWindow(config);
								}
								},
								{ text: "系统设置", fn: function () {
								    target.loadJs("SystemSettings", "/Content/scripts/JqueyWin_SystemSettings.js", "topNamespace.WebOs.SystemSettings", "/Content/css/SystemSettings/CSS_SystemSettings.css");
								}
								},
								{ text: "图标设置", items: [
									{ text: "大图标", fn: function () { saveIcoType("big") }, ico: (target.desktopContainer.icoType == "big") ? "dock_menu_item_left" : "" },
									{ text: "小图标", fn: function () { saveIcoType("small") }, ico: (target.desktopContainer.icoType != "big") ? "dock_menu_item_left" : "" }
								]
								},
								"-",
								{ text: "反馈", fn: function () { window.open("http://bbs.yun-edu.com/"); } },
								{ text: "注销", fn: function () {
								    if (!target.logoutManager) {
								        target.logoutManager = new topNamespace.WebOs.logoutManager({
								            renderTo: "#desktop",
								            desktop: target
								        });
								    }
								    if (target.logoutManager) {
								        target.logoutManager.winlogout();
								    }
								}
								},
							];
                    if (e.target.tagName != "IMG")
                        var taskItemRgMenu = new J.ui.menu({ left: e.pageX, top: e.pageY, items: menuItem });
                    return false;
                }, context));
                J(document.body).css({ height: J(window).height() });
                $(window).bind("resize", J.proxy(function () {
                    var target = this;
                    J(document.body).css({ height: J(window).height() });
                    J("#zoomWallpaperGrid").height(J(window).height());
                    J("#zoomWallpaper").height(J(window).height());
                    window.cloudDeskTop.dockBar.showAppCount(window.cloudDeskTop.dockBar);
                }, context));
                /*J.ui.messageBox.show({fn:function(text){
                //alert(text);
                }});*/
                //context.checkOnlineTimer = setInterval(context.checkOnline, 5000);
                //comet连接

                //context.cometConnect();
            },
            minimizeWindows: function () {
                var context = this;
                var winArray = context.deskWindows.values();
                for (var i in winArray) {
                    var win = winArray[i];
                    if (win) {
                        if (win.isVisible()) { win.hide(); } else { win.show(); }
                    }
                }
            },
            addShortCut: function (config) {
                if (!config || !config.AppID) return false;
                var context = this;
                config.id = config.AppID;
                if (!context.deskApps.containsKey(config.id)) {
                    try {
                        J.ajax({
                            type: "post",
                            url: "/Main/InsertUserApp/" + context.userInfo.guid,
                            data: {
                                UserID: context.userInfo.userID,
                                AppID: config.AppID,
                                renderTo: "appPage_" + context.desktopContainer.index,
                                IsFree: config.IsFree
                            },
                            success: function (response, options) {
                                if (response.Message != null)
                                    alert(response.Message);
                                context.deskApps.put(config.id, config);
                                context.desktopContainer.addItem(config, context.desktopContainer.index);
                                context.appManagePanel.addPageItem(J.extend(config, { left: null, right: null }), context.navBar.currentPageIndex);
                            },
                            error: function () {
                                //alert('连接服务器失败，请稍后再登录');
                            }
                        });
                    } catch (e) { }
                }
            },
            removeShortCut: function (appId) {
                if (!appId) return false;
                var context = this;
                try {
                    J.ajax({
                        type: "post",
                        url: "/Main/DeleteUserApp/" + context.userInfo.guid,
                        data: {
                            UserID: context.userInfo.userID,
                            AppID: appId
                        },
                        success: function (response, options) {
                            if (context.deskApps.containsKey(appId)) {
                                context.deskApps.remove(appId);
                                context.desktopContainer.removeItem(appId);
                            }
                            if (context.deskWindows.containsKey(appId)) {
                                var win = context.deskWindows.get(appId);
                                if (win) win.close();
                                context.deskWindows.remove(appId);
                            }
                        },
                        error: function () {
                            //alert('连接服务器失败，请稍后再登录');
                        }
                    });
                } catch (e) { }
            },
            createWindow: function (config) {
                var context = this;
                var win = context.deskWindows.get(config.id);
                if (!win) {
                    if (typeof config.url == "string" && config.url.length > 0) {
                        if (!config.dntAddGuid) {
                            if (config.url.indexOf(":/") == -1) { config.url = config.url + context.userInfo.guid; }
                        }
                        if (typeof config.urlParam == "object") {
                            var strParam = "";
                            for (var key in config.urlParam) { strParam = strParam + key + "=" + config.urlParam[key] + "&"; }
                            if (strParam.length > 0) config.url = config.url + "?" + strParam.substr(0, strParam.length - 1);
                        }

                        var winHtml = '<div class="content_area" id="container_iframeApp_' + config.id + '" style="height: 100%; width: 100%;">\
							        <div class="appStartingCover" id="starting_iframeApp_' + config.id + '" style="display: block; opacity: 1;" _olddisplay="block">\
								        <div class="appStartingError" id="error_background_' + config.id + '">\
									        <a href="#" class="appRestart" id="appRestart_' + config.id + '"></a>\
								        </div>\
								        <div class="appText" id="appText_' + config.id + '">loading...</div>\
								        <div class="appStartingAnimation"></div>\
							        </div>\
						        </div>';
                        config.html = winHtml;
                        if (typeof config.winClassName == "string" && config.winClassName.length > 0) {
                            eval("win = new " + config.winClassName + "(" + JSON.stringify(config) + ")");
                            if (win && config.events) { for (var i in config.events) { win.on(i, config.events[i].fn, config.events[i].scope); } }
                        } else {
                            win = new J.ui.window(config);
                        }
                        var iframe = document.createElement("iframe");
                        iframe.src = config.url; iframe.id = "iframeApp_" + config.id;
                        iframe.name = "iframeApp_" + config.id; iframe.frameBorder = "0";
                        iframe.scrolling = "auto"; iframe.allowtransparency = "true";
                        iframe.hidefocus = ""; iframe.className = "iframeApp";
                        iframe.style.width = "100%"; iframe.style.height = "100%";
                        iframe.style.left = "0px";
                        var loadingDiv = document.getElementById("starting_iframeApp_" + config.id);
                        var containerDiv = document.getElementById("container_iframeApp_" + config.id);
                        if (iframe.attachEvent) {
                            iframe.attachEvent("onload", function () {
                                if (loadingDiv)
                                    loadingDiv.style.display = "none";
                            });
                        } else {
                            iframe.onload = function () {
                                if (loadingDiv)
                                    loadingDiv.style.display = "none";
                            };
                        }
                        if (containerDiv)
                            containerDiv.appendChild(iframe);
                    } else if (typeof config.html == "string" && config.html.length > 0) {
                        if (typeof config.winClassName == "string" && config.winClassName.length > 0) {
                            eval("win = new " + config.winClassName + "(" + JSON.stringify(config) + ")");
                            if (win && config.events) { for (var i in config.events) { win.on(i, config.events[i].fn, config.events[i].scope); } }
                        } else {
                            win = new J.ui.window(config);
                        }
                    }
                    if (win) {
                        win.on("winClose", function (e, item) {
                            context.dockBar.removeShortCutItem(item.id);
                            context.deskWindows.remove(item.id);
                        });
                        win.on("winActive", function (e, item) {
                        });
                        context.deskWindows.put(config.id, win);
                    }
                }
                if (win) {
                    win.show();
                    return win;
                }
            },
            windowMax: function (appID) {
                var context = this;
                var win = context.deskWindows.get(appID);
                if (win)
                    win.maxsize();
            },
            windowMin: function (appID) {
                var context = this;
                var win = context.deskWindows.get(appID);
                if (win)
                    win.minimize();
            },
            windowClose: function (appID) {
                var context = this;
                var win = context.deskWindows.get(appID);
                if (win) {
                    win.close();
                }
            },
            createTaskBarItem: function (config) {
                var context = this;
                var taskItem = context.dockBar.shortCutItem.get(config.id);
                if (config.top) config.top = null;
                if (!taskItem) {
                    context.dockBar.addShortCutItem(config);
                } else {
                }
            },
            openApp: function (appID, param) {
                var context = this;
                var app = context.deskApps.get(appID); if (!app) return;
                var url = app.AppUrl, icoSrc = app.AppIco;
                if (url && url.indexOf(".js") != -1) {
                    var startIndex = url.lastIndexOf("/");
                    var endIndex = url.indexOf(".js");
                    var jsClassName = url.substring(startIndex + 1, endIndex);
                    jsClassName = "topNamespace.WebOs." + jsClassName;
                    context.loadJs(appID, url, jsClassName);
                } else {
                    if (!url) return false;
                    var config = {
                        url: url, id: appID, title: app.AppName,
                        renderTo: "#desktop", width: 500, height: 500, max: app.IsMax, dntAddGuid: true
                    }
                    if (icoSrc && icoSrc.length > 0) {
                        var lastIndex = icoSrc.lastIndexOf('/');
                        config.IconSrc = icoSrc.substring(0, lastIndex + 1) + "small.png";
                        config.isShowIcon = true;
                    }
                    if (!isNaN(app.AppFormWidth) && app.AppFormWidth > 0) { config.width = app.AppFormWidth; }
                    if (!isNaN(app.AppFormHeight) && app.AppFormHeight > 0) { config.height = app.AppFormHeight; }
                    if (!isNaN(app.AppCanMaximize) && app.AppCanMaximize == "0") { config.maxable = false; }
                    if (!isNaN(app.AppCanResize) && app.AppCanResize == "0") { config.resizeable = false; }
                    config.left = Math.round((J(window).width() - config.width) / 2);
                    config.top = Math.round((J(window).height() - config.height) / 2);
                    context.createWindow(config);
                    context.createTaskBarItem(app);
                }
            },
            saveUserSet: function () {
                var context = this;
                try {
                    J.ajax({
                        type: "post",
                        url: "/Main/saveUserSet/" + context.userInfo.guid,
                        data: {
                            PersonalSet: JSON.stringify(context.userSet)
                        },
                        success: function (response, options) { },
                        error: function () {
                            // alert('连接服务器失败，请稍后再登录'); 
                        }
                    });
                } catch (e) { }
            },
            loadJs: function (id, jsPath, jsClassName, cssPath) {
                var context = this;
                try {
                    if (J("#" + jsClassName.substring(jsClassName.lastIndexOf('.') + 1, jsClassName.length))[0] == undefined)
                        eval("var constance = new " + jsClassName + "({id:'" + id + "'})");
                    else
                        eval("var constance = new " + jsClassName + "id({id:'" + id + "'})");
                } catch (e) {
                    if (jsPath && jsPath.length > 0) {
                        J.ajax({
                            type: "get",
                            url: jsPath + "?version=" + context.userInfo.guid,
                            beforeSend: function (XMLHttpRequest) {
                                if (cssPath && cssPath.length > 0) {
                                    if (J("#" + jsClassName.lastIndexOf('.'))[0] == undefined)
                                        J("head").append('<link  type="text/css" charset="utf-8" rel="stylesheet" href="' + cssPath + '?version=' + context.userInfo.guid + '"/>')
                                }
                            },
                            success: function (data, textStatus) {
                                if (J("#" + jsClassName.substring(jsClassName.lastIndexOf('.') + 1, jsClassName.length))[0] != undefined) {
                                    J("#" + jsClassName.substring(jsClassName.lastIndexOf('.') + 1, jsClassName.length)).show();
                                }
                                else {
                                    eval(data);
                                    eval("var constance = new " + jsClassName + "({id:'" + id + "'})");
                                }
                            },
                            complete: function (XMLHttpRequest, textStatus) { },
                            error: function () { }
                        });
                    }
                }
            },
            logout: function () {
                var context = this;
                if (!context.logoutManager)
                    context.logoutManager = new topNamespace.WebOs.logoutManager({
                        logoutUrl: "/User/LogOut",
                        renderTo: "#desktop",
                        desktop: context
                    });
                if (context.logoutManager)
                    if (J("#startMenuContainer").is(":hidden"))
                        context.logoutManager.show();
                    else
                        context.logoutManager.hide();

            },
            checkOnline: function () {
                if (window.cloudDeskTop) {
                    var context = window.cloudDeskTop;
                    J.ajax({
                        type: "post",
                        url: "/User/CheckGuid/" + context.userInfo.guid,
                        success: function (response, options) {
                            if (!response.Success) {
                                var errorUrl = "/User/CheckOnline"
                                if (response.Data == '1') {
                                    errorUrl += "?type=1"
                                } else if (response.Data == '2') {
                                    errorUrl += "?type=2"
                                } else {
                                    errorUrl += "?type=3"
                                }
                                var errorMsgWin = new J.ui.window({
                                    id: "errorMsgBox",
                                    title: "温馨提示",
                                    html: '<iframe scrolling="auto" frameborder="0" id="iframeApp_errorMsgBox" name="iframeApp_errorMsgBox" src="' + errorUrl + '" class="iframeApp" style="width: 100%; height: 100%; left: 0px; background:#fff;"></iframe>',
                                    width: 440,
                                    height: 260,
                                    mask: true,
                                    closeable: false,
                                    resizeable: false,
                                    iscenter: true,
                                    renderTo: "#desktop"
                                });
                                if (errorMsgWin) errorMsgWin.show();
                                //停止计时器
                                clearInterval(context.checkOnlineTimer);
                            }
                        },
                        error: function () {
                            clearInterval(context.checkOnlineTimer);
                            alert('连接服务器失败，请稍后再登录');
                        }
                    });
                }
            }
            //            ,
            //            cometConnect: function () {
            //                var context = this;
            //                if (window.webComet) { window.webComet.disConnect(); window.webComet = null; }
            //                if (!window.webComet) {
            //                    window.webComet = new WebComet({
            //                        User: {
            //                            guid: context.userInfo.guid,
            //                            userid: context.userInfo.userID,
            //                            userPwd: context.userInfo.userPassWord,
            //                            state: "hidden",
            //                            userFriends: new topNamespace.WebOs.hashTable()
            //                        },
            //                        Url: context.userInfo.getMsgComet,
            //                        OnAccept: [context.acceptSysMsg]
            //                    });
            //                    window.webComet.connect();
            //					context.getOfflineSysMsg();
            //                }
            //            },
            //            acceptSysMsg: function (messageData) {				
            //                if (messageData.n == "aspNetComet.systemMsg") {
            //                    window.cloudDeskTop.noteBook.showMsg(messageData.c.m,"会议");
            //                }
            //                for (var key in messageData) {
            //                    //console.log("come here! key="+key+"=m="+messageData[key]);
            //                }
            //            },
            //			getOfflineSysMsg:function(){
            //				var context = this;
            //				J.ajax({
            //                            type: "post",
            //                            url: "/Main/GetOfflineSysMsg/" + context.userInfo.guid,
            //                            data: {},
            //                            success: function (response, options) {
            //								if(response.Success){
            //									if(response.Data && response.Data.length > 0){
            //										for(var i = 0;i<response.Data.length;i++){
            //											context.noteBook.showMsg(response.Data[i].MsgContent,"会议");
            //										}
            //									}
            //								}
            //                            },
            //                            error: function () {
            //                                alert('连接服务器失败，请稍后再登录');
            //                            }
            //                        });	
            //			}
        });
    });
})(jQuery, window);
 
