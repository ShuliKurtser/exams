using System;
using System.Collections.Generic;

namespace ExamDL.Models;

public partial class Permission
{
    public int IdPermissions { get; set; }

    public string PermissionsName { get; set; } = null!;

    public virtual ICollection<PersonalDetaile> PersonalDetailes { get; set; } = new List<PersonalDetaile>();
}
