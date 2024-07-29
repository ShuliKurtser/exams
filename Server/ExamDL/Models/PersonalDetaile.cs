using System;
using System.Collections.Generic;

namespace ExamDL.Models;

public partial class PersonalDetaile
{
    public int IdUser { get; set; }

    public string IdentityNum { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public string MaritalStatus { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Street { get; set; } = null!;

    public int Number { get; set; }

    public int HouseNum { get; set; }

    public int Zip { get; set; }

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string? FileStudyUrl { get; set; }

    public string FileTzUrl { get; set; } = null!;

    public string UserPassword { get; set; } = null!;

    public int? Permission { get; set; }

    public virtual ICollection<ExamsUser> ExamsUsers { get; set; } = new List<ExamsUser>();

    public virtual Permission? PermissionNavigation { get; set; }

    public virtual ICollection<ReliefUser> ReliefUsers { get; set; } = new List<ReliefUser>();
}
