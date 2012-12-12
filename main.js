var http, mongo, assert, BSON, mongoClient, C, context, S, s;
import$(global, require('prelude-ls'));
http = require('http');
mongo = require('mongodb');
assert = require('assert');
BSON = mongo.pure().BSON;
mongoClient = mongo.MongoClient;
mongoClient.connect("mongodb://XXX:XXX@linus.mongohq.com:10014/testdb", function(err, db){
  assert.equal(null, err);
  assert.ok(db !== null);
  db.collection("testcollection").update({
    a: 1
  }, {
    b: "lol"
  }, {
    upsert: true
  }, function(err, result){
    assert.equal(null, err);
    assert.equal(1, result);
    db.close();
  });
});
C = (function(){
  C.displayName = 'C';
  var prototype = C.prototype, constructor = C;
  function C(){
    this.items = [];
  }
  prototype.appenditem = function(item){
    var x$;
    x$ = this.items;
    x$.push(item);
  };
  prototype.getitem = function(id){
    this.items[id];
  };
  return C;
}());
context = new C;
mongoClient.connect("mongodb://XXX:XXX@linus.mongohq.com:10014/testdb", function(err, db){
  assert.equal(null, err);
  assert.ok(db !== null);
  db.collection("testcollection").find({}).toArray(function(err, items){
    var decoded, i$, len$, i, x$;
    decoded = BSON.serialize(items);
    for (i$ = 0, len$ = items.length; i$ < len$; ++i$) {
      i = items[i$];
      x$ = context.items;
      x$.push(i.b);
      console.log(i.b);
    }
    db.close();
  });
});
S = (function(superclass){
  var prototype = extend$((import$(S, superclass).displayName = 'S', S), superclass).prototype, constructor = S;
  function S(p){
    var i$, ref$, len$, i, x$;
    this.port = p;
    for (i$ = 0, len$ = (ref$ = context.items).length; i$ < len$; ++i$) {
      i = ref$[i$];
      x$ = this.items;
      x$.push(i);
    }
    this.start = function(){
      this.serve = function(req, res){
        var i$, ref$, len$, i;
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.write("Hello World\n");
        for (i$ = 0, len$ = (ref$ = context.items).length; i$ < len$; ++i$) {
          i = ref$[i$];
          res.write(i + "\n");
        }
        res.end();
      };
      http.createServer(this.serve).listen(this.port);
      console.log("Server has started.");
    };
    this.start();
  }
  return S;
}(C));
s = new S(8888);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function extend$(sub, sup){
  function fun(){} fun.prototype = (sub.superclass = sup).prototype;
  (sub.prototype = new fun).constructor = sub;
  if (typeof sup.extended == 'function') sup.extended(sub);
  return sub;
}