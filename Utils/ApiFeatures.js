class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(){
        let queryString = JSON.stringify(this.queryStr);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`);
        const queryObj = JSON.parse(queryString);



        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        excludeFields.forEach((el) => {
            delete queryObj[el]
        })
        

        this.query =  this.query.find(queryObj);

        return this;
    }

    sort(){
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields(){
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');
            
        }
        return this;
    }
    paginate(){
        const page = this.queryStr.page*1 || 1;
        const limit = this.queryStr.limit*1 || 10;
        const skip = (page -1) * limit;
        this.query.skip(skip).limit(limit);
        // if(this.query.page){
        //     const numMovies = await Movie.countDocuments();
        //     if (skip >= numMovies) {
        //         throw new Error('This page does not exist');
        //     }
        // }
        return this;
    }
}


module.exports = ApiFeatures;