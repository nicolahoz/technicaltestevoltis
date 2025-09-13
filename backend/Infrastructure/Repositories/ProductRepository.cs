using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ProductRepository(ChallengeContext context) : IProductRepository
    {
        public async Task CreateAsync(Product product)
        {
            context.Add(product);
            await context.SaveChangesAsync();
        }

        public async Task<List<Product>> GetAll()
        {
            return await context.Products.AsNoTracking().ToListAsync();
        }

        public async Task<Product> GetById(int id)
        {
            var entity = await context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
            if (entity is null) throw new Exception("Product not found");
            return entity;
        }

        public async Task Update(Product product)
        {
            context.Products.Update(product);
            await context.SaveChangesAsync();
        }

        public async Task Delete(Product product)
        {
            context.Products.Remove(product);
            await context.SaveChangesAsync();
        }
    }
}
