using ExamDL.Models;

namespace ExamDL
{
    public interface IDueDatesService
    {
        Task<DueDate> AddDueDate(DueDate dueDate);
        Task<List<DueDate>> GetDueDates();
        Task<DueDate> Update(DueDate DueDatesToUpdate, int IdDueDate);
    }
}