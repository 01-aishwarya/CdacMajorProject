using System.ComponentModel.DataAnnotations;

namespace merge01.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        public string Addr { get; set; }

        public string City { get; set; }

        public int Pincode { get; set; }

      //  public Customer Customer { get; set; }
    }
}
