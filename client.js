var scripturl = 'https://api.trello.com/1/client.js?key=4b077d4fa0c75e9c9e0260707b706ee5';
$.getScript(scripturl, function(){
    var event = new Event('TrelloTime');
    document.dispatchEvent(event);
});

//options for trello auth
	options = {};
	options.name = "Inbox for Trello";
	options.persist = true;
	options.interactive = true;
	options.expiration = "never";
	options.success = this.authorized;
	options.scope = { write: true, read: true };
