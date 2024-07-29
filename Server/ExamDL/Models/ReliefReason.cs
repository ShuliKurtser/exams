using System;
using System.Collections.Generic;

namespace ExamDL.Models;

public partial class ReliefReason
{
    public int IdReliefReasons { get; set; }

    public string? Reasons { get; set; }

    public int? IdRelief { get; set; }

    public virtual ICollection<ReliefUser> ReliefUsers { get; set; } = new List<ReliefUser>();
}
