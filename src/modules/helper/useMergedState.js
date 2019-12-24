import React from 'react';

const shallowPartialCompare = (obj, partialObj) =>
  Object.keys(partialObj).every(
    key => obj.hasOwnProperty(key) && obj[key] === partialObj[key]
  );

export const useMergedState = initial => {
  const [state, setState] = React.useState(initial);
  const setMergedState = newIncomingState =>
    setState(prevState => {
      const newState =
        typeof newIncomingState == 'function'
          ? newIncomingState(prevState)
          : newIncomingState;
      return shallowPartialCompare(prevState, newState)
        ? prevState
        : { ...prevState, ...newState };
    });
  return [state, setMergedState];
};
