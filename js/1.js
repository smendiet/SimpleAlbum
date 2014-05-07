var viewModel1 = {
  title:{
    en: ko.observable('one'),
    es: ko.observable('uno')
  },
  data: ko.observableArray(),
  data2: ko.observableArray(),
  history: ko.observableArray(),
  onlyChecked: ko.observable(false)

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

function filterBool(element) {
  return element.has == true;
}

function filterMarked(element) {
  return (viewModel1.onlyChecked()) ? filterBool(element) : true;
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function getDefaultImage(n) {
  return {num: n, has: false};
}

function loadData() {
  if(localStorage.Data) {
    var parsedData = JSON.parse(localStorage.Data);

    viewModel1.data2(parsedData.data2);
  }
}

function isDefined(object) {
  return (typeof object != 'undefined');
}

$(function() {
  console.log('jQuery instalado');

  if (!isDefined(dataPre)) {
    getDefaultData();
    viewModel1.data2(data2);
  } else {
    viewModel1.data2(dataPre.data2);
  }

  viewModel1.data(data);

  $("#btn-view").click(function() {
    console.log(ko.toJSON(viewModel1));
  });

  $("#btn-save").click(function() {
    if(!localStorage.Data) localStorage.Data = JSON.stringify({});
    localStorage.Data = ko.toJSON(viewModel1);
  });

  $("#btn-load").click(function(event) {
    loadData();
  });

  $("#btn-clean").click(function(event) {
    $.each(viewModel1.data2()[0].imagenes, function(i, imagen) {
      imagen.has = false;
    });
  });

  ko.applyBindings(viewModel1, $("#one-body").get(0))
  viewModel1.data2()[0].imagenes[0].has = true;
});