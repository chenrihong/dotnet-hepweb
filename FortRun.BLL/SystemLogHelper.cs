using System.IO;
using System.Text;
using FortRun.Model;

namespace FortRun.BLL
{
    public class SystemLogHelper
    {
        private string _filepath = "~/Log/";

        public string GetLogTxt(EnumData.LogLevel strLevel, string datetime)
        {
            switch (strLevel)
            {
                case EnumData.LogLevel.Debug:
                    _filepath += "Debug/" + datetime + "/Debug.txt";
                    break;
            }
            var reader = new StreamReader(_filepath, Encoding.Default);
            return reader.ReadToEnd();
        }
    }
}