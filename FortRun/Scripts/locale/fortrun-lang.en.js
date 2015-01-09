var locale = {
    status: {
        status_on:'ON',
        status_off:'OFF',
        status_other:'OTHER'
    },
    btn: {
        //button
        btn_ok: "Ok",
        btn_cancel: "Cancel",
        btn_submit: "Submit",
        btn_reset: "Reset",
        btn_back: "Back",
        btn_add: "Add",
        btn_remove: "Remove",
        btn_edit: "Edit",
        btn_reload: "Reload",
        btn_sarch: "Search",
        btn_detail: "Detail"
    },
    msg: {
        //message
        msg_title_info: "Information",
        msg_title_warnning: "Warnning",
        msg_title_ques: "Question",

        msg_success_login: "Login Successful",
        msg_success_save: "Save Successful",
        msg_success_remove: "Remove Successful",

        msg_failure_login: "Login failed",
        msg_failure_save: "Save failed",
        msg_failure_remove: "Remove failed",

        msg_question_edit_null: "Please select the record you want to edit",
        msg_question_remvove_null: "Please select the record you want to remove",
    },
    fn: {
        fn_remove: function (val) {
            return "Are you sure you want to remove " + val + "?";
        },
        fn_detail: function (val) {
            return "Detail Of " + val;
        }
    }
};