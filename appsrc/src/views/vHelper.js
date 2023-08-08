// src/views/vHelper.js v0.0.2-1
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var m = require("mithril")

var vHelper = {}

vHelper.clearById = nodeId => {
    // Returns a function that clears content at given node
    return () => {
        var node = document.getElementById(id)
        m.render(node,null)
    }
}
vHelper.setById = nodeId => {
    // Returns a function that takes a msg and renders it at given node
    return msg => {
        var node = document.getElementById(nodeId);
        m.render(node, m('div.mt2.dark-blue.tl',msg))
    }
}

module.exports = vHelper

