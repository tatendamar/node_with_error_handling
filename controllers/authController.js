const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
   return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn:  process.env.JWT_EXPIRES_IN })
 }


const signUp = catchAsync(async (req, res, next) => {
    const body = req.body;

    if (!['1', '2'].includes(body.userType)) {
        throw new AppError('Invalid user type', 400)
    }

    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword
    })

    if (!newUser) {
          throw new AppError('User not created', 400)
        }

    const result = newUser.toJSON()


    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id,
    })

   
    return res.status(201).json({
        status:'success',
        data: result
    })

})


const signIn = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError('Invalid email or password', 400)
    }

    const result = await user.findOne({
        where: {
            email: email
        }
    });

    if (!result) {
        throw new AppError('Incorrect email or password', 401)
    }

    const isValidPassword = await bcrypt.compareSync(password, result.password);

    if (!isValidPassword) {
        throw new AppError('Incorrect email or password', 401)
    }

    const token = generateToken({
        id: result.id,
    })

    return res.json({
        status: 'success',
        data: {
            id: result.id,
            userType: result.userType,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            token: token
        }
    })

});

const authentication = catchAsync(async (req, res, next) => {
    
    let idToken = ''

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        idToken = req.headers.authorization.split(' ')[1]
    }

    if (!idToken) {
       throw new AppError('Please provide login credentials', 401)
    }
    

    const decoded = jwt.verify(idToken, process.env.JWT_SECRET_KEY)

    const result = await user.findByPk(decoded.id)

    if (!result) {
        throw new AppError('User not found', 400)
    }

    req.user = result;
    return next()

})

const restrictTo = (...userType) => {
    const checkPermission = (req, res, next) => {
        if (!userType.includes(req.user.userType)) {
            throw new AppError('You are not authorized to perform this action', 403)
        }

        return next()
    }
    return checkPermission
}



module.exports = {signUp, signIn, authentication, restrictTo}