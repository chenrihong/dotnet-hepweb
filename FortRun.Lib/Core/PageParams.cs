﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Lib.Core
{
    /// <summary>
    /// 分页参数
    /// </summary>
    public class PageParams
    {
        public string TableName { get; set; }
        public string PrimaryKeyName { get; set; }
        public string WhereEx { get; set; }

        private string _fields;
        public string Fields
        {
            get { return _fields; }
            set { _fields = !string.IsNullOrEmpty(value) ? value : "*"; }
        }

        private int _pageindex;
        public int PageIndex
        {
            get { return _pageindex; }
            set { _pageindex = value > 0 ? value : 1; }
        }

        private int _pagesize;
        public int PageSize
        {
            get { return _pagesize; }
            set { _pagesize = value > 0 ? value : 20; }
        }
    }
}