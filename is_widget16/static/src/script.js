/** @odoo-module **/

//TODO : Source => https://codingdodo.com/create-field-widget-in-owl-odoo-16/

console.log("### TEST 1 ###");

//const {xml, Component} = owl;
const {useRef, xml, onMounted, onWillStart, markup, Component, onWillUpdateProps} = owl;

import { standardFieldProps } from "@web/views/fields/standard_field_props";
import {registry} from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { HtmlField } from "@web/views/fields/html/html_field";



export class Widget01 extends Component {
    setup() {
        console.log("### TEST Widget01 ###");
        super.setup();
    }
}
Widget01.template = xml`<pre t-esc="props.value" class="bg-primary text-white p-3 rounded"/>`;
Widget01.props = standardFieldProps;
registry.category("fields").add("widget01", Widget01);



export class Widget02 extends Component {
    setup() {
        console.log("### TEST Widget02 ###");
        super.setup();
    }
}
Widget02.template = "is_widget16.Widget02";
Widget02.props = standardFieldProps;
registry.category("fields").add("widget02", Widget02);



export class Widget03 extends Component {
    setup() {
        console.log("### TEST Widget03 ###");
        super.setup();
    }
}
Widget03.template = xml`<pre t-esc="props.value" t-attf-class="bg-#{props.backgroundColor} text-white p-3 rounded"/>`;
Widget03.defaultProps = {
    backgroundColor: "warning",
};
Widget03.props = {
    ...standardFieldProps,
    backgroundColor: {type: String, optional: true},
};
Widget03.extractProps = ({attrs, field}) => {
    return {
        backgroundColor: attrs.background_color,
    };
};
registry.category("fields").add("widget03", Widget03);



export class Widget04 extends Component {
    setup() {
        console.log("### TEST Widget04 setup ###");
        super.setup();
        this.actionService = useService('action');
        this.action = useService("action");

        onWillStart(async () => {
            console.log("### TEST Widget04 onWillStart ###");
        });
        onMounted(() => {
            console.log("### TEST Widget04 onMounted ###");

        });
        onWillUpdateProps((newProps) => {
            console.log("### TEST Widget04 onWillUpdateProps ###");
        });
    }
    /**
     * @param {MouseEvent} ev
     */
    onGlobalClick(ev) {
        console.log("### TEST Widget04 onGlobalClick ###", ev); 
        return this.actionService.doAction({
            name: "test",
            type: 'ir.actions.act_window',
            res_model: 'account.tax',
            views: [[false, 'list']],
        });
        
    }
}

Widget04.template = xml`<pre t-esc="props.value" class="bg-danger text-white p-3 rounded" t-on-click="onGlobalClick"  />`;
Widget04.props = standardFieldProps;
registry.category("fields").add("widget04", Widget04);



export class HtmlClick extends HtmlField {
    setup() {
        console.log("### TEST HtmlClick setup ###");
        super.setup();
        this.actionService = useService('action');
    }
    /**
     * @param {MouseEvent} ev
     */
    onGlobalClick(ev) {
        console.log("### TEST HtmlClick onGlobalClick ###", ev, ev.target.attributes.url, ev.target.name); 
        if (ev.target.attributes.docid && ev.target.attributes.model){
            const model = ev.target.attributes.model.value;
            const docid = ev.target.attributes.docid.value;
            console.log(model,docid)
            return this.actionService.doAction({
                name: docid,
                type: 'ir.actions.act_window',
                res_model: model,
                views: [[false, 'form']],
                view_mode: 'form',
                res_id: parseInt(docid),
            });
        }
        if (ev.target.name=="delete"){
            const divid = "."+ev.target.attributes.divid.value;
            console.log("delete",divid);
            $(divid).hide();
        }
    }
}
HtmlClick.template = "is_widget16.HtmlClick";
registry.category("fields").add("html_click", HtmlClick);


console.log("### TEST 3 ###");
