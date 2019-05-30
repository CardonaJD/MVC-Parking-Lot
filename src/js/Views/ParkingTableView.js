function ParkingTableView(){
  this.renderTable = function($el){
    let table = `<table class="js-table-cars table table-striped">
                  <thead>
                  <tr>
                    <th>Car number</th>
                    <th>Model</th>
                    <th>Owner Name</th>
                    <th>Phone</th>
                    <th>Date of Arrival</th>
                    <th>Date of Departure</th>
                  </tr>
                  </thead>
                  <tbody>
                  </tbody>
                  <tfoot>
                    <th>Car number</th>
                    <th>Model</th>
                    <th>Owner Name</th>
                    <th>Phone</th>
                    <th>Date of Arrival</th>
                    <th>Date of Departure</th>
                    <th><button class="btn btn-outline-danger btn-sm" id="remove-selected-cars-btn">Delete selected cars</button></th>
                    <th><button class="btn btn btn-outline-warning btn-sm" id="select-all-cars-btn">Select all cars</button></th>
                  </tfoot>
                </table>
                <button class="btn btn-info btn-sm btn-block" id="go-to-top">Go back to top</button>`;
    $el.append(table);
  };
  
  this.renderCars = function(data, $el){
    let $table = $el.find(".js-table-cars tbody");
    $table.empty();
    data.forEach((car)=>{
      let carRow = `<tr>
                      <td>${car.number}</td>
                      <td>${car.model}</td>
                      <td>${car.ownerName}</td>
                      <td>${car.phone}</td>
                      <td>${car.arrival}</td>
                      <td>${car.departure}</td>
                      <td><button id="${car.id}" class="js-delete-individual-car btn btn btn-outline-danger btn-sm ">Delete</button></td>
                      <td><input id="${car.id}" type="checkbox" class="check-box"></td>
                    </tr>`;

      $el.find('.js-table-cars tbody').append(carRow);
    });
  };

  this.selectAllCars = function(){
    let $checkedCars = this.$el.find('table input.check-box')
    
    $checkedCars.each((index, element)=>{
      element.checked = true;
    })
  };

  this.showGoToTopBtn = function(){
    let $goTopBtn = this.$el.find('#go-to-top');
    let position = $('html,body').scrollTop(); 
    
    if (position === 0){
      $goTopBtn.hide();        
    } else{
      $goTopBtn.show();
    }
  };

  this.goToTop = function(){
    $('html,body').scrollTop(0);
  };
}
