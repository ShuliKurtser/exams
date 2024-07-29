using ExamDL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exam_DTO.DTO
{
    public class ExamsUserDTO
    {
        public int IdExamUser { get; set; }
        public int IdUser { get; set; }

        public int IdExam { get; set; }

        //public string IdFileStudy { get; set; } = null!;

        public string? Class { get; set; }

        public string? Grade { get; set; }

        public bool? ExamsStatus { get; set; }

        public string? NotesOffice { get; set; }

        public string? NotesUser { get; set; }

        public int IdDueDate { get; set; } 


        //public PersonalDetaileDTO? PersonalDetaile { get; set; }

        //public ExamsDTO? IdExamNavigation { get; set; }

        public DueDateDTO? IdDueDateNavigation { get; set; } = null!;

    }
}
