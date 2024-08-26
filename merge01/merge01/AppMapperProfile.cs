using AutoMapper;
using merge01.Dtos;
using merge01.Models;

namespace merge01
{
    public class AppMapperProfile : Profile
    {
        public AppMapperProfile()
        {
            CreateMap<RestaurantDtos, Restaurant>();
            CreateMap<MenuDtos, Menu>();
            CreateMap<MealDtos, Meal>();
            CreateMap<OrderDetailDtos, OrderDetail>();
            CreateMap<CustomerDtos, Customer>();
           // CreateMap<AddressDtos, Address>();
        }
    }
}
