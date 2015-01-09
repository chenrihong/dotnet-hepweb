using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FortRun.BLL.Hotel;
using FortRun.Model;

namespace FortRun.Web.Controllers.Hotel
{
    public class HotelController : BaseController
    {
        //
        // GET: /Hotel/

        /// <summary>
        /// 酒店设置 - 酒店管理
        /// </summary>
        /// <returns></returns>
        [UserAuthorize]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetHotelList()
        {
            var jsonData = new JsonData();
            var list = new HotelHelper().GetHotelList();
            jsonData.rows = list;
            jsonData.success = true;
            return Json(jsonData);
        }
    }
}
