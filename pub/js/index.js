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
			if(dat.data.indexOf(">>>") == 0) {
				style = "in";
			}
			o.append(`<cool class=${style}>${dat.data}</cool>`);
			o.scrollTop(o.prop("scrollHeight"));
 } );

 socket.on('status', function(data) {
			console.log("*********");
			console.log(data);
			console.log("*****");
			$.notify(data.data, "danger");
			$.notify(data.data, "succes");
 });

upload = () => {
	let message = codeMirror.getValue().split("\n");
	console.log(message);
	message.forEach((line, i) => {
		console.log(line);
		setTimeout(() => { socket.emit('code', {data: line}); }, i * 100)
	});

}

 $('#upload').click(() => {
	 upload();
 });

 $('#help').click(() => {
	 socket.emit('msg', { data: "help()" });
 });


 $('#command').keypress(function (e) {
   if (e.which == 13) {
		 let message = $('#command').val();
		 $('#command').val("");
		 socket.emit('msg', { data: message } );
     return false;    //<---- Add this line
   }
 });

 $('body').keydown(function (e) {
   if (e.ctrlKey && e.keyCode == 13) {
		 upload();
   }
 });



let loading = function(e) {
  e.preventDefault();
  e.stopPropagation();
  e.target.classList.add('loading');
  e.target.setAttribute('disabled','disabled');
  setTimeout(function(){
    e.target.classList.remove('loading');
    e.target.removeAttribute('disabled');
  },1500);
};

let btns = document.querySelectorAll('button');
for (var i=btns.length-1;i>=0;i--) {
  btns[i].addEventListener('click',loading);
}
