using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ExamDL.Models;

namespace ExamDL
{
    public class ExamsUserService : IExamsUserService
    {
        ExamsContext _examsContext;

        public ExamsUserService(ExamsContext examsContext)
        {
            _examsContext = examsContext;
        }


        public async Task<List<ExamsUser>> GetAllExams()
        {
            try {

                List<ExamsUser> result = await _examsContext.ExamsUsers
                     .Include(eu => eu.IdUserNavigation)
                     .Include(eu => eu.IdDueDateNavigation)
                     .ThenInclude(d => d.IdExamNavigation)
                    

      // Include related data from the Exam navigation property
      .ToListAsync();
                return result;
                // Include related data from the Exam navigation property
        }
            catch (Exception ex) {
                return null;
            }
        }


        //public async Task<List<ExamsUser>> GetAllExamsForUser(int userId)
        //{
        //    try
        //    {
        //      List< ExamsUser> result = await _examsContext.ExamsUsers
        //            .Where(u => u.IdUser == userId)
        //            .Include(eu => eu.IdUserNavigation)
        //             .Include(eu => eu.IdDueDateNavigation)
        //             .ThenInclude(d => d.IdExamNavigation)
        //            .ToListAsync();

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {

        //        Console.WriteLine($"An error occurred while fetching exams for user: {ex.Message}");

        //        throw;
        //    }
        //}

        public async Task<List<ExamsUser>> GetAllExamsForUser(int userId)
        {
            try
            {
            
                List<ExamsUser> result = await _examsContext.ExamsUsers
                    .Where(u => u.IdUser == userId)
                    .Include(eu => eu.IdUserNavigation)
                    .Include(eu => eu.IdDueDateNavigation)
                    .ThenInclude(d => d.IdExamNavigation)
                    //.Where(eu => eu.IdDueDateNavigation.Status == true)
                   
                    .ToListAsync();

                // Filter the included IdDueDateNavigation items based on status
                

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching exams for user: {ex.Message}");
                throw;
            }
        }


        public async Task<ExamsUser> Add(ExamsUser examsUser)
        {
            try
            {
                 _examsContext.ExamsUsers.AddAsync(examsUser);
              await  _examsContext.SaveChangesAsync();
                ExamsUser e = await _examsContext.ExamsUsers
                    .OrderByDescending(e => e.IdUser)
                    .FirstOrDefaultAsync();
                return e;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while adding an exams user: {ex.Message}");

                throw;
            }
        }

        public async Task<ExamsUser> Update(ExamsUser examUserToUpdate,int id)
        {
            try
            {
                ExamsUser updateOffice = await _examsContext.ExamsUsers.FirstOrDefaultAsync(x => x.IdExamUser == id);

                if (updateOffice != null)
                {

                    updateOffice.Class = examUserToUpdate.Class;
                    updateOffice.Grade = examUserToUpdate.Grade;
                    updateOffice.ExamsStatus = examUserToUpdate.ExamsStatus;
                   

                    _examsContext.Update(updateOffice);

                    await _examsContext.SaveChangesAsync();
                }

                return examUserToUpdate;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred during update: {ex.Message}");

                throw;
            }
        }

        public async Task<bool> AddExams(List<ExamsUser> examsUser)
        {
            try
            {
                _examsContext.ExamsUsers.AddRangeAsync(examsUser);
                await _examsContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while adding an exams user: {ex.Message}");

                throw;
            }
        }
    }
}
