using AutoMapper;
using merge01.Data;
using merge01.Dtos;
using merge01.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace merge01.Controllers
{
    [ApiController]
    [Route("api/customer")]
   
    public class CustomerController : Controller
    {
        private readonly FoodDbContext _db;

        private readonly IMapper _mapper;

        public CustomerController(FoodDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        [Route("/getcustomers")]
        public async Task<IActionResult> Get()
        {
            var res = await _db.Customers.ToListAsync();

            return Ok(res);
        }


        [Authorize]
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            var res = await _db.Customers.
               Where(r => r.Id == id).ToListAsync();
            return Ok(res);
        }


       

        [HttpPost]
        public async Task<IActionResult> Post(CustomerDtos payloadCustomer)
        {
            var newCustomer = _mapper.Map<Customer>(payloadCustomer);
            _db.Customers.Add(newCustomer);
            await _db.SaveChangesAsync();

            return Created($"/customer/{newCustomer.Id}", newCustomer);
        }



        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Put(CustomerDtos payloadCustomer)
        {
            var newCustomer = _mapper.Map<Customer>(payloadCustomer);
            _db.Customers.Update(newCustomer);
            await _db.SaveChangesAsync();

            return Created($"/customer/{newCustomer.Id}", newCustomer);
        }


        [Authorize]
        [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        var customerData = await _db
            .Customers.Where(r => r.Id == id)
            .FirstOrDefaultAsync();

        if (customerData == null)
            return NotFound();

        _db.Customers.Remove(customerData);
        await _db.SaveChangesAsync();
        return NoContent();

    }
}
}
