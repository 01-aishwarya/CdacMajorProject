using AutoMapper;
using merge01.Data;
using merge01.Dtos;
using merge01.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace merge01.Controllers
{
    [ApiController]
    [Route("api/address")]
   
    public class AddressController : Controller
    {
        private readonly FoodDbContext _db;

        private readonly IMapper _mapper;

        public AddressController(FoodDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("/getaddresses")]
        public async Task<IActionResult> Get()
        {
            var res = await _db.Addresses.ToListAsync();

            return Ok(res);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetAddressById(int id)
        {
            var res = await _db.Addresses
                .Where(r => r.Id == id).ToListAsync();
            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddressDtos payloadAddress)
        {
            var newAdd = _mapper.Map<Address>(payloadAddress);
            _db.Addresses.Add(newAdd);
            await _db.SaveChangesAsync();

            return Created($"/addr/{newAdd.Id}", newAdd);
        }

        [HttpPut]
        public async Task<IActionResult> Put(AddressDtos payloadAddress)
        {
            var newAdd = _mapper.Map<Address>(payloadAddress);
            _db.Addresses.Update(newAdd);
            await _db.SaveChangesAsync();

            return Created($"/addr/{newAdd.Id}", newAdd);
        }


        [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> DeleteAddress(int id)
    {
        var addressData = await _db
            .Addresses.Where(r => r.Id == id)
            .FirstOrDefaultAsync();

        if (addressData == null)
            return NotFound();

        _db.Addresses.Remove(addressData);
        await _db.SaveChangesAsync();
        return NoContent();

    }
}
}
