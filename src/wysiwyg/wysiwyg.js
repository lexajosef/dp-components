function enableEditMode() {
  richTextEditor.document.designMode = 'on';
}

function addStylesToEditor() {
  let robotoFont = richTextEditor.document.createElement('link');
  robotoFont.rel = 'stylesheet';
  robotoFont.href = 'https://fonts.googleapis.com/css?family=Roboto:400,700';

  let editorStyle = richTextEditor.document.createElement('style');
  editorStyle.appendChild(document.createTextNode(`
      body { 
        font-family: Roboto, sans-serif;
      }`
    ));

  richTextEditor.document.head.appendChild(editorStyle);
  richTextEditor.document.head.appendChild(robotoFont);
}

function getCaretCharacterOffsetWithin() {
  let caretOffset = 0;

  let doc = richTextEditor.ownerDocument || richTextEditor.document; // element document (document of iframe)
  let win = doc.defaultView || doc.parentWindow;

  if (typeof win.getSelection != "undefined") {
    let sel = win.getSelection();
    if (sel.rangeCount > 0) {
      let range = win.getSelection().getRangeAt(0);
      let preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(richTextEditor.document.body);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  }

  return caretOffset;
}

function onEditorCursorPosChange(event) {
  console.log(event.target);
  console.log(getCaretCharacterOffsetWithin(richTextEditor));
}

function focusEditor() {
  richTextEditor.document.body.focus();
}

function doCommand(command, arg = null) {
  let success;

  console.log(`execution command: ${command}, arg = ${arg}`);

  try {
    success = richTextEditor.document.execCommand(command, false, arg);
  } catch (error) {
    alert(error);
  }

  if (!success) {
    const supported = document.queryCommandSupported(command);
    const msg = supported ? 'Unknown error. Is anything selected?' : 
        'Command is not supported by your browser.';
    alert(msg);
  }

  focusEditor();
}

richTextEditor.document.body.addEventListener('click', onEditorCursorPosChange);
richTextEditor.document.body.addEventListener('focus', onEditorCursorPosChange);
richTextEditor.document.body.addEventListener('keyup', onEditorCursorPosChange);

addStylesToEditor();
enableEditMode();
