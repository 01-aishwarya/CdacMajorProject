using System.ComponentModel.DataAnnotations;

namespace merge01.Models
{
    public class Menu
    {
        [Key]
        public int Id { get; set; }
        public int Restaurant_Id { get; set; }

        public Restaurant Restaurant { get; set; }

        public List<Meal> Meal { get; set; }
    }
}
