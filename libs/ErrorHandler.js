







function formatErrorMessages(err) {
    const formattedErrors = [];


    // return err


    if (err?.errors) {
        Object.entries(err.errors).forEach((item) => {
            formattedErrors.push(item[1].message)
        })
    } else if (err?.code === 11000) {
        formattedErrors.push("This Email Already Registered.")
    }
    else {
        formattedErrors.push(err)
    }





    return formattedErrors;
}

const ErrorHandler = (err, req, res, next) => {
    return res.status(500).json(formatErrorMessages(err));
}

module.exports = { ErrorHandler , formatErrorMessages };
