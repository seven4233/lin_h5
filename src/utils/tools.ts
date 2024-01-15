import dayjs from 'dayjs'

// 解析性别
export function parseGender(num: number | undefined) {
  switch (num) {
    case 0:
      return "保密";
    case 1:
      return "男";
    case 2:
      return "女";
  }
}

// 解析文件类型 返回相应图标
export function parseFileIcon(type: string) {
  switch (type) {
    // 图片格式
    case "jpg":
    case "png":
    case "image":
      return "photo-o";
    // 文档格式
    case "pdf":
      return "https://hualin-1314589919.cos.ap-beijing.myqcloud.com/static/pdf.png"
    case "doc":
    case "docx":
      return 'https://hualin-1314589919.cos.ap-beijing.myqcloud.com/static/Word%20%281%29.png'
    case "ppt":
    case "pptx":
      return 'https://hualin-1314589919.cos.ap-beijing.myqcloud.com/static/ppt.png'
    case "xls":
    case "xlsx":
      return 'https://hualin-1314589919.cos.ap-beijing.myqcloud.com/static/excel.png'
    case 'zip':
      return 'https://hualin-1314589919.cos.ap-beijing.myqcloud.com/static/ZIP.png'
    
    case 'rar':
      return 'https://hualin-1314589919.cos.ap-beijing.myqcloud.com/static/RAR.png'
    
    case 'txt':
      return 'https://hualin-1314589919.cos.ap-beijing.myqcloud.com/static/txt.png'

    case 'md':
      return 'https://hualin-1314589919.cos.ap-beijing.myqcloud.com/static/file-markdown.png'
    
    default:
      return 'https://hualin-1314589919.cos.ap-beijing.myqcloud.com/static/file-unknown.png'
  }


}


// 格式化时间
export function formatTime( timestamp : number){

  return dayjs(timestamp).format('YYYY年MM月DD日 HH:mm:ss')
}

// 文件单位转换
export function transFileSize(size:number){
  if (size >= 1e6) {
    return (size / 1e6).toFixed(1) + ' MB';
  } else if (size >= 1e3) {
    return (size / 1e3).toFixed(1) + ' KB';
  } else {
    return size + ' B';
  }
}