let Bootstrap = (function(){

  function loadModules (moduleName) {
    let $controllerContainers = $(`[data-controller='${moduleName}']`); 

    $controllerContainers.each(function() {
      let view = new window[`${moduleName}View`](this);
      let model = null; 
      
      if (window[`${moduleName}Model`]){
        model = new window[`${moduleName}Model`](this);
      }
      
      let ctrl = new window[`${moduleName}Controller`](this, view, model);
      ctrl.init();
    });
  }

  function initializeModules(modulesNames){
    modulesNames.forEach(moduleName => {
      loadModules(moduleName)
    })
  }

  function initializedDB(){
    let dataTest = [{"number":"1234", "model":"2018", "ownerName":"Damir" ,"phone":"3206656775", "arrival":"5/7/2018", "departure":"6/7/2018"}, 
                    {"number":"5678", "model":"2018", "ownerName":"Mauricio" ,"phone":"3206656776", "arrival":"5/9/2019", "departure":"6/7/2020"},
                    {"number":"9101", "model":"2019", "ownerName":"David" ,"phone":"3206656777", "arrival":"7/9/2015", "departure":"6/7/2018"},
                    {"number":"1213", "model":"2016", "ownerName":"Jose" ,"phone":"3206656778", "arrival":"9/7/2018", "departure":"9/7/2020"},
                    {"number":"1415", "model":"2013", "ownerName":"Julian" ,"phone":"3206656779", "arrival":"10/11/2018", "departure":"12/11/2019"},
                    {"number":"1617", "model":"2000", "ownerName":"Maria P" ,"phone":"3420665677", "arrival":"9/1/2018", "departure":"10/2/2018"},
                    {"number":"1819", "model":"1999", "ownerName":"Donald" ,"phone":"4206656775", "arrival":"5/7/2019", "departure":"16/12/2019"},
                    {"number":"2021", "model":"2001", "ownerName":"Alba" ,"phone":"6786656775", "arrival":"5/7/2018", "departure":"6/7/2018"},
                    {"number":"2021", "model":"2001", "ownerName":"Alba" ,"phone":"6786656775", "arrival":"6/7/2018", "departure":"6/7/2018"}];
    
    dataTest.forEach(car => $.post('http://localhost:5000' + '/parking', car));
  }

  return{
    star : function(){
      let appModules = ['ParkingTable', 'ControlsAndForm', 'Error'];
      initializeModules(appModules);
      // initializedDB();
    }
  }
})();
