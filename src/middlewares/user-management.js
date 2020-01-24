const createSessionUser = (username, isAuthenticated) =>
    ({
        username: username,
        isAuthenticated: isAuthenticated,
    });


const userManagement = (req, res, next) => {
    const user = req.session.user ? 
        createSessionUser(req.session.user.username, true) :
        null;
    
    req.user = user;
    res.locals.user = user ? user : createSessionUser('anonymous', false);
    
    next();
};

module.exports = userManagement;