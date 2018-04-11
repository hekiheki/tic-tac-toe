const calculateNextPos = (player,squares) => {
	const nextPos = []

	const changePos = {
		0: [0,0],
		1: [0,1],
		2: [0,2],
		3: [1,0],
		4: [1,1],
		5: [1,2],
		6: [2,0],
		7: [2,1],
		8: [2,2]
	}
	// 转换成一维数组
	const newSquares = squares.reduce((prev,next) => prev.concat(next))

	const temp = newSquares

	// 模拟下一步位置
	for(let i=0;i<9;i++){
		// 判断是不是空的棋盘
		if(newSquares[i] === 'e'){
			// 棋盘为空时，假设下一步棋下在改位置处
			temp[i] = player
			// 判断是否下一步是否能连成一条直线，若能，则输出下一步位置
			if(calculateWinner(temp)) nextPos.push(changePos[i])
			// 还原棋盘
			temp[i] = 'e'
		}
		
	}
	return nextPos
}
const calculateWinner = (squares) => {
	// 列出所有获胜的坐标
	const lines = [
	    [0, 1, 2],
	    [3, 4, 5],
	    [6, 7, 8],
	    [0, 3, 6],
	    [1, 4, 7],
	    [2, 5, 8],
	    [0, 4, 8],
	    [2, 4, 6],
	]
	for (let i = 0; i < lines.length; i++) {
	    const [a, b, c] = lines[i]
	    // 判断是否连成一条直线
	    if (squares[a] && squares[a] !=='e' && squares[a] === squares[b] && squares[a] === squares[c])
	      return squares[a]
	  }
	  return null
}

// 单元测试示例
(function textCalculateNextPos(){
    const player = 'x',
    	board = [['o','e','e'],['o', 'x', 'o'],['x','x','e']],
        valueExpected = [[2,2],[0,1],[0,2]];
     
    if (calculateNextPos(player,board).sort().toString() === valueExpected.sort().toString()) {
        console.log("Passed!");
    } else {
        console.log("Failed!");
    }
}());

export { calculateNextPos, calculateWinner }