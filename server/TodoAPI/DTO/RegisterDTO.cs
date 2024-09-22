using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using TodoAPI.Models;

namespace TodoAPI.DTO
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Name is required")]
        [MinLength(3,ErrorMessage ="Name must be more than '3' characters")]
        [MaxLength(20,ErrorMessage = "Name must be less than '20' characters")]
        public string Name{ get; set; }

        [Required(ErrorMessage ="Email is required")]
        [EmailAddress(ErrorMessage ="Invalid email format")]
        [DataType(DataType.EmailAddress)]
        [Remote(action: "IsEmailExists", controller:"Account", 
            ErrorMessage ="Email is already in use")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password{ get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword{ get; set; }

    }
}
