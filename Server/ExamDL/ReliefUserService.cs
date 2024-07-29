using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExamDL.Models;
using Microsoft.EntityFrameworkCore;

namespace ExamDL
{
    public class ReliefUserService : IReliefUserService
    {
        ExamsContext _examsContext;
        public ReliefUserService(ExamsContext examsContext)
        {
            _examsContext = examsContext;
        }
        //פוקצית GET
        public async Task<List<ReliefUser>> GetAllReliefs()
        {
            try
            {
                List<ReliefUser> result = await _examsContext.ReliefUsers
                     .Include(eu => eu.IdUserNavigation)
                     .Include(eu => eu.IdReliefTypesNavigation)
                     .Include(eu => eu.IdReliefReasonsNavigation)
                     .ToListAsync();
                return result;

            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public async Task<List<ReliefUser>> GetPersonRelief(int userId)
        {
            try
            {
                List<ReliefUser> result = await _examsContext.ReliefUsers
                    .Where(u => u.IdUser == userId)
                    .Include(eu => eu.IdReliefReasonsNavigation)
                    .Include(rtu => rtu.IdReliefTypesNavigation)
                    .ToListAsync();
                return result;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching relief data: {ex.Message}");

                throw;
            }
        }
        public async Task<List<ReliefType>> GetAllReliefType()
        {
            try
            {
                List<ReliefType> result = await _examsContext.ReliefTypes

                    .ToListAsync();
                return result;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching relief types: {ex.Message}");

                throw;
            }
        }

        public async Task<List<ReliefReason>> GetallReliefReason()
        {
            try
            {
                List<ReliefReason> result = await _examsContext.ReliefReasons
                    .ToListAsync();
                return result;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching relief reasons: {ex.Message}");

                throw;
            }
        }

        public async Task<bool> AddRealif(List<ReliefUser> reliefuser)
        {
            try
            {
                _examsContext.ReliefUsers.AddRangeAsync(reliefuser);
                await _examsContext.SaveChangesAsync();
                return true;


            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while adding relief: {ex.Message}");

                throw;
            }
        }
        public async Task<ReliefUser> Update(ReliefUser reliefUserToUpdate, int id)
        {
            try
            {
                ReliefUser updateOffice = await _examsContext.ReliefUsers.FirstOrDefaultAsync(x => x.IdReliefUser == id);

                if (updateOffice != null)
                {

                    updateOffice.ReliefStatus = reliefUserToUpdate.ReliefStatus;

                    _examsContext.Update(updateOffice);

                    await _examsContext.SaveChangesAsync();
                }

                return reliefUserToUpdate;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred during update: {ex.Message}");

                throw;
            }
        }

        //public async Task<bool> AddRealif(ReliefUser Reliefuser)
        //{
        //    try
        //    {
        //        var Relief = await _examsContext.ReliefUsers.AddAsync(Reliefuser);
        //        await _examsContext.SaveChangesAsync();
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {

        //        Console.WriteLine($"An error occurred while adding relief: {ex.Message}");

        //        throw;
        //    }
        //}

    }
}
