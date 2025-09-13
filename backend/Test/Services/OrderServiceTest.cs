using Application.Interfaces.Repositories;
using Application.Requests;
using Application.Responses;
using Application.Services;
using AutoMapper;
using Domain.Entities;
using Moq;
using Xunit;

namespace Test.Services
{
    public class OrderServiceTests
    {
        private readonly Mock<IOrderRepository> _repositoryMock;
        private readonly IMapper _mapper;
        private readonly OrderService _service;

        public OrderServiceTests()
        {
            _repositoryMock = new Mock<IOrderRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<technical_tests_backend_ssr.Profiles.ApiProfile>();
            });
            _mapper = config.CreateMapper();

            _service = new OrderService(_repositoryMock.Object, _mapper);
        }

        [Fact]
        public async Task CreateAsync_ShouldReturnOrderResponse()
        {
            var request = new OrderRequest
            {
                CustomerId = 1,
                Items = new List<OrderItemRequest>
                {
                    new() { ProductId = 10, Quantity = 2, Subtotal = 20 }
                }
            };

            var createdOrder = new Order { Id = 1, CustomerId = 1, Items = new List<OrderItem>() };
            _repositoryMock.Setup(r => r.CreateAsync(It.IsAny<Order>()))
                           .Callback<Order>(o => o.Id = createdOrder.Id) 
                           .Returns(Task.CompletedTask);

            _repositoryMock.Setup(r => r.GetById(1))
                           .ReturnsAsync(createdOrder);

            var result = await _service.CreateAsync(request);

            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            _repositoryMock.Verify(r => r.CreateAsync(It.IsAny<Order>()), Times.Once);
        }

        [Fact]
        public async Task Update_ShouldUpdateEntity()
        {
            var existingOrder = new Order { Id = 1, CustomerId = 1, Items = new List<OrderItem>() };
            var request = new OrderRequest
            {
                CustomerId = 2,
                Items = new List<OrderItemRequest>
                {
                    new() { ProductId = 11, Quantity = 1, Subtotal = 5 }
                }
            };

            _repositoryMock.Setup(r => r.GetById(1)).ReturnsAsync(existingOrder);
            _repositoryMock.Setup(r => r.Update(It.IsAny<Order>())).Returns(Task.CompletedTask);

            var response = await _service.Update(request, 1);

            Assert.Equal(2, response.CustomerId);
            _repositoryMock.Verify(r => r.Update(It.Is<Order>(o => o.CustomerId == 2)), Times.Once);
        }

        [Fact]
        public async Task Delete_ShouldCallRepositoryDelete()
        {
            var order = new Order { Id = 1 };
            _repositoryMock.Setup(r => r.GetById(1)).ReturnsAsync(order);

            await _service.Delete(1);

            _repositoryMock.Verify(r => r.Delete(order), Times.Once);
        }
    }
}
