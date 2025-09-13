using Application.Interfaces.Services;
using Application.Requests;
using Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace technical_tests_backend_ssr.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerController(ICustomerService service) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<CustomerResponse>> Create(CustomerRequest request)
    {
        var res = await service.CreateAsync(request);
        return Ok(res);
    }

    [HttpGet]
    public async Task<ActionResult<List<CustomerResponse>>> List()
    {
        var response = await service.GetAll();
        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CustomerResponse>> GetById(int id)
    {
        var response = await service.GetById(id);
        return Ok(response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<CustomerResponse>> Update(CustomerRequest request, int id)
    {
        var res = await service.Update(request, id);
        return Ok(res);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.Delete(id);
        return Ok();
    }
}
