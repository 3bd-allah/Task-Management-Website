using TodoAPI.DTO;
using TodoAPI.Models.IdentityEntites;

namespace TodoAPI.ServiceContracts
{
    public interface IJWTService
    {
        AuthenticationResponse CreateJwtToken(ApplicationUser user);
    }
}
