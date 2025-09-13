using Application.Requests;
using Application.Responses;
using AutoMapper;
using Domain.Entities;

namespace technical_tests_backend_ssr.Profiles
{
    public class ApiProfile : Profile
    {
        public ApiProfile()
        {
            CreateMap<ProductRequest, Product>();
            CreateMap<Product, ProductResponse>();

            CreateMap<OrderRequest, Order>()
                .ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.Items.Sum(i => i.Subtotal)));
            CreateMap<Order, OrderResponse>();

            CreateMap<CustomerRequest, Customer>();
            CreateMap<Customer, CustomerResponse>();

            CreateMap<OrderItemRequest, OrderItem>();
            CreateMap<OrderItem, OrderItemResponse>();

            CreateMap<AddressRequest, Address>();
            CreateMap<Address, AddressResponse>();
        }
    }
}
