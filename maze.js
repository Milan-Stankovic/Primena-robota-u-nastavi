
var myMaze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [3, 1, 1, 0, 1, 0, 0, 1, 1, 1],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


function setUp(maze){
	for(var i=0; i<maze.length; i++){
		for(var j=0; j<maze[0].length; j++){
			if(maze[i][j]==3){
				return [i,j];
			}
		}	
	}
}


function traverse(maze,column, row) {
        if(maze[column][row] == 2) {
            console.log("We solved the maze at (" + column + ", " + row + ")");
			console.log(maze);
			
        } else if(maze[column][row] == 1) {
			
            console.log("At valid position (" + column + ", " + row + ")");
            maze[column][row] = 9;
            if(column < maze.length - 1) {
                traverse(column + 1, row);
            }
            if(row < maze[column].length - 1) {
                traverse(column, row + 1);
            }
            if(column > 0) {
                traverse(column - 1, row);
            }
            if(row > 0) {
                traverse(column, row - 1);
            }
        }
    }


function MazeSolver(maze) {

    this.maze = maze;
	
	var temp =setUp(maze);
	
	this.currentColumn = temp[0];
	this.currentRow = temp[1];
	traverse(maze,currentColumn,currentRow);
	

}


MazeSolver(myMaze);

