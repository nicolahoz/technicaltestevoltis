using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Requests;
using Application.Responses;
using AutoMapper;
using Domain.Entities;

namespace Application.Services
{
    public class ProductService(IProductRepository repository, IMapper mapper) : IProductService
    {

        public async Task<ProductResponse> CreateAsync(ProductRequest request)
        {
            var entity = mapper.Map<Product>(request);
            await repository.CreateAsync(entity);
            return mapper.Map<ProductResponse>(entity);
        }

        public async Task<List<ProductResponse>> GetAll()
        {
            var list = await repository.GetAll();
            return mapper.Map<List<ProductResponse>>(list);
        }

        public async Task<ProductResponse> GetById(int id)
        {
            var entity = await repository.GetById(id);
            return mapper.Map<ProductResponse>(entity);
        }

        public async Task<ProductResponse> Update(ProductRequest product, int id)
        {
            var entity = await repository.GetById(id);
            mapper.Map(product, entity);
            await repository.Update(entity);
            return mapper.Map<ProductResponse>(entity);
        }

        public async Task Delete(int id)
        {
            var entity = await repository.GetById(id);
            await repository.Delete(entity);
        }
    }
}
