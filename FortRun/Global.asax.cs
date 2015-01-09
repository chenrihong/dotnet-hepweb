using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace FortRun
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{guid}", // URL with parameters
                new { controller = "Home", action = "Index", guid = UrlParameter.Optional } // Parameter defaults
            );

            routes.MapRoute(
               "fr_henrh",                                           // Route name
               "{controller}/{action}/{language}/{guid}",                            // URL with parameters
               new { controller = "Home", action = "Index", language = "zh-CN", guid = UrlParameter.Optional }  // Parameter defaults
           );
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            //@fr_chenrh
            //log4net.Config.XmlConfigurator.Configure();
        }
    }
}