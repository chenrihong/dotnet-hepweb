using System;
using System.Collections.Generic;
using FortRun.Lib.Core;
using FortRun.Model;

namespace FortRun.BLL.HepSystem
{
    /// <summary>
    /// 在线缓存数据操作类
    /// </summary>
    public class OnlineHelper
    {
        private Guid _guid;

        /// <summary>
        /// 返回用户在线信息的集合
        /// </summary>
        /// <returns></returns>
        public List<FortRun.Lib.Core.UserOnlineModel> GetOnline()
        {
            return FortRun.Lib.Core.UserOnline.OnlineList;
        }

        /// <summary>
        /// 初始登录时缓存初始数据
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="userPwd">真实验证后，可不要此参数</param>
        /// <param name="language"> </param>
        public Guid CacheUserData(string userId, string userPwd, string language)
        {
            //模拟数据
            var model = new UserOnlineModel
            {
                Guid = Guid.NewGuid(),
                Language = language,
                LoginTime = DateTime.Now,
                UserId = userId,
                UserPassword = userPwd,
                UserName = "陈日红",
                ActionTime = DateTime.Now,
                ActionPath = "/Login/Login",
                UserBaseInfo = new UserBaseModel
                {
                    memCellPhone = "15888888888",
                    memPwd = userPwd,
                    memID = userId,
                    memIdNum = "362422199011088111",
                    memName = "陈日红",
                    memRegisterTime =
                        DateTime.Now.ToString(
                            "yyyy-MM-dd"),
                    memSex = "男",
                    memStatus = "OK"
                }
            };

            UserOnline.AddOnlineUser(model);

            return model.Guid;
        }

        /// <summary>
        /// 更新最后操作时间和最后操作路径
        /// </summary>
        /// <param name="guid"></param>
        /// <param name="path"></param>
        public void UpdateUserLastAction(string guid, string path)
        {
            if (Guid.TryParse(guid, out _guid))
            {
                IAccount account = new Account(guid);
                if (account.IsLogon)
                {
                    account.CurrentUserInfo.ActionTime = DateTime.Now;
                    account.CurrentUserInfo.ActionPath = path.Replace(guid, "[guid]");
                    UserOnline.UpdateOnlineUser(_guid, account.CurrentUserInfo);
                }
            }
        }

        /// <summary>
        /// 修改密码后，更新缓存
        /// </summary>
        /// <param name="guid"></param>
        /// <param name="pwd"> </param>
        public void UpdateUserPassword(string guid, string pwd)
        {
            if (!string.IsNullOrEmpty(pwd))
            {
                IAccount account = new Account(guid);
                if (account.IsLogon)
                {
                    account.CurrentUserInfo.UserPassword = pwd;
                    UserOnline.UpdateOnlineUser(_guid, account.CurrentUserInfo);
                }
            }
        }

        /// <summary>
        /// 修改国家语言后，更新缓存
        /// </summary>
        /// <param name="guid"></param>
        /// <param name="lang"> </param>
        public void UpdateLanguage(string guid, string lang)
        {
            if (!string.IsNullOrEmpty(lang))
            {
                IAccount account = new Account(guid);
                if (account.IsLogon)
                {
                    account.CurrentUserInfo.Language = lang;
                    UserOnline.UpdateOnlineUser(_guid, account.CurrentUserInfo);
                }
            }
        }

        /// <summary>
        /// 根据guid删除缓存数据
        /// </summary>
        /// <param name="guid"></param>
        public void RemoveUserInfoByGuid(string guid)
        {
            if (Guid.TryParse(guid, out _guid))
            {
                UserOnline.RemoveOnlineUser(_guid);
            }
        }

        /// <summary>
        /// 通过guid查找缓存数据
        /// </summary>
        /// <param name="guid"></param>
        /// <returns></returns>
        public UserOnlineModel GetUserInfoByGuid(string guid)
        {
            if (Guid.TryParse(guid, out _guid))
            {
                return UserOnline.GetOnlineUserByGuid(_guid);
            }
            return null;
        }

        /// <summary>
        /// 通过UserId查找缓存数据
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public UserOnlineModel GetUserInfoByUserId(string userid)
        {
            return UserOnline.GetOnlineUserByUserId(userid);
        }
    }
}