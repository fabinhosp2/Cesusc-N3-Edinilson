var table = null;

$(document).ready(function() {
    $('#inserirWhisky').submit(function(){
        inserirWhisky();
        return false;
    });

    table = $('#myTable').DataTable( {
        'language': {
            'url': '/javascripts/dt_pt.json'
        },
        "order": [[ 0, "desc" ]],
        ajax: {
            url: "/whiskys/",
            dataSrc: "data"
         },
         "columns": [
            { "data": "_id", 'title':'ID' },
            { "data": "fixed acidity", 'title':'Fixed Acidity' },
            { "data": "volatile acidity", 'title':'Volatile Acidity' },
            { "data": "citric acid", 'title':'Citric Acid' },
            { "data": "residual sugar", 'title':'Residual Sugar' },
            { "data": "chlorides", 'title':'Chlorides' },
            { "data": "free sulfur dioxide", 'title': 'Free Sulfur Dioxide' },
            {
                data: null,
                title: 'Remover',
                render: function ( data, type, row ) {
                    return '<button class="btn btn-danger" onclick="removerWhisky(\'' + row._id +'\');">Remover</button>';
                }
            }
        ]
    } );
});

function removerWhisky(id){
    $.ajax({
        url: '/whiskys/' + id,
        type: 'DELETE',
        success: function(response) {
            table.ajax.reload();
        }
     });
}

function inserirWhisky(id){
    whisky = {
        'fixed acidity': $('#fixed_acidity').val(),
        'volatile acidity': $('#volatile_acidity').val(),
        'citric acid': $('#citric_acid').val(),
        'residual sugar': $('#residual_sugar').val(),
        'chlorides': $('#chlorides').val(),
        'free sulfur dioxide': $('#free_sulfur_dioxide').val(),
    };
    console.log(JSON.stringify(whisky));
    $.ajax({
        url: '/whiskys/',
        type: 'POST',
        data: whisky,
        success: function(response) {
            table.ajax.reload();
            $('#inserirWhisky input').val('');
            $('#inserir').hide();

        }
     });

}


