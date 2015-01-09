using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using FortRun.BLL.HepSystem;

namespace FortRun.Web.Controllers
{
    public class BaseController : Controller
    {
        protected IAccount AccountCache { get; private set; }

        protected override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);

            var rd = RouteTable.Routes.GetRouteData(new HttpContextWrapper(System.Web.HttpContext.Current));
            if (rd != null && rd.Values.Count > 0)
            {
                var guid = rd.Values["guid"] as string;
                var language = rd.Values["language"] as string;
                var action = rd.Values["action"] as string;
                var controller = rd.Values["controller"] as string;

                if (!string.IsNullOrWhiteSpace(guid) || (action == "Index" && controller == "Login"))
                {
                    var request = filterContext.HttpContext.Request;
                    var oh = new OnlineHelper();
                    if (request.Url != null) oh.UpdateUserLastAction(guid, request.Url.AbsolutePath);
                    IAccount account = new Account(guid);
                    if (account.IsLogon)
                    {
                        if (!string.IsNullOrEmpty(language) && language != account.Language)
                            oh.UpdateLanguage(guid, language);
                        ViewBag.Guid = guid;
                        ViewBag.Language = account.Language;
                        ViewBag.UserId = account.UserId;
                        ViewBag.UserName = account.UserName;
                        ViewBag.Password = account.UserPassword;

                        AccountCache = account;
                    }
                }
                else
                {
                    NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
                    logger.Error(@"无GUID的非法访问: /" + controller + "/" + action + " ");
                }
            }
        }
    }
}