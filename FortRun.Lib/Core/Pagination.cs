﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FortRun.Model;
using System.Data;
namespace FortRun.Lib.Core
{
    public class Pagination : IPagination
    {
        public int PageCount { get; set; }

        public DataTable GetPage(int nPage)
        {
            if (Params == null)
            {
                throw new System.ApplicationException("分页参数错误");
            }else
            {
                int limit = Params.PageSize;
                int start = Params.PageIndex;
                //do pagination
            }
            this.PageCount = 10;
            return new DataTable();
        }

        public PageParams Params
        {
            set;
            get;
        }
    }
}