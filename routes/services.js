
let service = function (app, config, logger, models) {
    debugger;
    
    app.get("/api/user", function (req, res, next) {
        let user = new models.User({
            name: 'test',
            email: 'test@test.com'
        });
        res.status(200).json(user);
    });

    app.post("/api/user", function (req, res, next){
        
        let user = new models.User(req.body);
        
        user.save(function(err){
            if(err) {
                return next(err);
            } else{
                res.status(200).json(user);
            };    
        });      
    });
};

module.exports = service;
