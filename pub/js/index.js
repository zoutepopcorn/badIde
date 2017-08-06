var codeMirror;

window.onload = function() {
	codeMirror = CodeMirror.fromTextArea(document.getElementById("codeBox"), {
		lineNumbers: true,
		matchBrackets: true,
		mode: "python"
	});
}
