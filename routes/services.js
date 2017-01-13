
let service = function (app, config, logger, models) {
    
    app.get("/api/user/:name", function (req, res, next) {

        models.User.find({name: req.params.name},function(err,users){
            if(err) {
                return next(err);
            }else{
                res.status(200).json(users);
            }
        });
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

    app.get("/api/chore/:choreId", function(req, res, next){
        models.Chore.find({choreId: req.params.choreId}, function(err, chores){
            if(err) return next(err);
            return res.status(200).json(chores);
        });
    });
};

module.exports = service;
