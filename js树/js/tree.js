var arrData = new Array(10);
for (var i = 0; i < arrData.length; i++) {
	arrData[i] = Math.ceil(Math.random() * 100);
}

function Node(data) {
	this.Lchild = null;
	this.Rchild = null;
	this.data = data;
}


function Tree(data) {
	var node = new Node(data);
	this._root = node;
}

/*-------------------先中后序遍历，深度优先还有广度优先-----------*/
Tree.prototype.PreOrderTraverse = function(callback) {

	(function recurse(current) {
		if (!current) {
			return;
		}
		callback && callback(current);
		recurse(current.Lchild);
		recurse(current.Rchild);
	})(this._root);

}

Tree.prototype.InOrderTraverse = function(callback) {

	(function recurse(current) {
		if (!current) {
			return;
		}

		recurse(current.Lchild);
		callback && callback(current);
		recurse(current.Rchild);
	})(this._root);

}

Tree.prototype.PostOrderTraverse = function(callback) {

	(function recurse(current) {
		if (!current) {
			return;
		}
		recurse(current.Lchild);
		recurse(current.Rchild);
		callback && callback(current);
	})(this._root);

}



//插入节点
function insertBSTNodes(T, data) {

	var node = new Node(data);

	if (!T) {
		T = node;
		return true;
	}

	//小于则在左子树
	if (data < T.data) {
		if (!T.Lchild) {
			T.Lchild = node;
			return true;
		}
		insertBSTNodes(T.Lchild,data);
	}

	//不能等于
	else if (data == T.data) {
		return false;
	}

	//大于则在又子树
	else{
		if (!T.Rchild) {
			T.Rchild = node;
			return true;
		}
		insertBSTNodes(T.Rchild,data);
	}
}

//创建二叉排序树
function creatBST(arrData) {
	var tree = new Tree(arrData[0]);
	for (var i = 1; i < arrData.length; i++) {
		insertBSTNodes(tree._root, arrData[i]);
	}

	return tree;
}
