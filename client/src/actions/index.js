import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRIES_BY_ID = "GET_COUNTRIES_BY_ID";
export const SORT_IN_ALPHABETICAL = "SORT_IN_ALPHABETICAL";
export const SORT_BY_POPULATION = "SORT_BY_POPULATION";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const REMOVE_DETAIL = "REMOVE_DETAIL";

export const getCountries = () => {
  return async (dispatch) => {
    const json = await axios.get("http://localhost:3001/countries");
    dispatch({ type: GET_COUNTRIES, payload: json.data });
  };
};

export const getCountriesByName = (name) => {
  return async (dispatch) => {
    const json = await axios.get(
      "http://localhost:3001/countries?name=" + name
    );
    dispatch({ type: GET_COUNTRIES_BY_NAME, payload: json.data });
  };
};

// export const getCountriesByName = (name) => {
//   return (dispatch) => {
//     axios
//       .get("http://localhost:3001/countries?name=" + name)
//       .then((json) => {
//         dispatch({ type: GET_COUNTRIES_BY_NAME, payload: json.data });
//       })
//       .catch((e) => console.log(e));
//   };
// };

export const getCountriesById = (id) => {
  return async (dispatch) => {
    const json = await axios.get("http://localhost:3001/countries/" + id);
    dispatch({ type: GET_COUNTRIES_BY_ID, payload: json.data });
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    const json = await axios.get("http://localhost:3001/activity");
    dispatch({ type: GET_ACTIVITIES, payload: json.data });
  };
};

// export const createActivity = (payload) => {
//   return async function (dispatch) {
//     return await axios
//       .post(`http://localhost:3001/activity`, payload)
//       .then((res) => {
//         dispatch({ type: CREATE_ACTIVITY, payload });
//       });
//   };
// };

export const createActivity = (payload) => {
  return async function () {
    const res = await axios.post(`http://localhost:3001/activity`, payload);
    return res;
  };
};

export const removeDetail = () => {
  return { type: "REMOVE_DETAIL" };
};

export const sortInAlphabetical = (payload) => {
  return {
    type: SORT_IN_ALPHABETICAL,
    payload,
  };
};

export const sortByPopulation = (payload) => {
  return {
    type: SORT_BY_POPULATION,
    payload,
  };
};

export const filterByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
};

export const filterByActivity = (payload) => {
  return {
    type: FILTER_BY_ACTIVITY,
    payload,
  };
};
