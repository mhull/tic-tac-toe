var square = function( x, y ) {

	var _this = {};

	_this.status = null;

	_this.row = x;
	_this.col = y;

	_this.draw = function() {

		_this.o = document.createElement( 'div' );
		_this.o.className = 'pure-u-1-3 square';

		/**
		 * Draw borders
		 */

		var borderStyle = 'solid black 1px';

		// top
		_this.o.style.borderTop = borderStyle;

		// bottom
		if( _this.row === 2 ) {
			_this.o.style.borderBottom = borderStyle;
		}

		// left
		_this.o.style.borderLeft = borderStyle;

		// right
		if( _this.col === 2 ) {
			_this.o.style.borderRight = borderStyle;
		}

		game.grid.o.appendChild( _this.o );

		_this.bindEvents();

	}; // end: draw()

	_this.placeMark = function() {

		this.status = game.player;

		var mark = ( 0 === this.status ) ? 'X' : 'O';

		var div = document.createElement( 'div' );
		div.className = 'mark ' + mark;
		div.innerHTML = mark;

		this.o.appendChild( div );
	};

	_this.resize = function() {

		/**
		 * The height needs to be the same for all squares, so use the width of square
		 * (1,1) to enforce this
		 */
		var height = $( $( '#grid .square' )[ 0 ] ).width();
		$( _this.o ).css( 'height', height );
	};

	_this.bindEvents = function() {

		/**
		 * Document ready
		 */
		document.addEventListener( 'DOMContentLoaded', function() {

			_this.resize();

		} );

		/**
		 * Window resize
		 */
		window.addEventListener( 'resize', function() {

			_this.resize();
		});

		/**
		 * Click
		 */
		_this.o.addEventListener( 'click', function( event ) {

			if( '' !== _this.o.innerHTML ) {
				return;
			}

			if( game.isOver ) {
				return;
			}

			_this.placeMark();

			game.play();
		} );
	};

	return _this;
};