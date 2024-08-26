namespace merge01.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }

        public string RestaurantImage { get; set; }

        public Menu Menu { get; set; }
    }
}
