using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FortRun.BLL;
using FortRun.BLL.Hotel;
using FortRun.Model;

namespace FortRun.Web.Controllers.Hotel
{
    public class GroupController : BaseController
    {
        //
        // GET: /Group/

        /// <summary>
        /// 酒店设置 - 集团管理
        /// </summary>
        /// <returns></returns>
        [UserAuthorize]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GroupDetail(string GroupID)
        {
            ViewBag.GroupID = GroupID;
            return View();
        }

        [HttpPost]
        public JsonResult GetGroupList()
        {
            var jsonData = new JsonData();
            var list = new GroupHelper().GetGroupList();
            jsonData.rows = list;
            jsonData.success = true;
            return Json(jsonData);
        }
    }
}
