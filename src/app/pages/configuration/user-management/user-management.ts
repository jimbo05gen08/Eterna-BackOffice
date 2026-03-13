import { Component } from "@angular/core";
import { ToolbarModule } from "primeng/toolbar";

@Component({
  selector: "app-user-management",
  imports: [ToolbarModule],
  templateUrl: "./user-management.html",
  styleUrl: "./user-management.scss",
})
export default class UserManagement {}
