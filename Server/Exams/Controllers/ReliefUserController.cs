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
    public class ReliefUserController : ControllerBase
    {
        IReliefUserRepository _ReliefUserRepository;

        public ReliefUserController(IReliefUserRepository reliefUserRepository)
        {
            _ReliefUserRepository = reliefUserRepository;
        }
        [HttpGet]
        [Route("GetAllReliefs")]

        public Task<List<ReliefUserDTO>> GetAllReliefsBl()
        {
            return _ReliefUserRepository.GetAllReliefsBl();

        }

        // GET api/<ReliefUserController>/5
        [HttpGet]
        [Route("GetPersonRelief")]

        public Task<List<ReliefUserDTO>> GetPersonReliefBL(int iduser)
        {
            return _ReliefUserRepository.GetPersonReliefBL(iduser);

        }
        [HttpGet]
        [Route("GetAllReliefType")]
        public async Task<List<ReliefTypeDTO>> GetAllReliefTypeBL()
        {
            return await _ReliefUserRepository.GetAllReliefTypeBL();
        }
        [HttpGet]
        [Route("GetallReliefReason")]
        public async Task<List<ReliefReasonDTO>> GetallReliefReasonBL()
        {
            return await _ReliefUserRepository.GetallReliefReasonBL();
        }

        [HttpPost]
        [Route("AddRealif_User")]
        public async Task<bool> AddRealif_UserBL(List <ReliefUserDTO> reliefuser)
        {
            bool isAddReliefUser = await _ReliefUserRepository.AddRealif_UserBL(reliefuser);
            return isAddReliefUser;
        }
        [HttpPut]
        [Route("ReliefUser/{id}")]
        public async Task<ReliefUserDTO> updateUserExam( ReliefUserDTO reliefUserToUpdateDTO, int id)
        {
            ReliefUserDTO isUpdate = await _ReliefUserRepository.UpdateOfficeBL(reliefUserToUpdateDTO, id);
            return isUpdate;
        }

        // DELETE api/<ReliefUserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
