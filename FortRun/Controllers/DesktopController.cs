using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FortRun.Web.Controllers
{
    public class DesktopController : BaseController
    {
        //
        // GET: /Desktop/

        [UserAuthorize]
        public ActionResult Index()
        {
            return View();
        }

        [UserAuthorize]
        public string DeskJson()
        {
            var desktop = new FortRun.BLL.HepSystem.DesktopHelper();
            string ecode = desktop.GetDeskjscode(AccountCache);

            string s = "$(function () {window.cloudDeskTop = new WebOs.deskTop(";
            s += ecode;
            s += " );});";
            s += "var guid = '" + AccountCache.CurrentUserInfo.Guid.ToString() + "';";
            s += "var UserName = '" + AccountCache.UserName + "';";
            s += "var userID = '" + AccountCache.UserId + "';";
            return s;
        }
    }
}
