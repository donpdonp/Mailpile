var nunjucks = require('nunjucks')
var express = require('express');

var app = express();
app.use('/static', express.static(__dirname));
app.set('view engine', 'html');

var env  = nunjucks.configure()
env.express(app);
env.addFilter('json', function(o){return JSON.stringify(o)})

app.get('/*', function(req, res) {
  console.log(req.url)
  var locals = {mailpile: mailpile,
                Mailpile: {},
                show_nagification: function(){},
                _: function(){},
                get_ui_elements: function(){},
                ui_elements_setup: function(){},
                render_mode: 'full',
                state: 'who'
               }
  var path = req.url == "/" ? "search/index.html" : req.url.split('?')[0]
  console.log(path)
  res.render(path, locals);
});

console.log('listening 3000')
app.listen(3000);

function mailpile(cmd){
  console.log('mailpile', cmd)
  if(cmd == "tags") { return {result:{tags:[]}} }
}