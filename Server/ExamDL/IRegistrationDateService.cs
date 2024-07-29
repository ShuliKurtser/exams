using ExamDL.Models;

namespace ExamDL
{
    public interface IRegistrationDateService
    {
        Task<RegistrationDate> GetDate();
        Task<RegistrationDate> UpdateDate(RegistrationDate registrationDate);
    }
}