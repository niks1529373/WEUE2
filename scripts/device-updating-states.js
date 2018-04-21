const update = {
    "item-generator": updateItemGenerator,
    "machine": updateMachine,
    "conveyor": updateConveyor,
    "intelligent-conveyor": updateIntelligentConveyor,
    "interim-storage": updateInterimStorage,
    "end-storage": updateStorage,
    "trash-storage": updateStorage
};

/**
 * Update the image of an item generator ("3D-Drucker")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateItemGenerator(container, min, max, value) {
    
    if(value >= min && value <= max){
        container.find('.thirdPlane').show();
        container.find('.secondPlane').show();
        if(value == 0){
            container.find('.thirdPlane').hide();
            container.find('.secondPlane').hide();
        }else if(value == 1){
            container.find('.thirdPlane').hide();
        }

    }

}

/**
 * Update the image of a machine ("Maschine")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateMachine(container, min, max, value) {

    if(value >= min && value <= max){

        var color = "#FF0000";
        var height = 50;
        if(value < 34){
            height = 250;
            color = "#009933";
        }else if(value < 67){
            height = 200;
            color = "FF8000";
        }

        // set color of thermostat
        container.find('#path3680').css("fill", color);
        
        // set height of thermostat
        var path = container.find('#path3680')[0].getAttribute('d');
        var index = path.indexOf('V')
        // delete old value
        path = path.replace(path.substring(index + 2, path.indexOf('H') - 1), "");

        // insert new value
        path = [path.slice(0, index+2), height, path.slice(index+2)].join('');

        container.find('#path3680')[0].setAttribute('d', path);        
    }

}

/**
 * Update the image of a conveyor ("Förderband")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateConveyor(container, min, max, value) {
    if(value == 0){
        container.find('.package').hide();
    }else if(value == 1){
        container.find('.package').show();
    }
}

/**
 * Update the image of an intelligent conveyor ("Intelligentes Förderband")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateIntelligentConveyor(container, min, max, value) {
    if(value == 0){
        container.find('.packageLeft').hide();
        container.find('.packageRight').hide();
    }else if(value == 1){
        container.find('.packageLeft').show();
        container.find('.packageRight').show();
    }
    

}

/**
 * Update the image of an interim storage ("Temporäres Lager")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateInterimStorage(container, min, max, value) {
    if(value >= min && value <= max){
        container.find(".packageBottom").show();
        container.find(".packageTop").show();
        if(value < 5){
            container.find(".packageTop").hide();
        }
        if(value < 1){
            container.find(".packageBottom").hide();
        }
    }

   
}

/**
 * Update the image of an end storage ("Endlager") or a trash storage ("Mülllager")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateStorage(container, min, max, value) {

    if(value >= min && value <= max){
        container.find("text").find("tspan").text(value);
    }

}
