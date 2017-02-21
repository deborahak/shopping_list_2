var express = require('express');

var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  } 
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');
storage.add('Zucchini');

/*
[{name: 'Broad beans', id: 1}, {name: 'Tomatoes, id:2'}, 
CRUD
- Create (app.post)
- Read (app.get)
- Update (app.put)
- Delete (app.delete)
*/



var app = express();
// serves content from the public folder (frontend code)
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items); // list or array
});
app.post('/items', jsonParser, function(request, response){
 
  if (!('name' in request.body)){
    return response.sendStatus(400);
  }
  var item = storage.add(request.body.name);
  response.status(201).json(item);
});

app.delete('/items/:id', function(request, response){
    // remove the item with a certain id from your storage
    /// which index? how to get it?
    /// how things do you want to delete? a.ka. count.
    var id = +request.params.id;

    // todo -- search for an item by its id; hint: for-loops

    for (i = 0; i < storage.items.length;  i++){
      if (id == storage.items[i].id){
         var item = storage.items.splice(i, 1);
      }
    }
    // hints: use the storage.items
        ///:header
    /// req.params.header
    response.json(storage.items); // corre t
});

app.put('/items/:id', jsonParser, function(request, response){
  var update = request.params.id;
  // SEARCH
  for (i=0; i<storage.items.length; i++){
    if (update == storage.items[i].id){
      // how do you get the infromation sent 
      //request.body 
      console.log(storage.items[i], request.body);
      storage.items[i].name = request.body.name;
      return response.json(storage.items[i]);
    }
  }

  response.json(storage.items);

});

app.listen(process.env.PORT || 8080, process.env.IP);

exports.app = app;
exports.storage = storage;





