;(function(global) {

'use strict';

var control = global.control = {
    Panel: function(data) {
        this.data = data;
        this.init();
    },

    Range: function(value, min, max, step) {
        this.value = value;
        this.min = min;
        this.max = max;
        this.step = step;
    },

    Select: function(value, options) {
        this.value = value;
        this.options = options;
    }
};

control.Panel.prototype.init = function() {
    for (var name in this.data) {
        var value = this.data[name];
        this.add(name, value);
    }
};

control.Panel.prototype.add = function(name, value) {
    var self = this;

    if (typeof value === 'string') {
        addText(name, value, update);
    }

    if (typeof value === 'number') {
        addNumber(name, value, update);
    }

    if (typeof value === 'boolean') {
        addBoolean(name, value, update);
    }

    if (value instanceof control.Range) {
        this.data[name] = value.value;
        addRange(name, value.value, update, value.min, value.max, value.range);
    }

    if (value instanceof control.Select) {
        this.data[name] = value.value;
        addSelect(name, value.value, value.options, update);
    }

    return this;

    function update(e) {
        var target = e.target;
        var value;
        if (target.type === 'checkbox') {
            value = target.checked;
        } else {
            if (target.type === 'number' || target.type === 'range') {
                value = target.valueAsNumber
            } else {
                value = target.value;
            }
        }
        self.data[name] = value;
        self.trigger('update', self.data, name, value);
    }
};

control.Panel.prototype.on = function(type, handler) {
    if (!this.events) {
        this.events = {};
    }

    if (!this.events[type]) {
        this.events[type] = [];
    }

    this.events[type].push(handler);

    return this;
};

control.Panel.prototype.trigger = function(type, data, name, value) {
    if (this.events && this.events[type]) {
        for (var i = 0; i < this.events[type].length; i++) {
            this.events[type][i](data, name, value);
        }
    }

    return this;
};

function addText(name, value, handler) {
    addInput(name, value, handler, 'text', false);
}

function addNumber(name, value, handler) {
    addInput(name, value, handler, 'number', false);
}

function addBoolean(name, value, handler) {
    addInput(name, value, handler, 'checkbox', false);
}

function addRange(name, value, handler, min, max, step) {
    var input = addInput(name, value, handler, 'range', true);
    if (typeof min !== 'undefined') {
        input.min = min;
    }
    if (typeof max !== 'undefined') {
        input.max = max;
    }
    if (typeof min !== 'undefined') {
        input.step = step;
    }
}

function addSelect(name, value, options, handler) {
    var control = addControl(name);

    var select = document.createElement('select');
    control.appendChild(select);

    for (var i = 0; i < options.length; i++) {
        var option = new Option();
        select.add(option);
        option.value = option.label = options[i];
    }

    select.value = value;

    select.onchange = function(e) {
        handler(e);
    };
}

function addInput(name, value, handler, type, addOutput) {
    var control = addControl(name);

    var input = document.createElement('input');
    control.appendChild(input);
    input.id = name;
    input.type = type;

    if (type === 'checkbox') {
        input.checked = value;

        input.onchange = function(e) {
            handler(e);
        };
    } else {
        input.value = value;

        input.oninput = function(e) {
            handler(e);
            if (output) {
                output.value = e.target.value;
            }
        };
    }

    if (addOutput) {
        var output = document.createElement('output');
        control.appendChild(output);
        output.value = value;
    }

    return input;
}

function addControl(name) {
    var panel = getPanel();

    var control = document.createElement('li');
    panel.appendChild(control);

    var label = document.createElement('label');
    control.appendChild(label);
    label.appendChild(document.createTextNode(name));

    return control;
}

function getPanel() {
    var controls = document.getElementById('controls');

    if (!controls) {
        controls = document.createElement('ul');
        controls.id = 'controls';
        document.body.appendChild(controls);
    }

    return controls;
}

})(window);