using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DistroKid.Database.Migrations
{
    /// <inheritdoc />
    public partial class AEAC2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Label_LabelId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Label_LabelId1",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "LabelId1",
                table: "User",
                newName: "ManagerLabelId");

            migrationBuilder.RenameColumn(
                name: "LabelId",
                table: "User",
                newName: "ArtistLabelId");

            migrationBuilder.RenameIndex(
                name: "IX_User_LabelId1",
                table: "User",
                newName: "IX_User_ManagerLabelId");

            migrationBuilder.RenameIndex(
                name: "IX_User_LabelId",
                table: "User",
                newName: "IX_User_ArtistLabelId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Label_ArtistLabelId",
                table: "User",
                column: "ArtistLabelId",
                principalTable: "Label",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Label_ManagerLabelId",
                table: "User",
                column: "ManagerLabelId",
                principalTable: "Label",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Label_ArtistLabelId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Label_ManagerLabelId",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "ManagerLabelId",
                table: "User",
                newName: "LabelId1");

            migrationBuilder.RenameColumn(
                name: "ArtistLabelId",
                table: "User",
                newName: "LabelId");

            migrationBuilder.RenameIndex(
                name: "IX_User_ManagerLabelId",
                table: "User",
                newName: "IX_User_LabelId1");

            migrationBuilder.RenameIndex(
                name: "IX_User_ArtistLabelId",
                table: "User",
                newName: "IX_User_LabelId");

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
    }
}
