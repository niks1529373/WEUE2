/**
 * A class used for updating the values of the devices
 * @param form The jQuery container for the form
 * @class
 */
function Controls(form) {

    /**
     * The current values loaded from the form
     * @type {object}
     */
    let values = {
            "item-generator": -1,
            "machine": -1,
            "conveyor": -1,
            "intelligent-conveyor": -1,
            "interim-storage": -1,
            "end-storage": -1,
            "trash-storage": -1,
        };

    /**
     * A list of devices that should be updated with new values
     * @type {Device[]}
     */
    const devices = [];


    // TODO controls: add variables if necessary

    // Listen for updates
    form.submit(event => {
        event.preventDefault();
        updateDevices();
    });

    // Load initial values
    updateDevices();

    /**
     * Read the current values and update all registered devices
     */
    function updateDevices() {
        // TODO controls: get values of all controls of the form and call updateDevice on each device

        values["item-generator"] = parseInt($('#control-item-generator').val());
        values["machine"] = parseInt($('#control-machine').val());
        values["conveyor"] = $('#control-conveyor').prop('checked') ? 1 : 0 ;
        values["intelligent-conveyor"] = $('#control-intelligent-conveyor').prop('checked') ? 1 : 0;
        values["interim-storage"] = parseInt($('#control-interim-storage').val());
        values["end-storage"] = parseInt($('#control-end-storage').val());
        values["trash-storage"] = parseInt($('#control-trash-storage').val());

        for (var i = 0, len = devices.length; i < len; i++) {
            devices[i].updateDevice(values[devices[i].type]);
        }   
    }

    /**
     * Add a device to the list and set to the current value
     * @param {Device} device The device object to add
     */
    function addDevice(device) {
        // TODO controls: add dropped device to list and update the state of the device
        devices.push(device);
        device.updateDevice(values[device.type]);

    }

    /**
     * Remove a device from the list
     * @param {Device} device
     */
    function removeDevice(device) {
        var index = $.inArray(device, devices);
        if (index !== -1) 
            devices.splice(index, 1);
    }

    // Export public methods
    this.addDevice = addDevice;
    this.removeDevice = removeDevice;
}
