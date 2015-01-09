using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FortRun.Model;

namespace FortRun.BLL.Hotel
{
    public class HotelHelper
    {
        public List<HotelModel> GetHotelList()
        {
            var list = new List<HotelModel>();
            for (var i = 1; i < 3; i++)
            {
                var model = new HotelModel
                {
                    Province = "上海市",
                    City = "上海市",
                    County = "杨浦区",
                    HotelID = i,
                    HotelName = i == 1 ? "如家酒店國定路店" : "7天連鎖黃興路店",
                    HotelAccount = i == 1 ? "rujia-guoding" : "sevenday-hangxing",
                    HotelAccStatus = "on",
                    HotelHepNum = i == 1 ? 22 : 13
                };
                list.Add(model);
            }
            return list;
        }
    }
}