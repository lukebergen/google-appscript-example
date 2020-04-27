/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

// On document being opened, add new menu items for encrypt/decrypt
function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Crypt It', 'doCrypt')
      .addItem('DeCrypt It', 'doDecrypt')
      .addToUi();
}

// On initially installing this "add-on" do the initial setup as if the doc had just been opened
function onInstall(e) {
  onOpen(e);
}

function doCrypt() {
  replaceSelectionUsing(plain_to_rot13);
}

function doDecrypt() {
  replaceSelectionUsing(rot13_to_plain);
}

function replaceSelectionUsing(func) {
  var selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    var elements = selection.getRangeElements();
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      // Only modify elements that can be edited as text; skip images and other non-text elements.
      if (element.getElement().editAsText) {
        var text = element.getElement().editAsText().getText();
        var newText = func(text);
        DocumentApp.getActiveDocument().getBody().replaceText(text, newText)
      }
    }
  } else {
    throw new Error('Have to select some text to encrypt/decrypt');
  }
}

function plain_to_rot13(text) {
  var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';

  var newLetters = text.split('').map(function(letter) { // Loop over each letter in the provided text
    var index = input.indexOf(letter); // Find location in the "input" text where this letter occurs
    if (index == -1) { // If current letter isn't in the "input" text (as indicated by being at position "-1")
      return letter; // so just leave the thing alone (i.e. this is a digit or special character
    } else {
      // So if the source letter is first character of "input", return first character of "output".
      // If second character (i.e. "B"), return second character of output (i.e. "O"); etc...
      return output[index];
    }
  });

  return newLetters.join('');  // convert our list of letters (i.e. ['a', 'b', 'c']) into a plain string like "abc"
}

// Literally the same implementation as plain_to_rot13 but input and output are reversed.
function rot13_to_plain(text) {
  var input     = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
  var output    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  var newLetters = text.split('').map(function(letter) { // Loop over each letter in the provided text
    var index = input.indexOf(letter); // Find location in the "input" text where this letter occurs
    if (index == -1) { // If current letter isn't in the "input" text (as indicated by being at position "-1")
      return letter; // so just leave the thing alone (i.e. this is a digit or special character
    } else {
      // So if the source letter is first character of "input", return first character of "output".
      // If second character (i.e. "B"), return second character of output (i.e. "O"); etc...
      return output[index];
    }
  });

  return newLetters.join('');  // convert our list of letters (i.e. ['a', 'b', 'c']) into a plain string like "abc"
}
