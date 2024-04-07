using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SignInDemo.Api.Models;
using SignInDemo.Api.Options;

namespace SignInDemo.Api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AccountController : Controller
{
    [HttpGet]
    [Route("provide-email")]
    public async Task<ActionResult> ProvideEmail([FromQuery] string email,
        [FromServices] IOptions<IdentitySettings> options,
        [FromServices] UserManager<User> userManager)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var isForbidden = options.Value.EmailDomainsBlacklist.Exists(email.Contains);
        if (isForbidden)
            return Ok(isForbidden);
        var user = await userManager.FindByEmailAsync(email);
        if (user is not null)
            return Ok("Email alrady used");
        return Ok();
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult> Register(
        [FromBody] RegistrationRequest request,
        [FromServices] IOptions<IdentitySettings> options,
        [FromServices] UserManager<User> userManager)
    {
        if (!ModelState.IsValid)
            return BadRequest();
        var result = await userManager.CreateAsync(new User() { Email = request.Email, UserName = request.Email },
            request.Password!);
        if (!result.Succeeded)
            return BadRequest(result);

        return Ok(new { message = "success", result = result });
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult> Login(
        [FromBody] LoginRequest request,
        [FromServices] UserManager<User> userManager,
        [FromServices] SignInManager<User> signInManager)
    {
        var user = await userManager.FindByEmailAsync(request.Email);

        var result = await signInManager.PasswordSignInAsync(user, request.Password, true, false);

        if (!result.Succeeded)
            return BadRequest();

        return Ok(new { message = "success" });
    }

    [HttpGet("logout")]
    public async Task<ActionResult> Logout([FromServices] SignInManager<User> signInManager)
    {
        await signInManager.SignOutAsync();
        return Ok();
    }
}