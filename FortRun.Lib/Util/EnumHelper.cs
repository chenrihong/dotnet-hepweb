using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using FortRun.Model;

namespace FortRun.Lib.Util
{
    /// <summary>
    /// 用法：EnumHelper<枚举名> em = new EnumHelper<枚举名>();
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public sealed class EnumHelper<T>
    {
        /// <summary>
        /// 将枚举数据转化列表数据
        /// </summary>
        /// <returns></returns>
        public List<KeyValueEntity> GetList()
        {
            var list = new List<KeyValueEntity>();
            MemberInfo[] members = typeof (T).GetMembers();
            foreach (MemberInfo member in members)
            {
                object[] descriptionAttributes = member.GetCustomAttributes(typeof (DescriptionAttribute), true);
                if (descriptionAttributes.Length > 0)
                {
                    string description = ((DescriptionAttribute) descriptionAttributes[0]).Description;
                    string value = Convert.ToInt32(Enum.Parse(member.ReflectedType, member.Name)).ToString();
                    list.Add(new KeyValueEntity {Value = value, Key = description});
                }
            }
            return list;
        }

        public string GetDescription(int? value)
        {
            if (value.HasValue)
            {
                List<KeyValueEntity> list = GetList();
                KeyValueEntity kv = list.Find(t => t.Value == value.ToString());
                return kv.Key;
            }
            else
            {
                return String.Empty;
            }
        }

        public int GetValue(string k)
        {
            if (k != null)
            {
                List<KeyValueEntity> list = GetList();
                KeyValueEntity kv = list.Find(t => t.Key == k);
                return int.Parse(kv.Value);
            }
            else
            {
                return int.Parse(String.Empty);
            }
        }
    }
}