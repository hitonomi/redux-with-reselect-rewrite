export const createSelector = <
  TState extends any,
  TInputReturn extends any,
  TOutputReturn extends any
>(
  inputSelector: (state: TState) => TInputReturn,
  outputSelector: (input: TInputReturn) => TOutputReturn
): ((state: TState) => TOutputReturn) => {
  let cacheMap: Record<string, any> = {};

  return (state: TState): TOutputReturn => {
    const inputSelectorResults = inputSelector(state);
    const outputSelectorResults = outputSelector(inputSelectorResults);

    const jsonedOutputSelectorResults = JSON.stringify(outputSelectorResults);

    if (cacheMap[jsonedOutputSelectorResults]) {
      return cacheMap[jsonedOutputSelectorResults];
    }

    cacheMap = { [jsonedOutputSelectorResults]: outputSelectorResults };

    return outputSelector(inputSelectorResults);
  };
};
