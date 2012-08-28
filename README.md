control.js
==========

control.js is a JavaScript library that makes it easy to create control panels
quickly for all of the properties in an object. An event gets raised every
time the user uses the control panel to change a property. MIT licensed.

    new control.Panel({
            someString: 'foo',
            someNumber: 42,
            someBoolean: true,
            anotherNumber: new control.Range(33, 1, 100, 0.5) // value, min, max, step
        })
        .on('update', function(data, name, value) {
            // Use `data.someString`, `data.someNumber`, etc.
            // `name` and `value` are the name and new value
            // of the property that triggered the update event.
        });

Include control.css if you want it to look pretty(-ish).

Why?
====

I do a lot of experimentation while researching and learning new APIs. I also
write a lot of live demos while training. Often, I want to see how changing a
value in my code will affect what I see on the page so I add controls to the
page to let me change that value, triggering updates to the page.

I find myself getting too distracted creating the controls. I need to add the
`label` and `input` elements to the HTML, some JavaScript to wire it up, and
sometimes even some CSS if I don't like how it looks. This library is supposed
to help reduce those distractions.

With control.js, all I need to do is include the library and then add a tiny
bit of JavaScript describing what values should be exposed in the control
panel. Hopefully, my code is written in a way that allows me to call a single
function to redraw everything. If that's not the case, this won't be very
useful.

For example, if I'm working with the canvas API and I want to try a thicker
`lineWidth`, I'd normally change the code that sets that property, save the
file, switch to my browser, and hit refresh.

With control.js, I can add a control for the `lineWidth` property to my page.
The control panel raises an `update` event whenever any of its controls
changes values. I handle that event by redrawing the canvas. This gives me
immediate feedback and helps me find the best value as quickly as possible.

    new control.Panel({
            lineWidth: new control.Range(5, 1, 20) // value, min, max
        })
        .on('update', function(data) {
            draw(data.lineWidth);
        });

The control panel is a `ul` element with an id of "controls" containing one
`li` for each control. Each `li` contains a `label`, `input`, and (sometimes)
`output` elements. It's pretty ugly without any styling. You can style it
yourself or include control.css to get some basic styling.

API
===

new control.Panel(data)
-----------------------

This is the main constructor you want to use. It requires an object as an
argument. The values in the object can be simple strings, numbers, or
booleans. They can also be objects from the `control` namespace.

panel.on(eventType, eventHandler)
---------------------------------

Bind a function to an event. The only event so far is `update`. The event
handler for the `update` event gets the data object passed in as the first
argument. The second and third arguments are the name and value of the
property that just changed.

panel.data
----------

The data object that was passed in to the `Panel` constructor. This also gets
passed in to `update` event handlers as the first argument.

new control.Range(value, [min], [max], [step])
----------------------------------------------

Constructs a range control. Use this to add a slider to the panel instead of a
number control. Range controls also add `output` elements to the panel so that
you can quickly see the current value.

Limitations
===========

- Assumes a modern (HTML5-capable) browser.
- Can't control where the control panel is added.
- Only one control panel can appear per page.
- The order properties are displayed is unspecified.

Ideas
=====

- Fallback to jQuery/jQuery UI for older browsers?
- Multiple control panels?
- Multiple tabs on one panel?
    - Maybe nested objects become tabs.
- More control types:
    - Select - new control.Select(value, array)
    - Radio buttons - new control.Radio(value, array)
    - Color
    - Date
    - 2D x and y coordinates (drag the value around on a mini-canvas to change?)
    - String, Number, and Boolean to add constraints to the basic types.
- Controls that hide themselves based on other values.
    - Via a predicate function?
    - Or a simple string if the other value is a boolean?
- Output-only elements?
    - Requires a method to update/trigger change to control?