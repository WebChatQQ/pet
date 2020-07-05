
const myseverModel = require('./models/myseverModel')

module.exports = {
    get: async ({ page, limit, adminId }) => {
        page = ~~page
        limit = ~~limit
        const result = await myseverModel.find({}).lean()
        const arr = result.filter(item => item.adminId == adminId)
        const total = arr.length
        const data = arr.slice((page - 1) * limit, (limit * page))
        return { data, total }
    },
    del: async (_id) => {
        await myseverModel.deleteOne({ _id })
        return { statu: true, msg: '删除成功' }
    },
    update: async updateData => {
        const { _id } = updateData
        const doc = await myseverModel.findOne({ _id })
        Object.assign(doc, updateData)
        await doc.save()
        return { statu: true, msg: '修改成功' }
    },
    add: async addData => {
        console.log(addData.adminId);
        await myseverModel.create(addData)
        return {statu: true, msg: '新增成功'}
    }
}