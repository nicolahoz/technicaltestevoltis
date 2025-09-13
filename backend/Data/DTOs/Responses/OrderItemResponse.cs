namespace Application.Responses
{
    public class OrderItemResponse
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public double Subtotal { get; set; }
        public ProductResponse Product { get; set; }
    }
}
