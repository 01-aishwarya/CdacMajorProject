using merge01.Models;

namespace merge01.Dtos
{
    public class MenuDtos
    {
        public int Id { get; set; }
        public int Restaurant_Id { get; set; }

   

        public List<MealDtos> Meal { get; set; }
    }
}
