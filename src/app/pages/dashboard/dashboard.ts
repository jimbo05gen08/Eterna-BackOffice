import { Component } from "@angular/core";
import { StatsWidget } from "./components/statswidget";
import { BestSellingWidget } from "./components/bestsellingwidget";
import { RevenueStreamWidget } from "./components/revenuestreamwidget";

@Component({
  selector: "app-dashboard",
  template: `
    <div
      style="display:flex;justify-content:center;align-items:center;width:100%; height: 600px;position:relative"
    >
      <div style="position: absolute;top:100px;text-align:center">
        <h3>Bienvenido a Eterna BackOffice</h3>
        <img src="../../../assets/eterna-assets/logo_verde.svg" alt="" />
      </div>
      <img
        src="../../../assets/eterna-assets/Frame 20-3.png"
        alt=""
        width="500px"
      />
    </div>
  `,
})
export class Dashboard {}
