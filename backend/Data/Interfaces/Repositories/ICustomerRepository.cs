
using Domain.Entities;

namespace Application.Interfaces.Repositories
{
    public interface ICustomerRepository
    {
        Task CreateAsync(Customer request);
        Task<Customer> GetById(int id);
        Task<List<Customer>> GetAll();
        Task Delete(Customer product);
        Task Update(Customer product);

    }
}
