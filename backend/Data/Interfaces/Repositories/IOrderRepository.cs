

using Domain.Entities;

namespace Application.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        Task CreateAsync(Order request);
        Task<Order> GetById(int id);
        Task<List<Order>> GetAll();
        Task Delete(Order product);
        Task Update(Order product);

    }
}
