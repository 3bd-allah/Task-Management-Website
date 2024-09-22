using Microsoft.AspNetCore.Identity;

namespace TodoAPI.Models.IdentityEntites
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string AccountName { get; set; }
    }
}
