/**
 * Global scope
 */
define(['jqmng/jquery', 'jqmng/angular'], function($, angular) {
    var onCreateListeners = [];

    /**
     * Widget to stop the page compilation at the body
     */
    angular.widget("body", function(element) {
        this.descend(false);
        return function(element) {
            var scope = this;
            for (var i=0; i<onCreateListeners.length; i++) {
                onCreateListeners[i](scope);
            }
        }
    });

    var globalScope;

    /**
     * Return the global scope.
     * This equals the scope of the body element.
     */
    function getGlobalScope() {
        if (!globalScope) {
            globalScope = $("body").scope();
        }
        return globalScope;
    }

    function onCreate(listener) {
        onCreateListeners.push(listener);
    }

    return {
        globalScope: getGlobalScope,
        onCreate: onCreate
    }
});
