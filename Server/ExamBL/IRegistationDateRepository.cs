using Exam_DTO.DTO;

namespace ExamBL
{
    public interface IRegistationDateRepository
    {
        Task<RegistationDateDTO> GetDateBl();
        Task<RegistationDateDTO> UpdateDateBL(RegistationDateDTO Date);
    }
}