const Movie = require('../Models/movieModel');
const ApiFeatures = require('../Utils/ApiFeatures')
const asyncErrorHandler = require('../Utils/AsyncErrorHandler')
const CustomError = require('../Utils/CustomError')
exports.getHighestRate = (req, res, next)=>{
    req.query.limit = '5';
    req.query.sort = '-ratings';
    next();
}



exports.getMovies = asyncErrorHandler(async(req, res, next)=>{
    
        const features = new ApiFeatures(Movie.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
        let movies = await features.query;

        res.status(200).json({
            status:"success",
            length: movies.length,
            data:{
                movies
            }
        })
})


exports.createMovie =  asyncErrorHandler( async (req, res, next)=>{

        const movie = await Movie.create(req.body);

        res.status(200).json({
            status:"success",
            data:{
                movie
            }
        })

    
})

exports.getMoviesId = asyncErrorHandler( async (req, res, next)=>{
        const movie = await Movie.findById(req.params.id);
        
        if(!movie){
            return next(new CustomError(`No movie found with the id ${req.params.id}` , 404));
        }
        res.status(200).json({
            status:"success",
            data:{
                movie
            }
        })
})

exports.updateMovie = asyncErrorHandler( async (req, res, next)=>{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!updatedMovie){
            return next(new CustomError(`No movie found with the id ${req.params.id}`, 404));
        }
        res.status(200).json({
            status:"success",
            data:{
                movie: updatedMovie
            }
        })
})


exports.deleteMovie = asyncErrorHandler( async (req, res, next)=>{
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if(!deletedMovie){
            return next(new CustomError(`No movie found with the id ${req.params.id}`, 404));
        }
        res.status(204).json({
            status:"success",
            data: null
        })
})

exports.deleteMovies =  asyncErrorHandler( async (req, res, next)=>{

        const deleteStatus = await Movie.deleteMany();
        res.status(204).json({
            status:"success",
            data: null
        })
})