using System.Collections.Generic;
using System.Web.Script.Serialization;
using FortRun.Model;

namespace FortRun.BLL.HepSystem
{
    public class DesktopHelper
    {
        public string GetDeskjscode(IAccount account)
        {
            return ParseToJson(SetDeskModel(account));
        }

        public DeskModel SetDeskModel(IAccount account)
        {
            var m = new DeskModel { };

            var u = new UserBasicModel
                        {
                            guid = account.CurrentUserInfo.Guid.ToString(),
                            ticket = account.CurrentUserInfo.Guid.ToString(),
                            userID = account.UserId,
                            userLoginName = account.UserName,
                            userName = account.UserName,
                            userPhoto = "/Content/webdesk/images/head.gif"
                        };
            m.userInfo = u;

            var app = new AppItem
                           {
                               AppID = "888",
                               renderTo = "appPage_0",
                               AppCanMaximize = 1,
                               AppCanResize = 1,
                               AppCategoryID = "9",
                               AppFormHeight = 520,
                               AppFormWidth = 920,
                               AppIco = "http://FileService.yun-edu.com/Application/9/7/big.png",
                               AppName = "系统设置",
                               AppUrl = "/HepSystem/Index"
                           };

            m.appArray = new List<AppItem> { app };
            m.userSet = "/Content/webdesk/images/wallpapers/3.jpg";
            return m;
        }

        public string ParseToJson(DeskModel model)
        {
            //StringBuilder s = new StringBuilder();
            //s.AppendFormat("$(function () {window.cloudDeskTop = new WebOs.deskTop(\{id: '{0}')",model.id);

            var ecode = string.Empty;
            var jsonSerializer = new JavaScriptSerializer();
            ecode = jsonSerializer.Serialize(model);



            return ecode;
        }
    }
}