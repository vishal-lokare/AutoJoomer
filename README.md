![AutoJoomer](https://github.com/vishal-lokare/AutoJoomer/blob/main/icon.png?raw=true =100x100)
# AutoJoomer
AutoJoomer will help you join classes on time (IIIT Kottayam 2020). Works for all classes, including labs; differentiates between lab batches; and also coding classes; fetches data from hosted database which can be changed whenever there are changes in the timetable.

## Installation
1. Download all the files to a folder.
2. Open your browser, navigate to "Extensions" panel -> "Manage Extensions".
3. Enable "Developer Mode" in the top-right.
4. Click on "Load Unpacked" and select the folder where you downloaded the files.
5. Navigate to "Extensions" panel -> click on "AutoJoomer".
6. Set the required values, click "SAVE", and restart your browser.

## How to stay updated
To stay up-to-date with the latest version hosted on github, run 
```
git pull
``` 
in the terminal and reload the extension

OR

repeat installation process again

## How to use
1. Open your browser.
2. If any values are not set, error will be displayed. If this is the case, set the values in "AutoJoomer" popup in "Extensions" panel.
3. You will get a confirmation prompt whenever a class is supposed to be joined. Click "OK" to join or "Cancel" to ignore.
4. This confirmation can be bypassed by removing the "window.confirm" part in script.js (line 66, 71).
5. In case you open your browser after a class has already started, the extension will automatically open that class as well given that it started in the last hour.
7. The extension will stop working when the browser is closed OR the day is over.

## Future Updates
Functionality for extra classes not in layout of original timetable
