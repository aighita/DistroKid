using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DistroKid.Database.Migrations
{
    /// <inheritdoc />
    public partial class PlatformsNoReleases : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlatformReleases");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlatformReleases",
                columns: table => new
                {
                    PlatformsId = table.Column<Guid>(type: "uuid", nullable: false),
                    ReleasesId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlatformReleases", x => new { x.PlatformsId, x.ReleasesId });
                    table.ForeignKey(
                        name: "FK_PlatformReleases_Platform_PlatformsId",
                        column: x => x.PlatformsId,
                        principalTable: "Platform",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlatformReleases_Release_ReleasesId",
                        column: x => x.ReleasesId,
                        principalTable: "Release",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlatformReleases_ReleasesId",
                table: "PlatformReleases",
                column: "ReleasesId");
        }
    }
}
