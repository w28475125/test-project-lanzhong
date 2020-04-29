import axios from "@/util/require";

// 登录
export const login = params => {
  return axios.post("/login", params);
};

// 登出
export const loginOutApi = params => {
  return axios.post("/logout", params);
};

// 获取用户列表
export const getMenuList = params => {
  return axios.post("/system/menu/user/list", params);
};

// 修改密码
export const changePassword = params => {
  return axios.post("/updatePwd", params);
};
