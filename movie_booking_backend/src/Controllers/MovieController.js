const MovieService = require('../Services/MovieService')

const createMovie = async (req, res)=>{
    try {
        console.log(req.body)
        const res = await MovieService.createMovie()
        return res.status(200).json()
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getAllMovie = async (req, res)=>{
    try {
        const response = await MovieService.getAllMovie();
        return res.status(200).json(response);
      } catch (error) {
        return res.status(404).json({
          message: error,
        });
      }
}
module.exports = {
    createMovie,
    getAllMovie
}