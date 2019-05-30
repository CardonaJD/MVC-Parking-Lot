function ControlsAndFormView(el) {
  this.$el = $(el);

  this.createForm = function() {
    let form = `<form class="js-add-car">
                  <span><strong>Add new car</strong></span>
                  <input type="text" class="form-control" id="number-new-car" placeholder="Car number" required >
                  <input type="text" class="form-control" id="model-new-car" placeholder="Model"  required>
                  <input type="text" class="form-control" id="ownerName-new-car" placeholder="Owner full name"  required>
                  <input type="text" class="form-control" id="phone-new-car" placeholder="Phone" required>
                  <input type="text" class="form-control" id="arrival-new-car" placeholder="Date of arrival DD/MM/YYYY" required>
                  <input type="text" class="form-control" id="departure-new-car" placeholder="Date of departure DD/MM/YYYY" required>
                  <input type="submit" class="btn btn-primary btn-sm btn-block" id="add-car-btn" value="Add car"></td>
                </form>`;

    this.$el.append(form);
  };

  this.createSearhSection = function() {
    let search = `<div class="js-search-car">
                    <div class="search-fields">
                      <span><strong>Filter by category</strong></span>
                      <select class="custom-select" id="search-options">
                        <option data-search="number" > Car number </option>
                        <option data-search="model" > Car model </option>
                        <option data-search="ownerName">Owner name</option>
                        <option data-search="phone"> Phone number </option>
                        <option data-search="arrival">Date of arrival</option>
                        <option data-search="departure">Date of departure</option>
                      </select>
                      <input type="search" class="form-control" id="search-input" placeholder="Search...">
                      <button id="search-btn" class="btn btn-secondary btn-sm" >Search</button>
                      <button id="all-cars-btn" class="btn btn-secondary btn-sm">Show all cars</button>
                    </div>
                    <div class="search-fields">
                      <span><strong>Order by category</strong></span>
                      <select class="custom-select" id="search-options-order-category">
                        <option data-search="number" > Car number </option>
                        <option data-search="model" > Car model </option>
                        <option data-search="ownerName">Owner name</option>
                        <option data-search="phone"> Phone number </option>
                        <option data-search="arrival">Date of arrival</option>
                        <option data-search="departure">Date of departure</option>
                      </select>
                    </div>
                  </div>`;

    this.$el.append(search);
  };

  this.createRandomSection = function(){
    let section = `<div class="js-random-car" id="random-data">
                    <span><strong>Create random data</strong></span>
                    <input class="form-control" id="how-many-cars" type="text" placeholder="How many cars">
                    <button class="btn btn-secondary btn-sm" id="create-random">Create random</button>
                  </div>`;

    this.$el.append(section);
    
  }

  this.cleanForm = function(){
    let $formInputs = this.$el.find($('.js-add-car input[type="text"]'));
    $formInputs.each((index, input) =>{
      $(input).val('');
    });
  }
  this.render = function() {
    this.createSearhSection();
    this.createForm();
    this.createRandomSection()
  };
}
