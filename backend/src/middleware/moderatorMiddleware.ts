
export async function authorizeModerator(req, res, next){
    try {
        if(req.role !== "Moderator"){
            return res.status(403).json({
                error: "Access denied: Admin privileges required"
            });
        }

        next();

    } catch (error: any) {
        console.log("Error in moderator-middleware - ", error.message);
        
        res.status(500).json({
            error: "Error while authorizing the moderator"
        })
    }
}
