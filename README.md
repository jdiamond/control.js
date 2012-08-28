control.js is a JavaScript library that makes it easy to create control panels
quickly.

I do a lot of experimentation and demos while researching or training find
myself getting distracted creating controls to manipulate whatever it is I'm
working with. This library is supposed to help reduce those distractions.

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

    new control.Panel({
            someString: 'foo',
            someNumber: 42,
            someBoolean: true,
            anotherNumber: new control.Range(33, 1, 100, 0.5)
        })
        .on('update', function(data) {
            // do stuff
        });

panel.on(eventType, eventHandler)
---------------------------------

Bind a function to an event. The only event so far is `update`. The event
handler for the `update` event gets the data object passed in as the first
argument. The second and third arguments are the name and value of the
property that was just updated.

panel.data
----------

The data object that was passed in to the `Panel` constructor. This also gets
passed in to `update` event handlers.

new control.Range(value, min, max, [step])
------------------------------------------

Constructs a range control. Use this to add a slider to the panel instead of a
number control. Range controls also add `output` elements to the panel so that
you can quickly see the current value.

Limitations
===========

- Assumes a modern (HTML5-capable) browser.
- Can't control where the control panel is added.
- Only one control panel can appear per page.

Ideas
=====

- Fallback to jQuery/jQuery UI for older browsers?
- Multiple control panels.
- Multiple tabs on one panel.
- More control types:
    - Color
    - Date
    - 2D x and y coordinates (drag the value around on a mini-canvas to change)
- Controls that hide themselves based on other values.
    - Via a predicate function?
    - Or a simple string if the other value is a boolean?