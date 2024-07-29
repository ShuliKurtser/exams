using Exam_DTO.DTO;

namespace ExamBL
{
    public interface IDueDatesRepository
    {
        Task<DueDateDTO> AddDueDateBL(DueDateDTO Id_dueDate);
        Task<List<DueDateDTO>> GetDueDatesBl();
        Task<DueDateDTO> UpdateDueDatesBL(DueDateDTO dueDate, int IdDueDate);
    }
}