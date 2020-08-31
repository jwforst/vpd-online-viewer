// IMPORTANT! This file, controlVDE.js, associates only with the ViewportDoc Editor file, index.html.

// MEDIA VIEWPORT WIDTH CHECK
// The ViewportDoc Editor has two slideout menus (stacked one on top of the other by z-position) wrapped in an a sliding aside. On start, This code determines if the TOC menu should display by default based on the viewport size. If the viewport width is > 750px, the menu will display open. If width is =< 750px, (smallViewport = true) it will remain closed.
let tocAsideClosed; // Stores the boolean aside area TOC state
let setupAsideClosed; // Stores the boolean aside area Setup state
let smallViewport = window.matchMedia("(max-width: 750px)").matches;

if (smallViewport === true) {
  document.getElementById("tocAside").style.marginLeft = "-350px";
  tocAsideClosed = true;
  document.getElementById("setupAside").style.marginLeft = "-350px";
  setupAsideClosed = true;
} else {
  document.getElementById("tocAside").style.marginLeft = "0px";
  tocAsideClosed = false;
  document.getElementById("setupAside").style.marginLeft = "-350px";
  setupAsideClosed = true;
}

// EVENT LISTENERS FOR THE TOC BUTTON AND THE SETUP BUTTON
// The TocButton toggles the Table of Contents menu to slide in or out. Likewise, the setupButton toggles the Setup menu.
document.getElementById("tocButton").addEventListener("click", tocButtonClick);
document.getElementById("setupButton").addEventListener("click", setupButtonClick);

// THE TOC BUTTON TOGGLE RESPONSE
function tocButtonClick() {
  if (tocAsideClosed === true) {
    document.getElementById("setupAside").style.marginLeft = "-350px";
    setupAsideClosed = true;
    document.getElementById("tocAside").style.marginLeft = "0px";
    tocAsideClosed = false;
  } else {
    document.getElementById("tocAside").style.marginLeft = "-350px";
    tocAsideClosed = true;
  }
}

// THE SETUP BUTTON TOGGLE RESPONSE
function setupButtonClick() {
  if (setupAsideClosed === true) {
    document.getElementById("tocAside").style.marginLeft = "-350px";
    tocAsideClosed = true;
    document.getElementById("setupAside").style.marginLeft = "0px";
    setupAsideClosed = false;
  } else {
    document.getElementById("setupAside").style.marginLeft = "-350px";
    setupAsideClosed = true;
  }
}

// MANAGE PERSISTENT STORAGE, FONT FAMILY AND COLOR THEME
// COLOR THEME & FONT FAMILY MANAGEMENT OVERVIEW ===== ===== ===== ===== =====  
// Data stored in the browser localStorage remains valid and accessible across browser sessions. For this reason, initial startup values, and user-selected default values for the color theme and the font family are stored in localStorage which is persistent.

// All CSS colorTheme classes are defined in theme.css.

// The initial startup session values are: sessionColorTheme = colorTheme2 and sessionFontFamily = fontFamily2. sessionColorTheme and sessionFontFamily are CSS class attributes assigned to the root element (<HTML>) when the browser gets this webpage. This JavaScript then updates these classes by assigning colorTheme2 and fontFamily2 as defaults in the DOM. the JavaScript also manages user-selected themes and fonts. 

// The variable "localStorage.persistentColorTheme" stores the default color theme selector name. The user can select and store colorTheme1 through colorTheme6 as a persistent color theme.

// The variable "localStorage.persistentFontFamily" stores the default font family. The user can select and store fontFamily1 through fontFamily3 as a persistent  font family.

// INTIALIZE COLOR THEME AND FONT FAMILY ===== ===== ===== =====
// The code below tests if the persistentColorTheme does not exist. If this test is true, it indicates this page is running in this browser for the first time, and both persistentColorTheme and persistentFontFamily must be created and set to "colorTheme2" and "fontFamily2" respectively. Both are the initial default values until the user selects and applies a preferred theme.

// Initializes the CSS selector/radio button id when editor is run for the first time in a browser.
let initialFontFamily = "fontFamily0"; 
let initialColorTheme = "colorTheme0";

// Contains CSS selector/radio button id used during this browser session.
let sessionColorTheme;
let sessionFontFamily;

// FIRST TIME INITIALIZATION
// if persistentColorTheme does not exist...
if (!localStorage.getItem("persistentColorTheme")) {
  console.log("First time initialization ====================" );
  
  // ...create and initialize it...
  localStorage.persistentColorTheme = initialColorTheme;
  console.log("persistentColorTheme = " + localStorage.persistentColorTheme);
  
  // ...and assign the persistentColorTheme as the sessionColorTheme to use during this session...
  sessionColorTheme = localStorage.persistentColorTheme;
    
  // ...and assign the "checked" attribute to the colorTheme2 radio button to show it as the selected color theme in the settings display.
  document.getElementById(sessionColorTheme).checked = true;
  
  // Also, persistentFontFamily does not exist, so create and initialize it...
  localStorage.persistentFontFamily = initialFontFamily;
  console.log("persistentFontFamily = " + localStorage.persistentFontFamily);
    
  // ...and assign the persistentFontFamily as the sessionFontFamily to use with this session...
  sessionFontFamily = localStorage.persistentFontFamily;
    
  // ...and assign the "checked" attribute to the colorTheme2 radio button to show it as the selected theme in the settings display.
  document.getElementById(sessionFontFamily).checked = true;

} else {

  // The persistentColorTheme and persitentFontFamily already exists. Assign the persistentColorTheme as the sessionColorTheme to use with this session... 
  sessionColorTheme = localStorage.persistentColorTheme;
  
  // ...and assign the "checked" attribute to the associated colorTheme radio button to show it as the selected color theme in the settings display.
  document.getElementById(sessionColorTheme).checked = true;
    
  // ...and assign the persistentFontFamily as the sessionFontFamily to use with this session...
  sessionFontFamily = localStorage.persistentFontFamily;
    
  // ...and assign the "checked" attribute to the associated fontFamily radio button to show it as the selected font family in the settings display.
  document.getElementById(sessionFontFamily).checked = true;
}

// Update the DOM root element class list (Used by <html id="rootElement"> in index.html)
// Add the sessionColorTheme and the sessionFontFamily names to the rootElement class list. This is the initial class list setup as the browser loads this page.
document.getElementById("rootElement").classList.add(sessionFontFamily, sessionColorTheme);

console.log("before user click changes =======================");
console.log("Initial classList = " + document.getElementById("rootElement").classList);

// APPLY USER-SELECTED FONT FAMILY
function fontFamilyClicked(n) {
  console.log("User onchange font family click ====================");
  console.log("old classList (font family click) = " + document.getElementById("rootElement").classList);

  let oldFontFamily = sessionFontFamily;
  sessionFontFamily = "fontFamily" + n;
  localStorage.persistentFontFamily = sessionFontFamily;

  document.getElementById("rootElement").classList.replace(oldFontFamily, sessionFontFamily);

  console.log("classList after font family update = " + document.getElementById("rootElement").classList);
  console.log(" ");
}

// APPLY USER-SELECTED COLOR THEME ===== ===== ===== ===== =====
function colorThemeClicked(n) {
  console.log("User onchange color theme click ====================");
  console.log("old classList (color theme click) = " + document.getElementById("rootElement").classList);

  let oldColorTheme = sessionColorTheme;
  sessionColorTheme = "colorTheme" + n;
  localStorage.persistentColorTheme = sessionColorTheme;

  document.getElementById("rootElement").classList.replace(oldColorTheme, sessionColorTheme);

  console.log("classList after color theme update = " + document.getElementById("rootElement").classList);
  console.log(" ");
}
console.log("End of all functions ====================" );
console.log("classList at end of any update = " + document.getElementById("rootElement").classList);
console.log();
