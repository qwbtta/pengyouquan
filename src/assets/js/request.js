import axios from "axios";


const baseUrl = "https://crm.jisudonghua.com/crmapi"


axios.interceptors.request.use(config => {
  let token = localStorage.getItem("token")
  if(token){
    config.headers['token'] = token;
  }
    return config;
  });
// 添加响应拦截器
axios.interceptors.response.use((response) =>{
   
	return response.data;
  }, 
  (error)=> {
      if(error?.response?.data?.code == 401){
        localStorage.removeItem("token")
      }
      console.error(error.response);
    
});

  function postJSONData(url, params) {
  
    return axios.post(url, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  function postFormData(url, params) {
    let forms = new FormData();
    for (const key in params) {
      forms.append(key, params[key]);
    }
    return axios.post(url, forms, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
   
// 登录
export const login = (params) => {
  return  postJSONData(baseUrl + "/staff/login",params)
}

// 退出登录
export const logout = (params) => {
  return  postJSONData(baseUrl + "/staff/logout",params)
}

// 获取朋友圈列表
export const getMomentsList = (params) => {
    return  axios.get(baseUrl + "/momentsmanage/getMomentsList",{
        params: params
    })
}

// 获取人设列表
export const getFitTags = (params) => {
  return  axios.get(baseUrl + "/momentsmanage/getFitTags",{
      params: params
  })
}

// 获取朋友圈类型
export const getTypeTags = (params) => {
  return  axios.get(baseUrl + "/momentsmanage/getTypeTags",{
      params: params
  })
}

// 获取待发布账号列表
export const getAccountList = (params) => {
  return  axios.get(baseUrl + "/momentsmanage/getAccountList",{
      params: params
  })
}

// 获取可见人员列表
export const getVisibleList = (params) => {
  return  axios.get(baseUrl + "/momentsmanage/getVisibleList",{
      params: params
  })
}

// 添加朋友圈
export const addMoments = (params) => {
    return  postJSONData(baseUrl + "/momentsmanage/addMoments",params)
}

// 编辑朋友圈
export const editMoments = (params) => {
  return  postJSONData(baseUrl + "/momentsmanage/editMoments",params)
}

// 编辑朋友圈
export const deleteMoments = (params) => {
  return  postJSONData(baseUrl + "/momentsmanage/deleteMoments",params)
}

// 上传图片
export const upload = (params) => {
  return  postFormData(baseUrl + "/momentsmanage/upload",params)
}

// 删除图片
export const deleteFile = (params) => {
  return  postJSONData(baseUrl + "/momentsmanage/deleteFile",params)
}

// 获取标签列表
export const getTagTypes = (params) => {
  return  axios.get(baseUrl + "/momentsmanage/getTagTypes",{
    params: params
})
}

// 新增标签
export const editTags = (params) => {
  return  postJSONData(baseUrl + "/momentsmanage/editTags",params)
}

// 编辑标签
export const addTags = (params) => {
  return  postJSONData(baseUrl + "/momentsmanage/addTags",params)
}

// 删除标签
export const deleteTags = (params) => {
  return  postJSONData(baseUrl + "/momentsmanage/deleteTags",params)
}

