import hlRequest from "@/utils/http";


// 获取文件列表
export const getFileListAPI = async ()=>{
    return hlRequest.get("/file")
}

// 上传文件
export const createFileAPI = async (data:any)=>{
    return hlRequest.post("/file", data)
}

// 搜索结果
export const searchAPI = async(keyword:any)=>{
    return hlRequest.get('/file/search?keyword='+keyword )
}


