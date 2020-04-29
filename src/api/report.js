import axios from "@/util/require";

// 获取表格数据
export const gettableDataApi = params => {
  return axios.post("system/newsReportRecord/list", params);
};

// 获取详情数据
export const getDetailDataApi = params => {
  return axios.post("system/newsReportRecord/detail", params);
};
