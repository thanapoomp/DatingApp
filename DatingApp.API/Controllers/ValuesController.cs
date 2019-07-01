using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;

        public ValuesController(DataContext context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await _context.Values.ToListAsync();

            return Ok(values);
        }


        // GET api/values/5
        /// <summary>
        /// Get Value from id
        /// </summary>
        /// <param name="id">id description</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(x=>x.Id == id);
            return Ok(value);
        }

        
        /// <summary>
        /// Test Description 1
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("HelloWorld")]
        public  IActionResult GetHelloWorld()
        {
            var result = "Hello World";

            return Ok(result);
        }
    }
}
