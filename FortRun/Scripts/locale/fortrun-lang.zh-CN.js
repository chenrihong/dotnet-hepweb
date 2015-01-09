var locale = {
    status: {
        status_on: '启用',
        status_off: '停用',
        status_other: '其他'
    },
    btn: {
        //button
        btn_ok: "确认",
        btn_cancel: "取消",
        btn_submit: "提交",
        btn_reset: "重置",
        btn_back: "返回",
        btn_sarch: "搜索",
        btn_add: "新增",
        btn_remove: "删除",
        btn_edit: "编辑",
        btn_reload: "刷新数据",
        btn_detail: "详情"

    },
    msg: {
        //message
        msg_title_info: "提示",
        msg_title_warning: "警告",
        msg_title_ques: "询问",

        msg_success_login: "登录成功",
        msg_success_save: "保存成功",
        msg_success_remove: "删除成功",

        msg_failure_login: "登录失败",
        msg_failure_save: "保存失败",
        msg_failure_remove: "删除失败",

        msg_question_edit_null: "请选择您要编辑的记录",
        msg_question_remvove_null: "请选择您要删除的记录"
    },
    fn: {
        fn_remove: function (val) {
            return "您确认要删除" + val + "吗？";
        },
        fn_detail: function (val) {
            return val + "明细";
        }
    }

};