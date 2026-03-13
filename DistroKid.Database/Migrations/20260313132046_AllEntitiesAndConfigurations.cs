using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DistroKid.Database.Migrations
{
    /// <inheritdoc />
    public partial class AllEntitiesAndConfigurations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "LabelId",
                table: "User",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LabelId1",
                table: "User",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Event",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Location = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ArtistId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Event", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Event_User_ArtistId",
                        column: x => x.ArtistId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Label",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Website = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Label", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Merch",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Stock = table.Column<int>(type: "integer", nullable: false),
                    ArtistId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Merch", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Merch_User_ArtistId",
                        column: x => x.ArtistId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Platform",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Platform", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Platform_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Release",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    ReleaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Label = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    ReleaseType = table.Column<string>(type: "text", nullable: false),
                    LabelId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Release", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Release_Label_LabelId",
                        column: x => x.LabelId,
                        principalTable: "Label",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

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

            migrationBuilder.CreateTable(
                name: "ReleaseTrack",
                columns: table => new
                {
                    ReleasesId = table.Column<Guid>(type: "uuid", nullable: false),
                    TracksId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReleaseTrack", x => new { x.ReleasesId, x.TracksId });
                    table.ForeignKey(
                        name: "FK_ReleaseTrack_Release_ReleasesId",
                        column: x => x.ReleasesId,
                        principalTable: "Release",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReleaseTrack_Track_TracksId",
                        column: x => x.TracksId,
                        principalTable: "Track",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_LabelId",
                table: "User",
                column: "LabelId");

            migrationBuilder.CreateIndex(
                name: "IX_User_LabelId1",
                table: "User",
                column: "LabelId1");

            migrationBuilder.CreateIndex(
                name: "IX_Event_ArtistId",
                table: "Event",
                column: "ArtistId");

            migrationBuilder.CreateIndex(
                name: "IX_Merch_ArtistId",
                table: "Merch",
                column: "ArtistId");

            migrationBuilder.CreateIndex(
                name: "IX_Platform_UserId",
                table: "Platform",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformReleases_ReleasesId",
                table: "PlatformReleases",
                column: "ReleasesId");

            migrationBuilder.CreateIndex(
                name: "IX_Release_LabelId",
                table: "Release",
                column: "LabelId");

            migrationBuilder.CreateIndex(
                name: "IX_ReleaseTrack_TracksId",
                table: "ReleaseTrack",
                column: "TracksId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Label_LabelId",
                table: "User",
                column: "LabelId",
                principalTable: "Label",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Label_LabelId1",
                table: "User",
                column: "LabelId1",
                principalTable: "Label",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Label_LabelId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Label_LabelId1",
                table: "User");

            migrationBuilder.DropTable(
                name: "Event");

            migrationBuilder.DropTable(
                name: "Merch");

            migrationBuilder.DropTable(
                name: "PlatformReleases");

            migrationBuilder.DropTable(
                name: "ReleaseTrack");

            migrationBuilder.DropTable(
                name: "Platform");

            migrationBuilder.DropTable(
                name: "Release");

            migrationBuilder.DropTable(
                name: "Label");

            migrationBuilder.DropIndex(
                name: "IX_User_LabelId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_LabelId1",
                table: "User");

            migrationBuilder.DropColumn(
                name: "LabelId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "LabelId1",
                table: "User");
        }
    }
}
