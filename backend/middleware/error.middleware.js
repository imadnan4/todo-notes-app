

const errorHandler =  (err, req, res, next) => {
    if(process.env.NODE_ENV !== 'production'){
        console.error('Error', err.message)
    }

    const statusCode = err.statusCode || 500


    res.ststus(statusCode).json({
        status: 'error',
        message: err.message || "Something went wrong",
        ...(process.env.NODE_ENV !== 'production' && {stack : err.stack}),
    })

}

export default errorHandler