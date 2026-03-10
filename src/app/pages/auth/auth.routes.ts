import { Routes } from "@angular/router";
import { Access } from "./access";
import { Login } from "./login";
import { Error } from "./error";
import { ForgetPassword } from "./forget-password/forget-password";
import { ResetPassword } from "./reset-password/reset-password";

export default [
  { path: "access", component: Access },
  { path: "error", component: Error },
  { path: "login", component: Login },
  { path: "forget-password", component: ForgetPassword },
  { path: "reset-password", component: ResetPassword },
] as Routes;
