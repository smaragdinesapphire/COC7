(function(){
	
	var dataBase = function(point){
		this.normalPoint = point;
		this.hardPoint = Math.floor(point/2);
		this.varyHardPoint = Math.floor(point/5);
	}
	
	var character = {
		str: null,
		con: null,
		dex: null,
		app: null,
		pow: null,
		siz: null,
		Int: null,
		edu: null
	}
	
	function characterTransform(list){
		character.str = new dataBase(list.str);
		character.con = new dataBase(list.con);
		character.siz = new dataBase(list.siz);
		character.dex = new dataBase(list.dex);
		character.app = new dataBase(list.app);
		character.edu = new dataBase(list.edu);
		character.Int = new dataBase(list.Int);
		character.pow = new dataBase(list.pow);
		
	}
	
	
	var check = function(list){
		for (var i=0;i<list.length;i++){
			if (list[i].total>99 || list[i].total<0){
				return "' "+list[i].name + " '數值錯誤，該數值總值需0~99"
			}
		}
	} 
	
	var skill = Array(60);
	function skillTransform(list){
		for (var i=0;i<60;i++) {
			skill[i] = new dataBase(list[i].total);
		}
	}
	
	var FinalDataManager = (function() {
		

		
		return {
			inputCharacter: function(list){
				characterTransform(list);
			},
			characterList: function(){
				return character;
			},
			inputSkill: function(list){
				skillTransform(list);
			},
			skillList: function(){
				return skill;
			},
			check: function(list){
				return check(list);
			}
			
		};
	})();
	
	window.FinalData = {
		FinalDataManager: FinalDataManager		
	};
})();