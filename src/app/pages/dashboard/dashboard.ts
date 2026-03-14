import { Component } from "@angular/core";

@Component({
  selector: "app-dashboard",
  template: `
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 600px;
        position: relative;
        background-image: url('../../../assets/eterna-assets/Frame 20-3.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 10px;
      "
    >
      <div style="text-align: center">
        <h3 style="color: white;">Bienvenido a Eterna BackOffice</h3>
        <img
          src="../../../assets/eterna-assets/logo_verde.svg"
          alt=""
          style="margin-left: 70px;"
        />
      </div>
    </div>
  `,
})
export default class Dashboard {}
