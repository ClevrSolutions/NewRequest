dojo.provide("NewRequest.widget.NewRequest");

mendix.dom.insertCss(mx.moduleUrl("NewRequest", "widget/styles/NewRequest.css"));

mendix.widget.declare('NewRequest.widget.NewRequest', {
	addons       : [],
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
		setTimeout(dojo.hitch(this, function () {
            var code = mx.ui.getLocale();
            var caption = this.caption;
            this.domNode.title = caption;
        }), 1000);
  },
	
	
	postCreate : function(){
	
		//houskeeping
		this.connect(mx.session, "startup", "resetCaption");
        this.connect(mx.session, "restart", "resetCaption");
		this.domNode.title = this.caption;
		this.connect(this.domNode, 'onclick', dojo.hitch(this, this.execaction));
		mx.addOnLoad(dojo.hitch(this, this.resetCaption)); 
		this.actRendered();
	},	
	
	uninitialize : function(){
		logger.debug(this.id + ".uninitialize");
	}
});