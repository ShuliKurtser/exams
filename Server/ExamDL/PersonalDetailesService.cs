using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExamDL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ExamDL
{
    public class PersonalDetailesService : IPersonalDetailesService
    {
        ExamsContext _examsContext;
        public PersonalDetailesService(ExamsContext examsContext)
        {
            _examsContext = examsContext;
        }


        public async Task<PersonalDetaile> GetPersonDetailsById(int iduser)
        {
            try
            {
                PersonalDetaile result = await _examsContext.PersonalDetailes
                     .Where(u => u.IdUser == iduser)
                     .FirstOrDefaultAsync();
                return result;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching personal details by ID: {ex.Message}");

                throw;
            }
        }
        //public async Task<PersonalDetaile> GetByPermision(int permission)
        //{
        //    try
        //    {
        //        PersonalDetaile result = await _personalDetails.PersonalDetailes
        //             .Where(u => u.IdUser == iduser)
        //             .FirstOrDefaultAsync();
        //        return result;
        //    }
        //    catch (Exception ex)
        //    {

        //        Console.WriteLine($"An error occurred while fetching personal details by ID: {ex.Message}");

        //        throw;
        //    }
         

        public async Task<List<PersonalDetaile>> GetAllPersonalDetailsEmployee()
        {
            try
            {
                List<PersonalDetaile> result = await _examsContext.PersonalDetailes.Where(x => x.Permission == 2 || x.Permission == 3)
                     .ToListAsync();
                return result;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching personal details: {ex.Message}");

                throw;
            }
        }

        public async Task<List<PersonalDetaile>> GetAllPersonalDetailsTesters()
        {
            try
            {
                List<PersonalDetaile> result = await _examsContext.PersonalDetailes.Where(x => x.Permission == 1)
                   .Include(r => r.ReliefUsers).ThenInclude(ru => ru.IdReliefReasonsNavigation)
                    .Include(r => r.ReliefUsers).ThenInclude(ru => ru.IdReliefTypesNavigation)
                    .Include(p => p.ExamsUsers)
                    .ThenInclude(eu => eu.IdDueDateNavigation).ThenInclude(eu => eu.IdExamNavigation)
                     .ToListAsync();
                return result;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching personal details: {ex.Message}");

                throw;
            }
        }
        public async Task<PersonalDetaile> GetPersonalLogin(string Email, string UserPassword)
        {
            try
            {
                PersonalDetaile res = await _examsContext.PersonalDetailes
                     .Where(e => e.Email == Email && e.UserPassword == UserPassword)
                     .FirstOrDefaultAsync();

                return res;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching personal details: {ex.Message}");

                throw;
            }
        }
        public async Task<PersonalDetaile> Add(PersonalDetaile personalDetaile)
{
    try
    {
        // בדיקה אם תעודת הזהות כבר קיימת בדטה בייס
        var idExists = await _examsContext.PersonalDetailes
            .AnyAsync(p => p.IdentityNum == personalDetaile.IdentityNum);

        if (idExists)
        {
            Console.WriteLine("תעודת הזהות כבר קיימת במערכת.");
            return null;
        }

        await _examsContext.PersonalDetailes.AddAsync(personalDetaile);
        await _examsContext.SaveChangesAsync();

        // שליפה של האוביקט האחרון שהוכנס
        PersonalDetaile p = await _examsContext.PersonalDetailes
            .OrderByDescending(e => e.IdUser)
            .FirstOrDefaultAsync();

        return p;
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.ToString());
        return null;
    }
}

        //public async Task<PersonalDetaile> Add(PersonalDetaile personalDetaile)
        //{
        //    try
        //    {
        //        await _examsContext.PersonalDetailes.AddAsync(personalDetaile);
        //        _examsContext.SaveChanges();
        //        //שליפה של האוביקט האחרון שהוכנס
        //        PersonalDetaile p = await _examsContext.PersonalDetailes
        //            .OrderByDescending(e => e.IdUser)
        //            .FirstOrDefaultAsync();
        //        return p;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex.ToString());
        //        return null;
        //    }
        //}
        public async Task<List<PersonalDetaile>> GetAllPersonalReliefTypesTesters()
        {
            try
            {
                List<PersonalDetaile> result = await _examsContext.PersonalDetailes.Where(x => x.Permission == 1)
                    .Include(p => p.ReliefUsers).ThenInclude(eu => eu.IdReliefTypesNavigation)
                     .ToListAsync();
                return result;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching personal details: {ex.Message}");

                throw;
            }
        }

        public async Task<List<PersonalDetaile>> GetAllPersonalReliefReasonsTesters()
        {
            try
            {
                List<PersonalDetaile> result = await _examsContext.PersonalDetailes.Where(x => x.Permission == 1)
                    .Include(p => p.ReliefUsers).ThenInclude(eu => eu.IdReliefReasonsNavigation)
                     .ToListAsync();
                return result;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred while fetching personal details: {ex.Message}");

                throw;
            }
        }
        public async Task<PersonalDetaile> Update(PersonalDetaile personalDetaile, int id)
        {
            try
            {
                PersonalDetaile existingPerson = _examsContext.PersonalDetailes.FirstOrDefault(x => x.IdUser == id);

                if (existingPerson != null)
                {
                    existingPerson.Street = personalDetaile.Street;
                    existingPerson.City = personalDetaile.City;
                    existingPerson.Number = personalDetaile.Number;
                    existingPerson.IdentityNum = personalDetaile.IdentityNum;
                    existingPerson.BirthDate = personalDetaile.BirthDate;
                    existingPerson.Email = personalDetaile.Email;
                    existingPerson.FirstName = personalDetaile.FirstName;
                    existingPerson.LastName = personalDetaile.LastName;
                    existingPerson.Gender = personalDetaile.Gender;
                    existingPerson.HouseNum = personalDetaile.HouseNum;
                    existingPerson.MaritalStatus = personalDetaile.MaritalStatus;
                    existingPerson.Number = personalDetaile.Number;
                    existingPerson.UserPassword = personalDetaile.UserPassword;
                    existingPerson.Zip = personalDetaile.Zip;
                    existingPerson.FileStudyUrl = personalDetaile.FileStudyUrl;
                    existingPerson.FileTzUrl = personalDetaile.FileTzUrl;



                    _examsContext.Update(existingPerson);

                    await _examsContext.SaveChangesAsync();
                }

                return existingPerson;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred during update: {ex.Message}");

                throw;
            }
        }



    }
}


