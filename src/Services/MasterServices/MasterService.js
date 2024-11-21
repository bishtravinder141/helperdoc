import { authAxios } from "../../Config/APIConfig";

const language = "en";

// Get All Jobs List
export const getMasterData = () => authAxios.get(`/seeders/${language}`);
