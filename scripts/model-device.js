/**
 * Function called for updating the image of this device
 *
 * @callback updateFunction
 * @param {jQuery} object The jQuery DOM node for this device
 * @param min The minimum value for the device
 * @param max The maximum value for the device
 * @param value The new value for the device
 */

/**
 * A class representing one device
 *
 * @param {Diagram} diagram The diagram on which this device is shown
 * @param {number} index The index of this device
 * @param {number[]} position The x and y coordinates of this device, relative to the diagram
 * @param {string} type The type of this device
 * @param {string} title The title of this device
 * @param {?number} min The minimum value for this device
 * @param {?number} max The maximum value for this device
 * @param {string} image The image definition for this device
 * @param {updateFunction} updateFunction
 * @class
 */
function Device(diagram, index, position, type, title, min, max, image, updateFunction) {
    "use strict";
    const _this = this;

    /**
     * The index of this device
     * @member {number}
     * @const
     */
    this.index = index;

    /**
     * The type of this device
     * @member {string}
     * @const
     */
    this.type = type;

    /**
     * The title of this device
     * @member {string}
     * @const
     */
    this.title = title;

    /**
     * A list of incoming arrows
     * @member {Arrow[]}
     */
    let arrowsIn = [];

    /**
     * A list of outgoing arrows
     * @member {Arrow[]}
     */
    let arrowsOut = [];

    /**
     * The jQuery DOM object representing this device
     */
    const object = $(
        // TODO device: create html container
        '<li class="device"></li>'
    );

    // TODO device: add variables if necessary

    (function() {           // wrapped in function to prevent imgList to have global scope

        // create device list element
        var imgList = $(image);
    
        object.append('' +
            '<dl class="device-properties">' +
            '   <dt class="accessibility">Maschinentyp</dt>' +
            '   <dd id="type-machine" class="device-name">' + title + '</dd>' +

            '   <dt>Vorgänger:</dt>' +
            '   <dd class="device-predecessor" classname="predecessor"></dd>' +

            '   <dt>Nachfolger:</dt>' +
            '   <dd class="device-successor" name="successor"></dd>' +
            '</dl>' +
            '<div class="device-image"> ' +
                imgList.prop("outerHTML") +
            '</div>');

        $('.devices.device-list').append(object);

        object.css("left", position[0] + "px");
        object.css("top", position[1] + "px");

        // Initialize the event handlers
        attachEventHandlers();

    })();

    /**
     * Add the event handlers for the diagram
     */
    function attachEventHandlers() {
        // TODO device: attach context menu to device (call showContextMenu() in model-diagram.js if context menu is called)
        object.on("contextmenu", function(ev) {
            diagram.showContextMenu(_this, ev);
        });

        // TODO device: attach events for functionality like in assignment-document described
        object.mousedown(function(ev) {
            diagram.deviceMouseDown(_this);
            $(".contextMenu").css("display", "none");
            ev.stopPropagation();
        });

        // Hover for arrow
        object.hover(function() {
            object.append($("#arrow-device-add-reference").clone(false));
        }, function() {
            object.find("#arrow-device-add-reference").remove();
        });

        // TODO device: attach drag & drop functionality
        object.draggable({ containment: "#diagram",
            stop: function() {
                moveDevice();
            }
        });


        // TODO device optional: attach events for bonus points for 'Tab' and 'Enter'
        $("html").keyup(function(ev) {
            //console.log(ev.which);
            //console.log(ev.keyCode);
            //console.log(ev.key);
            if (ev.key === "Tab") {

            } else if (ev.key === "Enter") {

            }
        });
    }

    /**
     * Mark this device as active or inactive
     * @param {boolean} active
     */
    function setActive(active) {
        // TODO device: set/remove active class of device
        if (active === true) {
            object.addClass("active");
        } else {
            object.removeClass("active");
        }

    }

    /**
     * Update the list of predecessors in the DOM
     */
    function updatePredecessors() {
        // TODO device: update predecessors in overview.html of device like in UE1

        object.find('.device-predecessor').empty();
        $.each(arrowsIn, function (index, value) {
            if (index === 0) {
                object.find('.device-predecessor').append(value.startDevice.title);
            } else {
                object.find('.device-predecessor').append(', ' + value.startDevice.title);
            }
        });

    }

    /**
     * Update the list of successors in the DOM
     */
    function updateSuccessors() {
        // TODO device: update successors in overview.html of device like in UE1

        object.find('.device-successor').empty();
        $.each(arrowsOut, function (index, value) {
            if (index === 0) {
                object.find('.device-successor').append(value.endDevice.title);
            } else {
                object.find('.device-successor').append(', ' + value.endDevice.title);
            }
        });
    }

    /**
     * Update the position of all connected arrows
     */
    function moveDevice() {
        // TODO device: update endpoints of arrows
        // HINT You can use Arrow.updateArrow()
        var i;
        for (i = 0; i < arrowsIn.length; ++i) {
            arrowsIn[i].updateArrow();
        }

        for (i = 0; i < arrowsOut.length; ++i) {
            arrowsOut[i].updateArrow();
        }
    }

    /**
     * Determines if a direct connection to the given device already exists
     * @param {Device} device The target device
     * @returns {boolean} True iff there exists a direct arrow in either direction
     */
    function isConnectedTo(device) {
        return arrowsOut.some(arrow => arrow.endDevice === device)
            || arrowsIn.some(arrow => arrow.startDevice === device);
    }

    /**
     * Update the image for the given value
     * @param value The new value
     */
    function updateDevice(value) {
        if (updateFunction) {
            updateFunction(object, min, max, value);
        }
    }

    /**
     * Add an incoming arrow to the device
     * @param {Arrow} arrow The arrow for which this device is the end node
     */
    function addArrowIn(arrow) {
        arrowsIn.push(arrow);
        updatePredecessors();
    }

    /**
     * Add an outgoing arrow to the device
     * @param {Arrow} arrow The arrow for which this device is the start node
     */
    function addArrowOut(arrow) {
        arrowsOut.push(arrow);
        updateSuccessors();
    }

    /**
     * Delete this device and all connected arrows
     * @return {number} The number of deleted arrows
     *                  - use this number for updating counter in diagram
     */
    function deleteDevice() {
        // TODO device: delete device from HTML DOM and delete connected arrows
        let deletedArrows = 0;

        console.log("Found " + arrowsIn.length + " ingoing arrows and " + arrowsOut.length + " outgoing arrows.");

        while (arrowsIn.length > 0) {
            console.log(arrowsIn.length + " arrowsIn.length");
            arrowsIn[0].deleteArrow();
            deletedArrows++;
            console.log(arrowsIn.length + " arrowsIn.length (endloop)");
        }
        console.log("Deleted " + deletedArrows + " ingoing arrows.");

        while (arrowsOut.length > 0) {
            console.log(arrowsOut.length + " arrowsOut.length (startloop)");
            arrowsOut[0].deleteArrow();
            deletedArrows++;
            console.log(arrowsOut.length + " arrowsOut.length (endloop)");
        }

        object.remove();

        console.log("Deleted " + deletedArrows + " arrows in total.");

        return deletedArrows;
    }

    /**
     * Remove the given arrow from the list of arrows
     * @param {Arrow} arrow The arrow to remove
     */
    function deleteArrow(arrow) {
        // TODO device: delete arrow from arrowsIn/arrowsOut and update predecessors and successors
        var i = arrowsIn.indexOf(arrow);

        if (i !== -1) {
            arrowsIn.splice(i, 1);
            updatePredecessors();
        } else {
            i = arrowsOut.indexOf(arrow);
            if (i !== -1) {
                arrowsOut.splice(i, 1);
                updateSuccessors();
            }
        }


    }

    /**
     * Get the coordinates of the center of this device
     * @returns {number[]} A two-element array containing the center in the order [left, top]
     */
    function getCenterCoordinates() {
        return [object[0].offsetLeft + object.width() / 2, object[0].offsetTop + object.height() / 2];
    }

    /**
     * Get the coordinates of this device
     * @param {number[]} targetPosition An two-element array containing the target coordinates of a line
     * @returns {number[]} A two-element array containing the point on the border closest to the target
     */
    function getIntersectionCoordinates(targetPosition) {
        // Determine the center of the device
        const width = object.width() * 0.58,
            height = object.height() * 0.58,
            center = getCenterCoordinates(),
            x = center[0],
            y = center[1],
            dx = targetPosition[0] - x,
            dy = targetPosition[1] - y;

        if (dx === 0) {
            // Vertical arrow
            return [x, y + Math.sign(dy) * height];
        }

        const slope = dy / dx;
        if (Math.abs(slope) * width >= height) {
            // Arrow intersects the top or bottom border
            return [x + Math.sign(dy) * height / slope, y + Math.sign(dy) * height]
        } else {
            // Arrow intersects the left or right border
            return [x + Math.sign(dx) * width, y + Math.sign(dx) * width * slope];
        }
    }

    // Export some of the methods
    this.setActive = setActive;
    this.updateDevice = updateDevice;
    this.getCenterCoordinates = getCenterCoordinates;
    this.getIntersectionCoordinates = getIntersectionCoordinates;
    this.isConnectedTo = isConnectedTo;
    this.addArrowIn = addArrowIn;
    this.addArrowOut = addArrowOut;
    this.deleteArrow = deleteArrow;
    this.deleteDevice = deleteDevice;
}
