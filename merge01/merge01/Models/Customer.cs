using System.ComponentModel.DataAnnotations;

namespace merge01.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }


        public string ConfirmPassword { get; set; }

        public long Phone { get; set; }
        public string Addr { get; set; }

        public string City { get; set; }

        public int Pincode { get; set; }

        public string Category { get; set; }
        // public int Address_Id { get; set; }
        // public Address Address { get; set; }

        public List<OrderDetail> OrderDetail { get; set; }
    }
}
