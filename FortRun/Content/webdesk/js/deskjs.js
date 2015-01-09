$(function () {
    window.cloudDeskTop = new WebOs.deskTop({
        id: "CloudDeskTop",
        userInfo: { 
            guid: "f4e537f8-22c3-4146-8447-bf25d92a7e59",
            ticket: "74a3eb7d-0fbb-4877-80c5-98e326349d0b",
            userID: "fortrun-008", 
            userName: "陈日红",
            userPhoto: "/Content/webdesk/images/head.gif",
            userLoginName: "陈日红",
            userPassWord: '48d6528fedff546dc684012f2a9c2926',
            schoolName: '上海新煌软件有限公司',
            LoginCount: '951'
        },
        appArray: [{
            AppID: 2,
            AppCategoryID: 9,
            AppName: '考勤登记',
            AppUrl: '../../AttendanceManage/AttendanceByHR/f4e537f8-22c3-4146-8447-bf25d92a7e59',
            AppIco: 'http://FileService.yun-edu.com/Application/9/2/big.png?version=6f7294cd-1750-4452-8e15-ff27f2b4c43a',
            AppFormWidth: 900,
            AppFormHeight: 550,
            AppCanResize: 1,
            AppCanMaximize: 1,
            IsMax: 0,
            renderTo: 'appPage_0'
        }, {
            AppID: 6,
            AppCategoryID: 9,
            AppName: 'OA系统-机关',
            AppUrl: '../../OA/OAManage/OAManage_Bur/f4e537f8-22c3-4146-8447-bf25d92a7e59',
            AppIco: 'http://FileService.yun-edu.com/Application/9/6/big.png?version=f7fc3c2a-ae73-46c3-8782-246c8c871909',
            AppFormWidth: 1000,
            AppFormHeight: 550,
            AppCanResize: 1,
            AppCanMaximize: 1,
            IsMax: 0, 
            renderTo: 'appPage_0'
        }, {
            AppID: 201,
            AppCategoryID: 9,
            AppName: '学讯通',
            AppUrl: '../../../StudentsManage/StudentsManage/f4e537f8-22c3-4146-8447-bf25d92a7e59', 
            AppIco: 'http://FileService.yun-edu.com/Application/9/201/big.png?version=f313c088-51b5-4320-b833-bde4101096c4', AppFormWidth: 1000, AppFormHeight: 600, AppCanResize: 1, AppCanMaximize: 1, IsMax: 0, renderTo: 'appPage_0'
        }, { AppID: 
            202, AppCategoryID: 9, AppName: '人事管理-机关', AppUrl: '../../HRManage/HRManageBur/f4e537f8-22c3-4146-8447-bf25d92a7e59', AppIco: 'http://FileService.yun-edu.com/Application/9/202/big.png?version=9402b55f-26ff-476c-9687-31f073517f98',
            AppFormWidth: 1000, AppFormHeight: 600, AppCanResize: 1, AppCanMaximize: 1, IsMax: 0, renderTo: 'appPage_0'
        }, { AppID: 209, AppCategoryID: 9, AppName: '学籍管理-机关', AppUrl: '../../../StudentRecordBureau/StudentRecordBureau/f4e537f8-22c3-4146-8447-bf25d92a7e59', AppIco: 'http://FileService.yun-edu.com/Application/9/209/big.png?version=8293ffc3-6fa7-44e4-922d-f0bfd10bfbda', AppFormWidth: 1000, AppFormHeight: 600, AppCanResize: 1, AppCanMaximize: 1, IsMax: 0, renderTo: 'appPage_0' }, { AppID: 210, AppCategoryID: 9, AppName: '师资管理', AppUrl: '../../../TeacherBureauManage/TeacherBureauManage/f4e537f8-22c3-4146-8447-bf25d92a7e59', AppIco: 'http://FileService.yun-edu.com/Application/9/210/big.png?version=f6de3c39-b7a0-40d9-be7f-2d94e2d3a4e9', AppFormWidth: 1000, AppFormHeight: 600, AppCanResize: 1, AppCanMaximize: 1, IsMax: 0, renderTo: 'appPage_0' },
            { 
                AppID: 224,
                AppCategoryID: 9,
                AppName: '资源库',
                AppUrl: 'http://resources.yun-edu.com/',
                AppIco: 'http://FileService.yun-edu.com/Application/9/224/big.png?version=9efe3988-3cdb-487b-8d06-c4ff0232b7fe',
                AppFormWidth: 990,
                AppFormHeight: 540,
                AppCanResize: 1,
                AppCanMaximize: 1,
                IsMax: 1, renderTo: 'appPage_0'
            },
            { 
                AppID: 237,
                AppCategoryID: 9,
                AppName: '资产管理',
                AppUrl: '../../BureauAssets/AssetsManage/Manage/f4e537f8-22c3-4146-8447-bf25d92a7e59',
                AppIco: 'http://FileService.yun-edu.com/Application/9/237/big.png?version=853ad4df-c5dc-4ac8-9f93-e819fbeec06f',
                AppFormWidth: 1000,
                AppFormHeight: 600,
                AppCanResize: 1,
                AppCanMaximize: 1,
                IsMax: 0,
                renderTo: 'appPage_0' 
            }, { AppID: 238, AppCategoryID: 9, AppName: '平台时钟', AppUrl: '/Content/scripts/jqueryClock.js', AppIco: 'http://FileService.yun-edu.com/Application/9/238/big.png?version=e04d8a63-31fc-46db-bd3a-52dee060a850', AppFormWidth: 148, AppFormHeight: 148, AppCanResize: 0, AppCanMaximize: 0, IsMax: 0, renderTo: 'appPage_0' }, { AppID: 239, AppCategoryID: 9, AppName: '用户名片', AppUrl: '/Content/scripts/userInfoPanel.js', AppIco: 'http://FileService.yun-edu.com/Application/9/239/big.png?version=f4be2e69-9beb-4e59-8c95-9eb4a174829c', AppFormWidth: 250, AppFormHeight: 124, AppCanResize: 0, AppCanMaximize: 0, IsMax: 0, renderTo: 'appPage_0' }, { AppID: 240, AppCategoryID: 9, AppName: '天气预报', AppUrl: '/Content/scripts/weatherPanel.js', AppIco: 'http://FileService.yun-edu.com/Application/9/240/big.png?version=8dc4dda1-50dd-45d5-ac70-88db6eecc2c3', AppFormWidth: 245, AppFormHeight: 128, AppCanResize: 0, AppCanMaximize: 0, IsMax: 0, renderTo: 'appPage_0' }, { AppID: 241, AppCategoryID: 9, AppName: '日历', AppUrl: '/Content/scripts/jquerycalendarPanel.js', AppIco: 'http://FileService.yun-edu.com/Application/9/241/big.png?version=4cb4471b-efa0-4a47-ad40-76711adb6f6e', AppFormWidth: 300, AppFormHeight: 400, AppCanResize: 0, AppCanMaximize: 0, IsMax: 0, renderTo: 'appPage_0' }, { AppID: 242, AppCategoryID: 9, AppName: '预复习资料', AppUrl: '../../../PreReview/PreReview/f4e537f8-22c3-4146-8447-bf25d92a7e59', AppIco: 'http://FileService.yun-edu.com/Application/9/242/big.png?version=ea0ea8b9-4899-42ff-b1d6-fedf9349f99a', AppFormWidth: 1000, AppFormHeight: 600, AppCanResize: 1, AppCanMaximize: 1, IsMax: 0, renderTo: 'appPage_0'}],
//        appItem: [{
//            AppID: 7,
//            AppCategoryID: 9,
//            AppName: '应用商场',
//            AppUrl: '../../AppManage/AppStore/AppStore/f4e537f8-22c3-4146-8447-bf25d92a7e59',
//            AppIco: 'http://FileService.yun-edu.com/Application/9/7/big.png?version=4999b505-d4c1-4a09-8224-31323d2958f9', 
//            AppFormWidth: 920,
//            AppFormHeight: 520,
//            AppCanResize: 1,
//            AppCanMaximize: 1, 
//            IsMax: 0, 
//            renderTo: ''
//        }],
        userSet: '{"theme":{"bgImg":"/Content/webdesk/images/wallpapers/3.jpg","cssFile":"/Content/webdesk/css/ThemeCss/Fluorescence.css","bgImgPos":"repeat"},"dockBar":{"pos":"left"},"navBar":{"index":0},"shortCut":{"icoType":"big"},"im":{"headSize":"1"}}'
    });
});
var guid = 'f4e537f8-22c3-4146-8447-bf25d92a7e59';
var userID = 'fortrun-008';
var userName = '陈日红';
var userLoginName = 'fortrun-008';
var userPassWord = '48d6528fedff546dc684012f2a9c2926';