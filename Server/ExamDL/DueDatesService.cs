using ExamDL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExamDL
{
    public class DueDatesService : IDueDatesService

    {
        ExamsContext _examContext;

        public DueDatesService(ExamsContext examsContext)
        {
            _examContext = examsContext;


        }
        public async Task<List<DueDate>> GetDueDates()
        {
            try
            {
                List<DueDate> result = await _examContext.DueDates
                      .Include(eu => eu.IdExamNavigation)
                      .ToListAsync();
                return result;

            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching relief data: {ex.Message}");

                throw;
            }
        }
        public async Task<DueDate> AddDueDate(DueDate dueDate)
        {
            try
            {
                _examContext.DueDates.AddAsync(dueDate);
                await _examContext.SaveChangesAsync();

                DueDate e = await _examContext.DueDates
                    .OrderByDescending(e => e.IdDueDate)
                     .Include(eu => eu.IdExamNavigation)
                    .FirstOrDefaultAsync();

                return e;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while adding an exams user: {ex.Message}");

                throw;
            }
        }


        public async Task<DueDate> Update(DueDate DueDatesToUpdate, int IdDueDate)
        {
            try
            {

                DueDate updateDueDates = await _examContext.DueDates
                    .Include(eu => eu.IdExamNavigation)
                    .FirstOrDefaultAsync(x => x.IdDueDate == IdDueDate);

                if (updateDueDates != null)
                {
                    updateDueDates.DueDate1 = DueDatesToUpdate.DueDate1;
                    updateDueDates.Description = DueDatesToUpdate.Description;
                    updateDueDates.IdExam = DueDatesToUpdate.IdExam;
                    updateDueDates.Time = DueDatesToUpdate.Time;
                    updateDueDates.Cost = DueDatesToUpdate.Cost;
                    updateDueDates.Status = DueDatesToUpdate.Status;
                    updateDueDates.IdExamNavigation = await _examContext.Exams.FirstOrDefaultAsync(eu => eu.IdExam == DueDatesToUpdate.IdExam);

                    _examContext.Update(updateDueDates);

                    await _examContext.SaveChangesAsync();
                }

                return updateDueDates;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred during update: {ex.Message}");
                throw;
            }
        }
    }
}
