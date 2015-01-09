using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    /// <summary>
    /// 用户桌面设置实体
    /// </summary>
    public class DeskModel
    {
        public string id
        {
            get { return "CloudDeskTop"; }
        }

        public UserBasicModel userInfo { get; set; }

        /// <summary>
        /// 应用集合（桌面上的小图标集合）
        /// </summary>
        public List<AppItem> appArray { get; set; }
        /// <summary>
        /// 应用集合（任务栏上的图标集合）
        /// </summary>
        public List<AppItem> appItem { get; set; }

        private string _userset;
        /// <summary>
        /// 用户设置（背景图等） [json应存数据库]
        /// </summary>
        public string userSet
        {
            get
            {
                return @"{'theme':{'bgImg':'" + _userset + "','cssFile':'/Content/webdesk/css/ThemeCss/Fluorescence.css','bgImgPos':'repeat'},'dockBar':{'pos':'left'},'navBar':{'index':0},'shortCut':{'icoType':'big'},'im':{'headSize':'1'}}";
            }
            set { _userset = value; }
        }

    }
}