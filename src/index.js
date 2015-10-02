/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { Model } from './model';
import { Renderer } from './renderer';
import { Storage } from './storage';
import { forEach } from './utils/for-each';
import { bindInput } from './utils/bind-input';

let renderer = new Renderer();
let storage = new Storage();
let model = new Model(storage.restore());

model.addListener(function (model) {
    renderer.render(model);
    storage.persist(model);
});

document.addEventListener('DOMContentLoaded', function () {
    var $canvas = document.querySelector('#badge');

    bindInput('#agent', model, 'agent');
    bindInput('#level', model, 'level');
    bindInput('#country', model, 'country');

    renderer.$canvas = $canvas;
    renderer.ctx = $canvas.getContext('2d');

    model.callListeners();
});

window.addEventListener('load', function(){
   renderer.render(model);
});