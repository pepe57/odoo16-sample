/** @odoo-module **/

//TODO : Source => https://codingdodo.com/create-field-widget-in-owl-odoo-16/

console.log("### TEST 1 ###");

//const {xml, Component} = owl;
const {useRef, xml, onMounted, onWillStart, markup, Component, onWillUpdateProps} = owl;

import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { HtmlField } from "@web/views/fields/html/html_field";


var rpc = require('web.rpc');



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






export class Widget05 extends Component {
    setup() {
        console.log("### TEST Widget05 ###");
        super.setup();
    }
}
Widget05.template = "is_widget16.Widget05";
Widget05.props = standardFieldProps;
registry.category("fields").add("widget05", Widget05);










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
            //console.log("delete",divid,this,ev);
            $(divid).hide();


            //** Test RPC *****************************************************
            console.log("delete",this.props.record,this.props.record.resModel,this.props.record.data.id);
            const model = this.props.record.resModel;
            const docid = parseInt(this.props.record.data.id);
            rpc.query({
                model: model,
                method: 'test_rpc',
                args: [[docid], divid],
            }).then(res => {
                console.log("res =",res);
                //$(divid).replaceWith(res);
            });


            //TODO : Le fait de supprimer ou remplacer des elements entraine un bug au rafraichissement : 
            // => Voir comment résoudre cela => https://www.odoo.com/documentation/16.0/developer/reference/frontend/javascript_reference.html
            //*****************************************************************
        }
    }


}
HtmlClick.template = "is_widget16.HtmlClick";
registry.category("fields").add("html_click", HtmlClick);





export class MarkdownField extends Component {
    setup() {
        super.setup();
        this.textareaRef = useRef("textarea");
        console.log("setup",this.textareaRef);
    }

    get markupValue() {
        // do the transformation into html here, il later part
        return this.props.value;
    }

    /**
     * Returns the value from the editor, for now the editor is just a textarea
     * @returns {string}
     */
    getEditorValue() {
        console.log("getEditorValue",this.textareaRef.el.value);
        return this.textareaRef.el.value;
    }

    /**
     * Checks if the current value is different from the last saved value.
     * If the field is dirty it needs to be saved.
     * @returns {boolean}
     */
    _isDirty() {
        console.log("_isDirty",this.props.readonly,this.props.value,this.getEditorValue())
        return !this.props.readonly && this.props.value !== this.getEditorValue();
    }


    async commitChanges({urgent = false} = {}) {
        if (this._isDirty() || urgent) {
            await this.updateValue();
        }
    }
    
    async updateValue() {
        const value = this.getEditorValue();
        const lastValue = (this.props.value || "").toString();
        if (value !== null && !(!lastValue && value === "") && value !== lastValue) {
            if (this.props.setDirty) {
                this.props.setDirty(true);
            }
            await this.props.update(value);
        }
    }


}

MarkdownField.template = "is_widget16.MarkdownField";
MarkdownField.props = standardFieldProps;

registry.category("fields").add("markdown", MarkdownField);




console.log("### TEST 3 ###");
