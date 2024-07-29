using AutoMapper;
using Exam_DTO.DTO;
using ExamDL;
using ExamDL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExamBL
{
    public class DueDatesRepository : IDueDatesRepository
    {
        IDueDatesService _DueDatesDL;
        IMapper _mapper;
        public DueDatesRepository(IDueDatesService dueDatesDL, IMapper mapper)
        {
            _DueDatesDL = dueDatesDL;
            _mapper = mapper;
        }

        public async Task<List<DueDateDTO>> GetDueDatesBl()
        {
            try
            {
                List<DueDate> dueDates = await _DueDatesDL.GetDueDates();
                List<DueDateDTO> ddDTO = _mapper.Map<List<DueDateDTO>>(dueDates);
                return ddDTO;

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetDueDatesBl: {ex.Message}");
                return null;
            }
        }

        public async Task<DueDateDTO> AddDueDateBL(DueDateDTO Id_dueDate)
        {
            try
            {
                DueDate dd = _mapper.Map<DueDate>(Id_dueDate);

                DueDate isAddDueDate = await _DueDatesDL.AddDueDate(dd);
                DueDateDTO ddx = _mapper.Map<DueDateDTO>(isAddDueDate);
                return ddx;


            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in AddDueDateBL: {ex.Message}");
                return null;
            }
        }

        public async Task<DueDateDTO> UpdateDueDatesBL(DueDateDTO dueDate, int IdDueDate)
        {
            try
            {
                DueDate dueDates = _mapper.Map<DueDate>(dueDate);
                DueDate dueDatesUpdate = await _DueDatesDL.Update(dueDates, IdDueDate);
                DueDateDTO dueDatesUpdateDTO = _mapper.Map<DueDateDTO>(dueDate);

                return dueDatesUpdateDTO;

            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in UpdateDueDatesBL: {ex.Message}");
                return null;
            }
        }
    }
}

