$(document).ready(function() {
    let dataSet = [];

    function fetchDataSet() {
        $.ajax({
            url: "http://localhost:21062/dataset",
            method: "GET",
            success: function(data) {
                dataSet = data;
            },
            error: function(xhr, status, error) {
                console.log("Erro na requisição:", error);
            }
        });
    }
    

    function displayResults(query) {
        var results = dataSet.filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
        );

        var resultsContainer = $('#searchResults');
        resultsContainer.empty();

        if (results.length > 0) {
            results.forEach(result => {
                resultsContainer.append('<p class="searchResult">' + result + '</p>');
            });
        } else {
            resultsContainer.append('<p>Nenhum resultado encontrado</p>');
        }
    }

    $('#searchInput').on('input', function() {
        var query = $(this).val();
        displayResults(query);
    });

    $('#searchResults').on('click', '.searchResult', function() {
        var selectedResult = $(this).text();
        $('#searchInput').val(selectedResult);
        $('#searchResults').empty();
    });

    // Inicialização
    fetchDataSet();
});
