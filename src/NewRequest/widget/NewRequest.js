define([
	"dojo/_base/declare",
	"mxui/widget/_WidgetBase",
	"dojo/_base/lang",
	"dojo/_base/kernel"
], function (declare, _WidgetBase, lang, kernel) {
	'use strict';

	return declare("NewRequest.widget.NewRequest", [ _WidgetBase ], {
	inputargs: {
    url :       '',
	caption :   '',
	},
	
	domNode: null,
		
	execaction : function() {
		var url = this.url;
		window.open(url);
	},
	
	resetCaption:function(){
		                //system needs some time to set the locale when changing users, so timeout is needed
		setTimeout(lang.hitch(this, function () {
            var code = kernel.locale;
            var caption = this.caption;
            this.domNode.title = caption;
        }), 1000);
  },
	
	
	postCreate : function(){
	
		//houskeeping
		this.connect(mx.session, "startup", "resetCaption");
        this.connect(mx.session, "restart", "resetCaption");
		this.domNode.title = this.caption;
		this.connect(this.domNode, 'onclick', lang .hitch(this, this.execaction));
		mx.addOnLoad(lang.hitch(this, this.resetCaption)); 
		// this.actRendered();
	},	
	
	uninitialize : function(){
		logger.debug(this.id + ".uninitialize");
	}
		});
	});

require([ "NewRequest/widget/NewRequest" ]);
