using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PUCIT.AIMRL.LMS.Entities.DBEntities;
using EAD_Project.Models;


namespace EAD_Project.APIControllers
{
    public class MainController : ApiController
    {

        private readonly MainRepository _repository;

        public MainController()
        {
            _repository = new MainRepository();
        }

        private MainRepository Repository
        {
            get
            {
                return _repository;
            }
        }
        [HttpPost]
        public Object MemSearch(string member)
        {
            return Repository.MemSearch(member);
        }
    }
}
