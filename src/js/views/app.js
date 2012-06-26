define([
    'backbone',
    'collections/panels',
    'core/eventMediator',
    'core/util',
    'views/panel',
    'views/carousel'
], function (
    Backbone,
    PanelsCollection,
    eventMediator,
    util,
    PanelView,
    CarouselView
) {
   
    var AppView = Backbone.View.extend({

        events: {
            'keydown': 'keydownListener'
        },

        initialize: function () {

            this.renderCarousel([
                { label: '1' },
                { label: '2' },
                { label: '3' }
            ]);

        },

        renderCarousel: function (data) {
            
            this.panelsCollection = new PanelsCollection();

            var carouselView = new CarouselView({
                collection: this.panelsCollection
            });

            carouselView.render().$el.appendTo(this.el);

            this.panelsCollection.reset(data);

        },

        keydownListener: function (e) {
            
            var keyMap = util.keyMap;

            switch (e.which) {
            case keyMap.del:
                this.panelsCollection.pop();
                return false;
            case keyMap.enter:
                this.panelsCollection.create({
                    label: this.panelsCollection.models.length + 1
                });
                return false;
            case keyMap.rightArrow:
                eventMediator.publish('rightArrow');
                return false;
            case keyMap.leftArrow:
                eventMediator.publish('leftArrow');
                return false;
            }

        }

    });
   
    return AppView;
   
});