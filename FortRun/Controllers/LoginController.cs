using System.Web.Mvc;
using FortRun.BLL;
using FortRun.Model;
namespace FortRun.Web.Controllers
{
    public class LoginController : BaseController
    {
        //
        // GET: /Login/

        /// <summary>
        /// 登录页面
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Index2()
        {
            return View();
        }

        /// <summary>
        /// 登出
        /// </summary>
        /// <returns></returns>
        public ActionResult Logout()
        {
            return View();
        }
        public ActionResult Unauthorized()
        {
            return View();
        }

        [UserAuthorize]
        public ActionResult ResetPassword()
        {
            return View();
        }

        /// <summary>
        /// 验证码图片生成
        /// </summary>
        /// <returns></returns>
        public FileResult VerificationCode()
        {
            var vc = new FortRun.Lib.Util.VerificationCode();
            System.IO.MemoryStream ms = vc.CreateCheckCodeImage();
            byte[] bytes = ms.ToArray();
            return File(bytes, @"image/gif");
        }

        /// <summary>
        /// ajax 验证验证码
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult CheckVerificationCode(string code)
        {
            return Json(new JsonData { success = HttpContext.Session != null && code == HttpContext.Session["VerificationCode"] as string });
        }
        [HttpPost]
        public JsonResult DoLogin(string memName, string memPwd, string memVerifi, string language)
        {
            var loginsuccess = false;
            var message = "";
            if (!string.IsNullOrEmpty(memName) && !string.IsNullOrEmpty(memPwd))
            {
                language = !string.IsNullOrEmpty(language) ? language : "zh-CN";
                var msg = "";
                if (memVerifi == null || memVerifi != "not-need")
                {
                    //使用验证码
                    var lh = new LoginHelper(memName, memPwd, memVerifi);
                    loginsuccess = lh.CheckLogin(language, ref msg);
                }
                else
                {
                    //不使用验证码
                    var lh = new LoginHelper(memName, memPwd);
                    loginsuccess = lh.CheckLogin(language, ref msg);
                }
                message = msg;
            }
            var jsonData = new JsonData { success = loginsuccess, message = message };
            //非纯JSON在IE9下被当成文件提示下载，将ContentType修改为 "text/plain"可解决问题
            return Json(jsonData, "text/plain");
        }

        [HttpPost]
        public JsonResult CheckPassword(string pwd)
        {
            var jsonData = new JsonData { success = FortRun.Lib.Util.MD5.MD5Encrypt(pwd, 32) == ViewBag.Password };
            return Json(jsonData);
        }

        [HttpPost]
        public JsonResult ResetPassword(string oldPwd, string newPwd)
        {
            var bResetPwd = false;
            var bop = new LoginHelper(oldPwd).CheckPasswrod(ViewBag.Guid);
            if (bop)
            {
                if (!string.IsNullOrEmpty(newPwd) && newPwd.Length > 5)
                {
                    bResetPwd = new LoginHelper(newPwd).ResetPassword(ViewBag.Guid);
                }
                else
                {
                    bResetPwd = false;
                }
            }
            var jsonData = new JsonData { success = bResetPwd };
            return Json(jsonData);
        }

        [HttpPost]
        public JsonResult ClearUserCache(string guid)
        {
            new LoginHelper().Logout(guid);
            var jsonData = new JsonData { success = true };
            return Json(jsonData);
        }
    }
}
