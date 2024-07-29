using System;
using System.Collections.Generic;

namespace ExamDL.Models;

public partial class ReliefType
{
    public int IdReliefTypes { get; set; }

    public string ReliefTypes { get; set; } = null!;

    public virtual ICollection<ReliefUser> ReliefUsers { get; set; } = new List<ReliefUser>();
}
