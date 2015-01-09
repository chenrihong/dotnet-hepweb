using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    public class AppItem
    {
        public string AppID { get; set; }
        public string AppCategoryID { get; set; }
        public string AppName { get; set; }
        public string AppUrl { get; set; }
        public string AppIco { get; set; }
        public int AppFormWidth { get; set; }
        public int AppFormHeight { get; set; }
        public int AppCanResize { get; set; }
        public int AppCanMaximize { get; set; }
        /// <summary>
        /// 1 maximize / 0 minimize
        /// </summary>
        public int IsMax { get; set; }
        public string renderTo { get; set; }
    }
}