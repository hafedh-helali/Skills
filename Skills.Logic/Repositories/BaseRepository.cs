

using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Skills.Logic.Interfaces;
using Skills.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Threading.Tasks;
using Skills.Logic.Constants;

namespace Skills.Logic.Repositories
{
    public class BaseRepository<TObject> : IBaseRepository<TObject> where TObject : class
    {
        protected SKILLS_DEVContext _context = new SKILLS_DEVContext();

        #region Create

        public async Task<TObject> InsertAsync(string login, TObject t)
        {
            _context.Set<TObject>().Add(t);
            _SetAuditFields_Insert(login, t);

            await _context.SaveChangesAsync();
            return t;
        }

        public async Task<IEnumerable<TObject>> InsertAsync(string login, IEnumerable<TObject> t)
        {
            _context.Set<TObject>().AddRange(t);
            foreach (var entity in t)
                _SetAuditFields_Insert(login, entity);

            await _context.SaveChangesAsync();
            return t;
        }

        #endregion Create

        #region Read one

        public TObject Find(Expression<Func<TObject, bool>> match)
        {
            return _context.Set<TObject>().SingleOrDefault(match);
        }

        public async Task<TObject> FindAsync(Expression<Func<TObject, bool>> match)
        {
            return await _context.Set<TObject>().SingleOrDefaultAsync(match);
        }
        public async Task<TObject> FindFirstAsync(Expression<Func<TObject, bool>> match)
        {
            return await _context.Set<TObject>().FirstOrDefaultAsync(match);
        }
        #endregion Read one

        #region Update one

        public async Task<TObject> UpdateAsync(string login, TObject updated)
        {
            if (updated == null)
                return null;

            _context.Entry(updated).State = EntityState.Modified;
            _SetAuditFields_Update(login, updated);

            await _context.SaveChangesAsync();
            return updated;
        }
        public async Task<TObject> UpdateAsMatchAsync(string login, TObject updated, Expression<Func<TObject, bool>> match)
        {
            _context = new SKILLS_DEVContext();
            if (updated == null)
                return null;

            var dbObject = Find(match);
            if (dbObject != null)
            {
                _context.Entry(dbObject).State = EntityState.Detached;
                _context.Entry(updated).State = EntityState.Modified;
                _SetAuditFields_Update(login, updated);
            }
            _SetAuditFields_Update(login, updated);
            await _context.SaveChangesAsync();
            return updated;
        }
        #endregion Update one

        #region Update many

        public async Task<IEnumerable<TObject>> UpdateAsync(string login, IEnumerable<TObject> items, bool withDatCre = true)
        {
            foreach (var updated in items)
            {
                _context.Entry(updated).State = EntityState.Modified;
                _SetAuditFields_Update(login, updated, withDatCre);
            }
            await _context.SaveChangesAsync();
            return items;
        }

        #endregion Update many

        #region Read many

        public IQueryable<TObject> GetAll()
        {
            return _context.Set<TObject>().AsQueryable();
        }

        public IQueryable<TObject> GetAll(Expression<Func<TObject, bool>> match)
        {
            //_context = new SKILLS_DEVContext();
            return _context.Set<TObject>().Where(match).AsQueryable();
        }

        #endregion Read many

        #region Delete one

        public void Delete(TObject t)
        {
            _context.Entry(t).State = EntityState.Deleted;
            _context.SaveChanges();
        }

        public async Task<int> DeleteAsync(TObject t)
        {
            _context = new SKILLS_DEVContext();
            _context.Entry(t).State = EntityState.Deleted;
            return await _context.SaveChangesAsync();
        }

        #endregion Delete one

        #region Delete many

        public async Task DeleteAsync(IEnumerable<TObject> t)
        {
            //_context = new SKILLS_DEVContext();
            _context.Set<TObject>().RemoveRange(t);
            await _context.SaveChangesAsync();
        }

        #endregion Delete many

        #region Insert Or update

        public void InsertOrUpdate(string login, TObject t, Expression<Func<TObject, bool>> match)
        {
            var dbObject = Find(match);
            if (dbObject != null)
            {
                _context.Entry(dbObject).State = EntityState.Detached;
                _context.Entry(t).State = EntityState.Modified;
                _SetAuditFields_Update(login, t);
            }
            else
            {
                _context.Entry(t).State = EntityState.Added;
                _SetAuditFields_Insert(login, t);
            }
            _context.SaveChanges();
        }

        public async Task<TObject> InsertOrUpdateAsync(string login, TObject t, Expression<Func<TObject, bool>> match)
        {
            var dbObject = await FindAsync(match);
            if (dbObject != null)
            {
                _context.Entry(dbObject).State = EntityState.Detached;
                _context.Entry(t).State = EntityState.Modified;
                _SetAuditFields_Update(login, t);
            }
            else
            {
                _context.Entry(t).State = EntityState.Added;
                _SetAuditFields_Insert(login, t);
            }
            await _context.SaveChangesAsync();
            return t;
        }

        #endregion

        #region Private Methodes

        private void _SetProperty(TObject entity, string propertyName, object value)
        {
            var prop = entity.GetType().GetProperty(propertyName);
            if (prop != null)
                _context.Entry(entity).Property(propertyName).CurrentValue = value;
        }

        private void _SetProperty<I>(I entity, string propertyName, object value) where I : class
        {
            var prop = entity.GetType().GetProperty(propertyName);
            if (prop != null)
                _context.Entry(entity).Property(propertyName).CurrentValue = value;
        }

        private void _SetPropertyAsUnModified(TObject entity, string propertyName)
        {
            var prop = entity.GetType().GetProperty(propertyName);
            if (prop != null)
                _context.Entry(entity).Property(propertyName).IsModified = false;
        }

        private void _SetPropertyAsUnModified<I>(I entity, string propertyName) where I : class
        {
            var prop = entity.GetType().GetProperty(propertyName);
            if (prop != null)
                _context.Entry(entity).Property(propertyName).IsModified = false;
        }

        protected void _SetAuditFields_Update(string login, TObject entity, bool withDatCre = true)
        {
            _SetPropertyAsUnModified(entity, AuditFields.USER_CRE);
            if (withDatCre)
                _SetPropertyAsUnModified(entity, AuditFields.DAT_CRE);

            _SetProperty(entity, AuditFields.USER_MAJ, login);
            _SetProperty(entity, AuditFields.DAT_MAJ, DateTime.Now);
        }

        protected void _SetAuditFields_Update<I>(string login, I entity) where I : class
        {
            _SetPropertyAsUnModified<I>(entity, AuditFields.USER_CRE);
            _SetPropertyAsUnModified<I>(entity, AuditFields.DAT_CRE);

            _SetProperty<I>(entity, AuditFields.USER_MAJ, login);
            _SetProperty<I>(entity, AuditFields.DAT_MAJ, DateTime.Now);
        }


        protected void _SetAuditFields_Insert(string login, TObject entity)
        {
            _SetProperty(entity, AuditFields.USER_CRE, login);
            _SetProperty(entity, AuditFields.DAT_CRE, DateTime.Now);

            _SetProperty(entity, AuditFields.USER_MAJ, login);
            _SetProperty(entity, AuditFields.DAT_MAJ, DateTime.Now);
        }

        protected void _SetAuditFields_Insert<I>(string login, I entity) where I : class
        {
            _SetProperty<I>(entity, AuditFields.USER_CRE, login);
            _SetProperty<I>(entity, AuditFields.DAT_CRE, DateTime.Now);

            _SetProperty<I>(entity, AuditFields.USER_MAJ, login);
            _SetProperty<I>(entity, AuditFields.DAT_MAJ, DateTime.Now);
        }

        private string GetUserName(HttpContext httpContext)
        {
            string userName;
            if (httpContext == null)
                userName = "DBO";
            else
                userName = httpContext.User.Identity.Name;

            return userName;
        }

        #endregion

    }
}

