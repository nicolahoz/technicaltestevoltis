namespace Application.Requests
{
    public class CustomerRequest
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;

        public ICollection<AddressRequest> Addresses { get; set; }
    }
}
