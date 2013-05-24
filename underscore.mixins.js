( function ( _ ) {
  'use strict';

  _.mixin({
    // replace spaces with underscores and make lowercase
    slugify: function( string ) {
      return string.replace( / /g, '_' ).toLowerCase();
    },

    // replace spaces with dashes and make lowercase
    dashify: function( string ) {
      return string.replace( / /g, '-' ).toLowerCase();
    },

    // remove all spaces
    noSpace: function( string ) {
      return string.replace( /[^A-Za-z0-9]/g, '' );
    },

    // lowercase a string
    lower: function( string ) {
      return string.toLowerCase();
    },

    // uppercase a string
    upper: function( string ) {
      return string.toUpperCase();
    },

    // adapted from https://github.com/gouch/to-title-case
    titleCase: function( title, upper ) {
      var smallWords = /^(a|an|and|as|at|block|but|by|en|for|if|in|near|of|on|or|the|to|vs?\.?|via|with)$/i;

      if ( title ) {
        // make sure we're dealing with a string here
        title = typeof title !== 'String' ? title.toString() : title;

        // flag for all uppercase strings
        // if not flagged, run toLowerCase() before processing
        if ( !upper ) {
          title = title.toLowerCase();
        }

        return title.replace(/([^\W_]+[^\s-]*) */g, function (match, p1, index, title) {
          if (index > 0 && index + p1.length !== title.length &&
            p1.search(smallWords) > -1 && title.charAt(index - 2) !== ":" && 
            title.charAt(index - 1).search(/[^\s-]/) < 0) {
            return match.toLowerCase();
          }

          if (p1.substr(1).search(/[Ii]{2,3}/) > -1) {
            return match.toUpperCase();
          }

          if (p1.substr(1).search(/[A-Z]|\../) > -1) {
            return match;
          }

          return match.charAt(0).toUpperCase() + match.substr(1);
        });
      }
    },

    // send array to be titlecased and formatted
    tCaseIt: function( array ) {
      var ret = [];

      array.forEach( function( item ) {
        if ( item ) {
          ret.push( _.titleCase( item ) );
        }
      });

      return ret;
    },

    // from http://www.josscrowcroft.com/2011/code/format-unformat-money-currency-javascript/
    // by default formats money as USD with 2 decimal places
    dollar: function( number, places, symbol, thousand, decimal ) {
      number = number || 0;
      places = !isNaN(places = Math.abs(places)) ? places : 2;
      symbol = symbol !== undefined ? symbol : "$";
      thousand = thousand || ",";
      decimal = decimal || ".";

      var negative = number < 0 ? "-" : "",

      i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;

      return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    },

    // console.log replacement
    log: function() {
      if ( window.console ) {
        console.log.apply( console, arguments );
      }
    },

    // return a summary of the string of X-word length
    summary: function( string, len ) {
      return string.split( ' ' ).length > len ? string.split( ' ', len ).join( ' ' ) + '...' : string;
    }
  });
})( _ );
