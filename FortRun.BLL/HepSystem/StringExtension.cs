using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.BLL.HepSystem
{
    public static class StringExtension
    {
        /// <summary>
        /// 将GUID字符串转化成Guid类型数据
        /// </summary>
        /// <param name="val"></param>
        /// <returns></returns>
        public static Guid ToGuid(this string val)
        {
            Guid guid;
            if (Guid.TryParse(val, out guid))
            {
                return guid;
            }
            return new Guid();
        }
    }
}