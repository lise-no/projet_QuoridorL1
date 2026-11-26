function placePlayers(playerArray) {
	for (let i = 0; i < playerArray.length; i++) {
		const player = playerArray[i];
		const position = player.pawn.currentPosition;
		placePlayer(i + 1, position);
	}
}

function placePlayer(playerNumber, position) {
	let offset = position.rank * 9 + position.file;
	let playerDiv = $('<div id="' + "player_" + playerNumber + '" />');
	$('#square_' + offset).append(playerDiv);
}

function placeFences(fenceArray) {
	for (let i = 0; i < fenceArray.length; i++) {
		const fence = fenceArray[i];
		if (fence.isHorizontal) {
			placeHorizontalFence(fence.startPosition);
			placeHorizontalFence(fence.endPosition);
		} else {
			placeVerticalFence(fence.startPosition);
			placeVerticalFence(fence.endPosition);
		}
	}
}

function placeHorizontalFence(position) {
	let offset = position.rank * 9 + position.file  + ((position.rank +1) * 8);
	let fences = document.getElementsByClassName('fence');
	fences[offset].classList.add('placed');
}

function placeVerticalFence(position) {
	let offset = position.rank * (9 + 8) + position.file ;
	let fences = document.getElementsByClassName('fence');
	fences[offset].classList.add('placed');
}

function buildCreateGameForm() {
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "/create");

	var field = document.createElement("input");
	field.setAttribute("type", "number");
	field.setAttribute("name", "players");
	field.setAttribute("value", "4");
	field.setAttribute("id", "players");
	form.append(field);

	// Create a submit button
	var button = document.createElement("input");
	button.setAttribute("type", "submit");
	button.setAttribute("value", "Créer partie");
	form.append(button);

	return form;
}

function buildMovePlayerForm() {
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "/move");

	var label = document.createElement("label");
	label.innerHTML = 'New position (rank,file): ';
	form.append(label);

	var field = document.createElement("input");
	field.setAttribute("type", "text");
	field.setAttribute("name", "move");
	field.setAttribute("value", "0, 0");
	field.setAttribute("id", "move");
	form.append(field);

	// Create a submit button
	var button = document.createElement("input");
	button.setAttribute("type", "submit");
	button.setAttribute("value", "Move Player");
	form.append(button);

	return form;
}


function buildPlaceFenceForm() {
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "/place");

	var fromLabel = document.createElement("label");
	fromLabel.innerHTML = 'New fence from (rank,file): ';
	form.append(fromLabel);

	var from = document.createElement("input");
	from.setAttribute("type", "text");
	from.setAttribute("name", "from");
	from.setAttribute("value", "0, 0");
	from.setAttribute("id", "from");
	form.append(from);

	var toLabel = document.createElement("label");
	toLabel.innerHTML = 'to (rank,file): ';
	form.append(toLabel);

	var to = document.createElement("input");
	to.setAttribute("type", "text");
	to.setAttribute("name", "to");
	to.setAttribute("value", "0, 1");
	to.setAttribute("id", "to");
	form.append(to);

	// Create a submit button
	var button = document.createElement("input");
	button.setAttribute("type", "submit");
	button.setAttribute("value", "Place Fence");
	form.append(button);

	return form;
}

function buildInformationPanel(game) {
	var panel = document.createElement('div');
	panel.setAttribute('id', 'information');

	var title = document.createElement('h2');
	title.innerHTML = 'Informations';
	panel.append(title);

	var current = document.createElement('div');
	current.setAttribute('id', 'currentPlayerId');
	current.innerHTML = 'Current player: ' + (game.currentPlayerIndex + 1); 
	panel.append(current);

	var fences = document.createElement('div');
	fences.setAttribute('id', 'currentPlayerId');
	fences.innerHTML = 'Available fences : ' + game.players[game.currentPlayerIndex].nbFencesAvailable;
	panel.append(fences);

	return panel;
}

function buildEndTourForm() {
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "/endTour");

	const newButton = document.createElement('input');
	newButton.setAttribute('type', 'submit');
	newButton.setAttribute('value', 'End Tour');
	form.append(newButton);

	return form;
}

/**
 * Main function, executed when the pages is loaded
 */
function init() {
	console.log('State: ' + state);
	console.log(gameJSON);
	switch (state) {
		case 0:
			console.log('Game creation');
			document.getElementsByTagName("body")[0].appendChild(buildCreateGameForm());
			break;
		case 1:
			console.log('Move phase');
			display('#board', gameJSON);
			document.getElementsByTagName("body")[0].appendChild(buildInformationPanel(gameJSON));
			document.getElementsByTagName("body")[0].appendChild(buildMovePlayerForm());
			break;
		case 2:
			console.log('Fence placement phase');
			display('#board', gameJSON);
			document.getElementsByTagName("body")[0].appendChild(buildPlaceFenceForm());
			document.getElementsByTagName("body")[0].appendChild(buildEndTourForm());
			break;
		default:
			console.log('State unknown')

	}
}

function display(table, game) {
	let board = game.gameBoard.board;
	var table = $(table);
	const dimension = board.length;

	for (var i = 0; i < dimension; i++) {
		if (i != 0) {
			for (var j = 0; j < dimension; j++) {
				var horizontalFence = $('<div class="fence horizontal" />')
				if (j == 0) {
					horizontalFence.addClass('left');
				}
				if (j == 8) {
					horizontalFence.addClass('right');
				}
				table.append(horizontalFence);
			}
		}
		for (var j = 0; j < dimension; j++) {
			var square = board[i][dimension - j]; // HTML Table lines are inverted
			var squareNumber = (i * dimension) + j;
			var square = $('<div id="square_' + squareNumber + '" class="square" />')
			if (j != 0) {
				var fence = $('<div class="fence" />')
				table.append(fence);
			}
			table.append(square);
		}
	}
	placePlayers(game.players);
	placeFences(game.gameBoard.fences);
}