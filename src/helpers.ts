const isKebabCase = (str: string) => /^[a-z]+-*[a-z]+$/g.test(str);

export const kebabToCamel = (kebab: string) => {
  if (!isKebabCase(kebab)) throw new Error(`${kebab} is not kebab-case`);

  return kebab
    .split("-")
    .map((word, i) => {
      if (i === 0) return word.toLowerCase();

      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};

export const getCtxVal = (ctx: Record<string, any>, key: string) => {
  if (!Object.prototype.hasOwnProperty.call(ctx, key))
    throw new Error(`${key} is not defined in context`);

  return `${ctx[key]}`;
};
