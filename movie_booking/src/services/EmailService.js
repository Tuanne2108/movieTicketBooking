import { emailApi } from ".";

export const createMail = async (email) => {
    const res = await emailApi.post("/send-email", email);
    return res.data;
}
