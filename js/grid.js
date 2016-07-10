/**
 * The main grid object
 */
var grid = (function( m, n ) {

	var _this = {};

	_this.squares = [];

	_this.m = m || 3;
	_this.n = n || 3;

	/**
	 * Render HTML for an {m x n} grid
	 */
	_this.draw = function() {

		this.o = document.createElement( 'div' );
		this.o.id = 'grid';
		this.o.className = 'pure-g';

		document.body.appendChild( _this.o );

		this.setupSquares();

	}; // end: draw()

	_this.setupSquares = function() {

		// loop through squares and instantiate
		for( i = 0; i < this.m; i++ ) {

			var row = [];

			for( j = 0; j < this.n; j++ ) {

				var _square = new square( i, j );

				row.push( _square );

				_square.draw();
			}

			this.squares.push( row );
		}

	}; // end: setupSquares

	return _this;
});