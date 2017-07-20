$(document).ready(function() {
  var movimiento;
  var selectedItemPlayer;
  var selectedItemMachine;

  var board = [
    [
      "",
      "",
      ""
    ],
    [
      "",
      "",
      ""
    ],
    [
      "",
      "",
      ""
    ]
  ];

  function minInScore(list) {
    if (list.length == 0) {
      return 0;
    } else {
      var min = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i] < list[min]) {
          min = i;
        }
      }
      return min;
    }
  }

  function jugadasPosibles(board1) {
    var jugPosibles = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board1[i][j] != "X" && board1[i][j] != "O") {
          jugPosibles.push([i, j]);
        }
      }
    }

    return jugPosibles;
  }

  function win(player, board4) {
    var res = false;
    if (player == board4[0][0] && player == board4[1][1] && player == board4[2][2]) { //diagonal
      res = true;
    } else if (player == board4[0][0] && player == board4[0][1] && player == board4[0][2]) { //primer horizontal
      res = true;
    } else if (player == board4[1][0] && player == board4[1][1] && player == board4[1][2]) { //segunda horizontal
      res = true;
    } else if (player == board4[2][0] && player == board4[2][1] && player == board4[2][2]) { //tercer horizontal
      res = true;
    } else if (player == board4[0][0] && player == board4[1][0] && player == board4[2][0]) { //primer vertical
      res = true;
    } else if (player == board4[0][1] && player == board4[1][1] && player == board4[2][1]) { //segunda vertical
      res = true;
    } else if (player == board4[0][2] && player == board4[1][2] && player == board4[2][2]) { //tercer vertical
      res = true;
    } else if (player == board4[0][2] && player == board4[1][1] && player == board4[2][0]) { //otra diagonal
      res = true;
    }
    return res;
  }

  function seTermino(board3) {
    var res = false;
    if (win(selectedItemMachine, board3)) {
      res = true;
    } else if (win(selectedItemPlayer, board3)) {
      res = true;
    } else if (jugadasPosibles(board3) == 0) {
      res = true;
    }

    return res;
  }

  function boards(board2, player2) {
    var possibleBoards = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board2[i][j] != "X" && board2[i][j] != "O") {
          var boardAAgregar = jQuery.extend(true, {}, board2);
          boardAAgregar[i][j] = player2;
          possibleBoards.push(boardAAgregar);
        }
      }
    }

    return possibleBoards;
  }

  function maxInScore(list) {
    if (list.length == 0) {
      return 0;
    } else {
      var max = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i] > list[max]) {
          max = i;
        }
      }
      return max;
    }
  }

  function score(board, depth) {
    if (win(selectedItemMachine, board)) {
      return 10 - depth;
    } else if (win(selectedItemPlayer, board)) {
      return depth - 10
    } else {
      return 0;
    }
  }

  function minimax(board5, player, depth) {
    if (seTermino(board5)) {
      var sc = score(board5, depth);
      return sc;
    }
    depth = depth + 1;
    var scores = [];
    var moves = [];
    var opponent = (player == "X") ? "O" : "X";
    var possibleBoards = boards(board5, player);
    for (var i = 0; i < jugadasPosibles(board5).length; i++) {
      var possibleBoard = possibleBoards[i];
      scores.push(minimax(possibleBoard, opponent, depth));
      moves.push(jugadasPosibles(board5)[i]);
    }
    if (player == selectedItemMachine) {
      var maxIndexScore = maxInScore(scores);
      movimiento = moves[maxIndexScore];
      return scores[maxIndexScore];
    } else {
      var minIndexScore = minInScore(scores);
      movimiento = moves[minIndexScore];
      return scores[minIndexScore];
    }

  }

  $(".game").click(function() {
    if (!selectedItemPlayer || !selectedItemMachine) {
      alert("Please start a game!");
    }
  });

  $("#dialog").dialog({
    autoOpen: false,
    show: {
      effect: "blind",
    },
    hide: {
      effect: "fade",
    }
  });

  $("#startGame").on("click", function() {
    if (document.getElementById('startGame').innerHTML == "Reset") {
      $("td").html("");
      selectedItemPlayer = null;
      selectedItemMachine = null;
      board[0][0] = "";
      board[0][1] = "";
      board[0][2] = "";
      board[1][0] = "";
      board[1][1] = "";
      board[1][2] = "";
      board[2][0] = "";
      board[2][1] = "";
      board[2][2] = "";
      $("#startGame").html("Start Game!");
    } else {
      $("#dialog").dialog("open");
    }
  });

  $("#equis").click(function() {
    selectedItemPlayer = "X";
    selectedItemMachine = "O";
    $("#dialog").dialog("close");
    $("#startGame").html("Reset");
  });

  $("#circulo").click(function() {
    selectedItemPlayer = "O";
    selectedItemMachine = "X";
    $("#dialog").dialog("close");
    $("#startGame").html("Reset");
  });

  $("td").click(function(e) {
    if (selectedItemPlayer == "X") {
      $(this).html("X");
    } else if (selectedItemPlayer == "O") {
      $(this).html("O");
    }
    if ($("#upper-left").html() != "" && $("#upper-left").html() != selectedItemMachine) {
      board[0][0] = selectedItemPlayer;
    }
    if ($("#upper-middle").html() != "" && $("#upper-middle").html() != selectedItemMachine) {
      board[0][1] = selectedItemPlayer;
    }
    if ($("#upper-right").html() != "" && $("#upper-right").html() != selectedItemMachine) {
      board[0][2] = selectedItemPlayer;
    }
    if ($("#left").html() != "" && $("#left").html() != selectedItemMachine) {
      board[1][0] = selectedItemPlayer;
    }
    if ($("#middle").html() != "" && $("#middle").html() != selectedItemMachine) {
      board[1][1] = selectedItemPlayer;
    }
    if ($("#right").html() != "" && $("#right").html() != selectedItemMachine) {
      board[1][2] = selectedItemPlayer;
    }
    if ($("#bottom-left").html() != "" && $("#bottom-left").html() != selectedItemMachine) {
      board[2][0] = selectedItemPlayer;
    }
    if ($("#bottom-middle").html() != "" && $("#bottom-middle").html() != selectedItemMachine) {
      board[2][1] = selectedItemPlayer;
    }
    if ($("#bottom-right").html() != "" && $("#bottom-right").html() != selectedItemMachine) {
      board[2][2] = selectedItemPlayer;
    }
    e.stopPropagation();
    if (jugadasPosibles(board).length == 0) {
      alert("It's a tie");
    } else if (win(selectedItemPlayer, board)) {
      alert("You win!");
    } else {
      minimax(board, selectedItemMachine, 0);
      board[movimiento[0]][movimiento[1]] = selectedItemMachine;
      if (movimiento[0] == 0 && movimiento[1] == 0) {
        $("#upper-left").html(selectedItemMachine);
      }
      if (movimiento[0] == 0 && movimiento[1] == 1) {
        $("#upper-middle").html(selectedItemMachine);
      }
      if (movimiento[0] == 0 && movimiento[1] == 2) {
        $("#upper-right").html(selectedItemMachine);
      }
      if (movimiento[0] == 1 && movimiento[1] == 0) {
        $("#left").html(selectedItemMachine);
      }
      if (movimiento[0] == 1 && movimiento[1] == 1) {
        $("#middle").html(selectedItemMachine);
      }
      if (movimiento[0] == 1 && movimiento[1] == 2) {
        $("#right").html(selectedItemMachine);
      }
      if (movimiento[0] == 2 && movimiento[1] == 0) {
        $("#bottom-left").html(selectedItemMachine);
      }
      if (movimiento[0] == 2 && movimiento[1] == 1) {
        $("#bottom-middle").html(selectedItemMachine);
      }
      if (movimiento[0] == 2 && movimiento[1] == 2) {
        $("#bottom-right").html(selectedItemMachine);
      }
      if (win(selectedItemMachine, board)) {
        alert("You lost!");
      }
    }
  });

});