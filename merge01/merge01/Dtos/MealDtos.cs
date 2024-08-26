using merge01.Models;

namespace merge01.Dtos
{
    public class MealDtos
    {
        public int Id { get; set; }
        public string MealName { get; set; }
        public double Price { get; set; }
        public string MealDescription { get; set; }
        public string MealImage { get; set; }
        public int Menu_Id { get; set; }


        //  public int Order_Id { get; set; }
       // public List<OrderDetailDtos> OrderDetail { get; set; }
    }
}
