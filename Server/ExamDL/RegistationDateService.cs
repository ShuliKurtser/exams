using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExamDL.Models;
using Microsoft.EntityFrameworkCore;

namespace ExamDL
{
    public class RegistrationDateService : IRegistrationDateService
    {
        ExamsContext _examContext;
        public RegistrationDateService(ExamsContext examsContext)
        {
            _examContext = examsContext;
        }
        public async Task<RegistrationDate> GetDate()
        {
            try
            {
                RegistrationDate result = await _examContext.RegistrationDates.FirstOrDefaultAsync();
                return result;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching exams: {ex.Message}");

                throw;
            }

        }
        public async Task<RegistrationDate> UpdateDate(RegistrationDate registrationDate)
        {
            try
            {
                RegistrationDate existingDate = _examContext.RegistrationDates.FirstOrDefault();

                if (registrationDate != null)
                {
                    existingDate.StartDate = registrationDate.StartDate;
                    existingDate.EndDate = registrationDate.EndDate;


                    _examContext.Update(existingDate);

                    await _examContext.SaveChangesAsync();
                }

                return existingDate;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred during update: {ex.Message}");

                throw;
            }
        }



    }
}




