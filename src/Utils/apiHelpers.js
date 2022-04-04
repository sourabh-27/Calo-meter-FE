import axios from "axios";

export const getApiHelper = async ({ url, payload, config }) => {
  try {
    return await axios.get(url, config);
  } catch (e) {
    return e;
  }
};

export const postApiHelper = async ({ url, payload, config }) => {
  try {
    return await axios.post(url, payload, config);
  } catch (e) {
    return e;
  }
};

export const putApiHelper = async ({ url, payload, config }) => {
  try {
    return await axios.put(url, payload, config);
  } catch (e) {
    return e;
  }
};

export const deleteApiHelper = async ({ url, payload, config }) => {
  try {
    return await axios.delete(url, config);
  } catch (e) {
    return e;
  }
};
