# Google AppScript Example

Simple little gscript app to add a Add Ons > (project name) > CryptIt & DecryptIt menu items

Note, "gscript" is really just javascript with some extra functions and such for messing with google doc/sheet/etc things.

To use this...

- Create a new google doc (or open an existing one. Should work but haven't tested)
- Click Tools > Script Editor
- In the new window, replace the default stuff with the contents of Code.gs
- Save the file (and give it a useful sounding name as the name you give here will be what you get in the doc toolbar)
- Click the "select function" dropdown and select "onInstall"
- Click the "run" button (looks like a play icon)
- It'll ask for permissions to muck with your document, allow all that
- Go back to your doc, select some text, click "Add Ons" and you should see your new menu item for running your cypher algorithms against the selected text
- `doCrypt` and `doDecrypt` are the entry points for janking and unjanking text respectively
  - You can create your own functions like `myCryptingFunction` that take in text and return text, then pass that function to `replaceSelectionUsing(myCryptingFunction)` to make doCrypt use your new function instead
