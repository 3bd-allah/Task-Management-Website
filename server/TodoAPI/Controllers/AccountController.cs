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
using TodoAPI.ServiceContracts;

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
        private readonly IJWTService jWTService;

        public AccountController(TodoDBContext _context,
            RoleManager<ApplicationRole> roleManager,
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            TodoDBContext context,
            IJWTService _jWTService
            )
        {
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.context = context;
            this.jWTService = _jWTService;
        }


        // Register account action
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO registerUser)
        {
            // validation
            if (!ModelState.IsValid)
            {
                string errorMessage = string.Join(" | ", ModelState.Values.SelectMany(e => e.Errors).Select(err => err.ErrorMessage));
                return Problem(detail: errorMessage);
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

                AuthenticationResponse authResponse = jWTService.CreateJwtToken(user);

                User inContextUser = new User 
                {  
                    Id = user.Id,
                    Name = registerUser.Name, 
                    Email = registerUser.Email, 
                    Password= registerUser.Password 
                };

                context.Users.Add(inContextUser);
                context.SaveChanges();
                return Ok(authResponse);
            }
            else
            {
                string errorMessage = string.Join(" | ",
                    result.Errors.Select(err => err.Description));
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
            if(!ModelState.IsValid)
            {
                string errorMessage = string.Join(" | ",
                        ModelState.Values
                        .SelectMany(temp => temp.Errors)
                        .Select(err => err.ErrorMessage));
                return Problem(errorMessage);
            }

            var result = await signInManager.PasswordSignInAsync(loginDTO.Email, loginDTO.Password, 
                isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                ApplicationUser? user = await userManager.FindByEmailAsync(loginDTO.Email);

                if(user is not null)
                {

                    var responsedUser = context.Users
                        .Where(u => u.Id == user.Id)
                        .SingleOrDefault();

                    var authenticatedResponseUser = jWTService.CreateJwtToken(user);
 

                    if(responsedUser != null)
                    {

                        return Ok(new {
                            Id = responsedUser.Id, 
                            Name = responsedUser.Name, 
                            Email = responsedUser.Email,
                            Token = authenticatedResponseUser.Token
                        });
                    }
                    else
                    {
                        return Problem("User data doesn't exist");
                    }
                }
                else
                {
                    return Problem("User data doesn't exist");
                }



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
