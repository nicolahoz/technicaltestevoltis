namespace Application.Requests
{
    public class OrderItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public double Subtotal { get; set; }
    }
}
