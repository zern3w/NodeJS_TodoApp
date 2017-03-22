var mongoose         = require('mongoose');
var bodyParser       = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

// var data = [{
//     item: 'get milk'
// }, {
//     item: 'walk dog'
// }, {
//     item: 'kick some coding ass'
// }];

// Connect to the database
mongoose.connect('mongodb://test:test@ds137220.mlab.com:37220/todo_new')

// Create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'get flowers'}).save(function(err){
//     if (err) throw err;
//     console.log('item saved');
// });

module.exports = function (app) {

    app.get('/todo', function (req, res) {
        // get data from mongodb and pass it to view
        Todo.find({}, function(err, data ){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
        
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

}