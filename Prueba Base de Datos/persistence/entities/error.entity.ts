import { ErrorModel } from "../../models/error.model";

export class ErrorEntity implements ErrorModel {
  tittle = "Error";
  message: string;
}
