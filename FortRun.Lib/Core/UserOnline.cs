using System;
using System.Collections.Generic;
using System.Linq;
namespace FortRun.Lib.Core
{
    public static class UserOnline
    {
        public static List<UserOnlineModel> OnlineList { get; set; }

        /// <summary>
        /// 依据guid删除用户在线记录
        /// </summary>
        /// <param name="guid"></param>
        public static void RemoveOnlineUser(Guid guid)
        {
            if (OnlineList != null)
            {
                var list = OnlineList.FindAll(t => t.Guid == guid);
                if (list.Count > 0)
                {
                    lock (OnlineList)
                    {
                        if (OnlineList != null)
                        {
                            OnlineList.RemoveAll(t => t.Guid == guid);
                        }
                    }
                }
            }
        }
        /// <summary>
        /// 依据guid更新缓存数据
        /// </summary>
        /// <param name="guid"></param>
        /// <param name="model"></param>
        public static void UpdateOnlineUser(Guid guid, UserOnlineModel model)
        {
            if (OnlineList != null)
            {
                var list = OnlineList.FindAll(t => t.Guid == guid);
                if (list.Count > 0)
                {
                    lock (OnlineList)
                    {
                        if (OnlineList != null)
                        {
                            RemoveOnlineUser(guid);
                            AddOnlineUser(model);
                        }
                    }
                }
            }
        }

        /// <summary>
        /// 添加一位用户在线信息
        /// </summary>
        /// <param name="model"></param>
        public static void AddOnlineUser(UserOnlineModel model)
        {
            if (OnlineList != null)
            {
                lock (OnlineList)
                {
                    if (OnlineList != null)
                    {
                        OnlineList.RemoveAll(t => t.Guid == model.Guid || t.UserId == model.UserId);
                        OnlineList.Add(model);
                    }
                }
            }
            else
            {
                OnlineList = new List<UserOnlineModel> { model };
            }
        }

        public static UserOnlineModel GetOnlineUserByGuid(Guid guid)
        {
            if (OnlineList != null)
            {
                lock (OnlineList)
                {
                    if (OnlineList != null)
                    {
                        return OnlineList.FirstOrDefault(t => t.Guid == guid);
                    }
                }
            }
            return null;
        }

        public static UserOnlineModel GetOnlineUserByUserId(string userid)
        {
            if (OnlineList != null)
            {
                lock (OnlineList)
                {
                    if (OnlineList != null)
                    {
                        return OnlineList.FirstOrDefault(t => t.UserId == userid);
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// 删除登录超时用户(30minutes)
        /// </summary>
        public static void RemoveOuttimeOnline()
        {
            if (OnlineList != null)
            {
                lock (OnlineList)
                {
                    if (OnlineList != null)
                    {
                        OnlineList.RemoveAll(t => t.ActionTime.AddMinutes(30) < DateTime.Now);
                    }
                }
            }
        }
    }
}