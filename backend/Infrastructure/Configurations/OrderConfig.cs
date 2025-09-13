using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configurations
{
    public class OrderConfig : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(e => e.Id);

            builder.HasMany(e => e.Items)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey(e => e.OrderId);

            builder.HasOne(e => e.Customer)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(e => e.CustomerId);
        }
    }
}
