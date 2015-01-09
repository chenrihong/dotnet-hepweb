using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    /// <summary>
    /// 单个酒店
    /// </summary>
    public class HotelModel : ProvCityCountyModel
    {
        /// <summary>
        /// 酒店ID
        /// </summary>
        public int HotelID { get; set; }
        /// <summary>
        /// 酒店名称
        /// </summary>
        public string HotelName { get; set; }
        /// <summary>
        /// 酒店使用账号
        /// </summary>
        public string HotelAccount { get; set; }
        /// <summary>
        /// 酒店使用账号使用状态
        /// </summary>
        public string HotelAccStatus { get; set; }
        /// <summary>
        /// 酒店HEP终端数
        /// </summary>
        public int HotelHepNum { get; set; }
    }
}