namespace Application.Responses
{
    public class OrderResponse
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public DateTime OrderDate { get; set; }
        public double Total { get; set; }

        public ICollection<OrderItemResponse> Items { get; set; }
        public CustomerResponse Customer { get; set; }
    }
}
