using System;
using FortRun.Lib.Core;

namespace FortRun.BLL.HepSystem
{
    public class Account : IAccount
    {
        public Account(string guid)
        {
            MyGuid = guid.ToGuid();
        }
        private Guid MyGuid { get; set; }
        public string Language
        {
            get { return CurrentUserInfo.Language; }
        }
        public UserOnlineModel CurrentUserInfo
        {
            get
            {
                return UserOnline.GetOnlineUserByGuid(MyGuid);
            }
        }
        public string UserId
        {
            get { return CurrentUserInfo.UserId; }
        }
        public string UserName
        {
            get { return CurrentUserInfo.UserName; }
        }
        public string UserPassword
        {
            get { return CurrentUserInfo.UserPassword; }
        }
        public bool IsLogon
        {
            get { return CurrentUserInfo != null; }
        }
        public string ActionPath
        {
            get
            {
                return CurrentUserInfo.ActionPath;
            }
        }
        public DateTime ActionTime
        {
            get
            {
                return CurrentUserInfo.ActionTime;
            }
        }
        public DateTime LoginTime
        {
            get
            {
                return CurrentUserInfo.LoginTime;
            }
        }
    }
}