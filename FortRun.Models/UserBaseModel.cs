using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    /// <summary>
    /// 会员实体
    /// </summary>
    public class UserBaseModel
    {
        public string memID { get; set; }
        public string memName { get; set; }
        public string memPwd { get; set; }
        public string memSex { get; set; }
        public string memStatus { get; set; }
        public string memIdNum { get; set; }
        public string memCellPhone { get; set; }
        public string memRegisterTime { get; set; }
    }
}