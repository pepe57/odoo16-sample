/** @odoo-module */

import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    setup() {
        this.state = useState({ value: 2 });
    }

    increment() {
        this.state.value = this.state.value + 2;
    }
}

Counter.template = "owl_playground.Counter";
