using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    public class DesktopEnum
    {
        /// <summary>
        /// 界面窗体是否最大化
        /// </summary>
        public enum IsMax
        {
            Minimize,
            Maximize
        }
        /// <summary>
        /// 应用图标展示在哪
        /// </summary>
        public enum AppRenderTo
        {
            appPage_0,
            appPage_1,
            appPage_2,
            appPage_3,
            appPage_4,
            appPage_5,
            dockBar
        }
        public enum AppCanResize
        {
            No,
            Yes
        }
        public enum AppCanMaximize
        {
            No,
            Yes
        }
    }
}