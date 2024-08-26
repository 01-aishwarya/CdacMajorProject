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
    [Route("api/order")]
   
    public class OrderOrderController : Controller
    {
        private readonly FoodDbContext _db;

        private readonly IMapper _mapper;

        public OrderOrderController(FoodDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("/getorders")]
        public async Task<IActionResult> Get()
        {
            var res = await _db.OrderDetails.Include(r => r.Customer).Include(r=>r.Meal).ToListAsync();

            return Ok(res);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var res = await _db.OrderDetails.
              Where(r => r.Customer_Id == id).ToListAsync();
            return Ok(res);
        }

        [HttpGet]
        [Route("cust/{id}")]
        public async Task<IActionResult> GetOrderByCustomerId(int id)
        {
            var res = await _db.OrderDetails.
         Where(r => r.Customer_Id == id).ToListAsync();
            return Ok(res);
        }



        [HttpPost]
        public async Task<IActionResult> Post(OrderDetailDtos payloadOrder)
        {
            var newOrder = _mapper.Map<OrderDetail>(payloadOrder);
            _db.OrderDetails.Add(newOrder);
            await _db.SaveChangesAsync();

            return Created($"/order/{newOrder.Id}", newOrder);
        }

        [HttpPut]
        public async Task<IActionResult> Put(OrderDetailDtos payloadOrder)
        {
            var newOrder = _mapper.Map<OrderDetail>(payloadOrder);
            _db.OrderDetails.Update(newOrder);
            await _db.SaveChangesAsync();

            return Created($"/order/{newOrder.Id}", newOrder);
        }


        [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var orderData = await _db
            .OrderDetails.Where(r => r.Id == id)
            .FirstOrDefaultAsync();

        if (orderData == null)
            return NotFound();

        _db.OrderDetails.Remove(orderData);
        await _db.SaveChangesAsync();
        return NoContent();

    }

        [HttpDelete]
        [Route("/cust/{id:int}")]
        public async Task<IActionResult> DeleteOrderByCust(int id)
        {
            var orderData = await _db
                .OrderDetails.Where(r => r.Customer_Id == id)
                .ToListAsync();

            if (orderData == null)
                return NotFound();

            _db.OrderDetails.RemoveRange(orderData);
            await _db.SaveChangesAsync();
            return NoContent();

        }
    }
}
