using System;
using FortRun.BLL.HepSystem;

namespace FortRun.BLL
{
    public class LoginHelper
    {
        private string UserName { get; set; }
        private string UserPwd { get; set; }
        private string VerifiCode { get; set; }

        public LoginHelper() { }
        public LoginHelper(string userpwd)
        {
            UserPwd = FortRun.Lib.Util.MD5.MD5Encrypt(userpwd, 32);
        }
        public LoginHelper(string username, string userpwd)
        {
            UserName = username;
            UserPwd = FortRun.Lib.Util.MD5.MD5Encrypt(userpwd, 32);
        }
        public LoginHelper(string username, string userpwd, string verificode)
        {
            UserName = username;
            UserPwd = FortRun.Lib.Util.MD5.MD5Encrypt(userpwd, 32);
            VerifiCode = verificode;
        }

        /// <summary>
        /// 验证登录
        /// </summary>
        /// <param name="language">語言設置 </param>
        /// <param name="msg">返回登录验证信息</param>
        /// <returns></returns>
        public bool CheckLogin(string language, ref string msg)
        {
            if (msg == null) throw new ArgumentNullException("msg");
            if (!string.IsNullOrEmpty(VerifiCode))
            {
                var verificode = System.Web.HttpContext.Current.Session["VerificationCode"] as string;
                if (verificode != VerifiCode)
                {
                    msg = "验证码不匹配";
                    return false;
                }
            }
            //do some check

            if (UserName.IndexOf("fortrun", System.StringComparison.Ordinal) == -1)
            {
                msg = "用户名错误";
                return false;
            }

            msg = CacheUserData(language);
            return true;
        }
        /// <summary>
        /// 登录时缓存用户个人信息
        /// </summary>
        /// <returns>返回GUID</returns>
        public string CacheUserData(string language)
        {
            Guid guid = new FortRun.BLL.HepSystem.OnlineHelper().CacheUserData(UserName, UserPwd, language);
            return guid.ToString();
        }

        /// <summary>
        /// 验证密码，修改密码时会有用
        /// </summary>
        /// <returns></returns>
        public bool CheckPasswrod(string guid)
        {
            IAccount account = new Account(guid);
            if (account.IsLogon)
            {
                return string.Equals(UserPwd, account.UserPassword);
            }
            return false;
        }

        public bool ResetPassword(string guid)
        {
            //do reset password
            //  1、update service database
            //  2、update password cache
            var onlineHelper = new OnlineHelper();
            onlineHelper.UpdateUserPassword(guid, UserPwd);

            return true;
        }

        /// <summary>
        /// 用户登出
        ///  1、清除其在系统中的缓存信息
        ///  2、清除其所有会话信息
        /// </summary>
        /// <param name="guid"></param>
        public void Logout(string guid)
        {
            var onlineHelper = new OnlineHelper();
            onlineHelper.RemoveUserInfoByGuid(guid);

            System.Web.HttpContext.Current.Session.Abandon();
        }
    }
}