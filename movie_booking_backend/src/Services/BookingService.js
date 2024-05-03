const createBooking = ()=>{
    return new Promise((resolve, reject)=>{
        try {
            resolve({})
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createBooking
}