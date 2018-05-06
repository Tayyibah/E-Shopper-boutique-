using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace PUCIT.AIMRL.LMS.Entities.DBEntities
{
//    [Table("sec.Issue")]


    public class BIMemberSearchResult
    {
        public string Picture { get; set; }
        public long? LibID { get; set; }
        public int Days { get; set; }

    }
    public class Issue
    {
        [Key]
        public long ID { get; set; }
        public long Acc_No { get; set; }
        public DateTime Issue_Date { get; set; }
        public DateTime Due_Date { get; set; }
        public long Lib_Mem_Id { get; set; }
        public DateTime Return_Date { get; set; }
        //[NotMapped]
        public string MemberID { get; set; }
    }
    public class DefaulterToBeObj
    {
        public string Title { get; set; }
        public string Email { get; set; }
        public DateTime Due_Date { get; set; }

    }
}
