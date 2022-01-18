import { SET_NAV_OPTIONS } from '../constants/actionTypes';

const INITIAL_STATE = {
  headerTitle: 'Home',
  headerShown: true,
  foodTab: true,
  activeTab: 'Menu',
};

export default function nav(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_NAV_OPTIONS:
      return {
        ...state,
        ...action.payload,
        headerShown: action.payload.headerShown ?? true,
        activeTab: action.payload.activeTab ?? 'Menu',
        foodTab:
          action.payload.foodTab !== undefined
            ? action.payload.foodTab
            : action.payload.activeTab === 'Menu' ||
              (action.payload.activeTab === undefined &&
                state.activeTab === 'Menu')
              ? true
              : false,
      };
    default:
      return state;
  }
}
