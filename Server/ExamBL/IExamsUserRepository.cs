using Exam_DTO.DTO;
using ExamDL.Models;

namespace ExamBL
{
    public interface IExamsUserRepository
    {
        Task<ExamsUserDTO> Add(ExamsUserDTO examsUser);
        Task<bool> AddExams(List<ExamsUserDTO> examsUser);
        Task<List<ExamsUserDTO>> GetAllExamsBL();
        Task<List<ExamsUserDTO>>GetExamsForUserBL(int userId);
        Task<ExamsUserDTO> UpdateOfficeBL(ExamsUserDTO examUserToUpdateDTO, int id);
    }
}