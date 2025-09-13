using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Requests;
using Application.Responses;
using AutoMapper;
using Domain.Entities;

namespace Application.Services
{
    public class CustomerService(ICustomerRepository repository, IMapper mapper) : ICustomerService
    {
        public async Task<CustomerResponse> CreateAsync(CustomerRequest request)
        {
            var entity = mapper.Map<Customer>(request);
            await repository.CreateAsync(entity);
            return mapper.Map<CustomerResponse>(entity);
        }

        public async Task<List<CustomerResponse>> GetAll()
        {
            var list = await repository.GetAll();
            return mapper.Map<List<CustomerResponse>>(list);
        }

        public async Task<CustomerResponse> GetById(int id)
        {
            var entity = await repository.GetById(id);
            return mapper.Map<CustomerResponse>(entity);
        }

        public async Task<CustomerResponse> Update(CustomerRequest customer, int id)
        {
            var entity = await repository.GetById(id);
            mapper.Map(customer, entity);

            await repository.Update(entity);
            return mapper.Map<CustomerResponse>(entity);
        }

        public async Task Delete(int id)
        {
            var entity = await repository.GetById(id);
            await repository.Delete(entity);
        }
    }
}
