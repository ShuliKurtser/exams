using Exam_DTO.DTO;

namespace ExamBL
{
    public interface IExamsRepository
    {
        Task<ExamsDTO> AddExamBL(ExamsDTO Id_Exam);
        Task<List<ExamsDTO>> GetExamsBl();
        Task<ExamsDTO> GetExamsById(int Idexam);
    }
}