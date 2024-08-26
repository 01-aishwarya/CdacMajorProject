using AutoMapper;
using merge01.Data;
using merge01.Dtos;
using merge01.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace merge01.Controllers
{

    [Authorize]
    [ApiController]
   [Route("api/res")]

    public class RestaurantController : Controller
    {
        private readonly FoodDbContext _db;

        private readonly IMapper _mapper;

        public RestaurantController(FoodDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

       
        [HttpGet]
        [Route("/getrestaurants")]
        public async Task<IActionResult> Get()
        {
            var res = await _db.Restaurants.Include(r => r.Menu).ToListAsync();

            return Ok(res);
        }


     

        [HttpGet]
        [Route("/getresbycity/{city}")]
        public async Task<IActionResult> GetResByCity(string city)
        {
            var res = await _db.Restaurants.Where(r =>r.Location.Equals(city)).ToListAsync();

            return Ok(res);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetRestaurantById(int id)
        {
            var res = await _db.Restaurants.
                Include(r => r.Menu).Where(r => r.Id == id).ToListAsync();
            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> Post(RestaurantDtos payloadRestaurant)
        {
            Console.WriteLine("reached");
            var newRes = _mapper.Map<Restaurant>(payloadRestaurant);
            _db.Restaurants.Add(newRes);
            await _db.SaveChangesAsync();

            return Created($"/restaurant/{newRes.Id}", newRes);
        }

        [HttpPut]
        public async Task<IActionResult> Put(RestaurantDtos payloadRestaurant)
        {
            var newRes = _mapper.Map<Restaurant>(payloadRestaurant);
            _db.Restaurants.Update(newRes);
            await _db.SaveChangesAsync();

            return Created($"/restaurant/{newRes.Id}", newRes);
        }




        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteRes(int id)
        {
            var res = await _db
                .Restaurants.Include(r => r.Menu).Where(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (res == null)
                return NotFound();

            _db.Restaurants.Remove(res);
            await _db.SaveChangesAsync();
            return NoContent();

        }

    }
}
