define('tile_base', ['backbone', 'lang'], function (Backbone, Lang) {
    var TileBase = Backbone.Model.extend({
        defaults: function () {
            return {
                slug: 'the_base',
                name: Lang.str('tile.base.name'),
                description: Lang.str('tile.base.description'),
                row: -1,
                col: -1,
                color: 'white',
                tappable: true,
                flippable: true
            };
        },
        initialize: function () {
            this.on('tap', this.tap);
            this.on('flip', this.flip);
        },
        // Private. Flip its color property.
        _flip: function () {
            if (this.get('color') === 'white') {
                this.set('color', 'black');
            } else {
                this.set('color', 'white');
            }
        },
        // Tap action for this tile object.
        // Return true if success, false otherwise.
        tap: function (source, option) {
            if (this.get('tappable') !== true) {
                return false;
            }
            this._flip();
            return true;
        },
        // Flip action for this tile object. If its color is white, it will become black, and vice versa.
        // Return true if success, false otherwise.
        flip: function (source, option) {
            if (this.get('flippable') !== true) {
                return false;
            }
            this._flip();
            return true;
        }
    });
    return TileBase;
});
