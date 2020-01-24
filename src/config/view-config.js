const viewConfig = (app, viewsDir, engine) => {
    app.set('views', viewsDir);
    app.set('view engine', engine);
};

module.exports = viewConfig;