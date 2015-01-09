using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    /// <summary>
    /// 资源实体
    /// </summary>
    public class ResourceModel
    {
        public string resID { get; set; }
        public string resCategory { get; set; }
        public string resName { get; set; }
        public string resSystem { get; set; }
        public string resScope { get; set; }
        public string resStatus { get; set; }
    }
}