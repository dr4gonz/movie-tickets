function Ticket(movie, time, age) {
  var year = movieDict[movie].year;
  this.time = parseInt(time.slice(0,2))+parseInt(time.slice(3,5))/100;
  if(year===2016) {
    this.isNew = true;
  } else {
    this.isNew = false;
  }
  this.age = age;
}

Ticket.prototype.getPrice = function() {
  var price = 8;
  if (this.age >= 60) {
    price *= 0.6;
  }
  if (!this.isNew) {
    price *= 0.5;
  }
  if (this.time > 17.00){
    price += 2;
  }
  return price;
}

function Movie(name, year) {
  this.name = name;
  this.year = year;
}
movieDict = {};

movieDict["Jurassic Park"] = new Movie("Jurassic Park", 1993);
movieDict["X-Men Apocalypse"] = new Movie("X-Men Apocalypse", 2016);
movieDict["Jurassic Park1"] = new Movie("Jurassic Park", 1993);
movieDict["X-Men Apocalypse1"] = new Movie("X-Men Apocalypse", 2016);
movieDict["Jurassic Park2"] = new Movie("Jurassic Park", 1993);
movieDict["X-Men Apocalypse2"] = new Movie("X-Men Apocalypse", 2016);
movieDict["Jurassic Park3"] = new Movie("Jurassic Park", 1993);
movieDict["X-Men Apocalypse3"] = new Movie("X-Men Apocalypse", 2016);

var inputMovie = "";
$(document).ready(function(){
  Object.keys(movieDict).forEach(function(key) {
    $("#movie-selector").append("<img class='thumb' src='img/"+movieDict[key].name+".jpg'>");
  });
  $(".thumb").click(function() {
    $("#movie-poster").empty();
    $("#movie-poster").append("<img class='poster' src='"+$(this).attr("src")+"'>");
    var titleURL = $(this).attr("src");
    inputMovie = titleURL.slice(4,titleURL.length-4);
  });
  for(var i=13; i<113; i++) {
    $("#select-age").append("<option value='"+i.toString()+"'>"+i.toString()+"</option>");
  }
  $(".increment").click(function() {
    var current = $(this).siblings("input").val();
    if($(this).text()==="+") {
      current ++;
    } else if(current > 1){
      current --;
    }
    $(this).siblings("input").val(current);
  });

  $("form").submit(function(event) {
    event.preventDefault();

    var inputTime = $("#input-time").val();
    var inputAge = $("#select-age").val();
    var inputNumber = $("#input-number").val();

    var newTicket = new Ticket(inputMovie, inputTime, inputAge);

    $("#total").text((newTicket.getPrice() * inputNumber).toString());
  });
});
