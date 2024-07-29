using Exam_DTO.DTO;
using ExamBL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Exams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DueDatesContoller : ControllerBase
    {
        IDueDatesRepository _DueDatesRepository;

        public DueDatesContoller(IDueDatesRepository DueDatesRepository)
        {
            _DueDatesRepository = DueDatesRepository;
        }
        [HttpGet]
        [Route("GetDueDates")]
        public async Task<List<DueDateDTO>> GetDueDatesBl()
        {
            return await _DueDatesRepository.GetDueDatesBl();
        }

        [HttpPost]
        [Route("AddDueDate")]
        public async Task<DueDateDTO> AddDueDateBL(DueDateDTO Id_dueDate)
        {
            DueDateDTO isAddDueDate = await _DueDatesRepository.AddDueDateBL(Id_dueDate);
            return isAddDueDate;

        }



        [HttpPut]
        [Route("UpdateDueDates/{IdDueDate}")]
        public async Task<DueDateDTO> UpdateDueDatesBL(DueDateDTO dueDate, int IdDueDate)
        {
            DueDateDTO isUpdate = await _DueDatesRepository.UpdateDueDatesBL(dueDate, IdDueDate);
            return isUpdate;
        }
    }
}


