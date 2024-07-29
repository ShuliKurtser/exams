using Exam_DTO.DTO;
using ExamBL;
using ExamDL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Exams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamsUserController : ControllerBase
    {
        IExamsUserRepository _ExamsUserRepository;

        public ExamsUserController(IExamsUserRepository examsUserRepository)
        {
            _ExamsUserRepository = examsUserRepository;
        }

        // GET: api/<ExamsUser>
        [HttpGet]
        [Route("GetAllExams")]
        public async Task<List<ExamsUserDTO>> GetAllExamsBL()
        {
            return await _ExamsUserRepository.GetAllExamsBL();
        }


        // GET api/<ExamsUser>/5
        [HttpGet]
        [Route("GetExamsForUser")]

        public Task<List<ExamsUserDTO>> GetExamsForUser(int userId)
        {
            return _ExamsUserRepository.GetExamsForUserBL(userId);

        }

        // POST api/<ExamsUser>
        [HttpPost]
        [Route("Add")]

        public async Task<ExamsUserDTO> Add(ExamsUserDTO examsUser)
        {
            ExamsUserDTO isAddPersonalDetails = await _ExamsUserRepository.Add(examsUser);
            return isAddPersonalDetails;

        }

        // POST api/<ExamsUser>
        [HttpPost]
        [Route("AddExams")]

        public async Task<bool> AddExams(List<ExamsUserDTO> examsUser)
        {
            return await _ExamsUserRepository.AddExams(examsUser);
        }

        [HttpPut]
        [Route("ExamsUser/{id}")]
        public async Task<ExamsUserDTO> updateUserExam([FromBody] ExamsUserDTO examUserToUpdateDTO, int id)
        {
            ExamsUserDTO isUpdate = await _ExamsUserRepository.UpdateOfficeBL(examUserToUpdateDTO, id);
            return isUpdate;
        }
    

        // DELETE api/<ExamsUser>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

