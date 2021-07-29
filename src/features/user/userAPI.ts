import { authAxios } from "../../utils/authReq";

export async function fetchUserApi(userId: string) {
  let data;

  try {
    const response = await authAxios.get(`/api/user/${userId}`);
    if (response.status === 200) return response.data;
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

export async function createNewUserApi(user: any) {
  const toSaveUser = user;
  try {
    console.log("Inside create new user  API>>.//....");
    const response = await authAxios.post("/api/user/create", toSaveUser);
    if (response.status === 200) return response.data;
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.response ? err?.response.data?.message : err);
  }
}

export async function updateUserApi(userId: string, newValues: any) {
  let data;

  try {
    const response = await authAxios.patch(`/api/user/${userId}`, newValues);
    if (response.status === 200) return response.data;
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

export async function deleteUserApi(userId: string) {
  try {
    const response = await authAxios.delete(`/api/user/${userId}`);
    if (response.status === 200) return response.data;
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : err);
  }
}
