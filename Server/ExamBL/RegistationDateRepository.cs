using AutoMapper;
using Exam_DTO.DTO;
using ExamBL;
using ExamDL;
using ExamDL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading.Tasks;

namespace ExamBL
{
    public class RegistationDateRepository : IRegistationDateRepository
    {
        IRegistrationDateService _RegistationDateDl;
        IMapper _mapper;

        public RegistationDateRepository(IRegistrationDateService _registationDateDl, IMapper mapper)
        {
            _RegistationDateDl = _registationDateDl;
            _mapper = mapper;
        }
        public async Task<RegistationDateDTO> GetDateBl()
        {
            try
            {
                RegistrationDate date = await _RegistationDateDl.GetDate();
                RegistationDateDTO regDTO = _mapper.Map<RegistationDateDTO>(date);
                return regDTO;

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetExamsBl: {ex.Message}");
                return null;
            }
        }
        public async Task<RegistationDateDTO> UpdateDateBL(RegistationDateDTO Date)
        {
            try
            {
                RegistrationDate registationDate = _mapper.Map<RegistrationDate>(Date);
                RegistrationDate registationDateUpdate = await _RegistationDateDl.UpdateDate(registationDate);
                RegistationDateDTO registationDateUpdateDTO = _mapper.Map<RegistationDateDTO>(Date);

                return registationDateUpdateDTO;

            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in UpdatePersonalDetailesBL: {ex.Message}");
                return null;
            }
        }


    }
}
