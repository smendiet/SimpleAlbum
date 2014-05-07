var viewModel1 = {
  title:{
    en: ko.observable('one'),
    es: ko.observable('uno')
  },
  data: ko.observableArray(),
  data2: ko.observableArray(),
  history: ko.observableArray()
};

var data = [{
  name: 'name1',
  season: [{
    code: 's01',
    episodes: [{
      code: 'e01',
      name: {
        en: 'one',
        es: 'uno'
      }
    },
    {
      code: 'e02',
      name: {
        en: 'two',
        es: 'dos'
      }
    }]
  }]
},{
  name: 'name2',
  season: [{
    code: 's01',
    episodes: [{
      code: 'e01',
      name: {
        en: 'one',
        es: 'uno'
      },
      meta: ['save', 'read']
    },
    {
      code: 'e02',
      name: {
        en: 'two',
        es: 'dos'
      }
    },
    {
      code: 'e03',
      name: {
        en: 'tres',
        es: 'three'
      }
    }]
  }]
}];

var data2 = [{
  name: 'album',
  imagenes: [
  ]
}];

function getDefaultData() {
  var cantImage = 639, i = 0;

  for(;i <= cantImage; i++) {
    data2[0].imagenes.push(getDefaultImage(i));
  }
}

function getDefaultImage(n) {
  return {num: n, has: false};
}

function loadData() {
  var result = false;
  if(localStorage.Data) {
    var parsedData = JSON.parse(localStorage.Data);
    viewModel1.data2(parsedData.data2);
    result = true;
  }

  return result;
}

function searchImage() {
  var search_value = $("#two-txt-search").val(),
      max = viewModel1.data2()[0].imagenes.length,
      message, isPositive = $("#checkPositive").is(":checked");

  if (search_value === ''){
    alertify.alert('Vacio')
  } else {
    if (isInteger(search_value)) {
      if (search_value > max) {
        message = 'Numero de Imagen fuera de rango. Max = ' + max;

        alertify.alert(message);
      } else {
        var hasImage = (isPositive) ? isContain(search_value): !isContain(search_value);

        if (hasImage) {
          message = 'SI, tienes la imagen ' + search_value + '.';
        } else {
          message = 'NO, no tienes la imagen ' + search_value + '.' ;
        } 

        alertify.log(message, "success", 0);
        viewModel1.history.push({
          num: search_value,
          text: message,
          status: hasImage
        });
      }
    } else {
      alertify.log('Error, ' + search_value + ' valor no valido', 'error', 0)
    }

    $("#two-txt-search").val('');
  }
}

function filterBool(element) {
  return element.has == true;
}

function isInteger(value) {
  var result = false;
  if (Math.floor(value) == value && $.isNumeric(value)) result = true;

  return result;
}

function isContain(value) {
  var result = false;
  viewModel1.data2()[0].imagenes.forEach(function(element, index, array){
    if (element.num == value && element.has === true) result = true;
  });

  return result;
}

$(function() {
  getDefaultData();

  viewModel1.data(data);
  viewModel1.data2(data2);

  $("#two-alert.alert").alert("close");

  $("#two-btn-load").click(function(event) {
    if(loadData()) alertify.success('Datos cargados :)');
    else alertify.error('No se han podido cargar los datos :(')
  });

  $('#two-btn-search').click(function(event) {
    event.preventDefault();
    searchImage();
  });

  $('#two-txt-search').keyup(function(event) {
    if (event.which != 13) return;
    event.preventDefault();
    searchImage()
  });

  $("#two-btn-view-history").click(function(event) {
    event.preventDefault();
    console.log(search_history);
  });

  ko.applyBindings(viewModel1, $("#two-body").get(0))
});