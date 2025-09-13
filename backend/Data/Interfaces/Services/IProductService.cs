

using Application.Requests;
using Application.Responses;

namespace Application.Interfaces.Services
{
    public interface IProductService
    {
        Task<ProductResponse> CreateAsync(ProductRequest request);
        Task<ProductResponse> GetById(int id);
        Task<ProductResponse> Update(ProductRequest request, int id);
        Task<List<ProductResponse>> GetAll();
        Task Delete(int id);
    }
}
