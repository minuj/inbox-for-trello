$('.needsapi').hide();
var $boards = $('#boards');
var $lists = $('#lists');



document.addEventListener('TrelloTime', function () {
    Trello.authorize(options);
    Trello.get("members/me/boards", function(board) {
        $.each(board, function(i){
            var thisboard = board[i];
            if(!thisboard.closed){
                $boards.append('<option id="'+thisboard.id+'" '+
                    (localStorage['board'] == thisboard.id?'selected="selected"':'')+
                    '>'+thisboard.name+'</option>');
            }
        });
        updateLists(localStorage.board!==undefined?localStorage.board:board[0].id);
    });
});

function save_options() {
    var apikey = '4b077d4fa0c75e9c9e0260707b706ee5';

    if(Trello.authorized()){
        localStorage.board = $boards.children(':selected').attr('id');
        localStorage.list = $lists.children(':selected').attr('id');
    }
    setTimeout(function() {
        location.reload();
    }, 100);
}

function restore_options() {

    var stored_apikey = '4b077d4fa0c75e9c9e0260707b706ee5';
    var stored_board = localStorage.board;
    var stored_list = localStorage.list;

    $('#boards').val(stored_board);
    $('#lists').val(stored_list);

    $('.needsapi').show();
}

var updateLists = function (boardid) {
    $lists.empty();
    Trello.get("boards/"+boardid+"/lists", function(lists) {
        $.each(lists, function(i){
            var thislist = lists[i];
            if(!thislist.closed){
                if(thislist.idBoard == boardid){
                $lists.append('<option id="'+thislist.id+'" '+(localStorage['list'] == thislist.id?'selected="selected"':'')+'>'+thislist.name+'</option>');
                }
            }
        });
    });
    $('.needsapi').show();
};
$boards.on('change', function(e){
    updateLists($(e.target).children(':selected').attr('id'));
});


document.addEventListener('DOMContentLoaded', function (){
    restore_options();
});
$('#save').on('click', function (e) {
    e.preventDefault();
    save_options();
});
$('#unauthorize').on('click',function(){
	Trello.deauthorize();
	window.location.reload();
});
