import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_ID,
  GET_COUNTRIES_BY_NAME,
  SORT_IN_ALPHABETICAL,
  SORT_BY_POPULATION,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  CREATE_ACTIVITY,
  GET_ACTIVITIES,
  REMOVE_DETAIL,
} from "../actions/index";

const initialState = {
  countries: [],
  countryDetail: [],
  filterCountries: [],
  activities: [],
};

function sortAsc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) return 1;

    if (b[field] > a[field]) return -1;

    return 0;
  });
}

function sortDesc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) return -1;

    if (b[field] > a[field]) return 1;

    return 0;
  });
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        filterCountries: action.payload,
      };
    case GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        filterCountries: action.payload,
      };
    case GET_COUNTRIES_BY_ID:
      return {
        ...state,
        countryDetail: action.payload,
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case REMOVE_DETAIL:
      return {
        ...state,
        countryDetail: [],
      };
    case SORT_IN_ALPHABETICAL:
      let sortedAlphabetArr =
        action.payload === "asc"
          ? sortAsc(state.filterCountries, "name")
          : sortDesc(state.filterCountries, "name");
      return {
        ...state,
        filterCountries: sortedAlphabetArr,
      };
    case SORT_BY_POPULATION:
      let sortedPopulationArr =
        action.payload === "asc"
          ? sortAsc(state.filterCountries, "population")
          : sortDesc(state.filterCountries, "population");
      return {
        ...state,
        filterCountries: sortedPopulationArr,
      };
    case FILTER_BY_CONTINENT:
      let filteredContinents =
        action.payload === "All"
          ? state.countries
          : state.countries.filter((c) => c.continent === action.payload);
      return {
        ...state,
        filterCountries: filteredContinents,
      };
    case FILTER_BY_ACTIVITY:
      let filteredActivities =
        action.payload === "All"
          ? state.countries
          : state.countries.filter((c) => {
              for (let i = 0; i < c.activities.length; i++) {
                if (Object.values(c.activities[i]).includes(action.payload)) {
                  return true;
                }
              }
            });
      return {
        ...state,
        filterCountries: filteredActivities,
      };
    default:
      return state;
  }
};

export default rootReducer;
