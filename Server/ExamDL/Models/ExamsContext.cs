using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ExamDL.Models;

public partial class ExamsContext : DbContext
{
    public ExamsContext()
    {
    }

    public ExamsContext(DbContextOptions<ExamsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<DueDate> DueDates { get; set; }

    public virtual DbSet<Exam> Exams { get; set; }

    public virtual DbSet<ExamsUser> ExamsUsers { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<PersonalDetaile> PersonalDetailes { get; set; }

    public virtual DbSet<RegistrationDate> RegistrationDates { get; set; }

    public virtual DbSet<ReliefReason> ReliefReasons { get; set; }

    public virtual DbSet<ReliefType> ReliefTypes { get; set; }

    public virtual DbSet<ReliefUser> ReliefUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-GGJUHG9;Database=Exams;Trusted_Connection=True;TrustServerCertificate=True\n;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DueDate>(entity =>
        {
            entity.HasKey(e => e.IdDueDate);

            entity.Property(e => e.IdDueDate).HasColumnName("Id_dueDate");
            entity.Property(e => e.Description).HasMaxLength(100);
            entity.Property(e => e.DueDate1).HasColumnName("DueDate");
            entity.Property(e => e.IdExam).HasColumnName("Id_exam");
            entity.Property(e => e.Time)
                .HasMaxLength(10)
                .IsFixedLength();

            entity.HasOne(d => d.IdExamNavigation).WithMany(p => p.DueDates)
                .HasForeignKey(d => d.IdExam)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DueDates_Exams");
        });

        modelBuilder.Entity<Exam>(entity =>
        {
            entity.HasKey(e => e.IdExam);

            entity.Property(e => e.IdExam).HasColumnName("Id_exam");
            entity.Property(e => e.Subjects).HasMaxLength(50);
        });

        modelBuilder.Entity<ExamsUser>(entity =>
        {
            entity.HasKey(e => e.IdExamUser);

            entity.ToTable("Exams_Users");

            entity.Property(e => e.IdExamUser).HasColumnName("Id_examUser");
            entity.Property(e => e.Class).HasMaxLength(30);
            entity.Property(e => e.ExamsStatus).HasDefaultValueSql("(NULL)");
            entity.Property(e => e.Grade).HasMaxLength(30);
            entity.Property(e => e.IdDueDate).HasColumnName("Id_dueDate");
            entity.Property(e => e.IdExam).HasColumnName("Id_Exam");
            entity.Property(e => e.IdUser).HasColumnName("Id_User");
            entity.Property(e => e.NotesOffice).HasMaxLength(30);
            entity.Property(e => e.NotesUser).HasMaxLength(30);

            entity.HasOne(d => d.IdDueDateNavigation).WithMany(p => p.ExamsUsers)
                .HasForeignKey(d => d.IdDueDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Exams_Users_DueDates");

            entity.HasOne(d => d.IdExamNavigation).WithMany(p => p.ExamsUsers)
                .HasForeignKey(d => d.IdExam)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Exams_Users_Exams");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.ExamsUsers)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Exams_Users_PersonalDetailes");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.IdPermissions).HasName("PK_Permissions");

            entity.ToTable("Permission");

            entity.Property(e => e.IdPermissions).HasColumnName("Id_Permissions");
            entity.Property(e => e.PermissionsName).HasMaxLength(30);
        });

        modelBuilder.Entity<PersonalDetaile>(entity =>
        {
            entity.HasKey(e => e.IdUser).HasName("PK_PersonalDetailes_1");

            entity.Property(e => e.IdUser).HasColumnName("Id_user");
            entity.Property(e => e.City).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(30);
            entity.Property(e => e.FileStudyUrl).HasMaxLength(50);
            entity.Property(e => e.FileTzUrl).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.Gender).HasMaxLength(30);
            entity.Property(e => e.IdentityNum).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.MaritalStatus).HasMaxLength(50);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.Street).HasMaxLength(20);
            entity.Property(e => e.UserPassword).HasMaxLength(30);

            entity.HasOne(d => d.PermissionNavigation).WithMany(p => p.PersonalDetailes)
                .HasForeignKey(d => d.Permission)
                .HasConstraintName("FK_PersonalDetailes_Permission");
        });

        modelBuilder.Entity<RegistrationDate>(entity =>
        {
            entity.HasKey(e => e.IdRegistrationDate);

            entity.Property(e => e.IdRegistrationDate).HasColumnName("Id_RegistrationDate");
        });

        modelBuilder.Entity<ReliefReason>(entity =>
        {
            entity.HasKey(e => e.IdReliefReasons);

            entity.Property(e => e.IdReliefReasons).HasColumnName("Id_ReliefReasons");
            entity.Property(e => e.Reasons).HasMaxLength(50);
        });

        modelBuilder.Entity<ReliefType>(entity =>
        {
            entity.HasKey(e => e.IdReliefTypes);

            entity.Property(e => e.IdReliefTypes).HasColumnName("Id_ReliefTypes");
            entity.Property(e => e.ReliefTypes).HasMaxLength(30);
        });

        modelBuilder.Entity<ReliefUser>(entity =>
        {
            entity.HasKey(e => e.IdReliefUser).HasName("PK_Relief_users");

            entity.ToTable("Relief_Users");

            entity.Property(e => e.IdReliefUser).HasColumnName("Id_reliefUser");
            entity.Property(e => e.IdReliefReasons).HasColumnName("Id_ReliefReasons");
            entity.Property(e => e.IdReliefTypes).HasColumnName("Id_ReliefTypes");
            entity.Property(e => e.IdUser).HasColumnName("Id_User");
            entity.Property(e => e.ReliefExplanation).HasMaxLength(50);
            entity.Property(e => e.ReliefFile)
                .HasMaxLength(50)
                .HasColumnName("Relief_File");
            entity.Property(e => e.ReliefStatus).HasDefaultValueSql("(NULL)");

            entity.HasOne(d => d.IdReliefReasonsNavigation).WithMany(p => p.ReliefUsers)
                .HasForeignKey(d => d.IdReliefReasons)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Relief_Us__Id_Re__35BCFE0A");

            entity.HasOne(d => d.IdReliefTypesNavigation).WithMany(p => p.ReliefUsers)
                .HasForeignKey(d => d.IdReliefTypes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Relief_Us__Id_Re__34C8D9D1");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.ReliefUsers)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Relief_Us__Id_Us__4589517F");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
