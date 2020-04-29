import axios from "@/util/require";

// 获取新闻列表
export const getListDataApi = params => {
  return axios.post("system/newsContent/list", params);
};

// 停用新闻
export const setNewsStatus = params => {
  return axios.post("system/newsContent/state", params);
};
