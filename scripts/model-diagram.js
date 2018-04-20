/**
 * Class for the complete diagram
 * @param {string} areaSelector
 * @param {string} arrowButtonSelector
 * @param {Counter} devicesCounter
 * @param {Counter} arrowsCounter
 * @param {Controls} controls
 * @class
 */
function Diagram(areaSelector, arrowButtonSelector, devicesCounter, arrowsCounter, controls) {
    "use strict";
    const _this = this;

    /**
     * The jQuery object containing the diagram wrapper
     * @const
     */
    this.area = $(areaSelector);

    /**
     * The jQuery object containing the arrow button in the sidebar
     */
    const arrowButton = $(arrowButtonSelector);

    /**
     * The jQuery object containing the arrows svg area
     * @const
     */
    this.arrows = this.area.find(".arrows svg");

    /**
     * The jQuery object containing the device list
     * @const
     */
    this.devices = this.area.find(".devices");

    /**
     * The jQuery object containing the context menu
     */
    const context = $(".contextMenu");


    // TODO diagram: add variables for drawing mode and to store selected devices and arrows
    this.count = 0;

    this.selectedDevice = null;
    this.selectedArrow = null;
    this.drawArrowMode = false;
    this.drawingArrow = null;

    // Initialize events
    attachEventHandlers();

    /**
     * Add the event handlers for the diagram
     */
    function attachEventHandlers() {
        // TODO diagram: prevent standard context menu inside of diagram
        _this.area.contextmenu(function() {
            return false;
        });

        // TODO diagram: attach mouse move event and draw arrow if arrow active mode is on
        /*
        _this.area.mousemove(function(ev) {
            if (_this.drawArrowMode === true && _this.drawingArrow !== null) {
                console.log("Moving arrow to: X: " + ev.pageX + " Y: " + ev.pageY);
                _this.drawingArrow.updateEndPosition([ev.pageX, ev.pageY]);
            }
        });
        */

        // TODO diagram: add device drop functionality by jquery ui droppable and prevent dropping outside the diagram
        _this.area.droppable({
            drop: function(event, ui) {
                _this.addDevice(event, ui);
            }
        });

        // TODO diagram: attach mousedown event to body element and remove all active modes like arrow drawing active mode or selected device mode
        $("body").mousedown(function() {
            $(".contextMenu").css("display", "none");
            if (_this.selectedDevice !== null) {
                _this.selectedDevice.setActive(false);
                _this.selectedDevice = null;
            }
        });

        // Handler for clicking on the arrow button
        $(".arrow").mousedown(function() {
            toggleArrowActive();
        });

        // TODO diagram: attach keyup event to html element for 'ENTF' ('DEL') (delete device or arrow) and 'a'/'A' (toggle arrow active mode)
        $("html").keyup(function(ev) {
            console.log(ev.which);
            console.log(ev.keyCode);
            console.log(ev.key);
            if (ev.key === "Delete") {
                deleteSelectedDevice();
            } else if (ev.key === "A" || ev.key === "a") {
                toggleArrowActive();
            }
        });

        // TODO diagram: attach events for context menu items ('Detailseite', 'Löschen')
        $(".contextView").mousedown(function(ev) {
            console.log("Detailseite clicked");
            alert("Detailseite"); //TODO
            ev.stopPropagation();
            $(".contextMenu").css("display", "none");
        });

        $(".contextDelete").mousedown(function(ev) {
            deleteSelectedDevice();
            ev.stopPropagation();
            $(".contextMenu").css("display", "none");
        });
    }

    /**
     * Toggle whether drawing arrows is active or not
     */
    function toggleArrowActive() {
        // TODO diagram: toggle arrow active mode (call deactivateArrowDrawing() or activateArrowDrawing()
        if (_this.drawArrowMode === true) {
            deactivateArrowDrawing();
        } else {
            activateArrowDrawing();
        }
    }

    /**
     * Append the currently drawn arrow to the diagram
     */
    function addArrow() {
        // TODO diagram: if drawing arrow mode is on, create Arrow object
    }

    /**
     * Set arrow drawing to active
     */
    function activateArrowDrawing() {
        // TODO diagram: reset selected arrows and selected devices, enable arrow active mode and add active class to arrow button in sidebar
        _this.drawArrowMode = true;
        $("#arrow-sidebar-add").addClass("active");
    }

    /**
     * Set arrow drawing to inactive and delete the temporary arrow
     */
    function deactivateArrowDrawing() {
        // TODO diagram: disable arrow active mode and remove active class to arrow button in sidebar
        _this.drawArrowMode = false;
        $("#arrow-sidebar-add").removeClass("active");
    }

    /**
     * TODO diagram: use this function to get relative coordinates of devices inside diagram
     * Determine the coordinates relative to the diagram area's top left corner
     * @param {number} x The absolute x coordinate
     * @param {number} y The absolute y coordinate
     * @returns {number[]} An array with two elements containing the relative x and y coordinates
     */
    function getRelativeCoordinates(x, y) {
        return [
            x - _this.area.offset().left - _this.area[0].clientLeft,
            y - _this.area.offset().top - _this.area[0].clientTop
        ];
    }

    /**
     * Add a new device on dropping it onto the diagram area
     * @param event The jQuery event instance
     * @param ui The jQuery UI instance
     */
    function addDevice(event, ui) {
        // TODO diagram: check if dragged device is inside diagram, if not => do nothing

        /**
         * TODO diagram: if dragged device is inside diagram, add dragged device to diagram
         *                 + get data added to html object in overview
         *                 + add image of device-resources.js
         *                 + add update function of device-updating-states.js
         *                 + create object of Device and transmit parameters
         *                 + add device to Controls
         *                 + adapt device counter of controls
         */


        if ($(ui.helper).hasClass('device-image')) {      // TODO check if completely inside the diagram      
            _this.count = _this.count + 1;
            var relX = ui.helper.offset().left - _this.area.offset().left;
            var relY = ui.helper.offset().top - _this.area.offset().top;
            var type = $(ui.helper.context).attr('data-device-type');
            var title = type + ' ' + _this.count;

            //new Device TODO: What is the max, min value ?
            var device = new Device(_this, _this.count, [relX, relY], title, type, 0, 0, images[type], update[type]);

            // add device to Controls
            controls.addDevice(device);

            // adjust counter
            devicesCounter.alterCount(1);
        }
        

    }

    /**
     * Callback for clicking on an arrow
     * @param {Arrow} arrow the arrow instance
     */
    function arrowClick(arrow) {
        // TODO diagram: call selectArrow() with arrow, if arrow!=selectedArrow, otherwise with null
        if (_this.selectedArrow !== arrow) {
            selectArrow(arrow);
        } else {
            selectArrow(null);
        }
    }

    /**
     * Callback for opening the context menu for the given device
     * @param {Device} device the device instance
     * @param event The jQuery Event instance
     */
    function showContextMenu(device, event) {
        // TODO diagram: show context menu + select device + deactivate arrow drawing
        $(".contextMenu").css("display", "block");
        $(".contextMenu").css("left", event.pageX + "px");
        $(".contextMenu").css("top", event.pageY + "px");
        $(".contextMenu").css("position", "absolute");
    }

    /**
     * Callback for mouse down on a device
     * @param {Device} device the device instance
     */
    function deviceMouseDown(device) {
        /**
         * TODO diagram: this method should be called in model-device.js if device a device is clicked
         *              + if arrow drawing mode is enabled and no device is selected before, create new object of Arrow for drawingArrow
         *              + if arrow drawing mode is enabled and a device was already selected before, add the drawn arrow between two devices
         *              + if selected device before is equal to new selected device, disable arrow drawing mode and delete drawn arrow from device to mouse position
         */
        //
        if (_this.drawArrowMode === true) {
            if (_this.selectedDevice === null) {
                _this.drawingArrow = new Arrow(diagram, device);
                selectDevice(device);
            } else if (_this.selectedDevice === device) {
                _this.drawingArrow.deleteArrow();
                _this.drawingArrow = null;
                deactivateArrowDrawing();
            } else {
                _this.selectedDevice.addArrowOut(_this.drawingArrow);
                device.addArrowIn(_this.drawingArrow);
                addArrow();
                selectDevice(device);
            }
        } else {
            selectDevice(device);
        }

    }

    /**
     * Callback for releasing the mouse over a device (end of mouse movement)
     * @param {Device} device the device instance
     */
    function deviceMouseUp(device) {
        // TODO diagram: if drawing arrow mode is enabled and start device != end device, set end device of drawing arrow and add drawing arrow with addArrow()
        if (_this.drawArrowMode === true && _this.selectedDevice !== null && device !== null) {
            if (_this.selectedDevice !== device) {
                _this.selectedDevice.addArrowOut(_this.drawingArrow);
                device.addArrowIn(_this.drawingArrow);
                addArrow();
            }
        }
    }

    /**
     * Select the given arrow
     * @param {?Arrow} arrow The arrow to select, or null to unselect
     */
    function selectArrow(arrow) {
        // TODO diagram: select arrow
        if (_this.selectedArrow !== null) {
            _this.selectedArrow.setActive(false);
            _this.selectedArrow = null;
        }

        if (arrow !== null) {
            _this.selectedArrow = arrow;
            _this.selectedArrow.setActive(true);
        }
    }

    /**
     * Select the given device
     * @param {?Device} device The device to select, or null to unselect
     */
    function selectDevice(device) {
        // TODO diagram: select device
        if (_this.selectedDevice !== null) {
            _this.selectedDevice.setActive(false);
            _this.selectedDevice = null;
        }

        if (device !== null) {
            _this.selectedDevice = device;
            _this.selectedDevice.setActive(true);
        }
    }

    /**
     * Remove the selected arrow
     */
    function deleteSelectedArrow() {
        // TODO diagram: delete selected arrow
    }

    /**
     * Completely remove the selected device
     */
    function deleteSelectedDevice() {
        // TODO diagram: delete selected device
        if (_this.selectedDevice !== null) {
            _this.selectedDevice.deleteDevice();
            _this.selectedDevice = null;
            devicesCounter.alterCount(-1);
        }
    }

    // Export some methods
    this.activateArrowDrawing = activateArrowDrawing;
    this.arrowClick = arrowClick;
    this.showContextMenu = showContextMenu;
    this.deviceMouseDown = deviceMouseDown;
    this.deviceMouseUp = deviceMouseUp;
    this.addDevice = addDevice;
}
