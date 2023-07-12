using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Skills.Logic.Interfaces
{
    public interface IBaseRepository<TObject>
    {
        Task<TObject> InsertAsync(string login, TObject t);
        Task<IEnumerable<TObject>> InsertAsync(string login, IEnumerable<TObject> t);

        TObject Find(Expression<Func<TObject, bool>> match);
        Task<TObject> FindAsync(Expression<Func<TObject, bool>> match);
        Task<TObject> FindFirstAsync(Expression<Func<TObject, bool>> match);
        IQueryable<TObject> GetAll();
        IQueryable<TObject> GetAll(Expression<Func<TObject, bool>> match);

        Task<TObject> UpdateAsync(string login, TObject updated);
        Task<IEnumerable<TObject>> UpdateAsync(string login, IEnumerable<TObject> items, bool withDatCre = true);
        Task<TObject> UpdateAsMatchAsync(string login, TObject updated, Expression<Func<TObject, bool>> match);
        void Delete(TObject t);
        Task<int> DeleteAsync(TObject t);
        Task DeleteAsync(IEnumerable<TObject> t);
        void InsertOrUpdate(string login, TObject t, Expression<Func<TObject, bool>> match);
        Task<TObject> InsertOrUpdateAsync(string login, TObject t, Expression<Func<TObject, bool>> match);
    }
}

