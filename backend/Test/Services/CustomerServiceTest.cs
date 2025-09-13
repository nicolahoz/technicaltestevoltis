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
    public class CustomerServiceTests
    {
        private readonly Mock<ICustomerRepository> _repositoryMock;
        private readonly IMapper _mapper;
        private readonly CustomerService _service;

        public CustomerServiceTests()
        {
            _repositoryMock = new Mock<ICustomerRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<technical_tests_backend_ssr.Profiles.ApiProfile>();
            });
            _mapper = config.CreateMapper();

            _service = new CustomerService(_repositoryMock.Object, _mapper);
        }

        [Fact]
        public async Task CreateAsync_ShouldReturnCustomerResponse()
        {
            var request = new CustomerRequest { Name = "Test", Email = "test@mail.com", Phone = "123" };
            var createdCustomer = new Customer { Id = 1, Name = "Test", Email = "test@mail.com", Phone = "123" };

            _repositoryMock.Setup(r => r.CreateAsync(It.IsAny<Customer>()))
                           .Callback<Customer>(c => c.Id = createdCustomer.Id)
                           .Returns(Task.CompletedTask);

            _repositoryMock.Setup(r => r.GetById(1)).ReturnsAsync(createdCustomer);

            var result = await _service.CreateAsync(request);

            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
        }

        [Fact]
        public async Task Update_ShouldChangeName()
        {
            var existing = new Customer { Id = 1, Name = "Old", Email = "old@mail.com", Phone = "111" };
            var request = new CustomerRequest { Name = "New", Email = "old@mail.com", Phone = "111" };

            _repositoryMock.Setup(r => r.GetById(1)).ReturnsAsync(existing);
            _repositoryMock.Setup(r => r.Update(existing)).Returns(Task.CompletedTask);

            var result = await _service.Update(request, 1);

            Assert.Equal("New", result.Name);
            _repositoryMock.Verify(r => r.Update(It.Is<Customer>(c => c.Name == "New")), Times.Once);
        }
    }
}
