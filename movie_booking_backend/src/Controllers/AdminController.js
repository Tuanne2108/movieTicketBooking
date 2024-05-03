const AdminService = require('../Services/AdminService')

const createAdmin = async (req, res)=>{
    try {
        console.log(req.body)
        const res = await BookingService.createBooking()
        return res.status(200).json()
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createAdmin
}