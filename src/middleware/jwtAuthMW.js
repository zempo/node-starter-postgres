const AuthService = require('../services/authService')

const requireAuth = (res, req, next) => {
    const authToken = req.get('Authorization') || "";

    let bearerToken;
    if (!authToken.toLowerCase().startsWith('bearer ')) {
        
    } else {
        
    }
}