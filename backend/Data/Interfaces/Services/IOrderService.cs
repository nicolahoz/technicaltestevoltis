

using Application.Requests;
using Application.Responses;

namespace Application.Interfaces.Services
{
    public interface IOrderService
    {
        Task<OrderResponse> CreateAsync(OrderRequest request);
        Task<OrderResponse> GetById(int id);
        Task<List<OrderResponse>> GetAll();
        Task<OrderResponse> Update(OrderRequest request, int id);
        Task Delete(int id);
    }
}
