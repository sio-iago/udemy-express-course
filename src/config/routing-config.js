const fs = require('fs');
const path = require('path');

const routingConfig = (app, routesDir) => {
    // We read sync because we need to set the routes before starting express
    const routes = fs.readdirSync(routesDir);
    
    for (const route of routes) {
      const routeConfig = require(path.join(routesDir, route));
      
      // If index.js, we want to register as root
      if (route === 'index.js') {
        app.use('/', routeConfig);
      } else {
        // /routeName here
        app.use('/' + route.replace('.js', ''), routeConfig);
      }
    }
};

module.exports = routingConfig;