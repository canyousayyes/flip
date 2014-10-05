define('tile_view', ['backbone', 'underscore', 'text!template_tile_view'], function (Backbone, _, template_tile_view) {
    var TileView = Backbone.View.extend({
        tagName: 'div',
        className: 'tile_container',
        events: {
            'click': 'tap'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.renderFlip);
            this.render({tile_class: ''}); // Init tile view with not flipped state
        },
        // Compose an object from its model for rendering the view
        getRenderData: function () {
            var color = this.model.get('color');
            var obj = {
                frontColorClass: (color === 'white' ? 'tile_white' : 'tile_black'),
                backColorClass: (color === 'white' ? 'tile_black' : 'tile_white'),
                tile_class: 'tile_flipped'
            };
            return obj;
        },
        // Render the html based on its model
        render: function (option) {
            if ( typeof option !== 'object' ) {
                option = {};
            }
            var data = _.extend(this.getRenderData(), option);
            var template = _.template(template_tile_view);
            var rendered_html = template(data);
            this.$el.html(rendered_html);
            return this;
        },
        // Render the view and also add a flipping animation
        renderFlip: function () {
            var self = this;
            this.render();
            // Remove class to trigger animation
            setTimeout(function () {
                self.$('.tile').removeClass('tile_flipped');
            }, 100);
        },
        // Trigger the tap event to its model, and let its model to handle what to do
        tap: function () {
            if (this.is_freezed === true) {
                return;
            }
            this.model.trigger('tap', this.model, {});
        }
    });
    return TileView;
});
