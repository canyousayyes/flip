define('tile_view', ['backbone', 'underscore', 'text!template_tile_view'], function (Backbone, _, template_tile_view) {
    var TileView = Backbone.View.extend({
        tagName: 'div',
        className: 'tile_container',
        events: {
            'click': 'tap'
        },
        is_freezed: false,
        initialize: function () {
            this.listenTo(this.model, 'change', this.renderFlip);
            this.render();
        },
        // Compose an object from its model for rendering the view
        getRenderData: function () {
            var color = this.model.get('color');
            var obj = {
                frontColorClass: (color === 'white' ? 'tile_white' : 'tile_black'),
                backColorClass: (color === 'white' ? 'tile_black' : 'tile_white')
            };
            return obj;
        },
        // Render the html based on its model
        render: function () {
            var default_option = { flipped: true };
            var template = _.template(template_tile_view);
            var rendered_html = template(this.getRenderData());
            this.$el.html(rendered_html);
            return this;
        },
        // Render the view and also add a flipping animation
        renderFlip: function () {
            var self = this;
            // Freeze the view until the animation is completed.
            this.is_freezed = true;
            this.render();
            this.$('.tile').addClass('tile_flipped');
            // Transition end event reference: http://stackoverflow.com/questions/2794148/css3-transition-events
            this.$('.tile').on('webkitTransitionEnd oTransitionEnd transitionend', function () {
                self.$('.tile').removeClass('tile_animated');
                self.is_freezed = false;
            });
            // Remove the class to trigger the transfomation. the flipping animation is written in styles/site.less
            setTimeout(function () {
                self.$('.tile').addClass('tile_animated').removeClass('tile_flipped');
            }, 10);
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
