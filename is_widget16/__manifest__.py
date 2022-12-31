# -*- coding: utf-8 -*-
{
    'name'     : 'InfoSaône - Module Widget Sample pour Odoo 16',
    'version'  : '0.1',
    'author'   : 'InfoSaône',
    'category' : 'InfoSaône',
    'description': """
InfoSaône - Module Widget Sample pour Odoo 16
===================================================
""",
    'maintainer' : 'InfoSaône',
    'website'    : 'http://www.infosaone.com',
    'depends'    : [
        'base',
    ],
    'data' : [
        "security/ir.model.access.csv",
        "views/is_widget16_view.xml",
    ],
    'installable': True,
    'application': True,
    'qweb': [
    ],
    'assets': {
        'web.assets_backend': [
            'is_widget16/static/src/**/*',
        ],
    },
    'license': 'LGPL-3',
}

