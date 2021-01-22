import { Inject, Injectable } from '@angular/core';
import { MODULE_CONFIG, ModuleConfig } from '../interfaces/module-config.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Constructor
   */
  constructor(@Inject(MODULE_CONFIG) private moduleConfig: ModuleConfig) {}

  /**
   * Save itemKeys
   *
   * If you want to save one item, use itemKeys and value parameters like these:
   * save('KEY_OF_THE_ITEM', ITEM)
   *
   * If you want to save multiple items, use itemKeys only (value parameter will be ignored):
   * save({'KEY_OF_ITEM_1': ITEM_1, 'KEY_OF_ITEM_2': ITEM_2, ...})
   */
  public save(itemKeys: string | { [key: string]: any }, value?: any): boolean {
    // Check local storage
    if (!window?.localStorage) {
      return false;
    }

    // Check item keys and value
    if (
      !itemKeys ||
      (typeof itemKeys === 'object' && !Object.keys(itemKeys).length) ||
      (typeof itemKeys === 'string' && value === undefined)
    ) {
      return false;
    }

    if (typeof itemKeys === 'object') {
      for (const [itemKey, itemValue] of Object.entries(itemKeys)) {
        localStorage.setItem(
          this.moduleConfig.prefix + '_' + this.moduleConfig.version + '_' + itemKey,
          JSON.stringify(itemValue)
        );
      }
      return true;
    }

    localStorage.setItem(
      this.moduleConfig.prefix + '_' + this.moduleConfig.version + '_' + itemKeys,
      JSON.stringify(value)
    );
    return true;
  }

  /**
   * Load items via key(s)
   */
  public load(itemKeys: string | string[]) {
    // Check local storage
    if (!window?.localStorage) {
      return;
    }

    // Check item keys
    if (!itemKeys || (Array.isArray(itemKeys) && !itemKeys.length)) {
      return null;
    }

    if (Array.isArray(itemKeys)) {
      const back = {};
      itemKeys.forEach((itemKey) => {
        const loadedItem = localStorage.getItem(
          this.moduleConfig.prefix + '_' + this.moduleConfig.version + '_' + itemKey
        );
        if (loadedItem) {
          back[itemKey] = JSON.parse(loadedItem);
        } else {
          back[itemKey] = null;
        }
      });
      return back;
    }

    let value = localStorage.getItem(this.moduleConfig.prefix + '_' + this.moduleConfig.version + '_' + itemKeys);
    if (value) {
      value = JSON.parse(value);
    }
    return value;
  }

  /**
   * Remove item from storage
   *
   * @param itemKeys keys for remove
   */
  public remove(itemKeys: string | string[]): boolean {
    // Check local storage
    if (!window?.localStorage) {
      return false;
    }

    if (Array.isArray(itemKeys)) {
      itemKeys.forEach((key) => {
        localStorage.removeItem(this.moduleConfig.prefix + '_' + this.moduleConfig.version + '_' + key);
      });
      return true;
    }

    localStorage.removeItem(this.moduleConfig.prefix + '_' + this.moduleConfig.version + '_' + itemKeys);
    return true;
  }

  /**
   * Clear local storage
   */
  public reset() {
    localStorage.clear();
  }
}
