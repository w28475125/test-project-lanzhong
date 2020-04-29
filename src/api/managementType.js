import axios from "@/util/require"

// 获取表格数据
export const getTableDataApi = (params) => {
  return axios.post("system/newsType/list", params)
}

// 新增类型
export const newsTypeAddApi = (params) => {
  return axios.post("system/newsType/add", params)
}

// 修改类型
export const newsTypeEditApi = (params) => {
  return axios.post("system/newsType/edit", params)
}

// 查询详情
export const newTypeDetailApi = (params) => {
  return axios.post("system/newsType/detail", params)
}

// 删除项目
export const newsTypeDelApi = (params) => {
  // 修改俄日 require payload 形式的传参 
  return axios({
    url: 'system/newsType/delete',
    headers: {'Content-Type':'application/json'},
    method: 'post',
    data: params
  })
}