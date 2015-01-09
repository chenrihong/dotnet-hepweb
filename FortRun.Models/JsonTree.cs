using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    /// <summary>
    /// 专门针对 jQuery EasuUI tree 组件的数据格式
    /// </summary>
    public class JsonTree
    {
        public int id { get; set; }
        public string text { get; set; }

        private string _state;
        /// <summary>
        ///  closed / open 只有当有子节点是才能使用"closed"
        /// </summary>
        public string state
        {
            get { return !string.IsNullOrEmpty(_state) ? _state : "open"; }
            set { _state = value; }
        }
        /// <summary>
        /// icon-add
        /// </summary>
        public string iconCls { get; set; }

        public bool ischecked { get; set; }
        /// <summary>
        /// fr_chenrh:extensions column
        /// </summary>
        public string url { get; set; }
        /// <summary>
        /// jQuery easyUI support extension attributes
        /// </summary>
        public object attributes { get; set; }
        public List<JsonTree> children { get; set; }
    }
}