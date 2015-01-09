using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    /// <summary>
    /// 酒店设置 - 集团管理
    /// </summary>
    public class GroupModel : ProvCityCountyModel
    {
        /// <summary>
        /// 集团ID
        /// </summary>
        public int GroupID { get; set; }
        /// <summary>
        /// 集团名称
        /// </summary>
        public string GroupName { get; set; }
        /// <summary>
        /// 集团使用账号
        /// </summary>
        public string GroupAccount { get; set; }
        /// <summary>
        /// 集团使用账号使用状态
        /// </summary>
        public string GroupAccStatus { get; set; }
        /// <summary>
        /// 集团下属酒店数量
        /// </summary>
        public int GroupHotelNum { get; set; }
    }
}