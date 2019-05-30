function ControlsAndFormModel(el){
  this.$el = $(el);

  this.getDataForm = function(event){
    event.preventDefault();

    let newCar ={
      number: $('#number-new-car').val(),
      model: $('#model-new-car').val(),
      ownerName: $('#ownerName-new-car').val(),
      phone: $('#phone-new-car').val(),
      arrival: $('#arrival-new-car').val(),
      departure: $('#departure-new-car').val()
    };

    return newCar;
  }

  this.addCarToDB = function(newCar) {
    let validation = true;
    validation = this.validateData(newCar);

    if (validation) {
      $.post('http://localhost:5000/parking', newCar).fail((reject, status) => {
        EventManager.fire('general.error', `Reject : ${reject} \n Status : ${status}`);
      });
    }
  };

  this.validateData = function(data) {
    let dataValidation = true;
    let validation = {
      number: {
        msg: 'Car number must have only 4 digits',
        pattern: '^[0-9]{4}$'
      },
      model: {
        msg: 'Model must have only 4 digits',
        pattern: '^[0-9]{4}$'
      },
      ownerName: {
        msg: 'The owner name must have only letters and a length bettween 4 and 30 characters',
        pattern: '[a-zA-Z ]{4,30}'
      },
      phone: {
        msg: 'The cell phone number must have 10 digits',
        pattern: '^[0-9]{10}$'
      },
      arrival: {
        msg: 'The date of arrival format must be DD/MM/YYYY', 
        pattern: '[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}'
      },
      departure: {
        msg: 'The date of departure format must be DD/MM/YYYY', 
        pattern: '[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}'
      }
    };

    for (let key in data) {
      let regexp = new RegExp(validation[key].pattern);
      if (!regexp.test(data[key])) {
        dataValidation = false;
        EventManager.fire('general.error', `${validation[key].msg}`);
      }
    }

    return dataValidation;
  };

  this.generateRamdomData = function(){
    let arrivalDate = faker.date.past();
    let departureDate = faker.date.recent();

    let data = {
      number: Math.floor(1000 + (Math.random() * 9000)),
      model: Math.floor(2000 + (Math.random() * 20)),
      ownerName: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      arrival: `${arrivalDate.getDate()}/${arrivalDate.getMonth()}/${arrivalDate.getFullYear()}`,
      departure: `${departureDate.getDate()}/${departureDate.getMonth()}/${departureDate.getFullYear()}`
    }

    $.post('http://localhost:5000/parking', data)
    .fail((reject, status) => {
      EventManager.fire('general.error', `Reject : ${reject} \n Status : ${status}`);
    });
  }

  this.fillDBwithRandomData = function (howManyCars){    
    for (let i = 0; i < howManyCars; i++) {
      this.generateRamdomData();
    }
  }
}