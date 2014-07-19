CTS.registerNamespace('CTS.Adapters.Abstract');

CTS.Adapters.Abstract.AbstractNode = function() {
  this.initializeNodeBase();
  this.value = null;
};

CTS.Fn.extend(CTS.Adapters.Abstract.AbstractNode.prototype,
    CTS.Events,
    CTS.Node.Base, {

   _subclass_beginClone: function() {
     var d = CTS.Promise.defer();
     var n = new CTS.Adapters.Abstract.AbstractNode();
     n.setValue(this.getValue());
     var kidPromises = CTS.Fn.map(this.children, function(kid) {
       return kid.clone();
     });
     CTS.Promise.all(kidPromises).then(
       function(kids) {
         for (var i = 0; i < kids.length; i++) {
           kids[i].parentNode = n;
           n.insertChild(kids[i]);
         }
         deferred.resolve(n);
       },
       function(reason) {
         d.reject(reason);
       }
     )
     return d.promise;
   },

   getValue: function() {
     return "";
   }

});

CTS.NonExistantNode = new CTS.Adapters.Abstract.AbstractNode();
