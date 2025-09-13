using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class OrderRepository(ChallengeContext context) : IOrderRepository
    {
        public async Task CreateAsync(Order Order)
        {
            context.Add(Order);
            await context.SaveChangesAsync();
        }

        public async Task<List<Order>> GetAll()
        {
            return await context.Orders.Include(c => c.Items).Include(c => c.Customer).AsNoTracking().ToListAsync();
        }

        public async Task<Order> GetById(int id)
        {
            var entity = await context.Orders.Include(c => c.Customer).Include(c => c.Items).FirstOrDefaultAsync(p => p.Id == id);
            if (entity is null) throw new Exception("Order not found");
            return entity;
        }

        public async Task Update(Order Order)
        {
            context.Orders.Update(Order);
            await context.SaveChangesAsync();
        }

        public async Task Delete(Order Order)
        {
            context.Orders.Remove(Order);
            await context.SaveChangesAsync();
        }
    }
}

