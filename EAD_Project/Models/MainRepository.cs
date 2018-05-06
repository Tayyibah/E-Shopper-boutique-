using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PUCIT.AIMRL.LMS.DAL;
using PUCIT.AIMRL.LMS.Entities;
using PUCIT.AIMRL.LMS.Entities.DBEntities;

namespace EAD_Project.Models
{
    public class MainRepository
    {

        private PRMDataService _dataService;

        private PRMDataService DataService
        {
            get
            {
                if (_dataService == null)
                    _dataService = new PRMDataService();

                return _dataService;
            }
        }

        public Object MemSearch(string member)
        {
            try
            {
                var a = DataService.MemSearch(member);
                if (a.LibID != null)
                {
                    if (a.Picture != null)
                    {
                        Object obj = new
                        {
                            data = a,
                            success = true,
                            message = "Member Found",
                            exception = false
                        };
                        return obj;
                    }
                    else
                    {
                        a.Picture = "";
                        Object obj = new
                        {
                            data = a,
                            success = true,
                            message = "Member Found , Picture not Found ",
                            exception = false
                        };
                        return obj;
                    }
                }
                else if (a.LibID == null)
                {
                    Object obj = new
                    {
                        success = false,
                        message = "Member with out Library ID Found",
                        exception = false
                    };
                    return obj;
                }
                else
                {
                    Object obj = new
                    {
                        success = false,
                        message = "Member Not Found",
                        exception = false
                    };
                    return obj;
                }
            }
            catch (Exception ex)
            {
                return (new
                {
                    success = false,
                    error = "Some Error has occurred"
                });
            }

        }
    }
}