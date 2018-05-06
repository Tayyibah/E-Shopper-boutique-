using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.ComponentModel.DataAnnotations.Schema;
using PUCIT.AIMRL.LMS.Entities;
using PUCIT.AIMRL.LMS.Entities.DBEntities;
using System;

namespace PUCIT.AIMRL.LMS.DAL
{
    public class PRMDataContext : DbContext
    {
        private static readonly string ConnectionString = DatabaseHelper.Instance.MainDBConnectionString;
        
        public DbSet<Issue> Issue { get; set; }
        public PRMDataContext()
            : base(ConnectionString)
        {
            // We'll eager load entities whenever required.
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
            ((IObjectContextAdapter)this).ObjectContext.CommandTimeout = 3000;
        }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}



