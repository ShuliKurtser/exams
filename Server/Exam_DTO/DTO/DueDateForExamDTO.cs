using ExamDL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exam_DTO.DTO
{
    public class DueDateForExamDTO
    {
        public int IdDueDate { get; set; }

        public DateOnly DueDate1 { get; set; }

        public string Description { get; set; } = null!;

        public int IdExam { get; set; }

        public string Time { get; set; } = null!;

        public double Cost { get; set; }

        public bool Status { get; set; }
    }
}
