using System.Collections.Generic;
using System.Web;
using System.Web.Routing;
using FortRun.BLL.HepSystem;

namespace FortRun.Web.Controllers
{
    public static class StringExtensions
    {
        //使用自定义XML文件来处理多国语言问题

        /// <summary>
        /// [繁體中文]
        /// </summary>
        internal static Dictionary<string, string> Dictionary_zh_TW { get; set; }
        /// <summary>
        /// 简体中文
        /// </summary>
        internal static Dictionary<string, string> Dictionary_zh_CN { get; set; }
        /// <summary>
        /// English
        /// </summary>
        internal static Dictionary<string, string> Dictionary_en { get; set; }
        /// <summary>
        /// 将指定字符转化为国际化数据
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string Toi18n(this string value)
        {
            var i18n = string.Empty;

            var rd = RouteTable.Routes.GetRouteData(new HttpContextWrapper(System.Web.HttpContext.Current));
            if (rd != null && rd.Values.Count > 0)
            {
                var guid = rd.Values["guid"] as string;
                IAccount account = new Account(guid);
                if (account.IsLogon)
                {
                    switch (account.Language)
                    {
                        case "zh-TW":
                            if (Dictionary_zh_TW == null)
                            {
                                Dictionary_zh_TW = CacheLangXml.CacheXml("zh-TW");
                            }
                            i18n = Dictionary_zh_TW.ContainsKey(value) ? Dictionary_zh_TW[value] : "";
                            break;
                        case "en":
                            if (Dictionary_en == null)
                            {
                                Dictionary_en = CacheLangXml.CacheXml("en");
                            }
                            i18n = Dictionary_en.ContainsKey(value) ? Dictionary_en[value] : "";
                            break;
                        default:
                            if (Dictionary_zh_CN == null)
                            {
                                Dictionary_zh_CN = CacheLangXml.CacheXml("zh-CN");
                            }
                            i18n = Dictionary_zh_CN.ContainsKey(value) ? Dictionary_zh_CN[value] : "";
                            break;
                    }
                }
                return i18n;
            }
            else
            {
                NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
                logger.Error("登录信息不完整，语言包加载失败");
                return "";
            }
        }
    }
}