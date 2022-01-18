import ajax from "./ajax";

export function getPage(internalName) {
  return ajax(`/pages?PageSearch[internal_name]=${internalName}`);
}
