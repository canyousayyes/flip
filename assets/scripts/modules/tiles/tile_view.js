define('tile_view', ['backbone'], function (Backgone) {
    var TileView = Backbone.View.extend({
        tagName: 'div',
        className: 'tile',
        events: {
            'click': 'tap'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },
        render: function () {
            if ( this.model.get('color') === 'white' ) {
                this.$el.text('white');
            } else {
                this.$el.text('black');
            }
            return this;
        },
        tap: function () {
            this.model.trigger('tap', this.model, {});
        }
    });
    return TileView;
});
