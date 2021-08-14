import path from "path";

export interface RawConfig {
  context?: Record<string, any>;
  componentsDir?: string;
}

export interface Config {
  context: Record<string, any>;
  componentsDir: string;
}

export const processConfig = (config: RawConfig = {}) => {
  return <Config>{
    context: config.context || {},

    componentsDir:
      config.componentsDir || path.resolve(__dirname, "components"),
  };
};
