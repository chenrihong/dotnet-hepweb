using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FortRun.Model;
namespace FortRun.Lib.Core
{
    public class UserOnlineModel
    {
        public Guid Guid { get; set; }

        public string Language { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }

        public DateTime LoginTime { get; set; }

        public DateTime ActionTime { get; set; }

        public string ActionPath { get; set; }

        public UserBaseModel UserBaseInfo { get; set; }

        public SystemRoleModel UserRoleInfo { get; set; }
    }
}