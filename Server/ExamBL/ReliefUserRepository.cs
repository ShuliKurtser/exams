

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exam_DTO.DTO;
using ExamDL.Models;
using AutoMapper;
using ExamDL;


namespace ExamBL
{
    public class ReliefUserRepository : IReliefUserRepository
    {
        IReliefUserService _ReliefUsersDL;
        IMapper _mapper;

        public ReliefUserRepository(IReliefUserService reliefDL, IMapper mapper)
        {
            _ReliefUsersDL = reliefDL;
            _mapper = mapper;
        }
        public async Task<List<ReliefUserDTO>> GetAllReliefsBl()
        {
            try
            {
                List<ReliefUser> AllReliefes = await _ReliefUsersDL.GetAllReliefs();
                List<ReliefUserDTO> arlDTO = _mapper.Map<List<ReliefUserDTO>>(AllReliefes);
                return arlDTO;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetAllExamsForUserBL: {ex.Message}");
                return null;
            }

        }


        public async Task<List<ReliefUserDTO>> GetPersonReliefBL(int userId)
        {
            try
            {
                List<ReliefUser> relief = await _ReliefUsersDL.GetPersonRelief(userId);
                List<ReliefUserDTO> rlDTO = _mapper.Map<List<ReliefUserDTO>>(relief);
                return rlDTO;

            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in GetAllPersonReliefBL: {ex.Message}");
                return null;
            }
        }

        public async Task<List<ReliefTypeDTO>> GetAllReliefTypeBL()
        {
            try
            {
                List<ReliefType> reliefType = await _ReliefUsersDL.GetAllReliefType();
                List<ReliefTypeDTO> rlDTO = _mapper.Map<List<ReliefTypeDTO>>(reliefType);
                return rlDTO;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetAllReliefTypeBL: {ex.Message}");
                return new List<ReliefTypeDTO>();
            }
        }
        public async Task<List<ReliefReasonDTO>> GetallReliefReasonBL()
        {
            try
            {
                List<ReliefReason> reliefReason = await _ReliefUsersDL.GetallReliefReason();
                List<ReliefReasonDTO> rlDTO = _mapper.Map<List<ReliefReasonDTO>>(reliefReason);
                return rlDTO;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in GetallReliefReasonBL: {ex.Message}");
                return new List<ReliefReasonDTO>();
            }
        }
        public async Task<bool> AddRealif_UserBL(List<ReliefUserDTO> reliefuser)
        {
            try
            {
                List<ReliefUser> ru = _mapper.Map<List<ReliefUser>>(reliefuser);
                bool isAdd = await _ReliefUsersDL.AddRealif(ru);
                return isAdd;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in AddRealif_UserBL: {ex.Message}");
                return false;
            }
        }
        public async Task<ReliefUserDTO> UpdateOfficeBL(ReliefUserDTO reliefUserToUpdateDTO, int id)
        {
            try
            {
                ReliefUser reliefUserToUpdate = _mapper.Map<ReliefUser>(reliefUserToUpdateDTO);
                ReliefUser updatedUserRelief = await _ReliefUsersDL.Update(reliefUserToUpdate, id);
                ReliefUserDTO updatedUserExamDTO = _mapper.Map<ReliefUserDTO>(updatedUserRelief);

                return reliefUserToUpdateDTO;

            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in UpdatePersonalDetailesBL: {ex.Message}");
                return null;
            }
        }
    }
}


    

