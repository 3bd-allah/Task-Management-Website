using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoDBContext context;

        public TodoController(TodoDBContext _context)
        {
            this.context = _context;
        }


        [HttpPost("/AddTodo")]
        public IActionResult AddTodo()
        {
            return NoContent();
        }
    }
}
