using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FortRun.BLL;
using FortRun.BLL.HepSystem;
using FortRun.Model;

namespace FortRun.Web.Controllers
{
    public class RoleController : BaseController
    {
        //
        // GET: /Role/

        /// <summary>
        /// 角色信息 （role infomation list）
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetRoleData()
        {
            var jsonData = new JsonData();
            var list = new RoleHelper().GetRoleList();
            jsonData.rows = list;
            jsonData.success = true;
            return Json(jsonData);
        }

    }
}
