import jwt from "jsonwebtoken";

export const createToken=function(user){
    const secret=process.env.SECRET;
    const playload={
        id: user._id,
        email: user.email,
        imgUrl: user.imgUrl,
        userName: user.userName,
        role: user.role

    }
    const token=jwt.sign(playload,secret)
    return token;
}

export const checkToken=function(token){
    const secret=process.env.SECRET;
    const check=jwt.verify(token,secret)
    return check;
}