import ajax from './ajax';

export function getSettingsDetails(moduleName) {
  return ajax(`/settings?SettingsSearch[module_name]=${moduleName}`);
}
