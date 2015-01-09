using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    /// <summary>
    /// 返回ajax请求的数据
    /// </summary>
    public class JsonData
    {
        public string message { get; set; }
        public bool success { get; set; }
        public object rows { get; set; }
        public object otherdata { get; set; }
        public int total { get; set; }
    }
}