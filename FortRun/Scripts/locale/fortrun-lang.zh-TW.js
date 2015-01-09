var locale = {
    status: {
        status_on: '啟用',
        status_off: '停用',
        status_other: '其他'
    },
    btn: {
        //button
        btn_ok: "確認",
        btn_cancel: "取消",
        btn_submit: "提交",
        btn_reset: "重置",
        btn_back: "返回",
        btn_sarch: "搜索",
        btn_add: "新增",
        btn_remove: "刪除",
        btn_edit: "編輯",
        btn_reload: "刷新數據",
        btn_detail: "詳情"
    },
    msg: {
        //message
        msg_title_info: "提示",
        msg_title_warning: "警告",
        msg_title_ques: "詢問",

        msg_success_login: "登錄成功",
        msg_success_save: "保存成功",
        msg_success_remove: "刪除成功",

        msg_failure_login: "登錄失敗",
        msg_failure_save: "保存失敗",
        msg_failure_remove: "刪除失敗",

        msg_question_edit_null: "請您選擇您要編輯的記錄",
        msg_question_remvove_null: "請您選擇您要刪除的記錄"
    },
    fn: {
        fn_remove: function (val) {
            return "您確認要刪除" + val + "嗎？";
        },
        fn_detail: function (val) {
            return val + "明細";
        }
    }
};