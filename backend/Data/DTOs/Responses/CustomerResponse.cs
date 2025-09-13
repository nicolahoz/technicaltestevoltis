namespace Application.Responses
{
    public class CustomerResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;

        public ICollection<AddressResponse> Addresses { get; set; }
    }
}
