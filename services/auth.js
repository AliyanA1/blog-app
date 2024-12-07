const jwt=require("jsonwebtoken");
const secret="!U^%^CV%#V*NJG";

function createWebToken(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role,
    }
    const token=jwt.sign(payload,secret);
    return token;
}
//function for token viladation
function validateToken(token){
    const payload=jwt.verify(token,secret);
    return payload;
}

module.exports={
    createWebToken,
    validateToken
}
