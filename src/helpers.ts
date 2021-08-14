import { camelCase, upperFirst } from "lodash";

export const camelize = (str: string) => {
  return camelCase(str);
};

export const pascalize = (str: string) => {
  return upperFirst(camelCase(str));
};
