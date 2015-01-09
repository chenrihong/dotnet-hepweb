using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using FortRun.Model;

namespace FortRun.BLL
{
    public class ResourceHelper
    {
        public List<ResourceModel> GetResourceList()
        {
            var list = new List<ResourceModel>();
            for (int i = 1; i < 3; i++)
            {
                var model = new ResourceModel
                                {
                                    resID = i.ToString(CultureInfo.InvariantCulture),
                                    resName = i == 1 ? "撤消消费" : "调整金额",
                                    resCategory = "类别" + i.ToString(CultureInfo.InvariantCulture),
                                    resSystem = "HEP后台",
                                    resScope = "门店",
                                    resStatus = "on"
                                };

                list.Add(model);
            }
            return list;
        }
    }
}