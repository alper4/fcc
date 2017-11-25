(() => {
    var lang = "en";
    $("input[name='lang']").change(function () {
        lang = $(this).val();
        $(".input-group-btn a").attr("href", `https://${lang}.wikipedia.org/wiki/Special:Random`);
        });
    $("button").click( () => {
        $(".input-group input").attr("disabled", true);
        $(".input-group-btn button").attr("disabled", true);
        $(".input-group-btn a").attr("href", "#");
        $(".btn-sm").toggleClass("disabled");
        $.ajax({
            url: `https://${lang}.wikipedia.org/w/api.php`,
            data: { action: "opensearch",
                    format: "json",
                    search: $("input").val(),
                    origin: "*"
                  },
            success: d => {
                $("tr").remove();
                for (let i=1; i < d[1].length; ++i)
                    $(`<tr><td><p><a href="${d[3][i]}" target="_blank"><strong>${d[1][i]}</strong></a></p><p>${d[2][i]}</p></td></tr>`)
                    .appendTo("tbody");
                $(".input-group input").removeAttr("disabled");
                $(".input-group-btn button").removeAttr("disabled");
                $(".input-group-btn a").attr("href", `https://${lang}.wikipedia.org/wiki/Special:Random`);
                $(".btn-sm").toggleClass("disabled");
            }
        });
    });
    
})();

