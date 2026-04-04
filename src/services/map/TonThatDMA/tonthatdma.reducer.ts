import { TonThatAction } from "./tonthatdma.action-rule";

export type Model = {
};

export const defaultState: Model = {
};

function reducer(state: Model = defaultState, action: TonThatAction): Model {
  switch (action.type) {
    default:
      return state;
  }
}


export default reducer;