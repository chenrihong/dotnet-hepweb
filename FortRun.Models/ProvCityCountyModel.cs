using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    /// <summary>
    /// 省市县实体
    /// </summary>
    public partial class ProvCityCountyModel
    {
        public string Province { get; set; }
        public string City { get; set; }
        public string County { get; set; }
    }
}