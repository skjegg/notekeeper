module.exports = function (app, config, logger, mongoose) {
    debugger;
    logger.info('model loading--- using ' +mongoose);
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

    var User = mongoose.model('User', userSchema);

    logger.debug('user model loaded');
    return User;
}

