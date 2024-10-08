﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using TodoAPI.DTO;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    [Authorize]
    public class TodoController : ControllerBase
    {
        private readonly TodoDBContext context;

        public TodoController(TodoDBContext _context)
        {
            this.context = _context;
        }


        // get all todos based on user Id
        [HttpGet("/user/{id}/todos")]
        // route: /user/{userId}/todos 
        public IActionResult GetAllTodos(int id)
        {
            var todos = context.Todos.Where(t => t.UserId == id).ToList();
            return Ok(todos);
        }


        [HttpGet("/todo/{todoId}")]
        public IActionResult GetSingleTodo (int todoId)
        {
            var todo = context.Todos.Where(t => t.TodoId == todoId)
                .Select(t => 
                new { t.Title, t.Description})
                .SingleOrDefault();
            if(todo is not null)
            {
                return Ok(todo);
            }
            else
            {
                return BadRequest("Todo not found !!");
            }
        }

        // Add Todo 
        [HttpPost("/user/{id}/AddTodo")]
        // route: /user/{userId}/addTodo
        public IActionResult AddTodo(int id, TodoDTO todoDTO)
        {
            var user = context.Users.Where(u => u.Id == id).Select(u => new {u.Id}).SingleOrDefault();
            if(user is not null)
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

                return Ok(true);
            }
            else
            {
                return Problem("User is not found");
            }

        }


        // Update Todo 
        [HttpPut("/update/todo/{todoId}")]
        public IActionResult UpdateTodo (int todoId, [FromBody]TodoDTO todoDTO)
        {
            Todo? todoToUpdate = context.Todos
                .Where(t => t.TodoId == todoId)
                .SingleOrDefault();

            if(todoToUpdate is not null)
            {
                todoToUpdate.Title = todoDTO.Title;
                todoToUpdate.Description = todoDTO.Description;
                context.Todos.Update(todoToUpdate);
                context.SaveChanges();
                return Ok();
            }
            return Problem();
        }


        // TODO: update Todo status
        [HttpPut("/update/todoStatus/{todoId}")]
        public IActionResult UpdateTodoStatus (int todoId, TodoStatusDTO todoStatus)
        {
            Todo? todo = context.Todos
                .Where(t => t.TodoId == todoId)
                .SingleOrDefault();
            if(todo is not null)
            {
                if(todoStatus.Status == "true" || todoStatus.Status == "false")
                {
                    if(todoStatus.Status == "true")
                    {
                        todo.Completed = true;
                        context.Todos.Update(todo);
                        context.SaveChanges();
                        return Ok();
                    }
                    
                    todo.Completed = false;
                    context.Todos.Update(todo);
                    context.SaveChanges();
                    return Ok();

                }
                else
                {
                    return BadRequest();
                }
            }
            return Problem("Todo not found!");
        }


            
        [HttpDelete("/todos/{todoId}")]
        public IActionResult DeleteTodo (int todoId)
        {
            try
            {
                Todo? todoToDelete = context.Todos.Where(t => t.TodoId == todoId).SingleOrDefault();

                if(todoToDelete is not null)
                {
                    context.Todos.Remove(todoToDelete);
                    context.SaveChanges();
                    return Ok();
                }
                else
                {
                    return Problem("Todo not found");
                }


            }
            catch
            {
                return Problem(detail:"Some thing went wrong.",statusCode:500);
            }
        }
    }

}
