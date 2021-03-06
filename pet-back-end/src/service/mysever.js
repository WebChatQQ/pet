import Axios from "axios";



export default {
    get: condition => Axios.get('/api/mysever/get', { params: condition }).then(res => res.data),
    del: _id => Axios.post('/api/mysever/del', { _id }).then(res => res.data),
    update: updateData => Axios.post('/api/mysever/update', updateData).then(res => res.data),
    add: addData => Axios.post('/api/mysever/add', addData).then(res => res.data),
    upload: formData => Axios.post('/api/mysever/upload', formData, {
        headers: {
            cache: false, //上传文件无需缓存
            contentType: false, //*** //数据的解析类型，不需要，我们上传2进制数据，没有类型
            processData: false, //*** //用于对data参数进行序列化处理 这里必须false
        }
    }).then(res => res.data)
}