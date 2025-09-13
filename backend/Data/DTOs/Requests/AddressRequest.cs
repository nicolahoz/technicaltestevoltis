namespace Application.Requests
{
    public class AddressRequest
    {
        public string Street { get; set; } = null!;
        public string City { get; set; } = null!;
        public string ZipCode { get; set; } = null!;
    }
}
