/* 
 * event.js
 * Super-tiny event system for RSWebJS
 * 
 * Usage:
 * 
 * event.listen('eventName', function( e[, param1[, ... paramN]] ) { ..code.. });
 * event.fire('eventName'[, param1[, ... paramN]] );
 */

define( ['jquery'], function( $ ){
    return {
        events : $({}),
        listen : function() {
//            console.log('event::listen', arguments);
            this.events.on.apply(this.events,arguments);
        },
        fire : function() {
//            console.log('event::fire', arguments)
            this.events.trigger.apply(this.events,arguments);
        }
    }
});    