if ("geolocation" in navigator) {
  const cSign = "&#8451";
  const fSign = "&#8457";
  var temp;
  
  function showTemp() {
    if ($("input[name='unit']:checked").val() == "F")
        $("#outp h1").html("<strong>" + Math.round(temp*9/5 + 32) + "</strong>" + fSign);
    else
        $("#outp h1").html("<strong>" + Math.round(temp) + "</strong>" + cSign);
  }
  
  $("#refr").click( () => {
    $("#refr").attr("disabled", true);
    $("#loc").text("N/A");
    $("#outp h1").text("N/A");
    $("#outp h4").text("N/A");
    $("#outp").css("background-image", "url('hglass.png')");
    navigator.geolocation.getCurrentPosition( p => {
        $.get("https://fcc-weather-api.glitch.me/api/current?lat=" + 
               p.coords.latitude + "&lon=" + p.coords.longitude, 
               resp => {
                   $("#loc").html(resp.name + " <small>" + resp.sys.country + "</small>");
                   $("#outp").css("background-image", "url('" + resp.weather[0].icon + "')");
                   temp = resp.main.temp;
                   showTemp();
                   $("#outp h4").text(resp.weather[0].description);
                   $("#refr").removeAttr("disabled");
        });
    });
  });
  
  $("input[name='unit']").change(showTemp);  
  $("#refr").trigger("click");  
}