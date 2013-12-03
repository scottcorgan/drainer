var drainer = function(queue, callback, args) {
  var fn = queue.shift();
  
  if (!fn) return callback.apply(callback, [null].concat(args));
  
  args = args || [];
  args.push(function () {
    var passedArgs = [].slice.call(arguments);
    var err = passedArgs.shift();
    
    if (err) return callback(err);
    
    drainer(queue, callback, passedArgs);
  });
  
  fn.apply(fn, args);
};

module.exports = drainer;