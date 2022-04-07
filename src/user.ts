import ax from "./axios";

export const loadUser = async (id:number|string) => {
  const response = await ax.get(`users/${id}`);
  return response
}
