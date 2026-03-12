import { Injectable } from "@angular/core";
import { MessageService, ToastMessageOptions } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class ToastMessageService {
  constructor(private messageService: MessageService) {}

  showSuccess(detail: string, summary: string = "Éxito") {
    this.messageService.add({
      severity: "success",
      summary: summary,
      detail: detail,
      life: 3000,
    });
  }

  showError(detail: string, summary: string = "Error") {
    this.messageService.add({
      severity: "error",
      summary: summary,
      detail: detail,
    });
  }

  showInfo(detail: string, summary: string = "Información") {
    this.messageService.add({
      severity: "info",
      summary: summary,
      detail: detail,
    });
  }

  showCustom(config: ToastMessageOptions) {
    this.messageService.add(config);
  }
}
