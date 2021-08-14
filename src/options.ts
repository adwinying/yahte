import path from "path";

let opts: Options | null = null;

export interface RawOptions {
  context?: Record<string, any>;
  componentsDir?: string;
}

export interface Options {
  context: Record<string, any>;
  componentsDir: string;
}

const processOptions = (options: RawOptions = {}) => {
  return <Options>{
    context: options.context || {},

    componentsDir:
      options.componentsDir || path.resolve(__dirname, "components"),
  };
};

export const setOptions = (options: RawOptions = {}) => {
  opts = processOptions(options);
};

export const getOptions = () => {
  if (opts === null) throw new Error(`[yahte] options is not initialized!`);

  return opts;
};
