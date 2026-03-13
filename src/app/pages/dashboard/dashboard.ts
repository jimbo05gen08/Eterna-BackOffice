import { Component } from "@angular/core";

@Component({
  selector: "app-dashboard",
  template: `
    <div
      style="display:flex;justify-content:center;align-items:center;width:100%; height: 600px;position:relative"
    >
      <div style="position: absolute;top:100px;text-align:center">
        <h3 style="color: white;">Bienvenido a Eterna BackOffice</h3>
        <img
          src="../../../assets/eterna-assets/logo_verde.svg"
          alt=""
          style="margin-left: 70px;"
        />
      </div>
      <img
        src="../../../assets/eterna-assets/Frame 20-3.png"
        alt=""
        width="500px"
      />
    </div>
  `,
})
export default class Dashboard {}
