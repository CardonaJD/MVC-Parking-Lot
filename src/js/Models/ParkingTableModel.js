function ParkingTableModel(el) {
  let apiUrl = 'http://localhost:5000';
  this.data = [];
  this.$el = el;
  this.getAllCars = function(searchObj = {}) {
    let returnData = (data) => {
      this.data = data;
    };

    $.ajax({
      url: apiUrl + '/parking',
      method: 'GET',
      dataType: 'json',
      async: false,
      success: function(resp) {
        returnData(resp.data);
      }
    });

    if (searchObj.search !== undefined && searchObj.category !== undefined){
      this.filterData(searchObj);
    }

    if (searchObj.orderCategory){
      this.orderByCategory(searchObj.orderCategory);
    }

    return this.data;

  };

  this.removeCar = function(carID) {
    $.ajax({
      url: `${apiUrl}/parking/${carID}`,
      type: 'DELETE'
    }).fail((reject, status) => {
      EventManager.fire('general.error', `Reject : ${reject} \n Status : ${status}`);
    });
  };

  this.filterData = function(searchObj){
    this.data = this.data.filter( car => car[searchObj.category] === searchObj.search);
  };

  this.orderByCategory = function(category){
    this.data = this.data.sort((car1, car2) => {
      if (category === "arrival" || category === "departure") {
        let date1 = this.getFormatToDate(car1[category])
        let date2 = this.getFormatToDate(car2[category])

          if (date1 < date2) {
            return -1;
          }

          if (date1 > date2) {
            return 1;
          }
      } else {
        if (car1[category] < car2[category]) {
          return -1;
        }

        if (car1[category] > car2[category]) {
          return 1;
        }
      }
    });
  }

  this.getFormatToDate = function (date){
    let regexp = /(\d+)\/(\d+)\/(\d+)/g
    let dateFixed = date.replace(regexp, (str, g1, g2, g3) => {
      return `${g3}-${g2}-${g1}`
    });
    return new Date(dateFixed)
  }
}
