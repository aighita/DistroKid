using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DistroKid.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddReleaseArtistAndPlatforms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ArtistId",
                table: "Release",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ReleasePlatform",
                columns: table => new
                {
                    PlatformsId = table.Column<Guid>(type: "uuid", nullable: false),
                    ReleaseId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReleasePlatform", x => new { x.PlatformsId, x.ReleaseId });
                    table.ForeignKey(
                        name: "FK_ReleasePlatform_Platform_PlatformsId",
                        column: x => x.PlatformsId,
                        principalTable: "Platform",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReleasePlatform_Release_ReleaseId",
                        column: x => x.ReleaseId,
                        principalTable: "Release",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Release_ArtistId",
                table: "Release",
                column: "ArtistId");

            migrationBuilder.CreateIndex(
                name: "IX_ReleasePlatform_ReleaseId",
                table: "ReleasePlatform",
                column: "ReleaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Release_User_ArtistId",
                table: "Release",
                column: "ArtistId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Release_User_ArtistId",
                table: "Release");

            migrationBuilder.DropTable(
                name: "ReleasePlatform");

            migrationBuilder.DropIndex(
                name: "IX_Release_ArtistId",
                table: "Release");

            migrationBuilder.DropColumn(
                name: "ArtistId",
                table: "Release");
        }
    }
}
