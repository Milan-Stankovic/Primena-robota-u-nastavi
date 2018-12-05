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

			
			

			

			function traverse(maze,column, row) {
				
				

				if(maze[column][row] == 2) {
					this.solved = true;
					
					moveTo(column, row, maze[column][row]);				
				} else if((maze[column][row] == 1 || maze[column][row] == 3 )&& this.solved==false) {
					maze[column][row] = 9;
					
					moveTo(column, row, maze[column][row]);
					
					if(column < maze.length - 1) {
						traverse(maze, column + 1, row);
					}
					if(row < maze[column].length - 1) {
						traverse(maze, column, row + 1);
					}
					if(column > 0) {
						traverse(maze, column - 1, row);
					}
					if(row > 0) {
						traverse(maze, column, row - 1);
					}
				}
			}
			
			function moveTo(column, row, field){
				if(field==2) this.solved = true;
				
				var dir = findDirection(lastCol, lastRow, column, row);
				if(dir!=-1){
					this.directions.push(dir);
					this.result.push(dir);
				}
				else{
					var temp = findBackwardPass(lastCol, lastRow, column, row, this.directions);
					for(var i = 0;i<temp.length;i++){
						this.result.push(temp[i]);
					}
				}
				this.lastCol = column;
				this.lastRow = row;
			}
			
			function findBackwardPass(curCol, curRow, targetCol, targetRow, d){
				var tempCol = curCol;
				var tempRow = curRow;
				
				var retVal = [];
				
				var c=findDirection(tempCol, tempRow, targetCol, targetRow);
				i=10;
				while(c==-1&&(i--)){		
					var next = negation(d.pop());
					//console.log("Curent situation:"+c+"("+ tempCol + ", " + tempRow + ")+trying to do:"+next);
					var novo = updatePosition(tempCol, tempRow, next);
					tempCol=novo[0];
					tempRow=novo[1];
					retVal.push(next);
					c=findDirection(tempCol, tempRow, targetCol, targetRow);
				}
				retVal.push(c);
				d.push(c);
				return retVal;
			}
			
			function updatePosition(col, row, c){
				if(c=='R') row++;
				else if(c=='L') row--;
				else if(c=='D') col++;
				else if(c=='U') col--;
				else return -1;
				
				return [col,row];
			
			}
			
			function negation(c){
				if(c=='R') return 'L';
				else if(c=='L') return 'R';
				else if(c=='D') return 'U';
				else if(c=='U') return 'D';
				else return -1;
			}
			
			function findDirection(curCol, curRow, targetCol, targetRow){
				if(curCol==targetCol && curRow - targetRow == 1){
					return 'L';
				}				
				else if(curCol==targetCol && curRow - targetRow == -1){
					return 'R';
				}
				else if(curCol - targetCol == 1 && curRow == targetRow){
					return 'U';
				}
				else if(curCol - targetCol == -1 && curRow == targetRow){
					return 'D';
				}
				else{
					return -1;
				}
			}
			
			function setUp(maze){
				for(var i=0; i<maze.length; i++){
					for(var j=0; j<maze[0].length; j++){
						if(maze[i][j]==3){
							return [i,j];
						}
					}	
				}
			}

			
			function MazeSolver(maze) {

				this.maze = maze;
				this.directions = [];//samo konacan put koji treba proci
				this.result = [];//ukupan put sa svim vracanjima u nazad itd.
				this.solved = false;
				
				var temp =setUp(maze);
				
				this.currentColumn = temp[0];
				this.currentRow = temp[1];
				
				this.lastCol = temp[0];//pretpostavljam da pocinjemo od leve ivice
				this.lastRow = temp[1]-1;//pretpostavljam da pocinjemo od leve ivice
				
				traverse(maze,currentColumn,currentRow);
				//console.log(result);
				//umesto ovog console log treba proci i slati robotu uputstva

			}


			MazeSolver(myMaze);
		