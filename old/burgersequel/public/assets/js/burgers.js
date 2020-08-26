
$(document).ready(function () {

    $(document).on("click", "#eat", function () {
        var id = $(this).data("id");
        console.log('id :' + id)
        $.ajax("/api/burger/" + id, {
            type: "PUT"
        }).then(() => location.reload(true)
        );
    });

    // $(document).on("click", '#delete', function () {
    //     var id = $(this).data("id");
    //     $.ajax("/api/burger/" + id, {
    //         type: "DELETE"
    //     }).then(() => location.reload());
    // });

    $('#submit').on('click', () => $.post('/api/burger', $('input')).then(() => location.reload(true))
    );
})

