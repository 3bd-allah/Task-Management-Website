using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Linq;
using System.Numerics;
using System.Reflection.Metadata.Ecma335;
using TodoAPI.DTO;
using TodoAPI.Models;
using TodoAPI.Models.IdentityEntites;

namespace TodoAPI.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly TodoDBContext context;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        public AccountController(TodoDBContext _context,
            RoleManager<ApplicationRole> roleManager,
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            TodoDBContext context)
        {
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.context = context;
        }


        // Register account action
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO registerUser)
        {
            // validation
            if (!ModelState.IsValid)
            {
                string errorMessage = string.Join(" | ", ModelState.Values.SelectMany(e => e.Errors).Select(err => err.ErrorMessage));
                return Problem(errorMessage);
            }

            // create user
            ApplicationUser user = new ApplicationUser
            {
                AccountName = registerUser.Name,
                UserName = registerUser.Email,
                Email = registerUser.Email,
                PasswordHash = registerUser.Password
            };

            IdentityResult result = await userManager.CreateAsync(user, registerUser.Password);

            if (result.Succeeded)
            {
                // sing-in
                await signInManager.SignInAsync(user, isPersistent: false);

                User inContextUser = new User 
                {  
                    //Id = user.Id,
                    Name = registerUser.Name, 
                    Email = registerUser.Email, 
                    Password= registerUser.Password 
                };
                context.Users.Add(inContextUser);
                context.SaveChanges();
                return Ok(user);
            }
            else
            {
                string errorMessage = string.Join(" | ",
                    result.Errors.Select(e => e.Description));
                return Problem(errorMessage);
            }
        }

        public async Task<IActionResult> IsEmailExists(string email)
        {
            ApplicationUser? user = await userManager.FindByEmailAsync(email);

            if (user is null)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }


        [HttpPost("/login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            // validation 


            var result =await signInManager.PasswordSignInAsync(loginDTO.Email, loginDTO.Password, false, false);

            if (result.Succeeded)
            {
                ApplicationUser? user = await userManager.FindByEmailAsync(loginDTO.Email);
                return Ok(new {PersonName = user.AccountName, Email = user.Email});
            }
            else
            {
                return Problem("Incorrect email or password");
            }
        }


        [HttpGet("/logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }

    }
}
