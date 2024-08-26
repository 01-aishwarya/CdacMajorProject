using merge01.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace merge01.Data
{
    public class FoodDbContext : DbContext
    {

        public FoodDbContext(DbContextOptions<FoodDbContext> options) : base(options)
        {

        }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Menu>()
                .HasOne(r => r.Restaurant)
                .WithOne(r => r.Menu)
                .HasForeignKey<Menu>(r => r.Restaurant_Id);
           



            modelBuilder.Entity<Meal>()
                .HasOne(r => r.Menu)
                .WithMany(r => r.Meal)
                .HasForeignKey(r => r.Menu_Id);
            //.OnDelete(DeleteBehavior.Cascade);

            //modelBuilder.Entity<Customer>()
            // .HasOne(r => r.Address)
            // .WithOne(r => r.Customer)
            // .HasForeignKey<Customer>(r => r.Address_Id);
            //  .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<OrderDetail>()
         .HasOne(r => r.Customer)
         .WithMany(r => r.OrderDetail)
         .HasForeignKey(r => r.Customer_Id);

            modelBuilder.Entity<OrderDetail>()
       .HasOne(r => r.Meal)
       .WithOne(r => r.OrderDetail)
       .HasForeignKey<OrderDetail>(r => r.Meal_Id);



        }
    }
}
