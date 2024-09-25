using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoAPI.DTO;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    //[Authorize]
    public class TodoController : ControllerBase
    {
        private readonly TodoDBContext context;

        public TodoController(TodoDBContext _context)
        {
            this.context = _context;
        }


        // get all todos based on user Id
        [HttpGet("/user/{id}/todos")]
        // route: /todo/user/{userId}/todos 
        public IActionResult GetAllTodos(int id)
        {
            var todos = context.Todos.Where(t => t.UserId == id).ToList();
            return Ok(todos);
        }



        // Add Todo 
        [HttpPost("/user/{id}/AddTodo")]
        // route: /todo/user/userId/addTodo
        public IActionResult AddTodo(int id, TodoDTO todoDTO)
        {
            if (!ModelState.IsValid)
            {
                string errorMessage = string.Join(" | " , ModelState.Values
                    .SelectMany(errs => errs.Errors)
                    .Select(err => err.ErrorMessage));
                return Problem(detail: errorMessage);
            }
            Todo todo = new Todo()
            {
                Title = todoDTO.Title,
                Description = todoDTO.Description,
                Completed = false,
                UserId = id
            };

            context.Todos.Add(todo);   
            context.SaveChanges();

            return Ok();

        }


        [HttpDelete("/todos/{todoId}")]
        public IActionResult DeleteTodo (int todoId)
        {
            try
            {
                var todoToDelete = context.Todos.Where(t => t.TodoId == todoId).SingleOrDefault();

                context.Todos.Remove(todoToDelete);
                context.SaveChanges();
                return Ok();

            }
            catch
            {
                return Problem(detail:"Some thing went wrong.",statusCode:500);
            }
        }
    }

}
