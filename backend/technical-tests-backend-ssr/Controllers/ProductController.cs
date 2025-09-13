using Application.Interfaces.Services;
using Application.Requests;
using Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace technical_tests_backend_ssr.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController(IProductService service) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<ProductResponse>> Create(ProductRequest request)
        {
            var res = await service.CreateAsync(request);
            return Ok(res);
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductResponse>>> List()
        {
            var response = await service.GetAll();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductResponse>> GetById(int id)
        {
            var response = await service.GetById(id);
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProductResponse>> Update(ProductRequest request, int id)
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
}


