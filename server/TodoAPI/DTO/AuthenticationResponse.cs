namespace TodoAPI.DTO
{
    public class AuthenticationResponse
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public  string Token { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
    }
}
