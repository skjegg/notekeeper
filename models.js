module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var userSchema = new Schema({
        name: String,
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        parent: Boolean,
        g_account: String,
        created_at: Date,
        last_updated: Date
    });

    var weekSchema = new Schema({
        user: String, // name of User
        number: Number,
        days: [{
            number: Number,
            chore: {
                description: String,
                choreId: String,
                completed: Boolean,
                required: Boolean
            }
        }],
        currentEarnings: Number
    });

    var choreSchema = new Schema({
        choreId: String,
        shortName: String,
        description: String,
        dollarValue: Number,
    });


    //var User = mongoose.model('User', userSchema);
    var models = {
        User: mongoose.model('User', userSchema),
        Week: mongoose.model('Week', weekSchema),
        Chore: mongoose.model('Chore', choreSchema)
    };
    return models;
}

