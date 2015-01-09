using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FortRun.Model;
using System.Web.Mvc;
/*
 * 会员个人信息管理
 */
namespace FortRun.Web.Controllers
{
    public class PersonalController : BaseController
    {
        //
        // GET: /Personal/

        /// <summary>
        /// 个人详细信息
        /// </summary>
        /// <param name="personid"></param>
        /// <returns></returns>
        public ActionResult PersonalDetail(string personid)
        {
            var m = new UserBaseModel
            {
                memCellPhone = "15888888888",
                memID = "10001",
                memIdNum = "362422199011088111",
                memName = "陈日红",
                memRegisterTime = DateTime.Now.ToString("yyyy-MM-dd"),
                memSex = "男",
                memStatus = "OK"
            };
            return View(m);
        }
    }
}
