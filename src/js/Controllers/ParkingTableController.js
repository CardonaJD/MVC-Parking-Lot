function ParkingTableController(el, view, model) {
  this.$el = $(el);
  this.view = view;
  this.model = model;

  this.init = function() {
    this.view.renderTable(this.$el);
    this.showCars();
    this.bindEvents();
  };

  this.bindEvents = function() {
    this.$el.on('click', '.js-delete-individual-car', this.deleteCar.bind(this));
    this.$el.on('click', '#remove-selected-cars-btn', this.deleteSelectedCars.bind(this));
    this.$el.on('click', '#select-all-cars-btn', this.view.selectAllCars.bind(this));
    this.$el.on('click', '#go-to-top', this.view.goToTop.bind(this));
    $(window).scroll(this.view.showGoToTopBtn.bind(this));
    EventManager.on('show.cars', this.showCars.bind(this));
  };

  this.showCars = function(searchCriteria) {
    let carsTorender = this.model.getAllCars(searchCriteria);
    this.view.renderCars(carsTorender, this.$el);
  };

  this.deleteCar = function(event) {
    let carID = event.target.id;
    this.model.removeCar(carID);
    this.showCars();
  };

  this.deleteSelectedCars = function() {
    let $checkedCars = this.$el.find('table input.check-box')
    
    $checkedCars.each((index, element)=>{
      if (element.checked){
        this.model.removeCar(element.id);
        this.showCars();
      }
    });
  };
}
