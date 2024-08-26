using merge01.Models;

namespace merge01.Dtos
{
    public class RestaurantDtos
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }

        public string RestaurantImage { get; set; }

        public MenuDtos Menu { get; set; }
    }
}
