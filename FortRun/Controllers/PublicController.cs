using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FortRun.BLL.HepSystem;
using FortRun.Model;

namespace FortRun.Web.Controllers
{
    public class PublicController : Controller
    {
        //
        // GET: /Public/

        /// <summary>
        /// 定时验证登录
        /// </summary>
        /// <param name="guid"></param>
        /// <param name="userid"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult TimerCheckLogin(string guid, string userid)
        {
            var jsonData = new JsonData();
            var oh = new OnlineHelper();
            var userinfo = oh.GetUserInfoByGuid(guid);
            if (userinfo != null)
            {
                if (userid == userinfo.UserId)
                {
                    jsonData.success = true;
                    return Json(jsonData);
                }
            }
            else
            {
                userinfo = oh.GetUserInfoByUserId(userid);
                if (userinfo != null)
                {
                    jsonData.message = "您的账号已经在其他地方登录，您已被迫下线";
                    jsonData.success = false;

                }
                else
                {
                    jsonData.message = "您已登录超时,请重新登录";
                    jsonData.success = false;
                }
            }
            return Json(jsonData);
        }

    }
}
