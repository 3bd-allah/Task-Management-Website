using System.ComponentModel.DataAnnotations;

namespace TodoAPI.DTO
{
    public class TodoDTO
    {
        [Required(ErrorMessage ="Title of todo is required")]
        [MinLength(1, ErrorMessage = "Title should be more than '1' characters")]
        public string Title { get; set; }


        [Required(ErrorMessage = "Description of todo is required")]
        [MinLength(3, ErrorMessage = "Description should be more than '3' characters")]
        public string Description { get; set; }
        public bool Status { get; set; }
    }
}
