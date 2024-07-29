using System;
using System.Collections.Generic;

namespace ExamDL.Models;

public partial class DueDate
{
    public int IdDueDate { get; set; }

    public DateOnly DueDate1 { get; set; }

    public string Description { get; set; } = null!;

    public int IdExam { get; set; }

    public string Time { get; set; } = null!;

    public double Cost { get; set; }

    public bool Status { get; set; }

    public virtual ICollection<ExamsUser> ExamsUsers { get; set; } = new List<ExamsUser>();

    public virtual Exam IdExamNavigation { get; set; } = null!;
}
