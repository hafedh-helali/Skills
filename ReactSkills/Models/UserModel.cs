namespace ReactSkills.Models
{
    public class UserModel
    {
        public required string Email { get; set; }

        public required string Password { get; set; }

        public bool IsActive { get; set; }

        public DateTime ExpiresOn { get; set; }
    }
}