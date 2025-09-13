namespace Application.Requests
{
    public class OrderRequest
    {
        public int CustomerId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public ICollection<OrderItemRequest> Items { get; set; }
    }
}
