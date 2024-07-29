using Exam_DTO;
using ExamBL;
using ExamDL;
using ExamDL.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.ConstrainedExecution;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(AutoMapping));
builder.Services.AddScoped<IPersonalDetailesRepository, PersonalDetailesRepository>();
builder.Services.AddScoped<IPersonalDetailesService, PersonalDetailesService>();
builder.Services.AddScoped<IExamsRepository, ExamsRepository>();
builder.Services.AddScoped<IExamsService, ExamsService>();
builder.Services.AddScoped<IExamsUserRepository, ExamsUserRepository>();
builder.Services.AddScoped<IExamsUserService, ExamsUserService>();
builder.Services.AddScoped<IReliefUserRepository, ReliefUserRepository>();
builder.Services.AddScoped<IReliefUserService, ReliefUserService>();
builder.Services.AddScoped<IRegistationDateRepository, RegistationDateRepository>();
builder.Services.AddScoped<IRegistrationDateService, RegistrationDateService>();
builder.Services.AddScoped<IDueDatesService, DueDatesService>();
builder.Services.AddScoped<IDueDatesRepository, DueDatesRepository>();
builder.Services.AddDbContext<ExamsContext>(options =>
         options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.Run();