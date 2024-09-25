using System.ComponentModel.DataAnnotations;

namespace TodoAPI.DTO
{
    public class TodoDTO
    {
        [Required(ErrorMessage ="Title of todo is required")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description of todo is required")]
        public string Description { get; set; }
    }
}
