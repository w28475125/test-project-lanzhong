import axios from "@/util/require";

// 获取新闻列表
export const getListDataApi = params => {
  return axios.post("system/newsContent/list", params);
};

// 修改新闻状态
export const setNewsStatus = params => {
  return axios.post("system/newsContent/state", params);
};

// 查询新闻详情
export const getNewsDetailApi = params => {
  return axios.post("system/newsContent/detail", params)
}