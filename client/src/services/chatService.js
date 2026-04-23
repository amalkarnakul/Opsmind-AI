import API from "../api/axios";

export const sendChatMessage = async (message)=>{
    const res = await API.post("/chat/chat", { message });
    return res.data;
}