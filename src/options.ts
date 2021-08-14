import path from "path";

export interface RawOptions {
  context?: Record<string, any>;
  componentsDir?: string;
}

export interface Options {
  context: Record<string, any>;
  componentsDir: string;
}

export const processOptions = (options: RawOptions = {}) => {
  return <Options>{
    context: options.context || {},

    componentsDir:
      options.componentsDir || path.resolve(__dirname, "components"),
  };
};
