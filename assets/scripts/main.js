requirejs.config({
    paths: {
        // Library
        'jquery': 'lib/jquery-1.11.1.min',
        'backbone': 'lib/backbone-min',
        'underscore': 'lib/underscore-min',
        'text': 'lib/text',
        // Language config
        'lang_en': 'modules/lang/lang_en',
        'lang_zh': 'modules/lang/lang_zh',
        'lang': 'modules/lang/lang',
        // Game Tiles
        'tile_base': 'modules/tiles/tile_base',
        'tile_view': 'modules/tiles/tile_view',
        // HTML templates
        'template_tile_view': 'modules/templates/tile_view.html',
        // Game System
        'game': 'modules/game'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'tile_base', 'tile_view', 'lang'], function ($, TileBase, TileView, Lang) {
    Lang.set('en');
    var a = new TileBase({color: 'white'});
    var av = new TileView({model: a});
    var b = new TileBase({color: 'black'});
    var bv = new TileView({model: b});
    $('#game_app').append(av.$el).append(bv.$el);
});
