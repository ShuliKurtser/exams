using ExamDL.Models;

namespace ExamDL
{
    public interface IExamsService
    {
        Task<Exam> Add(Exam exam);
        Task<List<Exam>> GetExams();
        Task<Exam> GetExamsById(int Idexam);
    }
}