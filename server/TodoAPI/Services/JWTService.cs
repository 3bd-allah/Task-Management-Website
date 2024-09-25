using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TodoAPI.DTO;
using TodoAPI.Models.IdentityEntites;
using TodoAPI.ServiceContracts;

namespace TodoAPI.Services
{
    public class JWTService : IJWTService
    {
        private readonly IConfiguration configuration;

        public JWTService(IConfiguration _configuration)
        {
            this.configuration = _configuration;
        }

        public AuthenticationResponse CreateJwtToken(ApplicationUser user)
        {
            // expiration date of token 
            DateTime expiration = DateTime.UtcNow.AddMinutes(
                Convert.ToDouble(configuration["Jwt:Expiration_Minutes"]));


            // claims is payload of JWT 
            Claim[] claims = new Claim[]
            {
                // Subject (user id)
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),

                //JWT unique id 
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

                // Issued at (date and time of token generation)
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),

                // optional
                // 
                new Claim(ClaimTypes.NameIdentifier, user.Email.ToString()), 

                new Claim(ClaimTypes.Name, user.AccountName.ToString())
            };

            // creating security key
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));


            // implementing the hashing algorithm 
            
            SigningCredentials signingCredentials = new SigningCredentials(
                    securityKey, 
                    SecurityAlgorithms.HmacSha256  // the most popular hashing algorithm 
                );

            JwtSecurityToken tokenGenerator = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: expiration,
                signingCredentials: signingCredentials
            );

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            string token = tokenHandler.WriteToken(tokenGenerator);

            return new AuthenticationResponse
            {
                Id = user.Id,
                UserName = user.AccountName,
                Email = user.Email,
                Token = token,
                Expiration = expiration,
            };
        }
    }
}
