using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    public class UserBasicModel
    {
        public string guid { get; set; }
        public string ticket { get; set; }

        public string userID { get; set; }
        public string userName { get; set; }

        public string userPhoto { get; set; }
        public string userLoginName { get; set; }
    }
}