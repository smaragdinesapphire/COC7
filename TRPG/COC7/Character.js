(function() {
	function Characteristics() {
		this.age = 15;
		this.str = 3;
		this.con = 3;
		this.dex = 3;
		this.app = 3;
		this.pow = 3;
		this.siz = 2;
		this.Int = 2;
		this.edu = 2;
		this.luk = 3;
	};
		
	function check(condition,message) {
		this.condition = condition;
		this.message = message;
	};
	
	var CharacteristicsManager = (function() {
				
		var characteristicsInput = new Characteristics();
		
		var characteristicsFinal = new Characteristics();
		characteristicsFinal.san = null;
		characteristicsFinal.mp = null;
		characteristicsFinal.hp = null;
		characteristicsFinal.mov = null;
		characteristicsFinal.db = null;
		characteristicsFinal.build = null;
		
		
		//將輸入資料轉為輸出資料
		var transform = function() {
			characteristicsFinal.str = parseInt(characteristicsInput.str)*5;
			characteristicsFinal.con = parseInt(characteristicsInput.con)*5;
			characteristicsFinal.dex = parseInt(characteristicsInput.dex)*5;
			characteristicsFinal.app = parseInt(characteristicsInput.app)*5;
			characteristicsFinal.pow = parseInt(characteristicsInput.pow)*5;
			characteristicsFinal.siz = (parseInt(characteristicsInput.siz)+6)*5;
			characteristicsFinal.Int = (parseInt(characteristicsInput.Int)+6)*5;
			characteristicsFinal.edu = (parseInt(characteristicsInput.edu)+6)*5;
			characteristicsFinal.luk = parseInt(characteristicsInput.luk)*5;
		};
		
		var characterModifier = function(modifier) {
			for (var key in modifier){	//將字串轉數字
				if (key == "edu") for (var i=0;i<4;i++) modifier.edu[i] = parseInt(modifier.edu[i]);
				else if (key == "eduCheck") for (var i=0;i<4;i++) modifier.eduCheck[i] = parseInt(modifier.eduCheck[i]);
				else modifier[key] = parseInt(modifier[key]);
			}

			for (var i=0;i<4;i++){		//校正1D10 1D100為0
				if (modifier.edu[i]==0) modifier.edu[i] = 10;
				if (modifier.eduCheck[i]==0) modifier.eduCheck[i] = 100;
			}	
			if (characteristicsFinal.age<20) {
				characteristicsFinal.str-= modifier.str;
				characteristicsFinal.siz-= modifier.siz;
				characteristicsFinal.edu-= 5;
				if (characteristicsFinal.luk<modifier.luk*5) characteristicsFinal.luk = modifier.luk*5;
			} else if (characteristicsFinal.age<40) {
				if (characteristicsFinal.edu<modifier.eduCheck[0]) {
					if (modifier.edu[0]>-1)	characteristicsFinal.edu+= modifier.edu[0];
				}
			} else {
				characteristicsFinal.str-= modifier.str;
				characteristicsFinal.con-= modifier.con;
				characteristicsFinal.dex-= modifier.dex;
				
				if (characteristicsFinal.age<50) {
					for (var i=0;i<2;i++) {
						if (characteristicsFinal.edu<modifier.eduCheck[i]) {
							if (modifier.edu[i]>-1)	characteristicsFinal.edu+= modifier.edu[i];
						}
					}
				characteristicsFinal.app-= 5;
				} else if (characteristicsFinal.age<60) {
					for (var i=0;i<3;i++) {
						if (characteristicsFinal.edu<modifier.eduCheck[i]) {
							if (modifier.edu[i]>-1)	characteristicsFinal.edu+= modifier.edu[i];
						}
					}
					characteristicsFinal.app-= 10;
				} else {
					for (var i=0;i<4;i++) {
						if (characteristicsFinal.edu<modifier.eduCheck[i]) {
							if (modifier.edu[i]>-1)	characteristicsFinal.edu+= modifier.edu[i];
							// console.log(modifier.edu)
						}
					}
					if (characteristicsFinal.age<70) characteristicsFinal.app-= 15;
					else if (characteristicsFinal.age<80) characteristicsFinal.app-= 20;
					else characteristicsFinal.app-= 25;
					
				}
			}
			if (characteristicsFinal.edu>99) characteristicsFinal.edu = 99;
			if (characteristicsFinal.app < 0) characteristicsFinal.app = 0;
			// if (characteristicsFinal.app<0) return "APP低於0，請更改年紀"
			
		};
		
		var calculateSMH = function() {
			characteristicsFinal.san = characteristicsFinal.pow;
			characteristicsFinal.mp = Math.floor(characteristicsFinal.pow/5);
			characteristicsFinal.hp = Math.floor((characteristicsFinal.siz+characteristicsFinal.con)/10);
		};
		
		var calculateMov = function() {
			if(characteristicsFinal.dex<characteristicsFinal.siz && characteristicsFinal.str<characteristicsFinal.siz) {
				characteristicsFinal.mov = 7;
			} else if (characteristicsFinal.dex>characteristicsFinal.siz && characteristicsFinal.str>characteristicsFinal.siz) {
				characteristicsFinal.mov = 9;
			} else {
			characteristicsFinal.mov = 8;
			}
			
			var temp = 40;
			for (var i=0;i<5;i++) {
				if (characteristicsFinal.age >= temp && characteristicsFinal.age < temp+10) characteristicsFinal.mov -= (i+1);
				temp += 10;
				
			}
		};
		
		var calculatePI = function() {
			characteristicsFinal.pi = characteristicsFinal.Int*2;
		}
		
		var calculateDodge = function() {
			characteristicsFinal.dodge = Math.floor(characteristicsFinal.dex/2);
		}
		
		var calculateDB_Build = function() {
			var total = characteristicsFinal.str + characteristicsFinal.siz;
			if (total<65) {
				characteristicsFinal.db = "-2";
				characteristicsFinal.build = "-2";
			} else if (total<85) {
				characteristicsFinal.db = "-1";
				characteristicsFinal.build = "-1";
			} else if (total<125) {
				characteristicsFinal.db = "0";
				characteristicsFinal.build = "0";
			} else if (total<165) {
				characteristicsFinal.db = "+1D4";
				characteristicsFinal.build = "1";
			} else {
				characteristicsFinal.db = "+1D6";
				characteristicsFinal.build = "2";
			}
		};

		
		return{
			random: function() {
				characteristicsInput.str = Math.floor(Math.random()*(18-3+1)+3);
				characteristicsInput.con = Math.floor(Math.random()*(18-3+1)+3);
				characteristicsInput.dex = Math.floor(Math.random()*(18-3+1)+3);
				characteristicsInput.app = Math.floor(Math.random()*(18-3+1)+3);
				characteristicsInput.pow = Math.floor(Math.random()*(18-3+1)+3);
				characteristicsInput.siz = Math.floor(Math.random()*(12-2+1)+2);
				characteristicsInput.Int = Math.floor(Math.random()*(12-2+1)+2);
				characteristicsInput.edu = Math.floor(Math.random()*(12-2+1)+2);
				characteristicsInput.luk = Math.floor(Math.random()*(18-3+1)+3);
				// characteristicsInput.age = Math.floor(Math.random()*(89-15+1)+15)
			},
			keyInAge: function(age) {
				characteristicsInput.age = age;
				characteristicsFinal.age = age;
			},
			keyInCharacteristics: function(inData) {
				characteristicsInput.str = inData.str;
				characteristicsInput.con = inData.con;
				characteristicsInput.dex = inData.dex;
				characteristicsInput.app = inData.app;
				characteristicsInput.pow = inData.pow;
				characteristicsInput.siz = inData.siz;
				characteristicsInput.Int = inData.Int;
				characteristicsInput.edu = inData.edu;
				characteristicsInput.luk = inData.luk;
			},
			listInput: function() {
				return characteristicsInput;
			},
			listFinal: function() {
				return characteristicsFinal;
			},
			transform: function() {
				transform();
			},
			modifier: function(modifierSCDE) {	//檢查修正是否正確
					characterModifier(modifierSCDE);
			},
			calculateOther: function() {
				calculateSMH();
				calculateMov();
				calculateDB_Build();
				calculateDodge();
				calculatePI();
			}
			
		};
	})();
	
	window.Character = {
		CharacteristicsManager: CharacteristicsManager		
	};
	
})();