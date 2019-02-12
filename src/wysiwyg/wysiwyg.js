function enableEditMode() {
  richTextEditor.document.designMode = 'on';
}

function execCmd(command) {
  console.log(`execution command: ${command}`);
  richTextEditor.document.execCommand(command, false, null);
}
function execCmdWithArg(command, arg) {
  console.log(`execution command: ${command} with arg: ${arg}`);
  richTextEditor.document.execCommand(command, false, arg);
}

enableEditMode();
execCmdWithArg('fontName', 'Arial');
