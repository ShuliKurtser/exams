using System;
using System.Collections.Generic;

namespace ExamDL.Models;

public partial class ReliefUser
{
    public int IdReliefUser { get; set; }

    public int IdUser { get; set; }

    public int IdReliefTypes { get; set; }

    public int IdReliefReasons { get; set; }

    public string ReliefExplanation { get; set; } = null!;

    public bool? ReliefStatus { get; set; }

    public string ReliefFile { get; set; } = null!;

    public virtual ReliefReason IdReliefReasonsNavigation { get; set; } = null!;

    public virtual ReliefType IdReliefTypesNavigation { get; set; } = null!;

    public virtual PersonalDetaile IdUserNavigation { get; set; } = null!;
}
