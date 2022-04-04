import {
  getApiHelper,
  postApiHelper,
  putApiHelper,
  deleteApiHelper,
} from "./apiHelpers";
export function tryLogin(userDetails) {
  if (userDetails.isSignUp) {
    return trySignUp(userDetails);
  } else {
    return trySignIn(userDetails);
  }
}

async function trySignUp({ userName, password, targetCalories, email }) {
  const payload = {
    username: userName,
    password,
    target_calories: targetCalories,
    email,
    full_name: userName,
  };
  return await postApiHelper({
    url: "http://18.211.125.105:8000/api/cm/v1/users/open",
    payload,
  });
}

async function trySignIn({ email, password }) {
  const payload = new URLSearchParams();
  payload.append("username", email);
  payload.append("password", password);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  return await postApiHelper({
    url: "http://18.211.125.105:8000/api/cm/v1/login/access-token",
    payload,
    config,
  });
}

export function fetchDetailsFromLocalHost(key) {
  return JSON.parse(localStorage.getItem(key));
}

export async function getItemsApi() {
  const lhItem = fetchDetailsFromLocalHost("userDetails");
  return await getApiHelper({
    url: "http://18.211.125.105:8000/api/cm/v1/items/?skip=0&limit=100",
    config: {
      headers: {
        Authorization: `Bearer ${lhItem.accessToken}`,
      },
    },
  });
}

export async function addItemApi(item) {
  const lhItem = fetchDetailsFromLocalHost("userDetails");
  return await postApiHelper({
    url: "http://18.211.125.105:8000/api/cm/v1/items/",
    config: {
      headers: {
        Authorization: `Bearer ${lhItem.accessToken}`,
      },
    },
    payload: item,
  });
}

export async function updateItemApi(item) {
  const lhItem = fetchDetailsFromLocalHost("userDetails");
  return await putApiHelper({
    url: `http://18.211.125.105:8000/api/cm/v1/items/${item.id}`,
    config: {
      headers: {
        Authorization: `Bearer ${lhItem.accessToken}`,
      },
    },
    payload: item,
  });
}

export async function deleteItemApi(id) {
  const lhItem = fetchDetailsFromLocalHost("userDetails");
  return await deleteApiHelper({
    url: `http://18.211.125.105:8000/api/cm/v1/items/${id}`,
    config: {
      headers: {
        Authorization: `Bearer ${lhItem.accessToken}`,
      },
    },
  });
}
