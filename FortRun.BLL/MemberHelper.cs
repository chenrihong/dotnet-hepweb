using System;
using System.Collections.Generic;
using FortRun.Model;

namespace FortRun.BLL
{
    public class MemberHelper
    {
        public List<UserBaseModel> GetMemberList()
        {
            var list = new List<UserBaseModel>();
            Random ro = null;
            for (int i = 0; i < 99; i++)
            {
                var model = new UserBaseModel();

                model.memID = "2013000" + i.ToString();

                string temp = "0000" + i.ToString();
                temp = temp.Substring(temp.Length - 4, 4);
                model.memName = "member" + temp;
                ro = new Random(i);
                model.memIdNum = "310210……" + ro.Next(1000, 9999);
                ro = new Random(i);
                model.memCellPhone = "158……" + ro.Next(1000, 9999).ToString();
                model.memRegisterTime = DateTime.Now.ToString("yyyy-MM-dd");
                ro = new Random(i);
                model.memSex = ro.Next(1000, 9999)%2 == 0 ? "男" : "女";
                model.memStatus = "正常";

                list.Add(model);
            }

            NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
            logger.Info("加载了成员");
            logger.Error("假设的错误");

            return list;
        }
    }
}