using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Exams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Api : ControllerBase
    {
       
            // פעולה זו תקבל את המלל המעודכן ותשמור אותו
            [HttpPost("updateExamDates")]
            public IActionResult UpdateExamDates([FromBody] UpdateExamDatesRequest request)
            {
                if (request == null || string.IsNullOrEmpty(request.ExamDatesText))
                {
                    return BadRequest("Invalid request");
                }

                // שמירה של המלל המעודכן (לדוגמה, שמירה במסד נתונים)
                // כאן אפשר להוסיף קוד לשמירת המלל במסד הנתונים

                return Ok(new { message = "Exam dates updated successfully" });
            }
        }

        public class UpdateExamDatesRequest
        {
            public string ExamDatesText { get; set; }
        }

    }

