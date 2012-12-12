global <<< require \prelude-ls
http = require \http
mongo = require \mongodb
assert = require \assert
BSON = mongo.pure().BSON

#client = new mongo.Db('testdb', mongoserver, {w: 1})

#test = !(err, collection) ->
# collection.insert {a:2} !(err, docs) ->
#    collection.count !(err, count) ->
#      test.assertEquals 1 count
#
#    collection.find().toArray !(err, results) ->
#      test.assertEquals 1  results.length
#      test.assertTrue results[0].a === 2
#      client.close()

#client.open !(err, p_client) ->
#  client.collection('test_insert', test)

mongoClient = mongo.MongoClient
mongoClient.connect "mongodb://flubba:hl2dmisfun@linus.mongohq.com:10014/testdb",
  !(err, db) ->
    assert.equal null err
    assert.ok db != null

    db.collection("testcollection").update {a:1} {b:"lol"} {upsert:true} !(err, result) ->
      assert.equal null err
      assert.equal 1 result
      db.close()
      #test.done()


#client = new mongo.Db('testdb', mongoserver, {w: 1})

#client.open !(err, p_client) ->
#  client.collection('test_insert', test)
class C
  ->
    @items = []
  appenditem: !(item) -> @items..push(item)
  getitem: !(id) -> @items[id]


context = new C

mongoClient.connect "mongodb://XXX:XXX@linus.mongohq.com:10014/testdb",
  !(err, db) ->
    assert.equal null err
    assert.ok db != null

    db.collection("testcollection").find({}).toArray !(err, items) ->
      decoded = BSON.serialize(items)
      for i in items
        context.items..push i.b
        console.log i.b
      db.close()

class S extends C
  (p) ->
    @port = p
    for i in context.items
      @items..push i
    @start = ! ->
      @serve = !(req, res) ->
        res.writeHead(200, {"Content-Type": "text/plain"})
        res.write "Hello World\n"
        for i in context.items
          #console.log i
          res.write i + "\n"
        res.end()
      http.createServer(@serve).listen(@port)
      console.log("Server has started.")

    @start()

s = new S 8888