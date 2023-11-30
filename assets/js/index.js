var baseYahooURL = "https://query.yahooapis.com/v1/public/yql?q="
var selectedCity = "London,UK";
var placeholder = "";
var unit = "c"
init();

function init(){
    getWoeid(selectedCity);

    $('#city').keypress(function() {
    	if ( event.which == 13 ) {
	    selectedCity =  $('#city').val();
	    getWoeid(selectedCity);
	    $('#city').blur();
	  }
	});

	$('#btn').click(function() {
	  if($('#btn').html() == "F")
	  {
	  	unit = "c";
	  }
	  else unit = "f";
	  $('#btn').html(unit.toUpperCase());
	  getWoeid(selectedCity);
	})

	$('#city').focus(function(event) {
		placeholder = $("#city").val();
		$("#city").val("");
	});

	$('#city').blur(function(event) {
		if($("#city").val() == "")
		{
		    $("#city").val(placeholder);
		}
	});
}

function getWoeid(city){
	var woeidYQL = 'select woeid from geo.placefinder where text="'+ city +'"&format=json';
	var jsonURL = baseYahooURL + woeidYQL;
	$.getJSON(jsonURL, woeidDownloaded);
}

function woeidDownloaded(data){
	var woeid = null;
	if(data.query.count <= 0)
	{
		$('#city').val("No city found");
		$('#deg').html("");
		setImage(999, $("#big")[0]);
		for(var i = 0; i <= 11;i++)
		{
			$('#forecast'+i).html("");
			setImage(999, $("#forecastimg" + i)[0]);
			$('#forecastdeg' + i).html("");
		}
		return;
	}
	else if(data.query.count == 1){
		woeid = data.query.results.Result.woeid;
	}
	else
	{
		woeid = data.query.results.Result[0].woeid;
	}
	getWeatherInfo(woeid);
}

function getWeatherInfo(woeid){
 var weatherYQL = 'select * from weather.forecast where woeid=' + woeid + ' and u = "'+unit+'" &format=json';
 var jsonURL = baseYahooURL + weatherYQL
 $.getJSON(jsonURL, weaterInfoDownloaded);
}

function weaterInfoDownloaded(data){
	$('#city').val(data.query.results.channel.location.city);
	$('#deg').html(data.query.results.channel.item.condition.temp + "°" + unit.toUpperCase());
	setImage(data.query.results.channel.item.condition.code, $('#big')[0]);
	for(var i = 0; i <= 7;i++)
	{
		var fc = data.query.results.channel.item.forecast[i];
		$('#forecast'+i).html(fc.day);
		setImage(fc.code, $("#forecastimg" + i)[0]);
		$('#forecastdeg' + i).html((parseInt(fc.low) + parseInt(fc.high)) / 2 + " °" + unit.toUpperCase());
	}
}

function setImage(code, image){
	image.src = "http://student.howest.be/enzo.eghermanne/codepen/";
	switch(parseInt(code))
	{
		case 0:
			image.src += "images/icons/Tornado.svg"
			break;
		case 1:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 2:
			image.src += "images/icons/Wind.svg"
			break;
		case 3:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 4:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 5:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 6:
			image.src += "images/icons/Cloud-Rain-Alt.svg"
			break;
		case 7:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 8:
			image.src += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 9:
			image.src += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 10:
			image.src += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 11:
			image.src += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 12:
			image.src += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 13:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 14:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 15:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 16:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 17:
			image.src += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 18:
			image.src += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 19:
			image.src += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 20:
			image.src += "images/icons/Cloud-Fog.svg"
			break;
		case 21:
			image.src += "images/icons/Cloud-Fog.svg"
			break;
		case 22:
			image.src += "images/icons/Cloud-Fog.svg"
			break;
		case 23:
			image.src += "images/icons/Cloud-Fog.svg"
			break;
		case 24:
			image.src += "images/icons/Wind.svg"
			break;
		case 25:
			image.src += "images/icons/Thermometer-Zero"
			break;
		case 26:
			image.src += "images/icons/Cloud.svg"
			break;
		case 27:
			image.src += "images/icons/Cloud-Moon.svg"
			break;
		case 28:
			image.src += "images/icons/Cloud.svg"
			break;
		case 29:
			image.src += "images/icons/Cloud-Moon.svg"
			break;
		case 30:
			image.src += "images/icons/Cloud-Sun.svg"
			break;
		case 31:
			image.src += "images/icons/Moon.svg"
			break;
		case 32:
			image.src += "images/icons/Sun.svg"
			break;
		case 33:
			image.src += "images/icons/Moon.svg"
			break;
		case 34:
			image.src += "images/icons/Sun.svg"
			break;
		case 35:
			image.src += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 36:
			image.src += "images/icons/Sun.svg"
			break;
		case 37:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 38:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 39:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 40:
			image.src += "images/icons/Cloud-Rain.svg"
			break;
		case 41:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 42:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 43:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 44:
			image.src += "images/icons/Cloud.svg"
			break;
		case 45:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 46:
			image.src += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 47:
			image.src += "images/icons/Cloud-Lightning.svg"
			break;
		case 3200:
			image.src += "images/icons/Moon-New.svg"
			break;
		case 999:
			image.src += "images/icons/Compass.svg"
			break;
		default:
			image.src += "images/icons/Moon-New.svg"
			break;
	}
}



function setImageReturn(code){
	var image = "http://student.howest.be/enzo.eghermanne/codepen/";
	switch(parseInt(code))
	{
		case 0:
			image += "images/icons/Tornado.svg"
			break;
		case 1:
			image += "images/icons/Cloud-Lightning.svg"
			break;
		case 2:
			image += "images/icons/Wind.svg"
			break;
		case 3:
			image += "images/icons/Cloud-Lightning.svg"
			break;
		case 4:
			image += "images/icons/Cloud-Lightning.svg"
			break;
		case 5:
			image += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 6:
			image += "images/icons/Cloud-Rain-Alt.svg"
			break;
		case 7:
			image += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 8:
			image += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 9:
			image += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 10:
			image += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 11:
			image += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 12:
			image += "images/icons/Cloud-Drizzle-Alt.svg"
			break;
		case 13:
			image += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 14:
			image += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 15:
			image += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 16:
			image += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 17:
			image += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 18:
			image += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 19:
			image += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 20:
			image += "images/icons/Cloud-Fog.svg"
			break;
		case 21:
			image += "images/icons/Cloud-Fog.svg"
			break;
		case 22:
			image += "images/icons/Cloud-Fog.svg"
			break;
		case 23:
			image += "images/icons/Cloud-Fog.svg"
			break;
		case 24:
			image += "images/icons/Wind.svg"
			break;
		case 25:
			image += "images/icons/Thermometer-Zero"
			break;
		case 26:
			image += "images/icons/Cloud.svg"
			break;
		case 27:
			image += "images/icons/Cloud-Moon.svg"
			break;
		case 28:
			image += "images/icons/Cloud.svg"
			break;
		case 29:
			image += "images/icons/Cloud-Moon.svg"
			break;
		case 30:
			image += "images/icons/Cloud-Sun.svg"
			break;
		case 31:
			image += "images/icons/Moon.svg"
			break;
		case 32:
			image += "images/icons/Sun.svg"
			break;
		case 33:
			image += "images/icons/Moon.svg"
			break;
		case 34:
			image += "images/icons/Sun.svg"
			break;
		case 35:
			image += "images/icons/Cloud-Hail-Alt.svg"
			break;
		case 36:
			image += "images/icons/Sun.svg"
			break;
		case 37:
			image += "images/icons/Cloud-Lightning.svg"
			break;
		case 38:
			image += "images/icons/Cloud-Lightning.svg"
			break;
		case 39:
			image += "images/icons/Cloud-Lightning.svg"
			break;
		case 40:
			image += "images/icons/Cloud-Rain.svg"
			break;
		case 41:
			image += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 42:
			image += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 43:
			image += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 44:
			image += "images/icons/Cloud.svg"
			break;
		case 45:
			image += "images/icons/Cloud-Lightning.svg"
			break;
		case 46:
			image += "images/icons/Cloud-Snow-Alt.svg"
			break;
		case 47:
			image += "images/icons/Cloud-Lightning.svg"
			break;
		case 3200:
			image += "images/icons/Moon-New.svg"
			break;
		case 999:
			image += "images/icons/Compass.svg"
			break;
		default:
			image += "images/icons/Moon-New.svg"
			break;
	}
	
	return image;
	
}

MygetWoeid('AMSTERDAM, NETHERLANDS');

MygetWoeid('LONDON, ENGLAND');

MygetWoeid('Birmingham, ENGLAND');

MygetWoeid('Bristol, ENGLAND');

MygetWoeid('Chester, ENGLAND');

 
function MygetWoeid(city){
	/*alert(city);*/
	var woeidYQL = 'select woeid from geo.placefinder where text="'+ city +'"&format=json';
	var jsonURL = baseYahooURL + woeidYQL;
	$.getJSON(jsonURL, myWoeidDownloaded);
}

function myWoeidDownloaded(data){
	var woeid = null;
	if(data.query.count <= 0)
	{
		$('#city').val("No city found");
		$('#deg').html("");
		setImage(999, $("#big")[0]);
		for(var i = 0; i <= 11;i++)
		{
			$('#forecast'+i).html("");
			setImage(999, $("#forecastimg" + i)[0]);
			$('#forecastdeg' + i).html("");
		}
		return;
	}
	else if(data.query.count == 1){
		woeid = data.query.results.Result.woeid;
	}
	else
	{
		woeid = data.query.results.Result[0].woeid;
	}
	MyGetWeatherInfo(woeid);
}


function MyGetWeatherInfo(woeid){
 var weatherYQL = 'select * from weather.forecast where woeid=' + woeid + ' and u = "'+unit+'" &format=json';
 var jsonURL = baseYahooURL + weatherYQL
 $.getJSON(jsonURL, myWeaterInfoDownloaded);
}


function myWeaterInfoDownloaded(data){
	var date_id = data.query.results.channel.item.forecast[0].date;
	var dateBYCity = date_id.split(" ");
	
	
	var location = data.query.results.channel.location.city;
	
	if(location == 'Amsterdam'){
		$('#nth_max_deg').text(data.query.results.channel.item.forecast[0].high + "°C");
		$('#nth_min_deg').text(data.query.results.channel.item.forecast[0].low  + "°C");
		$("#nth_img").attr('src',setImageReturn(data.query.results.channel.item.forecast[0].code));
		$("#nth_day").text(dateBYCity[0]+' '+ dateBYCity[1]);
	}
	
	if(location == 'London'){
		$('#lon_max_deg').text(data.query.results.channel.item.forecast[0].high + "°C");
		$('#lon_min_deg').text(data.query.results.channel.item.forecast[0].low  + "°C");
		$("#lon_img").attr('src',setImageReturn(data.query.results.channel.item.forecast[0].code));
		$("#lon_day").text(dateBYCity[0]+' '+ dateBYCity[1]);
	}
	
	if(location == 'Birmingham'){
		$('#bir_max_deg').text(data.query.results.channel.item.forecast[0].high + "°C");
		$('#bir_min_deg').text(data.query.results.channel.item.forecast[0].low  + "°C");
		$("#bir_img").attr('src',setImageReturn(data.query.results.channel.item.forecast[0].code));
		$("#bir_day").text(dateBYCity[0]+' '+ dateBYCity[1]);
	}
	
	if(location == 'Bristol'){
		$('#bris_max_deg').text(data.query.results.channel.item.forecast[0].high + "°C");
		$('#bris_min_deg').text(data.query.results.channel.item.forecast[0].low  + "°C");
		$("#bris_img").attr('src',setImageReturn(data.query.results.channel.item.forecast[0].code));
		$("#bris_day").text(dateBYCity[0]+' '+ dateBYCity[1]);		
	}
	
	if(location == 'Chester'){
		$('#ches_max_deg').text(data.query.results.channel.item.forecast[0].high + "°C");
		$('#ches_min_deg').text(data.query.results.channel.item.forecast[0].low  + "°C");
		$("#ches_img").attr('src',setImageReturn(data.query.results.channel.item.forecast[0].code));
		$("#ches_day").text(dateBYCity[0]+' '+ dateBYCity[1]);		
	}
}