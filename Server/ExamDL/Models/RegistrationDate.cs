using System;
using System.Collections.Generic;

namespace ExamDL.Models;

public partial class RegistrationDate
{
    public int IdRegistrationDate { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }
}
