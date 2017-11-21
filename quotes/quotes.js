$(document).ready( () => {
    $.getJSON("quotes.txt", qs => {
        $("#refr").click( () => {
            $("#tweet").attr("href", "#");
            $("#refr").attr("disabled", true);
            $("#blk").fadeOut( () => {
               var idx = Math.floor(Math.random() * qs.length);
                $("#qtxt").text(qs[idx].quote);
                $("#qauth").text(qs[idx].author);
                $("#tweet").attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&text=" + 
                            encodeURIComponent('"' + $("#qtxt").text() + '" ' + $("#qauth").text()));
                $("#blk").fadeIn( () => $("#refr").removeAttr("disabled"));
            });
        });
        
        $("#refr").trigger("click");
    });
});