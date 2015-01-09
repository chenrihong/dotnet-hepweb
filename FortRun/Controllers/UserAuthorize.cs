using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using FortRun.Model;

namespace FortRun.Web.Controllers
{
    public class UserAuthorize : AuthorizeAttribute
    {
        /// <summary>
        /// 自定义授权检查
        /// </summary>
        /// <param name="httpContext"></param>
        /// <returns></returns>
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException("httpContext");
            }
            var rd = RouteTable.Routes.GetRouteData(new HttpContextWrapper(System.Web.HttpContext.Current));
            if (rd != null && rd.Values.Count > 0)
            {
                var guid = rd.Values["guid"] as string;
                var language = rd.Values["language"] as string;
                var action = rd.Values["action"] as string;
                var controller = rd.Values["controller"] as string;

                //if (language != "zh-TW" && language != "zh-CN" && language != "en")
                //{
                //    return false;
                //}

                if (guid == "")
                {
                    return false;//无GUID
                }

                var currentUserInfo = new FortRun.BLL.HepSystem.OnlineHelper().GetUserInfoByGuid(guid);
                if (currentUserInfo != null)
                {
                    var currentUser = currentUserInfo.UserId;
                    //var currentRole = currentUserInfo.UserRoleInfo.roleId;
                    if (currentUser.IndexOf("fortrun", System.StringComparison.Ordinal) != -1)
                    {
                        return true;
                    }
                }
                else
                {
                    NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
                    logger.Error(@"无GUID的非法访问: /" + controller + "/" + action + " ");
                    return false;//判断权限失败，进入HandleUnauthorizedReques方法
                }
            }
            return base.AuthorizeCore(httpContext);
        }

        /// <summary>
        /// 如果权限判断成功，则执行此操作
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            base.HandleUnauthorizedRequest(filterContext);

            if (filterContext.HttpContext.Response.StatusCode == 401)
            {
                filterContext.Result = new RedirectResult("/Login/Index");
            }

            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                filterContext.Result = new JsonResult
                    {
                        Data = new { success = false, message = "登录超时，请重新登录再操作！" },
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                return;
            }

            //最后
            //<authentication mode="Forms">
            //  <forms loginUrl="~/Account/LogOn" timeout="2880" />
            //</authentication>
        }
    }
}