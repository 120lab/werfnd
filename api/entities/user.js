//Private
var privateVariable = true;

//Public
module.exports.user = function (name, pass) {
    this.username = name;
    this.password = pass;
}