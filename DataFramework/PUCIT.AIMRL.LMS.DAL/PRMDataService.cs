using System;
using System.Collections.Generic;
using System.Linq;

using System.Data.SqlClient;
using System.Data.Entity.Validation;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using PUCIT.AIMRL.LMS.DAL;
using PUCIT.AIMRL.LMS.Entities;
using PUCIT.AIMRL.LMS.Entities.DBEntities;
using System.Data.Common;
using System.Threading.Tasks;
using System.Data.Entity.Migrations;
namespace PUCIT.AIMRL.LMS.DAL
{
    public class PRMDataService
    {
        public static TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");

        //public PRMDataService()
        //{
        //    Database.SetInitializer<PRMDataContext>(null);
        //}

        public BIMemberSearchResult MemSearch(string member)
        {
            using (var ctx = new PRMDataContext())
            {
                BIMemberSearchResult result = new Entities.DBEntities.BIMemberSearchResult();
                string query = "execute sec.MemSearchForIssueBook @0";
                var args = new DbParameter[] {
                        new SqlParameter { ParameterName = "@0", Value = member}


                    };

                result = ctx.Database.SqlQuery<BIMemberSearchResult>(query, args).FirstOrDefault();
                return result;
            }
        }
    }
}
