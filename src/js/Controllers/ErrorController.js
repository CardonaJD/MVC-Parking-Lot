function ErrorController (el, view) {
  this.$el = $(el);
  this.view = view;

  this.init = function(){
      this.bindEvents();
  }

  this.bindEvents = function() {
      EventManager.on('general.error', this.errorThrown.bind(this));
      EventManager.on('clean.error', this.view.clear.bind(this));
  }

  this.errorThrown = function(errorMessage) {
      this.view.render(errorMessage);
  }
}