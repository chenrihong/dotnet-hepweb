/*
(C) jQuery Easyui Quick Develop Lib.

$.eui:命名空间

dg:DataGrid类 / win: Window类

调用方法(以datagrid为例)：var dg = new $.eui.dg('datagrid');

*/
jQuery.eui = {
    dg: function (dgid) {
        this.id = dgid;
        this.getRowIndex = function () {
            var r = getSelectedRow();
            return r ? $('#' + this.id).datagrid('getRowIndex', r) : -1;
        };
        this.getSelectedRow = function () {
            var data = $('#' + this.id).datagrid('getSelected');
            return data;
        };
        //        this.removeSelected = function () {
        //                var t = this;
        //                var rowIndex = this.getRowIndex();
        //                $.messager.confirm('确认', '您确认要删除吗？', function (r) {
        //                    if (r) {
        //                        $('#' + t.id).datagrid('deleteRow', rowIndex);
        //                    }
        //                });
        //                return true;
        //        };
    },
    win: function (winid) {

    },
    fm: function (fmid) {
        this.id = fmid;
        this.loadForm = function (data) {
            if (data && typeof data == 'object') {
                $('#' + this.id).form('load', data);
            }
        };
    },
    tg: function (tgid) {
        this.id = tgid;
        this.options = function () {
            return $('#' + this.id).treegrid('options');
        };
        //       this.removeNode = function () {
        //            var t = this;
        //            var d = t.getNode();
        //            var idfiled = t.options().idField;
        //            if (d) {
        //                var idvalue = d[idfiled];
        //                $('#' + t.id).treegrid('remove', idvalue);
        //            }
        //        };
        this.getNode = function () {
            return $('#' + this.id).treegrid('getSelected');
        };
        this.getNodeId = function () {
            var d = this.getNode();
            return d ? d[this.options().idField] : -1;
        };
        this.getParentNode = function (nodeid) {
            //does not work
            var parentNode = $('#' + this.id).treegrid('getParent', nodeid);
            return parentNode;
        };
        this.getChildNodes = function (nodeid) {
            return $('#' + this.id).treegrid('getChildren', nodeid);
        };
        this.find = function (nodeid) {
            return $('#' + this.id).treegrid('find', nodeid);
        };
    }
};
//扩展方法
$.extend({
    parseDate: function (val, cg) {
        var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
        var years = date.getFullYear();
        if (years != "0001") {
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            if (cg) {
                var d = new Date().toDateString();
                var e = new Date(years, parseInt(month) - 1, currentDate);
                if (d == e.toDateString()) {
                    return "今天";
                } else if (d == e.setDate(e.getDate() + 1).toDateString()) {
                    return "昨天";
                }
            }
            return date.getFullYear() + "-" + month + "-" + currentDate;
        } else {
            return "";
        }
    },
    parseDateTime: function (val, cg) {
        var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
        var years = date.getFullYear();
        if (years != "0001") {
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            hour = hour < 10 ? "0" + hour : hour;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            if (cg) {
                var d = new Date().toDateString();
                var e = new Date(years, parseInt(month) - 1, currentDate);
                if (d == e.toDateString()) {
                    return "今天 " + hour + ":" + minutes + ":" + seconds;
                } else if (d == e.setDate(e.getDate() + 1).toDateString()) {
                    return "昨天 " + hour + ":" + minutes + ":" + seconds;
                }
            }
            return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minutes + ":" + seconds;
        } else {
            return "";
        }
    },
    parseTime: function (val) {
        var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        hour = hour < 10 ? "0" + hour : hour;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return hour + ":" + minutes + ":" + seconds;
    },
    parseTreeData: function (_1) {
        /*修正属性*/
        //1st layer
        for (var i = 0; i < _1.length; i++) {
            _1[i]['checked'] = _1[i].ischecked;
            //2nd layer
            var _2 = _1[i].children;
            if (_2 && _2.length > 0) {
                for (var j = 0; j < _2.length; j++) {
                    _2[j]['checked'] = _2[j].ischecked;
                    //3rd layer
                    var _3 = _2[j].children;
                    if (_3 && _3.length > 0) {
                        for (var k = 0; k < _3.length; k++) {
                            _3[k]['checked'] = _3[k].ischecked;
                            //4nd layer
                            var _4 = _3[k].children;
                            if (_4 && _4.length > 0) {
                                for (var l = 0; l < _4.length; l++) {
                                    _4[l]['checked'] = _4[l].ischecked;
                                }
                            }
                        }
                    }
                }
            }
        }
        return _1;
    }
});

$.fn.hcheckbox = function (options) {
    $(':checkbox+label', this).each(function () {
        $(this).addClass('checkbox');
        if ($(this).prev().is(':disabled') == false) {
            if ($(this).prev().is(':checked'))
                $(this).addClass("checked");
        } else {
            $(this).addClass('disabled');
        }
    }).click(function (event) {
        if (!$(this).prev().is(':checked')) {
            $(this).addClass("checked");
            $(this).prev()[0].checked = true;
        }
        else {
            $(this).removeClass('checked');
            $(this).prev()[0].checked = false;
        }
        event.stopPropagation();
    }
		).prev().hide();
};
$.fn.hradio = function (options) {
    var self = this;
    return $(':radio+label', this).each(function () {
        $(this).addClass('hRadio');
        if ($(this).prev().is("checked"))
            $(this).addClass('hRadio_Checked');
    }).click(function (event) {
        $(this).siblings().removeClass("hRadio_Checked");
        if (!$(this).prev().is(':checked')) {
            $(this).addClass("hRadio_Checked");
            $(this).prev()[0].checked = true;
        }

        event.stopPropagation();
    })
        .prev().hide();
};