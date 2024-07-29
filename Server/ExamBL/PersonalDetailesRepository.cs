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
    public class PersonalDetailesRepository : IPersonalDetailesRepository
    {
        IPersonalDetailesService _PersonalDetailsDL;
        IMapper _mapper;


        public PersonalDetailesRepository(IPersonalDetailesService PersonalDetailsDL, IMapper mapper)
        {
            _PersonalDetailsDL = PersonalDetailsDL;
            _mapper = mapper;

        }
        public async Task<PersonalDetaileDTO> GetPersonDetailsByIdBl(int iduser)
        {
            try
            {
                PersonalDetaile currentUser = await _PersonalDetailsDL.GetPersonDetailsById(iduser);
                PersonalDetaileDTO pdDTO = _mapper.Map<PersonalDetaileDTO>(currentUser);
                return pdDTO;



            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in GetAllPersonDetailsByIdBl: {ex.Message}");
                return null;
            }
        }
        public async Task<PersonalDetaileDTO> GetPersonalLogin(string email, string userpassword)
        {
            try
            {
                PersonalDetaile currentUser = await _PersonalDetailsDL.GetPersonalLogin(email, userpassword);
                PersonalDetaileDTO pdDTO = _mapper.Map<PersonalDetaileDTO>(currentUser);
                return pdDTO;



            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in GetAllPersonDetailsByIdBl: {ex.Message}");
                return null;
            }
        }
        public async Task<List<PersonalDetaileDTO>> GetAllPersonalDetailsTestersBL()
        {
            try
            {
                List<PersonalDetaile> personalsDetailes = await _PersonalDetailsDL.GetAllPersonalDetailsTesters();
                List<PersonalDetaileDTO> pdDTO = _mapper.Map<List<PersonalDetaileDTO>>(personalsDetailes);
                return pdDTO;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in GetAllPersonalDetailsBL: {ex.Message}");
                return null;
            }
        }
        public async Task<List<PersonalDetaileDTO>> GetAllPersonalReliefReasonsTestersBL()
        {
            try
            {
                List<PersonalDetaile> personalsDetailes = await _PersonalDetailsDL.GetAllPersonalReliefReasonsTesters();
                List<PersonalDetaileDTO> pdDTO = _mapper.Map<List<PersonalDetaileDTO>>(personalsDetailes);
                return pdDTO;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in GetAllPersonalDetailsBL: {ex.Message}");
                return null;
            }
        }
        public async Task<List<PersonalDetaileDTO>> GetAllPersonalReliefTypesTestersBL()
        {
            try
            {
                List<PersonalDetaile> personalsDetailes = await _PersonalDetailsDL.GetAllPersonalReliefTypesTesters();
                List<PersonalDetaileDTO> pdDTO = _mapper.Map<List<PersonalDetaileDTO>>(personalsDetailes);
                return pdDTO;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in GetAllPersonalDetailsBL: {ex.Message}");
                return null;
            }
        }
        public async Task<List<PersonalDetaileDTO>> GetAllPersonalDetailsEmployeeBL()
        {
            try
            {
                List<PersonalDetaile> personalsDetailes = await _PersonalDetailsDL.GetAllPersonalDetailsEmployee();
                List<PersonalDetaileDTO> pdDTO = _mapper.Map<List<PersonalDetaileDTO>>(personalsDetailes);
                return pdDTO;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in GetAllPersonalDetailsBL: {ex.Message}");
                return null;
            }
        }

        public async Task<PersonalDetaileDTO> AddPersonalDelailesBL(PersonalDetaileDTO Id_User)
        {
            try
            {
                PersonalDetaile pdppp = _mapper.Map<PersonalDetaile>(Id_User);

                PersonalDetaile isAddPersonalDetails = await _PersonalDetailsDL.Add(pdppp);
                PersonalDetaileDTO pd = _mapper.Map<PersonalDetaileDTO>(isAddPersonalDetails);
                return pd;


            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in AddPersonalDelailesBL: {ex.Message}");
                return null;
            }
        }
        public async Task<PersonalDetaileDTO> UpdatePersonalDetailesBL(PersonalDetaileDTO User, int id)
        {
            try
            {
                PersonalDetaile personalDetaile = _mapper.Map<PersonalDetaile>(User);
                PersonalDetaile personalDetaileUpdate = await _PersonalDetailsDL.Update(personalDetaile, id);
                PersonalDetaileDTO personalDetaileUpdateDTO = _mapper.Map<PersonalDetaileDTO>(User);

                return personalDetaileUpdateDTO;

            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error in UpdatePersonalDetailesBL: {ex.Message}");
                return null;
            }
        }


        //public async Task<PersonalDetaileDTO> UpdatePersonalDetailesBL(int id, PersonalDetaileDTO user)
        //{
        //    try
        //    {
        //        PersonalDetaile personalDetaile = _mapper.Map<PersonalDetaile>(id);
        //        PersonalDetaile personalDetaileUpdate = await _PersonalDetailsDL.Update(personalDetaile);
        //        PersonalDetaileDTO personalDetaileUpdateDTO = _mapper.Map<PersonalDetaileDTO>(personalDetaileUpdate);

        //        return personalDetaileUpdateDTO;

        //    }
        //    catch (Exception ex)
        //    {

        //        Console.WriteLine($"Error in UpdatePersonalDetailesBL: {ex.Message}");
        //        return null;
        //    }
        //}
    }

}

