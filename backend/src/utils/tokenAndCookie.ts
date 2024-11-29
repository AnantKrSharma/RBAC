import jwt from 'jsonwebtoken';

//this function will create a JWT-Token, and set it as a cookie for the user.
export function createTokenAndSetCookie(id, role, res){
    const token = jwt.sign({ userId: id, role }, process.env.JWT_SECRET ?? '', {  //token will contain the user-id as well as the user's role
        expiresIn: '15d'
    });

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        domain: process.env.NODE_ENV === "development" ? "localhost" : undefined  //domain can be added in production
    });
}
