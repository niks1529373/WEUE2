/**
 * A class representing one arrow
 *
 * @param {Diagram} diagram The diagram on which this arrow is shown
 * @param {Device} startDevice The start node for this arrow
 * @class
 */
function Arrow(diagram, startDevice) {
    "use strict";
    const _this = this;

    /**
     * The start node for this arrow
     * @member {Device}
     */
    this.startDevice = startDevice;

    /**
     * The (optional) end node for this arrow
     * @member {?Device}
     */
    this.endDevice = null;

    /**
     * The jQuery DOM object representing this arrow
     */
    const object = $(
        // TODO arrow: create jQuery object for the SVG path
        document.createElementNS('http://www.w3.org/2000/svg', "line")
    );

    object.attr("marker-end", "url(#arrow-marker");
    object.attr("stroke", "black");
    object.attr("stroke-width", "2");

    // TODO arrow: add variables if necessary

    // TODO arrow: append the arrow DOM object to the arrows svg
    $(".arrows > svg").append(object);

    // Initialize the event handlers
    attachEventHandlers();

    /**
     * Add the event handlers for the diagram
     */
    function attachEventHandlers() {
        // TODO arrow: attach events for functionality like in assignment-document described
        object.mousedown(function(ev) {
            if (_this.endDevice !== null) {
                diagram.arrowClick(_this);
                ev.stopPropagation();
            }
        });

        // TODO arrow optional: attach events for bonus points for 'TAB' to switch between arrows and to select arrow
    }

    /**
     * Add this arrow to the end nodes, if not yet present
     * @returns {boolean} True if the arrow was added, false if it was already present
     */
    function add() {
        if (!_this.endDevice || _this.endDevice === _this.startDevice || _this.startDevice.isConnectedTo(_this.endDevice)) {
            return false;
        }

        _this.startDevice.addArrowOut(_this);
        _this.endDevice.addArrowIn(_this);
        object.addClass("arrow-path-added");
        return true;
    }

    /**
     * Mark this device as active or inactive
     * @param {boolean} active
     */
    function setActive(active) {
        // TODO arrow: set/remove active class of arrow
        if (active === true) {
            object.addClass("active");
        } else {
            object.removeClass("active");
        }
    }

    /**
     * Update the end position of the arrow path
     * @param {number[]} endPosition New end position of the arrow
     */
    function updateEndPosition(endPosition) {
        // TODO arrow: draw an arrow between the start device and the given end position
        // HINT You can use Device.getIntersectionCoordinates to calculate the coordinates for the start device
        var startPosition = startDevice.getIntersectionCoordinates(endPosition);
        object.attr("x1", startPosition[0]);
        object.attr("y1", startPosition[1]);
        object.attr("x2", endPosition[0]);
        object.attr("y2", endPosition[1]);
    }

    /**
     * Update the arrow path according to the device positions, or hide the path if no end device is set
     */
    function updateArrow() {
        // TODO arrow: draw an arrow between the start and end device
        // HINT You can use Device.getCenterCoordinates and Device.getIntersectionCoordinates
        if (_this.endDevice !== null) {
            var startCenter = _this.startDevice.getCenterCoordinates();
            var endCenter = _this.endDevice.getCenterCoordinates();
            var startPosition = _this.startDevice.getIntersectionCoordinates(endCenter);
            var endPosition = _this.endDevice.getIntersectionCoordinates(startCenter);
            object.attr("x1", startPosition[0]);
            object.attr("y1", startPosition[1]);
            object.attr("x2", endPosition[0]);
            object.attr("y2", endPosition[1]);
        }
    }

    /**
     * Set the end device for this arrow
     * @param {Device} device The device to use as endpoint
     */
    function setEndDevice(device) {
        _this.endDevice = device;
        updateArrow();
    }

    /**
     * Remove this arrow from the DOM and its devices
     */
    function deleteArrow() {
        // TODO arrow: delete arrow from HTML DOM and from the devices of the endpoints of the arrow
        _this.startDevice.deleteArrow(_this);

        if (_this.endDevice !== null) {
            _this.endDevice.deleteArrow(_this);

        }
        object.remove();
    }

    // Export some of the methods
    this.add = add;
    this.setActive = setActive;
    this.updateEndPosition = updateEndPosition;
    this.updateArrow = updateArrow;
    this.setEndDevice = setEndDevice;
    this.deleteArrow = deleteArrow;
}
