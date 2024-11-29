
export async function authorizeAdmin(req, res, next){
    try {
        if(req.role !== "Admin"){
            return res.status(403).json({
                error: "Access denied: Admin privileges required"
            });
        }

        next();

    } catch (error: any) {
        console.log("Error in admin-middleware - ", error.message);
        
        res.status(500).json({
            error: "Error while authorizing the user"
        })
    }
}
