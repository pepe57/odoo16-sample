# -*- coding: utf-8 -*-
from odoo import fields, models, api


class is_widget16(models.Model):
    _name='is.widget16'
    _description="Test Widget dans Odoo 16"
    _order='name desc'

    name     = fields.Char("Char")
    widget01 = fields.Char("Widget 01", compute='_compute', readonly=False, store=True)
    widget02 = fields.Char("Widget 02", compute='_compute', readonly=False, store=True)
    widget03 = fields.Char("Widget 03", compute='_compute', readonly=False, store=True)
    widget04 = fields.Char("Widget 04", compute='_compute', readonly=True , store=True)
    widget05 = fields.Char("Widget 05", compute='_compute', readonly=False, store=True)
    widget_html_click = fields.Html("Widget html", compute='_compute_widget_html', readonly=True, store=True, sanitize=False)
    markdown_field    = fields.Text("MarkdownField")
    compteur          = fields.Integer("Compteur")
    negatif           = fields.Float("Négatif")
    cbn               = fields.Html("Analyse CBN")


    @api.depends('name')
    def _compute(self):
        for obj in self:
            obj.widget01 = obj.name
            obj.widget02 = obj.name
            obj.widget03 = obj.name
            obj.widget04 = obj.name
            obj.widget05 = obj.name


    def _compute_widget_html(self):
        for obj in self:
            print("_compute_widget_html", obj, type(obj.id))


            html=[]
            #if isinstance(int, type(obj.id)):
            #print("_compute_widget_html", obj, type(obj.id))
            filtre=[]
            if obj.name:
                filtre=[("name","ilike",obj.name)]
            lines = self.env['account.tax'].search(filtre, order='name', limit=5)
            divid=0
            for line in lines:
                divid+=1
                div = """
                    <div class="div_%s">
                        <button class="fa fa-trash-o" name="delete" aria-label="Delete row" tabindex="-1" divid="div_%s"></button>
                        <span  style="cursor: pointer;background-color:GhostWhite;" model="%s" docid=%s>%s</span>
                    </div>
                """%(divid,divid,line._name,line.id,line.name)
                html.append(div)
            lines = self.env['account.account'].search(filtre, order='name', limit=5)
            for line in lines:
                divid+=1
                div = """
                    <div class="div_%s">
                        <button class="fa fa-trash-o" name="delete" aria-label="Delete row" tabindex="-1" divid="div_%s"></button>
                        <span  style="cursor: pointer;background-color:beige;" model="%s" docid=%s>%s</span>
                    </div>
                """%(divid,divid,line._name,line.id,line.name)
                html.append(div)
            obj.widget_html_click = "\n".join(html)


    def html_click_update_action(self):
        for obj in self:
            obj._compute_widget_html()

    @api.model
    def html_click_action(self):
        lines = self.env['is.widget16'].search([], order='id desc', limit=1)
        res_id = lines and lines[0].id or False
        view_id = self.env.ref('is_widget16.is_widget16_html_click_form_view').id
        action={
            "name": "HtmlClick",
            "type": 'ir.actions.act_window',
            "res_model": 'is.widget16',
            "views": [[view_id, 'form']],
            "res_id": res_id,
        }
        return action


    def test_rpc(self,divid):
        for obj in self:
            print("test_rpc",obj,obj.name,divid)
            html="<h1>TEST %s : divid=%s</h1>"%(obj.name, divid)
            return html



    def analyse_cbn(self):
        for obj in self:
            print("analyse_cbn",obj,obj.name)

            filtre=[]
            if obj.name:
                filtre=[("name","ilike",obj.name)]
            print(filtre)
            lines = self.env['account.account'].search(filtre, order='name', limit=5)
            divid=0
            divs=[]
            for line in lines:
                divid+=1
                div = """
                    <div class="div_%s">
                        <button class="fa fa-trash-o" name="delete" aria-label="Delete row" tabindex="-1" divid="div_%s"></button>
                        <span  style="cursor: pointer;background-color:beige;" model="%s" docid=%s>%s</span>
                    </div>
                """%(divid,divid,line._name,line.id,line.name)
                divs.append(div)
            html = "\n".join(divs)
            return [html,divs]
