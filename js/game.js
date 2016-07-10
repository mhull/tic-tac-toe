var game = (function() {

	var _this = {};
	_this.isOver = false;

	_this.grid = grid();

	_this.status = document.querySelector( 'div#status' );

	_this.winningCombos = [

		// diagonals
		[ [0, 0], [1,1], [2,2] ],
		[ [0, 2], [1,1], [2,0] ],

		// vertical
		[ [0,0], [1,0], [2,0] ],
		[ [0,1], [1,1], [2,1] ],
		[ [0,2], [1,2], [2,2] ],

		// horizontal
		[ [0, 0], [0,1], [0,2] ],
		[ [1, 0], [1,1], [1,2] ],
		[ [2, 0], [2,1], [2,2] ],
	];

	/**
	 * Start the game
	 */
	_this.start = function() {

		this.grid.draw();

		this.player = -1;
		this.play();
	};

	_this.play = function() {

		if( this.hasWinner() ) {
			this.end();
		}

		else {
			this.player = ++game.player % 2;
			this.setStatus( 'Player ' + ( this.player + 1 ) + '\'s turn.' );
		}
	};

	_this.hasWinner = function() {

		for( var i = 0; i < this.winningCombos.length; i++ ) {

			var combo = this.winningCombos[ i ];

			var inARow = 0;

			for( var j = 0; j < combo.length; j++ ) {

				var point = combo[ j ];
				var x = point[ 0 ];
				var y = point[ 1 ];

				var row = this.grid.squares[ x ];
				var _square = row[ y ];

				if( this.player === _square.status ) {

					inARow++;
				}
			}

			if( inARow === 3 ) {
				return true;
			}
		}

		return false;

	}; // end: hasWinner()

	_this.setStatus = function( str ) {

		this.status.innerHTML = str;
	};

	_this.end = function() {
		this.isOver = true;
		this.setStatus( 'Player ' + ( game.player + 1 ) + ' wins.' );
	};

	return _this;
});