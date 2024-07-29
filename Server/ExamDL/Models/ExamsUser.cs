using System;
using System.Collections.Generic;

namespace ExamDL.Models;

public partial class ExamsUser
{
    public int IdExamUser { get; set; }

    public int IdUser { get; set; }

    public int IdExam { get; set; }

    public string? Class { get; set; }

    public string? Grade { get; set; }

    public bool? ExamsStatus { get; set; }

    public string? NotesOffice { get; set; }

    public string? NotesUser { get; set; }

    public int IdDueDate { get; set; }

    public virtual DueDate IdDueDateNavigation { get; set; } = null!;

    public virtual Exam IdExamNavigation { get; set; } = null!;

    public virtual PersonalDetaile IdUserNavigation { get; set; } = null!;
}
