using AutoMapper;
using merge01.Data;
using merge01.Dtos;
using merge01.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace merge01.Controllers
{
    [ApiController]
    [Route("api/account")]

    public class AccountController : Controller
    {
        private readonly FoodDbContext _db;
        private readonly IConfiguration configuration;

        private readonly IMapper _mapper;

        public AccountController(FoodDbContext db, IMapper mapper, IConfiguration configure)
        {
            _db = db;
            _mapper = mapper;
           configuration= configure;
        }


     
        [HttpGet]
        [Route("/login/{email}/{password}")]
        public async Task<IActionResult> GetCustomerByEmailAndPassword(string email, string password)
        {
            var user = await _db.Customers.
                FirstOrDefaultAsync(c => c.Email == email && c.Password == password);
          
            
            if(user !=null)
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub,configuration["Jwt:Subject"]),
               new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
               new Claim("UserId",user.Id.ToString()),
               new Claim("Email",user.Email.ToString())
              };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    configuration["Jwt:Issuer"],
                    configuration["Jwt:Audience"],
                    claims,
                    expires : DateTime.UtcNow.AddMinutes(60),
                    signingCredentials: signIn
                    );

                string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

                return Ok(new { Token = tokenValue, User = user });
                   
            }
            
            
            return Ok(user);
        }

    
    }
}
