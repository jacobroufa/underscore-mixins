( function ( _ ) {
  _.mixin({
    // remove spaces and make lowercase
    slug: function( string ) {
      return string.replace( / /g, '_' ).toLowerCase();
    },

    // adapted from https://github.com/gouch/to-title-case
    titleCase: function ( title, upper ) {
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
    }
  });
})( _ );
