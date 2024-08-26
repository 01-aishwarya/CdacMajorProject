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
    [Route("api/[Controller]")]
    public class ResController : Controller
    {
        /*
        private readonly FoodDbContext _db;

        private readonly IMapper _mapper;

        
        public ResController(FoodDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("/getrestaurnats")]
        public async Task<IActionResult> Get()
        {
           var res= await _db.Restaurants.Include(r => r.Menu).ToListAsync();

            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> Post(RestaurantDtos payloadCustomer)
        {
            var newCustomer = _mapper.Map<Restaurant>(payloadCustomer);
            _db.Restaurants.Add(newCustomer);
            await _db.SaveChangesAsync();

            return Created($"/customer/{newCustomer.Id}", newCustomer);
        }


        [HttpGet]
        [Route("/getusers")]
        public async Task<IActionResult> GetUsers()
        {
            var res = await _db.Customers.Include(r => r.OrderDetail).ToListAsync();

            return Ok(res);
        }


     

        [HttpDelete]
        [Route("customer/{id:int}")]
        public async Task<IActionResult> Deletecustomer(int id)
        {
            var Customer = await _db
                .Customers.Include(r => r.OrderDetail).Where(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (Customer == null)
                return NotFound();

            _db.Customers.Remove(Customer);
            await _db.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete]
        [Route("order/{id:int}")]
        public async Task<IActionResult> Deleteorder(int id)
        {
            var order = await _db
                .OrderDetails.Include(r =>r.Customer).Where(r => r.Customer_Id == id)
                .FirstOrDefaultAsync();

            Console.WriteLine(order);

         ////   var makeorder = await _db
         //        .Include(r => r.Customer_Id).Where(r => r.Id == id)
         //         .FirstOrDefaultAsync();

            if (order == null)
                return NotFound();


            _db.OrderDetails.Remove(order); 

            await _db.SaveChangesAsync();
            return NoContent();
        }





        [HttpGet]
        [Route("/getmenu")]
        public async Task<IActionResult> GetMenu()
        {
            var menu = await _db.Menus.Include(r => r.Meal).ToListAsync();

            return Ok(menu);
        }


        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteRes(int id)
        {
            var Customer = await _db
                .Restaurants.Include(r => r.Menu).Where(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (Customer == null)
                return NotFound();

            _db.Restaurants.Remove(Customer);
            await _db.SaveChangesAsync();
            return NoContent();

        }

        [HttpDelete]
        [Route("menu/{id:int}")]
        public async Task<IActionResult> DeleteMenu(int id)
        {
            var Customer = await _db
                .Menus.Include(r => r.Meal).Where(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (Customer == null)
                return NotFound();

            _db.Menus.Remove(Customer);
            await _db.SaveChangesAsync();
            return NoContent();
        }
        */
    }
}
