/** Unicode keycodes **/
var keys={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pausebreak:19,capslock:20,esc:27,space:32,pageup:33,pagedown:34,end:35,home:36,leftarrow:37,uparrow:38,rightarrow:39,downarrow:40,insert:45,delete:46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,leftwindowkey:91,rightwindowkey:92,selectkey:93,numpad0:96,numpad1:97,numpad2:98,numpad3:99,numpad4:100,numpad5:101,numpad6:102,numpad7:103,numpad8:104,numpad9:105,multiply:106,add:107,subtract:109,decimalpoint:110,divide:111,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,semicolon:186,equalsign:187,comma:188,dash:189,period:190,forwardslash:191,graveaccent:192,openbracket:219,backslash:220,closebracket:221,singlequote:222};

/** Adds css to header as a style **/
const addCSS = (s, href="") => {
  if(href !== ""){
    if(window.location.href.includes(href)){
      document.head.appendChild(document.createElement("style")).innerHTML = s;
    }
  }else{
    document.head.appendChild(document.createElement("style")).innerHTML = s;
  }
}

/* Allows you to add JS in different ways */
const addJS_Node = (text, s_URL, funcToRun, runOnLoad) => {
    let d = document;
    let scriptNode = d.createElement('script');
    if(runOnLoad){
        scriptNode.addEventListener("load", runOnLoad, false);
    }
    scriptNode.type = 'text/javascript';
    if(text) scriptNode.textContent = text;
    if(s_URL) scriptNode.src = s_URL;
    if(funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')()';
    let target = d.getElementsByTagName('head')[0] || d.body || d.documentElement;
    target.appendChild(scriptNode);  
}


/**
 * 
 * @param {Element} element 
 */
const dragElement = (element) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if(document.getElementById(element.id + "header")){
        document.getElementById(element.id + "header").onmousedown = dragMouseDown;
    }else{
        element.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e){
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e){
        e = e || window.element;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement(){
        document.onmouseup = null;
        document.onmousemove = null;
    }
}



/** Helper function for addClass keybind object **/
const keyBind = (status, keyCode, ctrlKey = false) => {
  return {Status:status, keyCode: keyCode, ctrlKey:ctrlKey}
}

/** Adds a class to specified element and gives the option to listener for key input and toggle that class on and off **/
const addClass = (ele, s, href="", keyBind = {Status:false, keyCode: null, ctrlKey: false}, startUp = true, waitTime = 100) => {
  if(startUp){
      setTimeout(() => {
      if(href !== ""){
        if(window.location.href.includes(href)){
          ele.classList.add(s);
        }
      }else{
        ele.classList.add(s);
      }
    }, waitTime);
  }

  if(keyBind.Status){
    addEventListener("keyup", (event) => {
      if(event.which == keyBind.keyCode && window.location.href.includes(href)){
        if(ele.classList.contains(s))
          ele.classList.remove(s);
        else
          ele.classList.add(s);
      }
    });
  }
}
