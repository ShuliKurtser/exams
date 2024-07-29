using ExamDL.Models;

namespace ExamDL
{
    public interface IReliefUserService
    {
        Task<bool> AddRealif(List<ReliefUser> reliefuser);
        Task<List<ReliefReason>> GetallReliefReason();
        Task<List<ReliefUser>> GetAllReliefs();
        Task<List<ReliefType>> GetAllReliefType();
        Task<List<ReliefUser>> GetPersonRelief(int userId);
        Task<ReliefUser> Update(ReliefUser reliefUserToUpdate, int id);
    }
}