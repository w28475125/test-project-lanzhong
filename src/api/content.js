import axios from "@/util/require"

export const getListDataApi = (params) => {
  return axios.post("system/newsContent/list", params)
}