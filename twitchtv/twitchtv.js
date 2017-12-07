/* jshint esversion: 6 */
(() => {
    var endp = "https://wind-bow.glitch.me/twitch-api/";
    var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "iFlynn", "AhornFPS", "noobs2ninjas"];
    
    let getPlayers = function(u) {
        $.getJSON(`${endp}users/${u}`, udata => {
            if ("_id" in udata) {
                let uicon = `${udata.logo === null ? '<h1 class="text-primary"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></h1>' : `<img src="${udata.logo}" class="img-responsive img-circle" width="64" height="64" alt="logo">` }`;
                $.getJSON(`${endp}streams/${u}`, sdata => {
                    if (! sdata.stream) {
                        $(`<tr>
                             <td>${uicon}</td>
                             <td><a href="https://www.twitch.tv/${udata.name}" target="_blank"><h4>${udata.display_name}</h4></a></td>
                             <td><h2 data-toggle="tooltip" data-placement="left" title="Offline" class="text-danger"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span></h2></td>
                           </tr>`).appendTo("tbody");
                        $('[title="Offline"]').last().tooltip();
                    }
                    else {
                        $(`<tr>
                             <td>${uicon}</td>
                             <td><a href="${sdata.stream.channel.url}" target="_blank"><h4>${udata.display_name}</h4></a><p>${sdata.stream.game}, <em>${sdata.stream.stream_type}</em></p></td>
                             <td><h2 data-toggle="tooltip" data-placement="left" title="Online" class="text-success"><span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span></h2></td>
                           </tr>`).appendTo("tbody");
                        $('[title="Online"]').last().tooltip();
                    }
                });
            }
            else { /* user does not exist */
                $(`<tr>
                     <td><h1 class="text-muted"><span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span></h1></td>
                     <td><h4>${u}</h4></td>
                     <td><h2 data-toggle="tooltip" data-placement="left" title="No such user"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></h2></td>
                   </tr>`).appendTo("tbody");
                $('[title="No such user"]').last().tooltip();
            }
    }); };
        
    for (let u of users)
        getPlayers(u);
    
})();
