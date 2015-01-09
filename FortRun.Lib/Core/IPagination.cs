using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
namespace FortRun.Lib.Core
{
    public interface IPagination
    {
        DataTable GetPage(int index);

        int PageCount { get; }

    }
}