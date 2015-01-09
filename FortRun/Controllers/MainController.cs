using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FortRun.Model;
using FortRun.BLL;

namespace FortRun.Web.Controllers
{
    public class MainController : BaseController
    {
        //
        // GET: /Main/
        [UserAuthorize]
        public ActionResult Index()
        {
            return View();
        }
        [UserAuthorize]
        public  ActionResult Index2()
        {
            return View();
        }
        [UserAuthorize]
        public ActionResult DataGridDemo()
        {
            return View();
        }
        [UserAuthorize]
        public ActionResult DataGridDemo2()
        {
            return View();
        }

        public ActionResult Online()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetMemData()
        {
            
            var jsonData = new JsonData { rows = new FortRun.BLL.MemberHelper().GetMemberList(), success = true };
            return Json(jsonData);
        }

        [HttpPost]
        public JsonResult GetOnline()
        {
            var jsonData = new JsonData();
            var list = new FortRun.BLL.HepSystem.OnlineHelper().GetOnline();
            jsonData.rows = list;
            jsonData.success = true;
            return Json(jsonData);
        }
        [HttpPost]
        public JsonResult AddMember(UserBaseModel mbr)
        {
            var jsonData = new JsonData { message = "新成员[" + mbr.memName + "]保存成功", success = true };
            return Json(jsonData);
        }

        /// <summary>
        /// 保存用户设置
        /// </summary>
        /// <returns></returns>
        public JsonResult saveUserSet()
        {
            var r = new JsonResult();
            return r;
        }
    }
}