export const evaluate = (expression: string, ctx: Record<string, any>) => {
  // _slot should not be part of the evaluation context hence it is removed
  const evalCtx = { ...ctx };
  delete evalCtx._slot;

  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const func = new Function(`
    with (${JSON.stringify(evalCtx)}) return (${expression})
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
