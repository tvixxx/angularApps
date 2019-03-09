import { IConfig } from "../interfaces/config.interface";
import { InjectionToken } from "@angular/core";

export const APP_CONFIG = new InjectionToken<IConfig>("APP_CONFIG");

export const Config = {
  medium: 768,
  large: 1200
};
