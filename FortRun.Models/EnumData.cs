using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FortRun.Model
{
    public class EnumData
    {
        public enum LogLevel
        {
            Info,
            Trace,
            Debug,
            Error,
            Fatal,
            Warn
        }
    }
}