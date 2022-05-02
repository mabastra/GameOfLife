const RESET_LOOP = 'RESET_LOOP';
const TOGGLE_LOOP = 'TOGGLE_LOOP';
const CONT_LOOP = 'CONT_LOOP';

export const resetLoop = () => {
  return {
    type: RESET_LOOP,
    active: false
  }
}

export const toggleLoop = () => {
  return {
    type: TOGGLE_LOOP,
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case RESET_LOOP:
      return action.active;

      case TOGGLE_LOOP:
      return !state;

      default:
      return state;
  }
}