const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'name is required'],
        unique: true,
        trim:true
        },
    description: {
        type: String,
        required: [true,'description is required'],
        trim:true
        },
    duration: {
        type: Number,
        required: [true,'duration is required']
    },
    ratings: {
        type: Number,
    },
    totalRating:{
        type: Number
    },
    releaseYear: {
        type: Number,
        required: [true,'Release year is required'],
    },
    releaseDate:{
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    genres:{
        type: [String],
        required: [true, 'genres are required'],
        enum: {
        values: ["Action", "Adventure", "Sci-Fi", "Thriller", "Crime", "Drama", "Comedy", "Romance", "Biography"],
        message: "This genre does not exist"
        }
    },
    directors:{
        type: [String],
        required: [true, 'directors are required']
    },
    coverImage:{
        type:String,
        required: [true,"cover image is required"]
    },
    actors:{
        type:[String],
        required: [true,"actors are required"]
    },
    price: {
        type: Number,
        required: [true,"price is required"]
    }
},{
    toJSON: {virtuals: true},
    toObject:{virtuals: true}
});

movieSchema.virtual('totalDuration').get(function(){
    return {Hours: Math.floor(this.duration/60),Minutes: this.duration%60};
})


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;