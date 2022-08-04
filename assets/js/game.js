// function to generate a random numeric value
var randomNumber = function(min, max) {
	var value = Math.floor(Math.random() * (max - min + 1)) + min;
	
	return value;

};

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
	while(enemy.health > 0 && enemy.health > 0) {
		// ask player if they'd like to fight or run	
		var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
	
		// if player picks "skip" confirm and then stop the loop
		if (promptFight === "skip" || promptFight === "SKIP") {
			// confirm player wants to skip
			var confirmSkip = window.confirm("Are you sure you'd like to quit?");
			
			// if yes (true), leave fight
			if (confirmSkip) {
				window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
				// subtract money from playerInfo.money for skipping
				playerInfo.money = playerInfo.money - 10;
				console.log("playerInfo.money", playerInfo.money);
				break;
			}
		}
		
			// generate random damage value based on player's attack power
			var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
			
			enemy.health = Math.max(0, enemy.health - damage);
			console.log(
				playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
			);
		
			// check enemy's health
		if (enemy.health <= 0) {
				window.alert(enemy.name + " has died!");
			
			// aware player money for winning
			playerInfo.money = Math.max(0, playerInfo.money + 10);
			// leave while() loop since enemy is dead
			break;
		} else {
			window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
		}
			
		// generate random damage value based on player's attack power
		var damamge = randomNumber(enemy.attack - 3, enemy.attack);
		
		playerInfo.health = Math.max(0, playerInfo.health - damage);
		console.log(
			enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
		);
	
		// check player's health
		if (playerInfo.health <= 0) {
			window.alert(playerInfo.name + " has died!");
			// leave while() loop if player is dead
			break;
		} else {
			window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
		}
		
	} // end of while loop
}; // end of fight function

// function to start a new game
var startGame = function() {
	// reset player stats
	playerInfo.reset();

	// fight each enemy-robot by looping over them and fighting them one at a time
	for(var i = 0; i < enemyInfo.length; i++) {
		// if player is still alive, keep fighting
		if (playerInfo.health > 0) {
			// let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
			window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
		
			// pick new enemy to fight based on the index of the enemyNames array
			var pickedEnemyObj = enemyInfo[i];
		
			// reset enemyHealth before starting new fight
			pickedEnemyObj = randomNumber(40, 60);
		
			// use debugger to pause script from running and check what's going on at that moment in the code
			// debugger;
		
			//pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
			fight(pickedEnemyObj);
			
			// if player is still alive and we're not at the last enemy in the array
			if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
				// ask if player wants to use the store before next round
				var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
				
				//if yes, take them to the store() function 
				if (storeConfirm) {
					shop();
				}			
			}
		} 
		// if player isn't alive, stop the game
		else {
			window.alert("You have lost your robot in battle! Game Over!");
			break;
		}
	} // end main for loop
	
	// play again
	endGame();
}; // end startGame function

// function to end the entire game
var endGame = function() {
	window.alert("The game has now ended. Let's see how you did!");
	
	// if player is still alive, player wins!
	if (playerInfo.health > 0) {
		window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".")
	} 
	else {
		window.alert("The game has now ended. Let's see how you did!")
	}
	
	// ask player if they'd like to play again
	var playAgainConfirm = window.confirm("Would you like to play again?");
	
	if (playAgainConfirm) {
		//restart the game
		startGame();
	} else {
		window.alert("Thank you for playing Robot Gladiators! Come back soon!");
	}
};

// function to add a shopping to the game
var shop = function() {
	// ask player what they'd like to do
	var shopOptionPrompt = window.prompt(
		"Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
	);
	
	// use switch to carry out action
	switch (shopOptionPrompt) {
		case "refill": // new case
		case "REFILL":
			playerInfo.refillHealth();
			break;
		case "upgrade": // new case
		case "UPGRADE":
			playerInfo.upgradeAttack();
			break;
		case "leave": // new case
		case "lEAVE":
			window.alert("Leaving the store.");

			// do nothing, so function will end
			break;
		default:
			window.alert("You did not pick a valid option. Try again.");

			// call shop() again to force player to pick a valid option
			shop();
			break;
	} // end of switch statement
}; // end of shop function	


// function to set name
var getPlayerName = function() {
	var name = "";
	while(name === "" || name === null) {
		name = prompt("What is your robot's name?");
	}
console.log("Your robot's name is " + name);
	return name;

};


/* GAME INFORMATION / VARIABLES */
var playerInfo = {
	name: getPlayerName(),
	health: 100,
	attack: 10,
	money: 10,
	reset: function() {
		this.health = 100;
		this.money = 10;
		this.attack = 10;
	},
	refillHealth: function() {
		if (this.money >= 7) {
		window.alert("Refilling player's health by 20 for 7 dollars");
			this.health += 20;
			this.money -= 7;
		}
		else {
			window.alert("You don't have enough money!");
		}
	},
	upgradeAttack: function() {
		if (this.money >= 7) {
			window.alert("Upgrading player's attack by 6 for 7 dollars");
			this.attack += 6
			this.money -= 7;
		}
		else {
			window.alert("You don't have enough money!");
		}	
	}
};


// enemy information
var enemyInfo = [
	{ name: "Roborto",
		attack: randomNumber(10, 14)
	},
	{ name: "Amy Android",
		attack: randomNumber(10, 14)
	},
	{ name: "Robo Trumble",
		attack: randomNumber(10, 14)
	}
];


console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);
/* provide variable information at the end of the game */


// start the game when the page loads
startGame();


