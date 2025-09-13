using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Requests;
using Application.Responses;
using AutoMapper;
using Domain.Entities;

namespace Application.Services
{
    public class OrderService(IOrderRepository repository, IMapper mapper) : IOrderService
    {
        public async Task<OrderResponse> CreateAsync(OrderRequest request)
        {
            var entity = mapper.Map<Order>(request);
            await repository.CreateAsync(entity);
            return mapper.Map<OrderResponse>(await repository.GetById(entity.Id));
        }

        public async Task<List<OrderResponse>> GetAll()
        {
            var list = await repository.GetAll();
            return mapper.Map<List<OrderResponse>>(list);
        }

        public async Task<OrderResponse> GetById(int id)
        {
            var entity = await repository.GetById(id);
            return mapper.Map<OrderResponse>(entity);
        }

        public async Task<OrderResponse> Update(OrderRequest Order, int id)
        {
            var entity = await repository.GetById(id);
            mapper.Map(Order, entity);
            await repository.Update(entity);
            return mapper.Map<OrderResponse>(entity);
        }

        public async Task Delete(int id)
        {
            var entity = await repository.GetById(id);
            await repository.Delete(entity);
        }
    }
}
