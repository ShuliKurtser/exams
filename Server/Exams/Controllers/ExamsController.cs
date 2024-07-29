using Exam_DTO.DTO;
using ExamBL;
using ExamDL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860


namespace Exams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamsController : ControllerBase
    {
        IExamsRepository _ExamsRepository;

        public ExamsController(IExamsRepository ExamsRepository)
        {
            _ExamsRepository = ExamsRepository;
        }


        // GET: api/<ExamsController>
        [HttpGet]
        [Route("GetExams")]
        public async Task<List<ExamsDTO>> GetExamsBl()
        {
            return await _ExamsRepository.GetExamsBl();
        }

        // GET api/<ExamsController>/5
        [HttpGet]
        [Route("GetExamsById")]
        public async Task<ExamsDTO> GetExamsById(int Idexam)
        {
            return await _ExamsRepository.GetExamsById(Idexam);
        }
        [HttpPost]
        [Route("AddExam")]
        public async Task<ExamsDTO> AddExamBL(ExamsDTO Id_Exam)
        {
            ExamsDTO isAddExam = await _ExamsRepository.AddExamBL(Id_Exam);
            return isAddExam;

        }

        // PUT api/<ExamsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ExamsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
