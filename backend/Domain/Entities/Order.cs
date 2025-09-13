using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public double Total { get; set; }

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
        public Customer Customer { get; set; } = null!;
    }
}
