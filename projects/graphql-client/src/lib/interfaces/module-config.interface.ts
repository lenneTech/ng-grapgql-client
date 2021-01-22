import { InjectionToken } from '@angular/core';

export interface ModuleConfig {
  apiUrl: string;
  version: string;
  prefix: string;
}

export const MODULE_CONFIG = new InjectionToken('MODULE_CONFIG');
