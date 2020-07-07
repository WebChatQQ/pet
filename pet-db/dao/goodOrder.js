
const goodOrderModel = require('./models/goodOrderModel.js')

module.exports = {
    get: async ({ page, limit, dependQuery }) => {
        const goodOrders = await goodOrderModel.find(dependQuery)
            .populate({ path: 'goodId' })
            .populate({ path: 'userId' })
            .populate({ path: 'shopId' })
            .populate({ path: 'adminId' })
            .populate({ path: 'addrId' }).skip((page - 1) * limit).limit(limit).lean()
            const total = await goodOrderModel.find(dependQuery).countDocuments()
        return { data: goodOrders, total }
    }
}