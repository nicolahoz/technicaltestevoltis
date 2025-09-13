

using Application.Requests;
using Application.Responses;

namespace Application.Interfaces.Services
{
    public interface ICustomerService
    {
        Task<CustomerResponse> CreateAsync(CustomerRequest request);
        Task<CustomerResponse> GetById(int id);
        Task<List<CustomerResponse>> GetAll();
        Task<CustomerResponse> Update(CustomerRequest request, int id);
        Task Delete(int id);

    }
}
