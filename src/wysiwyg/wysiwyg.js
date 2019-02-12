function enableEditMode() {
  richTextEditor.document.designMode = 'on';
}

function addStylesToEditor() {
  var robotoFont = richTextEditor.document.createElement('link');
  robotoFont.rel = 'stylesheet';
  robotoFont.href = 'https://fonts.googleapis.com/css?family=Roboto:400,700';

  var editorStyle = richTextEditor.document.createElement('style');
  editorStyle.appendChild(document.createTextNode(`
      body { 
        font-family: Roboto, sans-serif;
      }`
    ));

  richTextEditor.document.head.appendChild(editorStyle);
  richTextEditor.document.head.appendChild(robotoFont);
}

function execCmd(command) {
  console.log(`execution command: ${command}`);
  richTextEditor.document.execCommand(command, false, null);
}
function execCmdWithArg(command, arg) {
  console.log(`execution command: ${command} with arg: ${arg}`);
  richTextEditor.document.execCommand(command, false, arg);
}

addStylesToEditor();
enableEditMode();
