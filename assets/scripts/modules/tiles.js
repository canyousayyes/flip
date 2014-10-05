define('tiles', ['backbone', 'tile_base'], function (Backbone, TileBase) {
	var Tiles = Backbone.Collection.extend({
		model: TileBase
	});
	return Tiles;
});
