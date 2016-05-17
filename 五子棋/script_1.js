var chess = document.getElementById('chess');
var button = document.getElementById("button");
var context = chess.getContext('2d');

//画棋盘
context.strokeStyle = "#BFBFBF";
for (var i = 0; i <15; i++) {
	context.moveTo(15 + i*30, 15);
	context.lineTo(15 + i*30, 435);
	context.stroke();
	context.moveTo(15, 15 + i*30);
	context.lineTo(435, 15 + i*30);
	context.stroke();
}

var me = true;
var over = false;
var count = 0;
//棋盘数组,用以确定棋盘上棋子的情况
var chessBox = [];
//赢法数组,用以遍历每种赢法
var wins = [];
//赢法的统计数组
var myWin = [];
var computerWin = [];

//初始化棋盘数组
for (var i = 0; i < 15; i++) {
	chessBox[i] = [];
	for(var j = 0; j < 15; j++){
		chessBox[i][j] = 0;
	}
}
//初始化赢法数组
for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}
//遍历每种赢法
//横线
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
	          wins[i][j+k][count] = true;
		}
		count++;
	}
}
//竖线
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
	          wins[j+k][i][count] = true;
		}
		count++;
	}
}
//斜线，从左上角开始
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
	          wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//反斜线，从右上角开始
for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
	          wins[i+k][j-k][count] = true;
		}
		count++;
	}
}


//初始化统计数组,其必须在赢法数组之后
for (var i = 0; i < count; i++) {
	myWin[i] = 0;
	computerWin[i] = 0;
}

//画棋子
var oneStep = function(i,j,me){
	context.beginPath();
	context.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);
	context.closePath();

	var gradient = context.createRadialGradient(15 + i*30+2, 15 + j*30-2, 13, 15 + i*30+2, 15 + j*30-2, 0);
	if (me) {
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636766");
	} else{
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	}
	context.fillStyle = gradient;
	context.fill();
}

//监听棋盘点击事件、落子并记录落子情况
chess.onclick = function(e){
	//如果五子连珠，就不能落子
	if (over) {
		return;
	}
	//如果不该我下子，不能落子
	if (!me) {
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if(chessBox[i][j] == 0){
		oneStep(i,j,me); 
		chessBox[i][j] = 1;//黑棋为1	
		
		//遍历赢法数组,看是否有当前落子的赢法
		//k表示了赢法的唯一性,只要一种赢法达到了5颗子，则赢
		for (var k = 0; k < count; k++) {
			if (wins[i][j][k]) {
				myWin[k]++;
				//computerWin[k] = 6;
				if (myWin[k] == 5) {
					window.alert("你赢了！");
					over = true;
				}
			}
		}
		if (!over) {
			//如果我落子了,就该计算落子
			me = !me;
			computerAI();
		}
	}
}
//帮手程序
button.onclick = function(){
	var myScorce = [];			//
	var computerScorce = [];	//
	var max = 0;                //u,v,max存储的永远是赢的几率最大及不能让人赢的那种赢法
	var u = 0,v = 0;
	//初始化评估数组
	for (var i = 0; i < 15; i++) {
		myScorce[i] = [];
		computerScorce[i] = [];
		for (var j = 0; j < 15; j++) {
			myScorce[i][j] = 0;
			computerScorce[i][j] = 0;
		}
	}
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			//如果在该处没有落子,则执行
			if (chessBox[i][j] == 0) {
				//评估
				for (var k = 0; k < count; k++) {
					if (wins[i][j][k]) {
						//评估我的落子情况
						//已有4颗子连线最大,如果相对的分数比计算机的分数大,则偏向与进攻,反之则偏向防御
						if (myWin[k] == 1) {
							myScorce[i][j] += 220;
						}else if(myWin[k] == 2){
							myScorce[i][j] += 420;
						}else if(myWin[k] == 3){
							myScorce[i][j] += 2200;
						}else if(myWin[k] == 4){
							myScorce[i][j] += 20000;
						}
						//评估计算机的得分
						if (computerWin[k] == 1) {
							computerScorce[i][j] += 200;
						}else if(computerWin[k] == 2){
							computerScorce[i][j] += 400;
						}else if(computerWin[k] == 3){
							computerScorce[i][j] += 2000;
						}else if(computerWin[k] == 4){
							computerScorce[i][j] += 10000;
						}
					}
				}

				//更新在一点的评估的分,在一点可能有不同的赢法,其评估得分要取其最易赢得那个赢法的得分
				//计算机的得分
				if (computerScorce[i][j] > max) {
					max = computerScorce[i][j];
					u = i;
					v = j;
				} else if (computerScorce[i][j] == max) {
					if (myScorce[i][j] > myScorce[u][v]) {
						u = i;
						v = j;
					}
				}
				//我的得分
				if (myScorce[i][j] > max) {
					max = myScorce[i][j];
					u = i;
					v = j;
				} else if (myScorce[i][j] == max) {
					//如果当前走法比上一步赢得几率大,则转到当前
					if (computerScorce[i][j] > computerScorce[u][v]) {
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u,v,true);
	chessBox[u][v] = 1;		//落下黑子
	//遍历赢法数组,看是否有当前落子的赢法
		//k表示了赢法的唯一性,只要一种赢法达到了5颗子，则赢
		for (var k = 0; k < count; k++) {
			if (wins[u][v][k]) {
				myWin[k]++;
				//computerWin[k] = 6;
				if (myWin[k] == 5) {
					window.alert("你赢了！");
					over = true;
				}
			}
		}
		if (!over) {
			//如果我落子了,就该计算落子
			me = !me;
			computerAI();
		}
}

//计算机落子
var computerAI = function(){
	var myScorce = [];			//
	var computerScorce = [];	//
	var max = 0;                //u,v,max存储的永远是赢的几率最大及不能让人赢的那种赢法
	var u = 0,v = 0;
	//初始化评估数组
	for (var i = 0; i < 15; i++) {
		myScorce[i] = [];
		computerScorce[i] = [];
		for (var j = 0; j < 15; j++) {
			myScorce[i][j] = 0;
			computerScorce[i][j] = 0;
		}
	}
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			//如果在该处没有落子,则执行
			if (chessBox[i][j] == 0) {
				//评估
				for (var k = 0; k < count; k++) {
					if (wins[i][j][k]) {
						//计算机评估我的落子威胁
						//已有4颗子连线威胁最大
						if (myWin[k] == 1) {
							myScorce[i][j] += 200;
						}else if(myWin[k] == 2){
							myScorce[i][j] += 400;
						}else if(myWin[k] == 3){
							myScorce[i][j] += 2000;
						}else if(myWin[k] == 4){
							myScorce[i][j] += 10000;
						}
						//计算机评估自己的得分
						//与人的威胁分数相比,如果相对的分数比人的分数大,则偏向与进攻,反之则偏向防御
						if (computerWin[k] == 1) {
							computerScorce[i][j] += 220;
						}else if(computerWin[k] == 2){
							computerScorce[i][j] += 420;
						}else if(computerWin[k] == 3){
							computerScorce[i][j] += 2100;
						}else if(computerWin[k] == 4){
							computerScorce[i][j] += 20000;
						}
					}
				}

				//更新在一点的评估的分,在一点可能有不同的赢法,其评估得分要取其最易赢得那个赢法的得分
				//我的得分
				if (myScorce[i][j] > max) {
					max = myScorce[i][j];
					u = i;
					v = j;
				} else if (myScorce[i][j] == max) {
					//如果当前走法比上一步赢得几率大,则转到当前
					if (computerScorce[i][j] > computerScorce[u][v]) {
						u = i;
						v = j;
					}
				}
				//计算机的得分
				if (computerScorce[i][j] > max) {
					max = computerScorce[i][j];
					u = i;
					v = j;
				} else if (computerScorce[i][j] == max) {
					if (myScorce[i][j] > myScorce[u][v]) {
						u = i;
						v = j;
					}
				}

			}
		}
	}
	oneStep(u,v,false);
	chessBox[u][v] = 2;		//落下白子
	//判断计算机是否赢
	for (var k = 0; k < count; k++) {
		if (wins[u][v][k]) {
			computerWin[k]++;
			//myWin[k] = 6;
			if (computerWin[k] == 5) {
				window.alert("计算机赢了！");
				over = true;
			}
		}
	}
	if (!over) {
		me = !me;
	}
}