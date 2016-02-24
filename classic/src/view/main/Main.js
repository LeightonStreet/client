/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Tweetmap.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'Tweetmap.view.main.MainController',
        'Tweetmap.view.main.MainModel',
        'Tweetmap.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Users',
        iconCls: 'fa-user',
        layout: 'fit',
        items: [{
            xtype: 'gmappanel',
            title: 'Google Map',
            center: {
                geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
                marker: {title: 'Fenway Park'}
            },
            markers: [{
                lat: 42.339641,
                lng: -71.094224,
                title: 'Boston Museum of Fine Arts',
                listeners: {
                    click: function (/*e*/) {
                        Ext.Msg.alert('It\'s fine', 'and it\'s art.');
                    }
                }
            }, {
                lat: 42.339419,
                lng: -71.09077,
                title: 'Northeastern University'
            }]
        }]
    }, {
        title: 'Groups',
        iconCls: 'fa-users',
        bind: {
            html: '{loremIpsum}'
        }
    }, {
        title: 'Home',
        iconCls: 'fa-home',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'mainlist'
        }]
    }]
});
