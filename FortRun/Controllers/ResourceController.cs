using System;
using System.Web.Mvc;
using FortRun.BLL;
using FortRun.Model;

namespace FortRun.Web.Controllers
{
    /// <summary>
    /// 资源设置
    /// </summary>
    public class ResourceController : BaseController
    {
        //
        // GET: /Resource/
        [UserAuthorize]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetResList()
        {
            var jsonData = new JsonData();
            var list = new ResourceHelper().GetResourceList();
            jsonData.rows = list;
            jsonData.success = true;
            return Json(jsonData);
        }
    }
}
