(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],[,,,,,,,,,,,function(e,t,n){e.exports=n(20)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(8),i=n.n(s),o=(n(16),n(17),n(10)),c=n(1),u=n(2),l=n(3),d=n(4),h=n(5),f=(n(18),function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props,t=e.col,n=e.isFinish,a=e.isStart,s=e.isWall,i=e.onMouseDown,o=e.onMouseEnter,c=e.onMouseUp,u=e.onMouseClick,l=e.row,d=n?"node-finish":a?"node-start":s?"node-wall":"";return r.a.createElement("div",{id:"node-".concat(l,"-").concat(t),className:"node ".concat(d),onMouseDown:function(){return i(l,t)},onMouseEnter:function(){return o(l,t)},onMouseUp:function(){return c()},onClick:function(){return u(l,t)}})}}]),n}(a.Component));function v(e,t,n){var a=[];t.distance=0;for(var r=function(e){var t,n=[],a=Object(c.a)(e);try{for(a.s();!(t=a.n()).done;){var r,s=t.value,i=Object(c.a)(s);try{for(i.s();!(r=i.n()).done;){var o=r.value;n.push(o)}}catch(u){i.e(u)}finally{i.f()}}}catch(u){a.e(u)}finally{a.f()}return n}(e);r.length;){m(r);var s=r.shift();if(!s.isWall){if(s.distance===1/0)return a;if(s.isVisited=!0,s===n)return a;s!==t&&a.push(s),p(s,e)}}}function m(e){e.sort((function(e,t){return e.distance-t.distance}))}function p(e,t){var n,a=function(e,t){var n=[],a=e.col,r=e.row;r>0&&n.push(t[r-1][a]);r<t.length-1&&n.push(t[r+1][a]);a>0&&n.push(t[r][a-1]);a<t[0].length-1&&n.push(t[r][a+1]);return n.filter((function(e){return!e.isVisited}))}(e,t),r=Object(c.a)(a);try{for(r.s();!(n=r.n()).done;){var s=n.value;s.distance=e.distance+1,s.previousNode=e}}catch(i){r.e(i)}finally{r.f()}}function y(e){e.sort((function(e,t){return e.distance+e.h-(t.distance+t.h)}))}function g(e,t,n,a,r){var s,i=function(e,t){var n=[],a=e.col,r=e.row;r>0&&n.push(t[r-1][a]);r<t.length-1&&n.push(t[r+1][a]);a>0&&n.push(t[r][a-1]);a<t[0].length-1&&n.push(t[r][a+1]);return n.filter((function(e){return!e.isVisited}))}(e,t),o=Object(c.a)(i);try{for(o.s();!(s=o.n()).done;){var u=s.value,l=e.distance+1;l<u.distance&&(u.distance=l,u.h=Math.abs(u.col-r.col)+Math.abs(u.row-r.row),u.previousNode=e,a.includes(u)||n.push(u))}}catch(d){o.e(d)}finally{o.f()}}var w=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={},a}return Object(l.a)(n,[{key:"visualize",value:function(){var e,t,n=this.props.grid,a=n[this.props.START_NODE_ROW][this.props.START_NODE_COL],r=n[this.props.FINISH_NODE_ROW][this.props.FINISH_NODE_COL];switch(this.props.alg){case"A*":e=function(e,t,n){var a,r=[],s=Object(c.a)(e);try{for(s.s();!(a=s.n()).done;){var i,o=a.value,u=Object(c.a)(o);try{for(u.s();!(i=u.n()).done;){i.value.distance=1/0}}catch(h){u.e(h)}finally{u.f()}}}catch(h){s.e(h)}finally{s.f()}t.distance=0;for(var l=[t];l;){y(l);var d=l.shift();if(void 0===d)return r;if(!d.isWall){if(d===n)return r;d.isVisited=!0,d!==t&&r.push(d),g(d,e,l,r,n)}}return r}(n,a,r),t=function(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}(r);break;case"Dijkstra":e=v(n,a,r),t=function(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}(r);break;default:return}this.props.animate(e,t)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return e.visualize()}},"Visualize ",this.props.alg,"'s Algorithm"))}}]),n}(a.Component),k=n(9);var b,E,O,M,N=function(e,t,n,a){var r,s=Object(c.a)(e);try{for(s.s();!(r=s.n()).done;){var i,o=r.value,u=Object(c.a)(o);try{for(u.s();!(i=u.n()).done;){var l=i.value;if(!t.includes(l)&&l!==n&&l!==a)Math.floor(10*Math.random())<4&&(l.isWall=!0)}}catch(d){u.e(d)}finally{u.f()}}}catch(d){s.e(d)}finally{s.f()}return e},S=function(e,t,n){for(var a=[],r=function(){var n=I(e,t);return a.push(n),e=e.filter((function(e){return e!==n})),"break"};a[a.length-1]!==n;){if("break"===r())break}return a},I=function(e,t){var n=[],a=t.col,r=t.row;return r>0&&n.push(e[r-1][a]),r<e.length-1&&n.push(e[r+1][a]),a>0&&n.push(e[r][a-1]),a<e[0].length-1&&n.push(e[r][a+1]),n[Math.floor(Math.random()*(n.length-1))]},j=(n(19),Math.floor(.35*window.innerHeight/25)),C=Math.floor(.25*window.innerWidth/25),W=Math.floor(.35*window.innerHeight/25),P=Math.floor(.75*window.innerWidth/25),D=["A*","Dijkstra"],_=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;return Object(u.a)(this,n),(e=t.call(this)).state={grid:[],mouseIsPressed:!1,sIsPressed:!1,fIsPressed:!1},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=L();this.setState({grid:e}),document.addEventListener("keydown",this.handleKeyDown.bind(this)),document.addEventListener("keyup",this.handleKeyUp.bind(this))}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyDown.bind(this)),document.removeEventListener("keyup",this.handleKeyUp.bind(this))}},{key:"resetGrid",value:function(){b=Math.floor(.35*window.innerHeight/25),E=Math.floor(.25*window.innerWidth/25),O=Math.floor(.35*window.innerHeight/25),M=Math.floor(.75*window.innerWidth/25);var e=L();this.resetColors(),this.setState({grid:e})}},{key:"resetColors",value:function(){for(var e=document.getElementsByClassName("node-visited");e.length>0;)e[0].classList.remove("node-visited");for(var t=document.getElementsByClassName("node-shortest-path");t.length>0;)t[0].classList.remove("node-shortest-path");for(var n=document.getElementsByClassName("node-failed");n.length>0;)n[0].classList.remove("node-failed");var a,r=this.state.grid,s=Object(c.a)(r);try{for(s.s();!(a=s.n()).done;){var i,o=a.value,u=Object(c.a)(o);try{for(u.s();!(i=u.n()).done;){var l=i.value;l.isVisited=!1,l.distance=1/0}}catch(d){u.e(d)}finally{u.f()}}}catch(d){s.e(d)}finally{s.f()}this.setState({grid:r})}},{key:"generateRandomMaze",value:function(){var e=function(e){var t=e.reduce((function(e,t){return e.concat(t)})).filter((function(e){return e.isStart||e.isFinish})),n=Object(k.a)(t,2),a=n[0],r=n[1],s=S(e,a,r);return N(e,s,a,r)}(this.state.grid);this.setState({grid:e})}},{key:"handleMouseDown",value:function(e,t){var n=B(this.state.grid,e,t);this.setState({grid:n,mouseIsPressed:!0})}},{key:"handleMouseEnter",value:function(e,t){if(this.state.mouseIsPressed){var n=B(this.state.grid,e,t);this.setState({grid:n})}}},{key:"handleMouseUp",value:function(){this.setState({mouseIsPressed:!1})}},{key:"handleMouseClick",value:function(e,t){if(this.state.sIsPressed){b=e,E=t;var n=L();this.setState({grid:n})}else if(this.state.fIsPressed){O=e,M=t;var a=L();this.setState({grid:a})}}},{key:"handleKeyDown",value:function(e){switch(e.keyCode){case 83:if(this.state.sIsPressed)return;this.setState({sIsPressed:!0});break;case 70:if(this.state.fIsPressed)return;this.setState({fIsPressed:!0});break;default:return}}},{key:"handleKeyUp",value:function(e){switch(e.keyCode){case 83:this.setState({sIsPressed:!1});break;case 70:this.setState({fIsPressed:!1});break;default:return}}},{key:"animate",value:function(e,t){for(var n=this,a=function(a){if(a===e.length)return setTimeout((function(){n.animateShortestPath(t,e)}),22*a),{v:void 0};setTimeout((function(){var t=e[a];document.getElementById("node-".concat(t.row,"-").concat(t.col)).classList.add("node-visited")}),20*a)},r=0;r<=e.length;r++){var s=a(r);if("object"===typeof s)return s.v}}},{key:"animateShortestPath",value:function(e,t){for(var n=function(t){setTimeout((function(){var n=e[t];document.getElementById("node-".concat(n.row,"-").concat(n.col)).classList.replace("node-visited","node-shortest-path")}),30*t)},a=0;a<e.length;a++)n(a);if(1===e.length)for(var r=0;r<t.length;r++){var s=t[r];document.getElementById("node-".concat(s.row,"-").concat(s.col)).classList.replace("node-visited","node-failed")}}},{key:"render",value:function(){var e=this,t=this.state,n=t.grid,a=t.mouseIsPressed;return r.a.createElement(r.a.Fragment,null,n?r.a.createElement("div",{className:"buttonList"},D.map((function(t,a){return r.a.createElement(w,{key:a,alg:t,grid:n,START_NODE_ROW:b||j,START_NODE_COL:E||C,FINISH_NODE_ROW:O||W,FINISH_NODE_COL:M||P,animate:e.animate,animateShortestPath:e.animateShortestPath})}))):r.a.createElement("h1",null,"Wait"),r.a.createElement("br",null),r.a.createElement("button",{className:"resetButton",onClick:function(){return e.resetGrid()}},"Reset Walls"),r.a.createElement("button",{className:"resetButton",onClick:function(){return e.resetColors()}},"Reset Colors"),r.a.createElement("button",{className:"resetButton",onClick:function(){return e.generateRandomMaze()}},"Random Maze"),r.a.createElement("p",{className:"showInstructions"},"Instructions "),r.a.createElement("div",{className:"instructions"},r.a.createElement("p",{className:""},"Hold ",r.a.createElement("strong",null,"S")," and click to move start"),r.a.createElement("p",{className:""},"Hold ",r.a.createElement("strong",null,"F")," and click to move finish"),r.a.createElement("p",{className:""},"Click and drag to create walls")),r.a.createElement("div",{className:"grid"},n.map((function(t,n){return r.a.createElement("div",{key:n},t.map((function(t,n){var s=t.row,i=t.col,o=t.isFinish,c=t.isStart,u=t.isWall;return r.a.createElement(f,{key:n,col:i,isFinish:o,isStart:c,isWall:u,mouseIsPressed:a,onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseClick:function(t,n){return e.handleMouseClick(t,n)},onMouseUp:function(){return e.handleMouseUp()},row:s})})))}))))}}]),n}(a.Component),L=function(){for(var e=Math.floor(window.innerWidth/25),t=Math.floor(window.innerHeight/25),n=[],a=0;a<t;a++){for(var r=[],s=0;s<e;s++)r.push(R(s,a));n.push(r)}return n},R=function(e,t){return{col:e,row:t,isStart:t===(b||j)&&e===(E||C),isFinish:t===(O||W)&&e===(M||P),distance:1/0,isVisited:!1,isWall:!1,previousNode:null}},B=function(e,t,n){var a=e.slice(),r=a[t][n],s=Object(o.a)({},r,{isWall:!r.isWall});return a[t][n]=s,a};var F=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(_,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[11,1,2]]]);
//# sourceMappingURL=main.a7618861.chunk.js.map