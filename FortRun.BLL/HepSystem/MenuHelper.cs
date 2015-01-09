using System;
using System.Collections.Generic;
using System.Linq;
using FortRun.Model;
namespace FortRun.BLL.HepSystem
{
    public class MenuHelper
    {
        private List<JsonTree> _list = null;
        private Guid TGuid { get; set; }
        public MenuHelper(string guid)
        {
            TGuid = guid.ToGuid();
        }
        public List<JsonTree> GetMenu()
        {
            _list = new List<JsonTree>();
            var n1st = new string[] { "平台运维", "设备管理", "酒店设置", "系统设置" };
            var n2nd_1 = new string[] { "会员管理", "行为分析", "广告管理", "通知公告" };
            var n2nd_1_href = new string[] { "/Main/DataGridDemo/" + TGuid, "#", "#", "#" };
            List<JsonTree> children1 = new List<JsonTree>();
            for (int i = 0; i < n2nd_1.Length; i++)
            {
                var m1 = new JsonTree
                             {
                                 children = null,
                                 id = 100 + i,
                                 text = n2nd_1[i],
                                 url = n2nd_1_href[i]
                             };
                children1.Add(m1);
            }
            var n2nd_2 = new string[] { "设备列表", "设备监控", "设备配置", "图标配置", "语言配置" };
            var n2nd_2_href = new string[] { "#", "#", "#", "#", "#" };
            List<JsonTree> children2 = new List<JsonTree>();
            for (int i = 0; i < n2nd_2.Length; i++)
            {
                var m1 = new JsonTree
                {
                    children = null,
                    id = 200 + i,
                    text = n2nd_2[i],
                    url = n2nd_2_href[i],
                    ischecked = true
                };
                children2.Add(m1);
            }
            var n2nd_3 = new string[] { "集团管理", "酒店管理" };
            var n2nd_3_href = new string[] { "/Group/Index/" + TGuid, "/Hotel/Index/" + TGuid };
            List<JsonTree> children3 = new List<JsonTree>();
            for (int i = 0; i < n2nd_3.Length; i++)
            {
                var m1 = new JsonTree
                {
                    children = null,
                    id = 300 + i,
                    text = n2nd_3[i],
                    url = n2nd_3_href[i],
                    ischecked = true
                };
                children3.Add(m1);
            }
            var n2nd_4 = new string[] { "账号管理", "角色设置", "菜单设置", "资源设置", "基础数据", "修改密码", "在线用户" };
            var n2nd_4_href = new string[] { "/Main/DataGridDemo/" + TGuid, "/Role/Index/" + TGuid, "/Menu/Index/" + TGuid, "/Resource/Index/" + TGuid, "#", "/Login/ResetPassword/" + TGuid, "/Main/Online/" + TGuid };

            List<JsonTree> children4 = new List<JsonTree>();
            for (int i = 0; i < n2nd_4.Length; i++)
            {
                var m1 = new JsonTree
                {
                    children = null,

                    id = 400 + i,
                    text = n2nd_4[i],
                    url = n2nd_4_href[i]
                };
                children4.Add(m1);
            }
            //并行for循环
            System.Threading.Tasks.Parallel.For(0, n1st.Count(), (i) =>
            {
                var m = new JsonTree
                {
                    id = i + 1,
                    text = n1st[i],
                    url = "#",
                    children = null
                };
                _list.Add(m);
            });

            for (int i = 0; i < _list.Count; i++)
            {
                switch (i + 1)
                {
                    case 1:
                        _list[i].children = children1;
                        break;
                    case 2:
                        _list[i].children = children2;
                        break;
                    case 3:
                        _list[i].children = children3;
                        break;
                    case 4:
                        _list[i].children = children4;
                        break;
                }
            }

            return _list;
        }


    }
}