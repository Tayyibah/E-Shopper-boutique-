﻿using EAD_Project.DAL;
using EAD_Project.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.DAL
{
    public static class CommentDAO
    {
        //        public static int Save(CommentDTO dto)
        //        {
        //            String sqlQuery = "";

        //            sqlQuery = String.Format("INSERT INTO dbo.Comments(UserId,ProductId,CommentText,CommentOn) VALUES('{0}','{1}','{2}','{3}')",
        //                    dto.UserID, dto.ProductID, dto.CommentText, dto.CommentOn);

        //            using (DBHelper helper = new DBHelper())
        //            {
        //                return helper.ExecuteQuery(sqlQuery);
        //            }
        //        }


        //        public static CommentDTO GetCommentById(int pid)
        //        {

        //            var query = String.Format("Select * from dbo.Comments Where CommentId={0}", pid);

        //            using (DBHelper helper = new DBHelper())
        //            {
        //                var reader = helper.ExecuteReader(query);

        //                CommentDTO dto = null;

        //                if (reader.Read())
        //                {
        //                    dto = FillDTO(reader);
        //                }

        //                return dto;
        //            }
        //        }

        //        public static List<CommentDTO> GetAllComments()
        //        {
        //            using (DBHelper helper = new DBHelper())
        //            {
        //                //var query = @"Select q.CommentId,q.UserId,q.ProductId, q.CommentText, q.CommentOn, u.Name,u.PictureName From( 
        //                //            Select * ROW_NUMBER () OVER (PARTITION BY PRODUCTID ORDER BY CommentId DESC ) r
        //                //            from dbo.Comments q, dbo.Users u 
        //                //            where q.r<=2 and q.UserId = u.UserID";
        //                var query = @"Select q.CommentId,q.UserId,q.ProductId, q.CommentText, q.CommentOn, u.Name,u.PictureName 
        //                            from dbo.Comments q, dbo.Users u 
        //                            where q.UserId = u.UserID";

        //                var reader = helper.ExecuteReader(query);
        //                List<CommentDTO> list = new List<CommentDTO>();

        //                while (reader.Read())
        //                {
        //                    var dto = FillDTO(reader);
        //                    if (dto != null)
        //                    {
        //                        list.Add(dto);
        //                    }
        //                }

        //                return list;
        //            }
        //        }

        //        public static List<CommentDTO> GetTopComments(int topCount)
        //        {
        //            using (DBHelper helper = new DBHelper())
        //            {
        //                var query = String.Format(@"SELECT q.CommentId,q.UserId,q.ProductId, q.CommentText, q.CommentOn, u.Name,u.PictureName FROM (
        //                                    SELECT * ,ROW_NUMBER ( ) OVER ( PARTITION BY ProductID ORDER BY CommentId DESC) r
        //                                    FROM dbo.Comments) q, dbo.Users u
        //                                    WHERE q.r <= {0} and q.UserId = u.UserID", topCount);
        //                var reader = helper.ExecuteReader(query);
        //                List<CommentDTO> list = new List<CommentDTO>();

        //                while (reader.Read())
        //                {
        //                    var dto = FillDTO(reader);
        //                    if (dto != null)
        //                    {
        //                        list.Add(dto);
        //                    }
        //                }

        //                return list;
        //            }
        //        }
        //        private static CommentDTO FillDTO(SqlDataReader reader)
        //        {
        //            var dto = new CommentDTO();
        //            // dto.CommentID = reader.GetInt32(reader.GetOrdinal("CommentId"));
        //            dto.UserID = reader.GetInt32(reader.GetOrdinal("UserID"));
        //            dto.ProductID = reader.GetInt32(reader.GetOrdinal("ProductID"));
        //            dto.CommentText = reader.GetString(reader.GetOrdinal("CommentText"));
        //            dto.CommentOn = reader.GetDateTime(reader.GetOrdinal("CommentOn"));
        //            //dto.UserName = reader.GetString(reader.GetOrdinal("Name"));
        //            //dto.PictureName = reader.GetString(reader.GetOrdinal("PictureName"));
        //            return dto;
        //        }
        //    }
        //}
        public static int Save(EAD_Project.PMS.Entities.CommentDTO dto)
        {
            String sqlQuery = "";

            sqlQuery = String.Format("INSERT INTO dbo.Comments(UserId,ProductId,CommentText,CommentOn,UserName,PictureName) VALUES('{0}','{1}','{2}','{3}','{4}','{5}')",
                    dto.UserID, dto.ProductID, dto.CommentText, dto.CommentOn,dto.UserName,dto.PictureName);

            using (DBHelper helper = new DBHelper())
            {
                return helper.ExecuteQuery(sqlQuery);
            }
        }


        public static EAD_Project.PMS.Entities.CommentDTO GetCommentById(int pid)
        {

            var query = String.Format("Select * from dbo.Comments Where CommentId={0}", pid);

            using (DBHelper helper = new DBHelper())
            {
                var reader = helper.ExecuteReader(query);

                EAD_Project.PMS.Entities.CommentDTO dto = null;

                if (reader.Read())
                {
                    dto = FillDTO(reader);
                }

                return dto;
            }
        }

        public static List<EAD_Project.PMS.Entities.CommentDTO> GetAllComments()
        {
            using (DBHelper helper = new DBHelper())
            {
                //var query = @"Select q.CommentId,q.UserId,q.ProductId, q.CommentText, q.CommentOn, u.Name,u.PictureName From( 
                //            Select * ROW_NUMBER () OVER (PARTITION BY PRODUCTID ORDER BY CommentId DESC ) r
                //            from dbo.Comments q, dbo.Users u 
                //            where q.r<=2 and q.UserId = u.UserID";
                var query = @"Select q.CommentId,q.UserId,q.ProductId, q.CommentText, q.CommentOn, u.Name,u.PictureName 
                            from dbo.Comments q, dbo.Users u 
                            where q.UserId = u.UserID";

                var reader = helper.ExecuteReader(query);
                List<EAD_Project.PMS.Entities.CommentDTO> list = new List<EAD_Project.PMS.Entities.CommentDTO>();

                while (reader.Read())
                {
                    var dto = FillDTO(reader);
                    if (dto != null)
                    {
                        list.Add(dto);
                    }
                }

                return list;
            }
        }

        public static List<EAD_Project.PMS.Entities.CommentDTO> GetTopComments(int topCount)
        {
            using (DBHelper helper = new DBHelper())
            {
                var query = String.Format(@"SELECT q.CommentId,q.UserId,q.ProductId, q.CommentText, q.CommentOn, q.UserName,q.PictureName FROM (
                                    SELECT * ,ROW_NUMBER ( ) OVER ( PARTITION BY ProductID ORDER BY CommentId DESC) r
                                    FROM dbo.Comments) q, dbo.Users u
                                    WHERE q.r <= {0} and q.UserId = u.UserID", topCount);
                var reader = helper.ExecuteReader(query);
                List<EAD_Project.PMS.Entities.CommentDTO> list = new List<EAD_Project.PMS.Entities.CommentDTO>();

                while (reader.Read())
                {
                    var dto = FillDTO(reader);
                    if (dto != null)
                    {
                        list.Add(dto);
                    }
                }

                return list;
            }
        }
        private static EAD_Project.PMS.Entities.CommentDTO FillDTO(SqlDataReader reader)
        {
            var dto = new EAD_Project.PMS.Entities.CommentDTO();
            // dto.CommentID = reader.GetInt32(reader.GetOrdinal("CommentId"));
            dto.UserID = reader.GetInt32(reader.GetOrdinal("UserID"));
            dto.ProductID = reader.GetInt32(reader.GetOrdinal("ProductID"));
            dto.CommentText = reader.GetString(reader.GetOrdinal("CommentText"));
            dto.CommentOn = reader.GetDateTime(reader.GetOrdinal("CommentOn"));
            dto.UserName = reader.GetString(reader.GetOrdinal("UserName"));
            dto.PictureName = reader.GetString(reader.GetOrdinal("PictureName"));
            return dto;
        }
    }
}

