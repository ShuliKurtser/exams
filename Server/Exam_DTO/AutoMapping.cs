using AutoMapper;
using Exam_DTO.DTO;
using ExamDL.Models;

namespace Exam_DTO
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<PersonalDetaileDTO, PersonalDetaile>();
            CreateMap<PersonalDetaile, PersonalDetaileDTO>();
            CreateMap<ExamsDTO, Exam>();
            CreateMap<Exam, ExamsDTO>();
            CreateMap<ExamsUserDTO, ExamsUser>().ReverseMap();
            //.ForMember(dest => dest.IdExamNavigation, opt => opt.MapFrom(src => src.IdUserNavigation)).ReverseMap();

            CreateMap<ReliefUserDTO, ReliefUser>()
                //.ForMember(dest => dest.IdReliefReasonsNavigation, opt => opt.MapFrom(src => src.ReliefReasons))
                //.ForMember(dest => dest.IdReliefTypesNavigation, opt => opt.MapFrom(src => src.ReliefTypes))
                .ReverseMap();

            CreateMap<ReliefReason, ReliefReasonDTO>().ReverseMap();
            CreateMap<ReliefType, ReliefTypeDTO>().ReverseMap();
            CreateMap<ReliefUserDTO, ReliefUser>().ReverseMap();
            CreateMap<DueDateDTO, DueDate>().ReverseMap();
            CreateMap<DueDate, DueDateForExamDTO>().ReverseMap();
            CreateMap<RegistrationDate, RegistationDateDTO>().ReverseMap();


        }
    }
}


//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using AutoMapper;
//using Exam_DTO.DTO;
//using ExamDL.Models;


//namespace Exam_DTO
//{
//    public class AutoMapping : Profile
//    {
//        public AutoMapping()
//        {
//            //CreateMap<ExamsRepository, ExamsDto>();
//            CreateMap<PersonalDetaileDTO, PersonalDetaile>();
//            CreateMap<PersonalDetaile, PersonalDetaileDTO>();
//            CreateMap<ExamsDTO, Exam>();
//            CreateMap<Exam, ExamsDTO>();
//            CreateMap<ExamsUserDTO, ExamsUser>().ReverseMap();

//            CreateMap<ReliefUserDTO, ReliefUser>().ForMember(dest => dest.IdReliefReasonsNavigation, opt => opt.MapFrom(src => src.ReliefReasons)).ReverseMap();
//            CreateMap<ReliefUserDTO, ReliefUser>().ForMember(dest => dest.IdReliefTypesNavigation, opt => opt.MapFrom(src => src.ReliefTypes)).ReverseMap();
//            CreateMap<ReliefReason, ReliefReasonDTO>().ReverseMap();
//            CreateMap<ReliefType, ReliefTypeDTO>().ReverseMap();
//        }



//    }
//}
