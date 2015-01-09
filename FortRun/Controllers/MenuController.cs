using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FortRun.Model;
using FortRun.BLL.HepSystem;

namespace FortRun.Web.Controllers
{
    public class MenuController : BaseController
    {
        //
        // GET: /Menu/
        [UserAuthorize]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetMenuList()
        {
            var json = new JsonData {rows = new MenuHelper(ViewBag.Guid).GetMenu(), success = true};
            return Json(json);
        }
    }
}
