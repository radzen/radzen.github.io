//$(document).ready(function() {
  getCurrent();

  $(".search").click(searchLocation);

  $(".searchBar").keypress(function(key){
    if (key.which === 13) {
      searchLocation();
    }
  });

  $(".searchBar").click(function(){
    $(".form-control").attr("placeholder","Search");
  });

  $(".geoLocation").click(function() {
    $(".form-control").attr("placeholder","Current Location");
    $(".form-control").val("");
    getCurrent();
  });

  $(".tmp").click(toggle);
//});

function searchLocation() {
  var loc = $(".form-control").val();
  if (loc === "") return;
  loc = loc.replace(" ", "_");
  var urlStart = "https://api.wunderground.com/api/574a65580a7af15f/geolookup/conditions/q/",
      url =  urlStart + loc + ".json",
      wu = getJson(url);
  //console.log(wu.response.hasOwnProperty("results"));
  if (wu.response.hasOwnProperty("error")) return;
  if (wu.response.hasOwnProperty("results")) {
    //console.log(wu.response.results.length);
    var items = wu.response.results.length,
        item = Math.floor(Math.random() * items);
    var state = wu.response.results[item].state;
    if (!state) state = wu.response.results[item].country_name;
    url = urlStart + wu.response.results[item].city + "_" + state + ".json";
    wu = getJson(url);
    //console.log(url);
  }
  var hr = wu.current_observation.local_time_rfc822.split(" ")[4].split(":")[0];
  setLocation(wu.current_observation.display_location.full);
  setTemp(wu.current_observation.temp_f.toFixed(0), wu.current_observation.temp_c.toFixed(0));
  setHumidity(wu.current_observation.relative_humidity);
  setWeather(wu.current_observation.weather, wu.current_observation.icon, hr);
  setGradient(hr);
}

function getCurrent() {
  getLocation(function(loc) {
    var url = "http://api.wunderground.com/api/574a65580a7af15f/geolookup/conditions/q/" + loc + ".json",
        wu = getJson(url),
        hr = wu.current_observation.local_time_rfc822.split(" ")[4].split(":")[0];

    setLocation(wu.current_observation.display_location.full);
    setTemp(wu.current_observation.temp_f.toFixed(0), wu.current_observation.temp_c.toFixed(0));
    setHumidity(wu.current_observation.relative_humidity);
    setWeather(wu.current_observation.weather, wu.current_observation.icon, hr);
    setGradient(hr);
  });
}

function toggle() {
  var unit = $(".deg").text();

  if (unit === "°F") {
    $(".deg").text("°C");
    $(".far").css("display", "none");
    $(".cel").css("display", "inline");
  } else {
    $(".deg").text("°F");
    $(".cel").css("display", "none");
    $(".far").css("display", "inline");
  }
}

function setLocation(val) {
  $(".location").text(val);
  //$(".form-control").attr("placeholder", val);
}

function setWeather(desc, icon, hr) {
  var icon_url = "http://icons.wxug.com/i/c/v4/";
  genClouds(0);
  if (hr >= 18 || hr <= 2) icon_url = icon_url + "nt_";
  $(".icon").attr("src", icon_url + icon + ".svg");
  $(".weather").text(desc);
  // if (desc.indexOf("Rain") !== -1 || desc.indexOf("Thunderstorm") !== -1) {
  //   genClouds(0);
  //   $(".effects").css("background-image","url(http://imgh.us/rain.svg)");
  // } else if (desc.indexOf("Snow") !== -1) {
  //   genClouds(0);
  //   $(".effects").css("background-image","url(http://imgh.us/snow_1.svg)");
  // } else if (desc.indexOf("Partly Cloudy") !== -1) {
  //   $(".effects").css("background-image","url()");
  //   genClouds(6);
  // } else if (desc.indexOf("Mostly Cloudy") !== -1) {
  //   $(".effects").css("background-image","url()");
  //   genClouds(10);
  // } else if (desc.indexOf("Scattered Clouds") !== -1) {
  //   $(".effects").css("background-image","url()");
  //   genClouds(3);
  // } else if (desc.indexOf("Haze") !== -1) {
  //   $(".effects").css("background-image","url(http://imgh.us/haze.svg)");
  //   genClouds(3);
  // } else {
  //   $(".effects").css("background-image","url()");
  //   genClouds(0);
  // }
}

function setTemp(far, cel) {
  var unit = $(".deg").text();
  if (!unit)
    $(".deg").text("°F");
  else if (unit === "°F")
    $(".deg").text("°F");
  else
    $(".deg").text("°C");

  $(".far").text(far);
  $(".cel").text(cel);
}

function setHumidity(val) {
  $(".humidity").text("Humidity: " + val);
}

function getJson(url) {
  return JSON.parse($.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    global: false,
    async: false,
    success: function(data) {
      console.log(data);
      return data;
    }
  }).responseText);
}

function getLocation(callback) {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(val) {
      callback(val.coords.latitude + "," + val.coords.longitude);
    });
}

function setGradient(hr) {
  //hr = "gradient" + hr;
  var gradient = {
   gradient00: "#00000c",
   gradient01: "linear-gradient(to bottom, #020111 85%,#191621 100%)",
   gradient02: "linear-gradient(to bottom, #020111 60%,#20202c 100%)",
   gradient03: "linear-gradient(to bottom, #020111 10%,#3a3a52 100%)",
   gradient04: "linear-gradient(to bottom, #20202c 0%,#515175 100%)",
   gradient05: "linear-gradient(to bottom, #40405c 0%,#6f71aa 80%,#8a76ab 100%)",
   gradient06: "linear-gradient(to bottom, #4a4969 0%,#7072ab 50%,#cd82a0 100%)",
   gradient07: "linear-gradient(to bottom, #757abf 0%,#8583be 60%,#eab0d1 100%)",
   gradient08: "linear-gradient(to bottom, #82addb 0%,#ebb2b1 100%)",
   gradient09: "linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)",
   gradient10: "linear-gradient(to bottom, #b7eaff 0%,#94dfff 100%)",
   gradient11: "linear-gradient(to bottom, #9be2fe 0%,#67d1fb 100%)",
   gradient12: "linear-gradient(to bottom, #90dffe 0%,#38a3d1 100%)",
   gradient13: "linear-gradient(to bottom, #57c1eb 0%,#246fa8 100%)",
   gradient14: "linear-gradient(to bottom, #2d91c2 0%,#1e528e 100%)",
   gradient15: "linear-gradient(to bottom, #2473ab 0%,#1e528e 70%,#5b7983 100%)",
   gradient16: "linear-gradient(to bottom, #1e528e 0%,#265889 50%,#9da671 100%)",
   gradient17: "linear-gradient(to bottom, #1e528e 0%,#728a7c 50%,#e9ce5d 100%)",
   gradient18: "linear-gradient(to bottom, #154277 0%,#576e71 30%,#e1c45e 70%,#b26339 100%)",
   gradient19: "linear-gradient(to bottom, #163C52 0%,#4F4F47 30%,#C5752D 60%,#B7490F 80%, #2F1107 100%)",
   gradient20: "linear-gradient(to bottom, #071B26 0%,#071B26 30%,#8A3B12 80%,#240E03 100%)",
   gradient21: "linear-gradient(to bottom, #010A10 30%,#59230B 80%,#2F1107 100%)",
   gradient22: "linear-gradient(to bottom, #090401 50%,#4B1D06 100%)",
   gradient23: "linear-gradient(to bottom, #00000c 80%,#150800 100%)"
  };
  $("body").css("background", gradient["gradient" + hr]);
  if (hr <= 4) {
    $(".gradient").css("opacity", ".4");
    $(".overlay").css("opacity", "1");
  }
  else if (hr <= 20) {
    $(".gradient").css("opacity", "1");
    $(".overlay").css("opacity", "0");
  }
  else if (hr <= 23) {
    $(".gradient").css("opacity", ".4");
    $(".overlay").css("opacity", "1");
  }
}

function genClouds(n) {
  var cloud = {
      cloud1: "http://imgh.us/cloud1.svg",
      cloud2: "http://imgh.us/cloud2_1.svg",
      cloud3: "http://imgh.us/cloud3.svg",
      cloud4: "http://imgh.us/cloud4.svg",
      cloud0: "http://imgh.us/cloud3.svg"
  }
  var html;
  if (n == 0) {
    $('.effects').html("");
    return;
  }
  for(var i = 0; i < n; i++) {
    html = $('.effects').html();
    var c = rand(4);

    $(".effects").html(
      html +
      "<img class='" +
      "cloud cloud" + i +
      "' src='" + cloud["cloud" + c] +
      "'/>");

    $(".cloud" + i).css("top", rand(50) + "px");
    $(".cloud" + i).css("left", rand(100) + "%");
  }

}

  function rand(n) {
    var r = Math.floor(Math.random() * n);
    return r;
  }
