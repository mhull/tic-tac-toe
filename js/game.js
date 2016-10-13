var game = (function() {

	var _this = {};
	_this.isOver = false;
	_this.winner = null;

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

	_this.winningSquares = [];

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

		else if( this.grid.isFull() ) {
			this.end( 0 );
		}

		else {
			this.player = ++this.player % 2;
			this.setStatus( 'Player ' + ( this.player + 1 ) + '\'s turn.' );
		}
	};

	_this.hasWinner = function() {

		for( var i = 0; i < this.winningCombos.length; i++ ) {

			var combo = this.winningCombos[ i ];

			var inARow = 0;

			for( var j = 0; j < combo.length; j++ ) {

				var _square = this.grid.getSquare( combo[j][0], combo[j][1] );

				if( this.player === _square.status ) {

					inARow++;
				}
			}

			if( inARow === 3 ) {
				this.winner = this.player;
				combo.forEach( function( value, index, array ) {
					_this.winningSquares.push( _this.grid.getSquare( value[0], value[1] ) );
				} );
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

		if( null !== this.winner ) {
			this.setStatus( 'Player ' + ( this.winner + 1 ) + ' wins.' );
			this.highlightWinningSquares();
		}

		else {
			this.setStatus( 'Game ended in a tie.' );
		}
	};

	_this.highlightWinningSquares = function() {
		if( ! this.isOver ) {
			return;
		}

		var borderColor = _this.getPlayerColor( _this.winner );

		this.winningSquares.forEach( function( square, index, array ) {

			square.setStyle( 'borderColor', borderColor );
			square.setStyle( 'borderWidth', '3px' );

			// perceived bottom (actually top) border fix
			if( square.row < 2 ) {
				_this.grid.getSquare( square.row + 1, square.col )
					.setStyle( 'borderTopColor', borderColor )
					.setStyle( 'borderTopWidth', '3px' );
			}

			// perceived right (actually left) border fix
			if( square.col < 2 ) {
				_this.grid.getSquare( square.row, square.col + 1 )
					.setStyle( 'borderLeftColor', borderColor )
					.setStyle( 'borderLeftWidth', '3px' );
			}

		} );
	};

	_this.getPlayerColor = function( player ) {
		return ( 0 === player ) ? 'green' : 'blue';
	};

	return _this;
});