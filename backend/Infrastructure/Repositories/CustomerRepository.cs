using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CustomerRepository(ChallengeContext context) : ICustomerRepository
    {
        public async Task CreateAsync(Customer Customer)
        {
            context.Add(Customer);
            await context.SaveChangesAsync();
        }

        public async Task<List<Customer>> GetAll()
        {
            return await context.Customers.Include(c => c.Addresses).AsNoTracking().ToListAsync();
        }

        public async Task<Customer> GetById(int id)
        {
            var entity = await context.Customers.Include(c => c.Addresses).FirstOrDefaultAsync(p => p.Id == id);
            if (entity is null) throw new Exception("Customer not found");
            return entity;
        }

        public async Task Update(Customer Customer)
        {
            context.Customers.Update(Customer);
            await context.SaveChangesAsync();
        }

        public async Task Delete(Customer Customer)
        {
            context.Customers.Remove(Customer);
            await context.SaveChangesAsync();
        }
    }
}
