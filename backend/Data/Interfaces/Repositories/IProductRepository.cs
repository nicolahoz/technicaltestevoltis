

using Domain.Entities;

namespace Application.Interfaces.Repositories
{
    public interface IProductRepository
    {
        Task CreateAsync(Product product);
        Task<Product> GetById(int id);
        Task Delete(Product product);
        Task<List<Product>> GetAll();
        Task Update(Product product);
    }
}
