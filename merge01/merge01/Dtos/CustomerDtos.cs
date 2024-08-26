using merge01.Models;

namespace merge01.Dtos
{
    public class CustomerDtos
    {
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
        // public AddressDtos Address { get; set; }

        public List<OrderDetailDtos> OrderDetail { get; set; }
    }
}
