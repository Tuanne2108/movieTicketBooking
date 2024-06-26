const Show = require("../Models/Show");
const Movie = require("../Models/Movie");
const Theater = require("../Models/Theater");

const createShow = (newShow) => {
    return new Promise(async (resolve, reject) => {
        const { movie, theater, date, time, price, seat, status } = newShow;
        try {
            const movieExists = await Movie.findById(movie);
            const theaterExists = await Theater.findById(theater);

            if (!movieExists || !theaterExists) {
                return reject({
                    status: "Error",
                    message: "Invalid Movie or Theater",
                });
            }

            const createdShow = await Show.create({
                movie,
                theater,
                date,
                time,
                price,
                seat,
                status,
            });
            if (createdShow) {
                resolve({
                    status: "Success",
                    message: "Show created successfully",
                    data: createdShow,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getAllShows = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const shows = await Show.find()
                .populate("movie")
                .populate("theater");
            resolve({
                status: "Success",
                message: "Shows fetched successfully",
                data: shows,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getShowById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const show = await Show.findById(id)
                .populate("movie")
                .populate("theater");
            resolve({
                status: "Success",
                message: "Show fetched successfully",
                data: show,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateShow = async (id, updatedShow) => {
    try {
        const checkShow = await Show.findOne({ _id: id });

        if (!checkShow) {
            throw {
                status: "Error",
                message: "The show does not exist",
            };
        }

        const updatedShowData = await Show.findByIdAndUpdate(id, updatedShow, {
            new: true,
        });

        return {
            status: "Success",
            message: "Show updated successfully",
            data: updatedShowData,
        };
    } catch (error) {
        throw error;
    }
};

const deleteShow = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Show.findByIdAndDelete(id);
            resolve({
                status: "Success",
                message: "Show deleted successfully",
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createShow,
    getAllShows,
    getShowById,
    updateShow,
    deleteShow,
};
