using System.ComponentModel.DataAnnotations;

namespace merge01.Models
{
    public class Meal
    {
        [Key]
        public int Id { get; set; }
        public string MealName { get; set; }
        public double Price { get; set; }
        public string MealDescription { get; set; }
        public string MealImage { get; set; }
        public int Menu_Id { get; set; }
        public Menu Menu { get; set; }

        public OrderDetail OrderDetail { get; set; }
        //public int Order_Id { get; set; }
        //  public List<OrderDetail> OrderDetail { get; set; }
    }
}
