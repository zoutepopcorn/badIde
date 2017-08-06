	let codeMirror;

	window.onload = function() {
		codeMirror = CodeMirror.fromTextArea(document.getElementById("codeBox"), {
			lineNumbers: true,
			matchBrackets: true,
			mode: "python"
		});
	}
	$.notify("Hello there. Webadge", "info");

 let socket = io.connect(window.location.origin);
 socket.on('connect', function(data) {
			socket.emit('join', 'Hello World from client');
 });
 socket.on('data', (dat) => {
			console.log(dat.data)
			let o = $("#out");
			let style = "test";
			o.append(`<cool class=${style}>${dat.data}</cool>`);
			o.scrollTop(o.prop("scrollHeight"));
 } );

 socket.on('status', function(data) {
			console.log("***********************************************");
			console.log(data);
			console.log("***********************************************");
			$.notify(data.data, "danger");
			$.notify(data.data, "succes");
			// $.notify(data, {});
 });

/*
 $('form').submit(function(e){
		 e.preventDefault();
		 var message = $('#chat_input').val();
		 socket.emit('msg', {data: codeMirror.getValue()});
 });
*/

 $('#upload').click(() => {
	 var message = $('#chat_input').val();
	 socket.emit('msg', {data: codeMirror.getValue()});
 });

 $('#help').click(() => {
	 socket.emit('msg', { data: "help()" });
 });

var loading = function(e) {
  e.preventDefault();
  e.stopPropagation();
  e.target.classList.add('loading');
  e.target.setAttribute('disabled','disabled');
  setTimeout(function(){
    e.target.classList.remove('loading');
    e.target.removeAttribute('disabled');
  },1500);
};

var btns = document.querySelectorAll('button');
for (var i=btns.length-1;i>=0;i--) {
  btns[i].addEventListener('click',loading);
}
