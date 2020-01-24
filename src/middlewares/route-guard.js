const fs = require('fs');

var _protectedRoutes = [];

const isAuthenticated = req =>
    req.user && req.user.isAuthenticated;

const sendBlank404 = res =>
    res.status(404).send();

const sanitizeQueryParams = url =>
    url.replace(/\?.*/, '');

const isProtected = url =>
    _protectedRoutes
        .filter(
            route => route.exactMatch ? 
                sanitizeQueryParams(url) === route.path :
                url.startsWith(route.path)
        )
        .length > 0;

const readConfigFile = filePath => {
    const configContent = fs.readFileSync(filePath);
    const jsonConfig = JSON.parse(configContent);

    if (jsonConfig && jsonConfig.authenticated) {
        _protectedRoutes = jsonConfig.authenticated;
    }
};

const routeGuard = (req, res, next) => {
    
    if (isProtected(req.url) && !isAuthenticated(req)) {
        return sendBlank404(res);
    }
    
    next();
};

const routeGuardBuilder = routesSecurityConfigPath => {
    readConfigFile(routesSecurityConfigPath);

    return routeGuard;
}

module.exports = routeGuardBuilder;