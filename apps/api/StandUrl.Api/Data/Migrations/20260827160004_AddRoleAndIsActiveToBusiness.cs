using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StandUrl.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleAndIsActiveToBusiness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Businesses",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Businesses",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "business");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Businesses");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Businesses");
        }
    }
}
