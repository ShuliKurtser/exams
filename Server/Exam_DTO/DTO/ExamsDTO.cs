using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exam_DTO.DTO
{
    public class ExamsDTO
    {
        public int IdExam { get; set; }

        //public DateOnly Date { get; set; }

        public string Subjects { get; set; } = null!;

        //public DateOnly StartDate { get; set; }

        //public DateOnly EndDate { get; set; }

        //public string Time { get; set; } = null!;

        //public double Cost { get; set; }

        public virtual ICollection<DueDateForExamDTO>? DueDates { get; set; } = new List<DueDateForExamDTO>();

    }
}
