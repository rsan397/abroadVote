function getSession() {
	//call heroku server
	const comment = 'hello';
	console.log("comment " + comment);
	let localHost = "http://localhost:5000/query/";
	let herokuUrl = "https://abroadvote.herokuapp.com/query/";
	const uri= herokuUrl + comment;
	const xhr = new XMLHttpRequest();
	xhr.open('GET', uri, true);
	let resp = "";
	xhr.onload= () => {
		resp = JSON.parse(xhr.responseText);
		//console.log(resp.outputContexts);
		let context = JSON.stringify(resp.outputContexts);
		//console.log(context);
		setContext(context);
		formatBot(resp.fulfillmentText);
	}
	xhr.send(null);
}

function getComments() {
	const comment = document.getElementById("textArea").value;
	const element = document.getElementById("textArea");
	const context = element.dataset.output;
	//add comment to chat bot
	console.log(context);
	formatUser(comment);
	//call heroku server
	let localHost = "http://localhost:5000/query/";
	let herokuUrl = "https://abroadvote.herokuapp.com/query/";
	const uri= herokuUrl + comment;
	const xhr = new XMLHttpRequest();
	xhr.open('POST', uri, true);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	let resp = "";
	xhr.onload= () => {
		resp = JSON.parse(xhr.responseText);
		console.log(resp.fulfillmentText);
		let recContext = JSON.stringify(resp.outputContexts);
		//console.log(context);
		setContext(recContext);
		formatBot(resp.fulfillmentText);
	}
	xhr.send(context);
}

function formatBot(data){
	let tableContent= "";
	if(data.indexOf('-') !== -1){
  		// would be true. Period found in file name
  		var multiMessages = data.split("-");
  		for (message in multiMessages) {
  			tableContent += "<tr class=" + "bot-message"+ "><td class=" + "received_withd_msg" + "><p>"+ multiMessages[message] + "</p></td></tr>\n";
  		};
	} else {
		tableContent += "<tr class=" + "bot-message"+ "><td class=" + "received_withd_msg" + "><p>"+ data + "</p></td></tr>\n";
	};
	
	let x = document.getElementById("messageResponseTable");
	x.innerHTML +=tableContent;
	document.getElementById("scrollWindow").scrollTop = 9999999;
}

function formatUser(data){
	let tableContent= "";
	tableContent += "<tr class=" + "user-message"+ "><td class=" + "sent_msg" + "><p>"+ data + "</p></td></tr>\n";
	
	let x = document.getElementById("messageResponseTable");
	x.innerHTML +=tableContent;
	document.getElementById("scrollWindow").scrollTop = 9999999;
}

function setContext(context){
	const comment = document.getElementById("textArea");
	comment.dataset.output = context;
}
