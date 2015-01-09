using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using FortRun.Model;

namespace FortRun.BLL.Hotel
{
    public class GroupHelper
    {
        public List<GroupModel> GetGroupList()
        {
            var list = new List<GroupModel>();
            for (var i = 1; i < 3; i++)
            {
                var model = new GroupModel
                                {
                                    Province = "上海市",
                                    City = "上海市",
                                    County = "杨浦区",
                                    GroupID = i,
                                    GroupName = i == 1 ? "汉庭连锁酒店" : "莫泰连锁酒店",
                                    GroupAccount = i == 1 ? "hating" : "motel",
                                    GroupAccStatus = "on",
                                    GroupHotelNum = i == 1 ? 1200 : 1000
                                };
                list.Add(model);
            }
            return list;
        }
    }
}