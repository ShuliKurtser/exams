using Exam_DTO.DTO;
using ExamBL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Exams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistationDateController : ControllerBase
    {
        IRegistationDateRepository _registationDateRepository;

        public RegistationDateController(IRegistationDateRepository registationDateRepository)
        {
            _registationDateRepository = registationDateRepository;
        }

        // GET: api/<RegistationDateController>
        [HttpGet]
        [Route("GetRegistationDate")]
        public async Task<RegistationDateDTO> GetDateBl()

        {
            return await _registationDateRepository.GetDateBl();
        }


        // GET api/<RegistationDateController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<RegistationDateController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<RegisUpdateDateBLtationDateController>/5

        [HttpPut]
        [Route("UpdateDate")]
        public async Task<RegistationDateDTO> UpdateDateBL(RegistationDateDTO Date)
        {
            RegistationDateDTO isUpdate = await _registationDateRepository.UpdateDateBL(Date);
            return isUpdate;
        }

        // DELETE api/<RegistationDateController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
