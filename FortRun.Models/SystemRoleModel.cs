using System;
using System.Collections.Generic;
namespace FortRun.Model
{
    public class SystemRoleModel
    {
        /// <summary>
        /// 角色ID
        /// </summary>
        public int roleId { get; set; }
        /// <summary>
        /// 角色名称
        /// </summary>
        public string roleName { get; set; }
        /// <summary>
        /// 角色级别
        /// </summary>
        public string roleLevel { get; set; }
        /// <summary>
        /// 角色状态
        /// </summary>
        public bool roleStatus { get; set; }
        /// <summary>
        /// 所属子系统
        /// </summary>
        public string roleSubSystem { get; set; }
    }
}