using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TodoAPI.DTO
{
    public class LoginDTO
    {

        [Required(ErrorMessage = "Email field is required")]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password field is required")]
        [PasswordPropertyText]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

    }
}
