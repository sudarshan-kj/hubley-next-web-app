import { authAxios } from "../../utils/authReq";

export async function fetchTemplatesApi() {
  let data;

  try {
    const response = await authAxios.get(
      "api/service/template/list?page=1&show=10"
    );
    if (response.status === 200) return response.data;
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

export async function saveNewUserApi(user: any) {
  const toSaveUser = {
    userName: user.name,
    userEmail: user.email,
  };
  try {
    const response = await authAxios.post("/api/user/create", toSaveUser);
    if (response.status === 200) return response.data;
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.response ? err?.response.data?.message : err);
  }
}

export async function updateTemplateApi(templateId: string, newValues: any) {
  let data;

  try {
    const response = await authAxios.patch(
      `/api/service/template/${templateId}`,
      newValues
    );
    if (response.status === 200) return response.data;
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

export async function deleteTemplateApi(templateId: string) {
  try {
    const response = await authAxios.delete(
      `/api/service/template/${templateId}`
    );
    if (response.status === 200) return response.data;
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : err);
  }
}

// A mock function to mimic making an async request for data
export function deleteTemplateApi2(template: string) {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject({ data: 1 }), 2000)
  );
}
