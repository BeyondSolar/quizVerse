module.exports = (req, res, next)=>{    
    if(req.user.role == 'teacher') return res.status(403).json({ message: `Access denied: Teacher role required` });
    next();
}