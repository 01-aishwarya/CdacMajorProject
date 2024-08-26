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
    [Route("api/meal")]
   
    public class MealController : Controller
    {
        private readonly FoodDbContext _db;

        private readonly IMapper _mapper;

        public MealController(FoodDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }



        
        [HttpGet]
        [Route("/getmeals")]
        public async Task<IActionResult> Get()
        {
            var res = await _db.Meals.ToListAsync();

            return Ok(res);
        }


      
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetMealByMenuId(int id)
        {
            var res = await _db.Meals.Where(r => r.Menu_Id == id).ToListAsync();
            return Ok(res);
        }

        [HttpGet]
        [Route("/meal/{id}")]
        public async Task<IActionResult> GetMealByMealId(int id)
        {
            var res = await _db.Meals.Where(r => r.Id == id).ToListAsync();
            return Ok(res);
        }

        [HttpGet]
        [Route("/mealRes/{id}")]
        public async Task<IActionResult> GetMealByResId(int id)
        {
            var res = await _db.Meals.
                Where(r => r.Menu_Id == id).ToListAsync();
            return Ok(res);
        }





        [HttpPost]
        public async Task<IActionResult> Post(MealDtos payloadMeals)
        {
            var newMeal = _mapper.Map<Meal>(payloadMeals);
            _db.Meals.Add(newMeal);
            await _db.SaveChangesAsync();

            return Created($"/meal/{newMeal.Id}", newMeal);
        }

        [HttpPut]
        public async Task<IActionResult> Put(MealDtos payloadMeals)
        {
            var newMeal = _mapper.Map<Meal>(payloadMeals);
            _db.Meals.Update(newMeal);
            await _db.SaveChangesAsync();

            return Created($"/meal/{newMeal.Id}", newMeal);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteMeal(int id)
        {
            var mealData = await _db
                .Meals.Where(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (mealData == null)
                return NotFound();

            _db.Meals.Remove(mealData);
            await _db.SaveChangesAsync();
            return NoContent();

        }
    }
}
