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
    [Route("api/menu")]
   
    public class MenuController : Controller
    {
        private readonly FoodDbContext _db;

        private readonly IMapper _mapper;

        public MenuController(FoodDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("/getmenus")]
        public async Task<IActionResult> Get()
        {
            var res = await _db.Menus.Include(r => r.Meal).ToListAsync();

            return Ok(res);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetMenuById(int id)
        {
            var res = await _db.Menus.
                Include(r => r.Meal).Where(r => r.Id == id).ToListAsync();
            return Ok(res);
        }

        [HttpGet]
        [Route("/res/{id}")]
        public async Task<IActionResult> GetMenuByResId(int id)
        {
            var res = await _db.Menus.
                Include(r => r.Meal).Where(r => r.Restaurant_Id == id).ToListAsync();
            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> Post(MenuDtos payloadMenus)
        {
            var newMenu = _mapper.Map<Menu>(payloadMenus);
            _db.Menus.Add(newMenu);
            await _db.SaveChangesAsync();

            return Created($"/menu/{newMenu.Id}", newMenu);
        }

        [HttpPut]
        public async Task<IActionResult> Put(MenuDtos payloadMenus)
        {
            var newMenu = _mapper.Map<Menu>(payloadMenus);
            _db.Menus.Update(newMenu);
            await _db.SaveChangesAsync();

            return Created($"/menu/{newMenu.Id}", newMenu);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteMenu(int id)
        {
            var menuData = await _db
                .Menus.Include(r => r.Meal).Where(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (menuData == null)
                return NotFound();

            _db.Menus.Remove(menuData);
            await _db.SaveChangesAsync();
            return NoContent();

        }
    }
}
