function ControlsAndFormController(el, view, model) {
  this.$el = $(el);
  this.view = view;
  this.model = model;

  this.init = function() {
    this.view.render();
    this.bindEvents();
  };

  this.bindEvents = function() {
    this.$el.on('submit', '.js-add-car', this.addCar.bind(this));
    this.$el.on('click', '#search-btn', this.searchCars.bind(this));
    this.$el.on('click', '#all-cars-btn', this.showAllCars.bind(this));
    this.$el.on('change', '#search-options-order-category', this.orderByCategory.bind(this));
    this.$el.on('click', '#create-random', this.addRandomData.bind(this));
  };

  this.addCar = function(e) {
    EventManager.fire('clean.error', null);
    let newCar = this.model.getDataForm(e);
    this.model.addCarToDB(newCar);
    EventManager.fire('show.cars')
    this.view.cleanForm();
  };

  this.searchCars = function(e){
    let $search = this.$el.find('#search-input').val();
    let $category = this.$el.find('#search-options option').filter(':selected').data('search');
    EventManager.fire('show.cars', {search:$search, category:$category});
  };

  this.showAllCars = function(){
    EventManager.fire('show.cars')
  };

  this.orderByCategory = function(){
    let $category = this.$el.find('#search-options-order-category option').filter(':selected').data('search');
    EventManager.fire('show.cars', {orderCategory :$category})
  };

  this.addRandomData = function(){
    let howManyCars = this.$el.find('#how-many-cars').val();
    this.model.fillDBwithRandomData(howManyCars);
    EventManager.fire('show.cars');
  };
}
