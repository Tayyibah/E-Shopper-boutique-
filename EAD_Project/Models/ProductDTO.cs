﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EAD_Project.Models
{
    public class ProductDTO
    {

        public int CommentID { get; set; }
        public int UserID { get; set; }
        public int ProductID { get; set; }
        public String CommentText { get; set; }

        public DateTime CommentOn { get; set; }

        public String UserName { get; set; }

        public String PictureName { get; set; }

        public String CommentOnStr
        {
            get
            {
                return CommentOn.ToString("dd-MM-yyyy HH:MM:ss");
            }
        }
    }
}
