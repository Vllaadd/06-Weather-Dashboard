var apiKey = "166a433c57516f51dfab1f7edaed8413";  

//date
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth();
    var date = myDate.getDate();

    var localDate = document.getElementById("date").innerHTML = "(" + year + "/" + month + "/" + date + ")";


    $(document).ready(function(){           
        $("#submit").click(function(){           
          getWeather();  
          var userInput = $("#user-input").val();
          fiveDayForecast(userInput);
        });
  

//current forecast
    function getWeather(){
        var city = $("#user-input").val();                                                                                                          
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey,
                type: "GET",
                dataType: "jsonp",
                success: function(data){
                    $("#city").html(data.name + " , " + data.sys.country);
                    $("date").html(localDate);
                    $("#temp").html(data.main.temp);
                    $("#humidity").html(data.main.humidity);
                    $("#wind").html(data.wind.speed);
                    $("#user-input").val(" "); 
                    uvIndex(data.coord.lon, data.coord.lat);
                }
            });   
    };


  var key = "166a433c57516f51dfab1f7edaed8413";
  var url = "https://api.openweathermap.org/data/2.5/forecast";

  function fiveDayForecast(userInput){
    $.ajax({
      url: url,
      dataType: "json",
      type: "GET",
      data: {
        q: userInput,
        appid: key,
        units: "imperial",
        cnt: "40"
      },
      success: function(data){
        $("#five-day-forecast").empty();
        for(var i = 0; i< data.list.length; i+=8){
          var colEl = $("<div>").addClass("col col-lg-2");
          var cardEl = $("<div>").addClass("card text-white bg-primary m-3");
          var cardBody = $("<div>").addClass("card-body");
          var cardTitle = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
          var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
          var cardText1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");        
          var cardText2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");   
      colEl.append(cardEl.append(cardBody.append(cardTitle, img, cardText1, cardText2)));
      $("#five-day-forecast").append(cardEl);
        }
      }
    })
}
  });


  //history
      var cityList = [userCity];
      var userList = document.getElementById("search-list");
      var userCity = document.getElementById("user-input");
      var SubmitBtn = document.getElementById("submit");
 
      function addUsersInput(event){
        event.preventDefault();
        var cityInput = userCity.value;
        var tr = document.createElement("tr");
        tr.setAttribute("id", "search-list");
        tr.id = cityList.length;
        tr.innerHTML = cityInput;
        cityList.push[cityInput];
        userList.append(tr);
      }
      SubmitBtn.addEventListener("click", addUsersInput);


//UV index
var apiKey = "166a433c57516f51dfab1f7edaed8413";  
    function uvIndex(lon,lat) {
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon,
        type: "GET",
        dataType: "json",
        success:function(data){
          $("#uv").text(data.value);
      }
    })
  };
