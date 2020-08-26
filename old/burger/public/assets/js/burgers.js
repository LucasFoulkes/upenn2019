

$(document).on("click", "#eat", function () {
    var id = $(this).data("id");
    $.ajax("/api/burger/" + id, {
        type: "PUT"
    }).then(() => location.reload()
    );
});

$(document).on("click", '#delete', function () {
    var id = $(this).data("id");
    $.ajax("/api/burger/" + id, {
        type: "DELETE"
    }).then(() => location.reload());
});

$('#submit').on('click', () => {
    $.post('/api/burger', $('input'))
    location.reload();
})

