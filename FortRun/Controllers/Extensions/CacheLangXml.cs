using System;
using System.Collections.Generic;
using System.Configuration;
using System.Xml;

namespace FortRun.Web.Controllers
{
    /// <summary>
    /// 缓存多国语言配置文件
    /// </summary>
    public static class CacheLangXml
    {
        /// <summary>
        /// 委托实例
        /// </summary>
        /// <param name="languageName"></param>
        /// <returns></returns>
        public delegate Dictionary<string, string> XmlLang(string languageName);
        /// <summary>
        /// 匿名方法 anonymous 得到指定语种的xml缓存
        /// </summary>
        public static readonly XmlLang CacheXml = lang => GetI18NLang(lang);
        /// <summary>
        /// 读到xml文件并保存至Dictionary中
        /// </summary>
        /// <param name="language"></param>
        /// <returns></returns>
        private static Dictionary<string, string> GetI18NLang(string language)
        {
            var temp = new Dictionary<string, string>();
            var phypath = @LanguageXmlPath(language);
            phypath = System.Web.HttpContext.Current.Server.MapPath(phypath);
            var xpath = @LanguageXmlNode;
            XmlNodeList nodelist = XMLHelper.GetXmlNodeListByXpath(phypath, xpath);
            if (nodelist != null)
            {
                foreach (XmlNode node in nodelist)
                {
                    if (node.Attributes == null) continue;
                    if (!temp.ContainsKey(node.Attributes["Key"].Value))
                    {
                        temp.Add(node.Attributes["Key"].Value, node.Attributes["Value"].Value);
                    }
                }
            }
            return temp;
        }
        /// <summary>
        /// 语言包路径
        /// </summary>
        internal static string LanguageXmlNode
        {
            get { return ConfigurationManager.AppSettings["lang-node"]; }
        }
        /// <summary>
        /// 语言包内部节点
        /// </summary>
        internal static string LanguageXmlPath(string lang)
        {
            if (!string.IsNullOrEmpty(lang))
            {
                return ConfigurationManager.AppSettings[lang];
            }
            return ConfigurationManager.AppSettings["zh-CN"];
        }
    }
}