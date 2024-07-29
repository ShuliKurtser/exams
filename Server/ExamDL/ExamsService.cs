using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExamDL.Models;
using Microsoft.EntityFrameworkCore;

namespace ExamDL
{
    public class ExamsService : IExamsService
    {
        ExamsContext _examsContext;

        public ExamsService(ExamsContext examsContext)
        {
            _examsContext = examsContext;
        }

        public async Task<List<Exam>> GetExams()
        {
            try
            {
                List<Exam> exams = await _examsContext.Exams
                    .Include(e => e.DueDates)
                    .ToListAsync();
                               
                foreach (var exam in exams)
                {
                    exam.DueDates = exam.DueDates.Where(dd => dd.Status)
                    .ToList();
                }

                return exams;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching exams: {ex.Message}");
                throw;
            }
        }
        //    try
        //    {
        //        List<Exam> result = await _examsContext.Exams.Include(e => e.DueDates)

        //            .ToListAsync();
        //        return result;
        //    }
        //    catch (Exception ex)
        //    {

        //        Console.WriteLine($"An error occurred while fetching exams: {ex.Message}");

        //        throw;
        //    }
        //}



        public async Task<Exam> GetExamsById(int Idexam)
        {
            try
            {
                Exam result = await _examsContext.Exams
                    .Where(u => u.IdExam == Idexam)
                    .FirstOrDefaultAsync();
                return result;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching person exams: {ex.Message}");

                throw;
            }
        }
        public async Task<Exam> Add(Exam exam)
        {
            try
            {
                await _examsContext.Exams.AddAsync(exam);
                _examsContext.SaveChanges();
                //שליפה של האוביקט האחרון שהוכנס
                Exam e = await _examsContext.Exams
                    .OrderByDescending(e => e.IdExam)
                    .FirstOrDefaultAsync();
                return e;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }
    }
}


    
 