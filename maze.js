/*async function startProgram() {
	// Write code here
	
	
	await roll(180, 15, 1);
	await speak("Grba pederu");
	await stopRoll;
	await roll(90,15,1);
}
*/
async function startProgram() {
	setStabilization(true);
	
	
	
	//await leftMotorPwm();
	
	/*await rawMotor(60, 60, 2);
	await stopRoll;
	await setHeading(0);
	await stopRoll;
	await rawMotor(60, 60, 2);
	await stopRoll;
	await setHeading(90);
	await stopRoll;
	await rawMotor(60, 60, 2);
	await stopRoll;
	await setHeading(180);
	await stopRoll;
	await rawMotor(60, 60, 2);
	await stopRoll;*/
	//setStabilization(true);
	MazeSolver(myMaze);
	//await delay(2);
	
	//await speak(Math.round(getDistance()).toString());
	//
	
	
}
	var myMaze = [
				[1, 1, 1, 1, 1, 0, 0, 0, 1, 0,0],
				[1, 0, 0, 0, 1, 1, 1, 0, 1, 1,1],
				[1, 1, 0, 0, 0, 0, 1, 0, 0, 0,1],
				[0, 1, 1, 1, 0, 0, 1, 0, 0, 0,1],
				[0, 1, 0, 1, 0, 0, 1, 1, 1, 1,1],
				[0, 1, 0, 1, 1, 0, 1, 0, 0, 0,0],
				[0, 1, 0, 1, 0, 0, 1, 0, 0, 0,0],
				[3, 1, 0, 0, 0, 0, 1, 1, 1, 1,2]
				
			];

	var currentDistance = 0;
	var lastDistance =0;
	var maxDistance =0;
	var lastMovement =-1;


	var speed = 100;//55
	var time = 0.18;//
	var right = 180;
	var left= 0;
	var up= 90;
	var down = 270;




			async function MazeSolver(maze) {
				
				this.maze = maze;
				this.directions = [];//samo konacan put koji treba proci
				this.result = [];//ukupan put sa svim vracanjima u nazad itd.
				this.solved = false;
				
				var domePos;
				var temp =setUp(maze);
	
				
				this.currentColumn = temp[0];
				this.currentRow = temp[1];
				
				
				
				this.lastCol = temp[0];//pretpostavljam da pocinjemo od leve ivice
				this.lastRow = temp[1]-1;//pretpostavljam da pocinjemo od leve ivice
				
				traverse(maze,currentColumn,currentRow);
				
				for(var i=1;i<result.length;i++){
					//await delay(1);
					
					await spin(360, 1);
					
					await stopRoll();
					await delay(0.5);
					//await speak(Math.round(getDistance()).toString());
					var realTime = time;
					if(result[i]==='R'){
						await rotation(right);
						//var d1 = getDistance();
						//await roll(right, speed, (time*8.5/7));
						
						//var d2 = getDistance();
						//await speak(Math.round(d2-d1).toString());
						
						realTime = (time*8.5)/7;
						await stopRoll();
						
						//await setDomePosition(0);
						await speak("Right");
						
					}
					else if(result[i]=='L'){
						
						await rotation(left);
						//var d1 = getDistance();
						//await roll(left, speed,(time*8.5/7));
						//var d2 = getDistance();
						//await speak(Math.round(d2-d1).toString());
						
						realTime = (time*8.5)/7;
						await stopRoll();
						await speak("Left");
					}
					else if(result[i]=='U'){
						
						await rotation(up);
						//var d1 = getDistance();
						//await roll(up, speed, time);
						
						//var d2 = getDistance();
						//await speak(Math.round(d2-d1).toString());
						await stopRoll();
						await speak("Up");
					}
					else if(result[i]=='D'){
						
						await rotation(down);
						//var d1 = getDistance();
						//await roll(down, speed, time);
						//var d2 = getDistance();
						//await speak(Math.round(d2-d1).toString());
						await stopRoll();
						await speak("Down");
					}
					
					
					
					var d1 = getDistance();
					await rawMotor(-speed,-speed,realTime);
					var d2 = getDistance();
					
					//await stopRoll();
					//await speak(Math.round(d2-d1).toString());
				}
				
				//console.log(result);
				//umesto ovog console log treba proci i slati robotu uputstva

			}
			
			
			


				

	async function rotation(newMovement){
		
		//await speak("Rotation");
		
		if(lastMovement != -1){
			
			//await speak("Second time");
			
			var nextAngle = newMovement - lastMovement;
			
			//await speak ("Pitch : " + getOrientation().pitch.toString());
			//await speak ("Roll : " + getOrientation().roll.toString());
			
			
			
			
			await spin(nextAngle, 0.7);
			//await delay(1);
			//await set
			
			//await speak("GIT GUD");
			//await stopRoll();
			lastMovement = newMovement;
			//await speak("GIT GUD 2");
		}else{
			lastMovement = newMovement;
		}
	
	}

			

		async function traverse(maze,column, row) {
				
				
				
				if(maze[column][row] == 2) {
					
					await rawMotor(-speed,-speed,realTime);
					await rawMotor(-speed,-speed,realTime);
					await rawMotor(-speed,-speed,realTime);
					
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

			