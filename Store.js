import { eachDayOfInterval, format } from 'date-fns/esm';

const dates = eachDayOfInterval({
  start: new Date(2018, 1, 1),
  end: new Date(2030, 1, 1),
});

import { Effects, Store, createConnectedStore } from 'undux';

// Declare your store's initial state.
const initialState = {
  days: dates.reduce((acc, date) => {
    return {
      ...acc,
      [format(date, 'yyyy-MM-dd')]: [],
    };
  }, {}),
};

// Create & export a store with an initial value.
export default createConnectedStore(initialState);
