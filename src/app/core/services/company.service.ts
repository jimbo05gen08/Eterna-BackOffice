import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BaseService } from "./base.service";
import { ApiResponse } from "@/app/shared/models/api/api.response";
import { Company } from "@/app/shared/models/company";

@Injectable({
  providedIn: "root",
})
export class CompanyService extends BaseService {
  constructor() {
    super({ controller: "AdminServicios" });
  }

  getEmpresas(): Observable<Company[]> {
    return this.httpClient
      .get<ApiResponse<Company[]>>(`${this.baseApiUrl}/empresas`)
      .pipe(map((response) => this.handleAndGetData(response)));
  }
}
