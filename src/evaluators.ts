export const evaluate = (expression: string, ctx: Record<string, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const func = new Function(`
    with (${JSON.stringify(ctx)}) return (${expression})
  `);

  let result = null;

  try {
    result = func();
  } catch (e) {
    console.warn(`[yahte] Expression error: ${expression}\n${e.message}`);

    throw e;
  }

  return result;
};

export default null;
