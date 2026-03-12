using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DistroKid.Database.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDuplicateArtistProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ArtistId",
                table: "Track",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "ISRC",
                table: "Track",
                type: "character varying(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Track_ArtistId",
                table: "Track",
                column: "ArtistId");

            migrationBuilder.AddForeignKey(
                name: "FK_Track_User_ArtistId",
                table: "Track",
                column: "ArtistId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Track_User_ArtistId",
                table: "Track");

            migrationBuilder.DropIndex(
                name: "IX_Track_ArtistId",
                table: "Track");

            migrationBuilder.DropColumn(
                name: "ArtistId",
                table: "Track");

            migrationBuilder.DropColumn(
                name: "ISRC",
                table: "Track");
        }
    }
}
