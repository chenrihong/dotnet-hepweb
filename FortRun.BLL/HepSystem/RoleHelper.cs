using System;
using System.Collections.Generic;
using FortRun.Model;

namespace FortRun.BLL.HepSystem
{
    public class RoleHelper
    {
        public List<SystemRoleModel> GetRoleList()
        {
            try
            {
                var list = new List<SystemRoleModel>();
                var model = new SystemRoleModel
                                {
                                    roleId = 10001,
                                    roleName = "平台管理",
                                    roleSubSystem = "HEP后台",
                                    roleLevel = "平台级",
                                    roleStatus = true
                                };
                list.Add(model);

                model = new SystemRoleModel
                            {
                                roleId = 10002,
                                roleName = "集团经理",
                                roleSubSystem = "HEP后台",
                                roleLevel = "集团级",
                                roleStatus = true
                            };
                list.Add(model);

                model = new SystemRoleModel
                            {
                                roleId = 10003,
                                roleName = "门让店长",
                                roleSubSystem = "HEP后台",
                                roleLevel = "门店级",
                                roleStatus = true
                            };
                list.Add(model);
                return list;
            }
            catch (Exception ex)
            {
                NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
                logger.Error(ex.Message);
            }
            return null;
        }
    }
}