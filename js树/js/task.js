
function $(element) {
	return document.getElementById(element);
}

function addEvent(element, event, listener) {
	if (element.addEventListener) { //标准
		element.addEventListener(event, listener, false);
	} else if (element.attachEvent) { //低版本ie
		element.attachEvent("on" + event, listener);
	} else { //都不行的情况
		element["on" + event] = listener;
	}
}

/*-------------DOM元素获取与事件绑定---------------------*/


//存放树的数据，便于遍历
var arrDiv = new Array();

//动画进行时标志
var animateFlag = true;


//先序，你懂的
function PreOrderTraverse(T) {
	if (!T) {
		return;
	}
	arrDiv.push(T);
	PreOrderTraverse(T.firstElementChild);
	PreOrderTraverse(T.lastElementChild);
}


//中序
function InOrderTraverse(T) {
	if (!T) {
		return;
	}
	InOrderTraverse(T.firstElementChild);
	arrDiv.push(T);
	InOrderTraverse(T.lastElementChild);
}


//后序
function PostOrderTraverse(T) {
	if (!T) {
		return;
	}
	PostOrderTraverse(T.firstElementChild);
	PostOrderTraverse(T.lastElementChild);
	arrDiv.push(T);
}
//动画演示
function animate() {
	animateFlag = false;
	var index = 0;

	a = setInterval(function() {
		if (index >= arrDiv.length) {
			clearInterval(a);
			arrDiv[index - 1].style.backgroundColor = '#fff';

			//动画结束，重置全局数组，动画进行标志
			arrDiv = [];
			animateFlag = true;
		} else {
			if (index) arrDiv[index - 1].style.backgroundColor = '#fff';
			arrDiv[index].style.backgroundColor = 'red';
			index++;
		}

	}, 500)
}

//绑定事件
function initButton() {
	var tree_root = $('tree-root');
	addEvent($('preOrder'), 'click', function() {
		if (animateFlag) {
			PreOrderTraverse(tree_root);
			animate();
		}
	})
	addEvent($('inOrder'), 'click', function() {
		if (animateFlag) {
			InOrderTraverse(tree_root);
			animate();
		}
	})
	addEvent($('postOrder'), 'click', function() {
		if (animateFlag) {
			PostOrderTraverse(tree_root);
			animate();
		}
	})
	
}

window.onload = function() {
	initButton();
}