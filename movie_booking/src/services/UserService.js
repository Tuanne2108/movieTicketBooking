import { userApi } from ".";

export const signInUser = async (user) => {
    const res = await userApi.post(`/sign-in`, user);
    return res.data;
};

export const signUpUser = async (user) => {
    const res = await userApi.post(`/sign-up`, user);
    return res.data;
};
export const refreshToken = async () => {
    const res = await userApi.post(`/refresh-token`, {
        withCredentials: true,
    });
    return res.data;
};

export const logOutUser = async () => {
    const res = await userApi.post(`/logout`);
    return res.data;
};