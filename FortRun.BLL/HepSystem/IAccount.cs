using System;
namespace FortRun.BLL.HepSystem
{
    /// <summary>
    /// 登录用户账号信息接口
    /// </summary>
    public interface IAccount
    {
        string UserId { get; }
        string Language { get; }
        string UserName { get; }
        string UserPassword { get; }
        bool IsLogon { get; }
        string ActionPath { get; }
        DateTime ActionTime { get; }
        DateTime LoginTime { get; }
        FortRun.Lib.Core.UserOnlineModel CurrentUserInfo { get; }
    }
}