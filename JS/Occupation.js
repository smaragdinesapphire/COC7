(function () {	
	// var skill = function(skill) {
		// this.normal = skill.normal;
		// this.choise = skill.choise;
		// this.anyOther = skill.anyOther;
	// };

	// var Occupation = function(occupationData) {
		// this.name = occupationData.name;
		// this.skill = new skill(occupationData.skill);
		// this.creditRating = occupationData.creditRating;
		// this.skillPoint = occupationData.SkillPoint;
	// };
	
	
	var occManu = Array(114);
	function occupation(name,pointType,creditRating,skill_I,skill_II,skill_III,skill_IV,skill_V){
		this.name = name;
		this.pointType = pointType;
		this.creditRating = creditRating;
		this.skill_I = skill_I;			//技能編號
		this.skill_II = skill_II;		//人際技能數
		this.skill_III = skill_III;		//個人專長數
		this.skill_IV = skill_IV;		//多選一
		this.skill_V = skill_V;			//自定義
	}
	//occManu[] = new occupation("",[""],[,],[],,,[],[]);
	occManu[0] = new occupation('會計師',['EDU'],[30,70],[0,31,32,33,41,49],0,1,[],[]);
	occManu[1] = new occupation('雜技演員',['EDU','DEX'],[9,20],[8,13,27,49,52,53],0,1,[],[]);
	occManu[2] = new occupation('機構探員',['EDU','STR','DEX'],[20,45],[18,31,32,43,50,54],1,0,[[1,21,22,23]],[]);
	occManu[3] = new occupation('精神病醫師',['EDU'],[10,60],[28,31,33,36,43,44,45,46],0,0,[],[45,'生物學',46,'化學']);
	occManu[4] = new occupation('動物訓練師',['EDU','APP','POW'],[10,40],[27,33,37,43,45,50,54],0,1,[],[45,'動物']);
	occManu[5] = new occupation('古物愛好者',['EDU'],[30,70],[2,4,25,28,32,49],1,1,[],[]);
	occManu[6] = new occupation('古董商',['EDU'],[30,50],[0,2,14,25,32,38],2,0,[],[]);
	occManu[7] = new occupation('考古學家',['EDU'],[10,40],[2,3,25,28,32,35,49],0,0,[[1,38,45]],[]);
	occManu[8] = new occupation('建築師',['EDU'],[30,70],[0,4,30,31,41,43,45],0,0,[[1,9,32]],[4,'繪圖技術',45,'數學']);
	occManu[9] = new occupation('藝術家',['EDU','DEX','POW'],[9,50],[4,28,43,49],1,1,[[1,25,37]],[]);
	occManu[10] = new occupation('杜鵑窩專員',['EDU','DEX','STR'],[8,20],[13,18,24,33,43,50],2,0,[],[]);
	occManu[11] = new occupation('刺客',['EDU','DEX','STR'],[30,60],[12,15,18,34,35,43,50],0,0,[[1,21,22,23]],[]);
	occManu[12] = new occupation('運動員',['EDU','DEX','STR'],[9,70],[8,18,27,52,53,55],1,1,[],[55,'騎術']);
	occManu[13] = new occupation('作家',['EDU'],[9,30],[4,25,28,30,32,43],0,1,[[1,37,39]],[4,'文學']);
	occManu[14] = new occupation('特技飛行員',['EDU'],[30,60],[0,15,33,35,38,42,49],0,1,[],[42,'飛機']);
	occManu[15] = new occupation('銀行搶匪',['EDU','STR','DEX'],[5,75],[14,18,26,34,40],0,1,[[1,15,35],[1,21,22,23]],[]);
	occManu[16] = new occupation('酒保',['EDU','APP'],[8,25],[0,18,33,43,49],2,1,[],[]);
	occManu[17] = new occupation('巨獸獵手',['EDU','DEX','STR'],[20,50],[37,38,50,54],0,0,[[1,21,22,23],[1,33,49],[1,28,51],[1,45,46]],[45,'生物學',46,'植物學']);
	occManu[18] = new occupation('書商',['EDU'],[20,40],[0,2,14,25,28,30,32],1,0,[],[]);
	occManu[19] = new occupation('不法買賣者/惡棍',['EDU','STR'],[5,30],[14,18,43,49,50],2,0,[[1,21,22,23]],[]);
	occManu[20] = new occupation('賞金獵人',['EDU','DEX','STR'],[9,30],[14,31,43,50,54],1,0,[[1,16,15],[1,18,21]],[]);
	occManu[21] = new occupation('拳擊手/摔角手',['EDU','STR'],[9,60],[13,18,26,27,43,49],0,1,[],[]);
	occManu[22] = new occupation('竊賊',['EDU','DEX'],[5,40],[2,8,33,34,48,49,50],0,0,[[1,15,35]],[]);
	occManu[23] = new occupation('執事/男侍/女僕',['EDU'],[9,40],[4,24,28,33,43,49],0,1,[[1,0,2]],[]);
	occManu[24] = new occupation('私人駕駛',['EDU','DEX'],[10,40],[14,33,35,38,49],2,1,[],[]);
	occManu[25] = new occupation('基督教牧師',['EDU'],[9,60],[0,25,28,32,33,43],1,1,[],[]);
	occManu[26] = new occupation('電腦工程師',['EDU'],[10,70],[9,15,16,32,45,49],0,1,[],[45,'數學']);
	occManu[27] = new occupation('詐欺師',['EDU','APP'],[10,65],[2,4,33,43,48],2,0,[[1,31,28]],[4,'表演']);
	occManu[28] = new occupation('牛仔',['EDU','DEX','STR'],[9,20],[13,27,51,53,54,55],0,0,[[1,18,21],[1,24,37]],[55,'騎術']);
	occManu[29] = new occupation('工匠',['EDU','DEX'],[10,40],[0,4,35,37,49],0,1,[],[]);
	occManu[30] = new occupation('犯罪者(個人)',['EDU','DEX','APP'],[5,65],[2,43,49,50],1,0,[[1,4,12],[1,18,21],[1,34,35]],[4,'表演']);
	occManu[31] = new occupation('宗教領袖',['EDU','APP'],[30,60],[0,39,43,49],2,1,[],[]);
	occManu[32] = new occupation('反洗腦專員',['EDU'],[20,50],[14,25,39,43,50],2,0,[[1,18,21]],[]);
	occManu[33] = new occupation('設計師',['EDU'],[20,60],[0,4,4,35,43,49],0,1,[[1,9,32]],[4,'照相']);
	occManu[34] = new occupation('業餘玩家',['EDU','APP'],[50,99],[4,28,55],1,1,[[1,21,22,23]],[55,'騎術']);
	occManu[35] = new occupation('潛水夫',['EDU','DEX'],[9,30],[24,35,42,45,49,52,55],0,1,[],[55,'潛水',42,'船隻',45,'生物學']);
	occManu[36] = new occupation('醫生',['EDU'],[30,60],[24,28,36,43,45,46],0,1,[],[28,'拉丁文',45,'生物學',46,'藥學']);
	occManu[37] = new occupation('流浪者',['EDU','APP','DEX','STR'],[0,5],[8,27,33,38,50],1,1,[],[]);
	occManu[38] = new occupation('司機',['EDU','DEX','STR'],[9,20],[0,14,33,35,38,43],1,1,[],[]);
	occManu[39] = new occupation('編輯',['EDU'],[10,30],[0,25,30,43,49],2,1,[],[]);
	occManu[40] = new occupation('民選官員',['EDU','APP'],[50,90],[7,25,26,30,33,41,43,55],0,0,[],[55,'話術']);
	occManu[41] = new occupation('工程師',['EDU'],[30,60],[4,15,32,35,40,45,46],0,1,[],[4,'繪圖技術',45,'工程學',46,'物理']);
	occManu[42] = new occupation('藝人',['EDU','APP'],[9,70],[4,12,33,43],2,1,[],[]);
	occManu[43] = new occupation('探險家',['EDU','APP','DEX','STR'],[55,80],[25,27,28,37,38,51],0,0,[[1,8,52],[1,21,22,23]],[]);
	occManu[44] = new occupation('農夫',['EDU','DEX','STR'],[9,30],[4,14,35,37,40,54],1,1,[],[4,'農業']);
	occManu[45] = new occupation('聯邦探員',['EDU'],[20,40],[14,18,31,41,49,50],0,1,[[1,21,22,23]],[]);
	occManu[46] = new occupation('贓物交易者',['EDU','APP'],[20,40],[0,2,4,25,32,49],1,1,[],[4,'偽造']);
	occManu[47] = new occupation('消防隊員',['EDU','DEX','STR'],[9,30],[8,13,14,24,27,35,40,53],0,0,[],[]);
	occManu[48] = new occupation('電影明星',['EDU','APP'],[20,90],[4,12,14,43],2,1,[],[4,'表演']);
	occManu[49] = new occupation('海外特派員/記者',['EDU'],[10,40],[25,28,30,33,43],2,1,[],[]);
	occManu[50] = new occupation('法醫',['EDU'],[40,60],[28,32,36,41,45,46,47,49],0,0,[],[28,'拉丁文',45,'生物學',46,'鑑識學',47,'藥學']);
	occManu[51] = new occupation('偽造犯',['EDU'],[20,60],[0,2,4,25,32,48,49],0,1,[],[4,'偽造']);
	occManu[52] = new occupation('賭徒',['EDU','APP','DEX'],[9,20],[14,18,43],2,1,[[1,21,22,23]],[]);
	occManu[53] = new occupation('幫派老大',['EDU','APP'],[60,95],[18,31,33,43,49],2,0,[[1,21,22,23]],[]);
	occManu[54] = new occupation('幫派走卒',['EDU','DEX','STR'],[9,20],[14,18,43],2,1,[[1,21,22,23]],[]);
	occManu[55] = new occupation('幫派女匪',['EDU','APP'],[10,80],[4,14,33,50],2,1,[[1,18,21]],[]);
	occManu[56] = new occupation('紳士/女士',['EDU','APP'],[40,90],[4,22,25,28,38,55],2,0,[],[55,'騎術']);
	occManu[57] = new occupation('駭客',['EDU'],[10,70],[9,15,16,32,49],1,1,[],[]);
	occManu[58] = new occupation('流浪漢',['EDU','APP','DEX'],[0,5],[4,8,27,33,38,50],0,1,[[1,34,48]],[]);
	occManu[59] = new occupation('醫院人員',['EDU','STR'],[6,15],[15,18,24,33,35,43,50],1,0,[],[]);
	occManu[60] = new occupation('文字記者',['EDU'],[9,30],[25,30,32,43],1,1,[[1,4,5]],[4,'藝術',5,'照像']);
	occManu[61] = new occupation('法官',['EDU'],[50,80],[25,26,30,31,32,33,41,43],0,0,[],[]);
	occManu[62] = new occupation('實驗室助理',['EDU'],[10,30],[15,28,45,46,49],0,1,[[1,9,32]],[45,'化學']);
	occManu[63] = new occupation('雜工',['EDU','DEX','STR'],[9,30],[14,15,18,24,35,40,53],0,1,[],[]);
	occManu[64] = new occupation('律師',['EDU'],[30,80],[0,31,32,43],2,1,[],[]);
	occManu[65] = new occupation('圖書館員',['EDU'],[9,35],[0,28,30,32],0,1,[],[]);
	occManu[66] = new occupation('樵子',['EDU','DEX','STR'],[9,30],[8,13,18,24,27,35,53],0,0,[[1,37,45,46]],[18,'鍊鋸',45,'生物學',46,'植物學']);
	occManu[67] = new occupation('技工/技師',['EDU'],[9,40],[8,14,15,35,40],0,1,[[1,4,5,6]],[4,'木匠',5,'焊接',6,'管線工']);
	occManu[68] = new occupation('軍官',['EDU','DEX','STR'],[20,70],[0,24,38,43],2,1,[[1,21,22,23]],[]);
	occManu[69] = new occupation('礦工',['EDU','DEX','STR'],[9,30],[8,27,35,40,45,49,50],0,1,[],[45,'地質學']);
	occManu[70] = new occupation('傳教士',['EDU','APP'],[0,30],[4,24,35,36,37],1,1,[],[]);
	occManu[71] = new occupation('登山家',['EDU','DEX','STR'],[30,60],[8,24,27,28,33,38,51,54],0,0,[],[51,'阿爾卑斯山之類的']);
	occManu[72] = new occupation('策展人',['EDU'],[10,30],[0,2,3,25,28,32,39,49],0,0,[],[]);
	occManu[73] = new occupation('音樂家',['EDU','APP','DEX'],[9,30],[4,33,43],1,1,[],[4,'樂器']);
	occManu[74] = new occupation('護理師/護士',['EDU'],[9,30],[24,33,36,45,46,49],1,0,[],[45,'生物學',46,'化學']);
	occManu[75] = new occupation('神祕學家',['EDU'],[9,65],[1,25,28,32,39,45],1,1,[],[45,'天文學']);
	occManu[76] = new occupation('戶外生活者',['EDU','DEX','STR'],[5,20],[24,33,37,38,49,51,54],0,0,[[1,21,22,23]],[]);
	occManu[77] = new occupation('通靈學家',['EDU'],[9,30],[1,4,25,28,32,39,43],0,1,[],[4,'照相']);
	occManu[78] = new occupation('藥劑師',['EDU'],[35,75],[0,24,28,32,43,45,46],1,0,[],[28,'拉丁文',45,'藥學',46,'化學']);
	occManu[79] = new occupation('攝影師',['EDU'],[9,30],[4,43,45,49,50],1,1,[],[4,'照相',45,'化學']);
	occManu[80] = new occupation('攝影記者',['EDU'],[10,30],[4,8,28,43,45],1,1,[],[4,'照相',45,'化學']);
	occManu[81] = new occupation('飛行員',['EDU','DEX'],[20,70],[15,35,38,40,42,45],0,1,[],[42,'飛機',45,'天文學']);
	occManu[82] = new occupation('警探',['EDU','DEX','STR'],[20,50],[31,33,43,49],1,1,[[1,4,12],[1,21,22,23]],[4,'表演']);
	occManu[83] = new occupation('制服警察',['EDU','DEX','STR'],[9,30],[18,24,31,43,49],1,0,[[1,21,22,23],[1,14,55]],[55,'騎術']);
	occManu[84] = new occupation('私家偵探',['EDU','DEX','STR'],[9,30],[4,12,31,32,43,49],1,0,[[1,9,34,18,21]],[4,'照相']);
	occManu[85] = new occupation('教授',['EDU'],[20,70],[28,30,32,43],0,1,[],[]);
	occManu[86] = new occupation('探勘者',['EDU','DEX','STR'],[0,10],[8,24,25,35,38,45,49],0,1,[],[45,'地質']);
	occManu[87] = new occupation('娼妓',['EDU','APP'],[5,50],[4,13,43,48,50],2,1,[],[]);
	occManu[88] = new occupation('心理治療師',['EDU'],[30,80],[28,33,36,41,43,44,45,46],0,0,[],[45,'生物學',46,'化學']);
	occManu[89] = new occupation('心理學家/精神分析師',['EDU'],[10,40],[0,32,33,41,43,44],0,1,[],[]);
	occManu[90] = new occupation('記者',['EDU'],[9,30],[4,25,30,33,43,49,50],1,0,[],[4,'表演']);
	occManu[91] = new occupation('研究者',['EDU'],[9,30],[25,28,32,49],1,1,[],[]);
	occManu[92] = new occupation('海軍水手',['EDU','DEX','STR'],[9,30],[18,24,38,42,51,52],0,0,[[1,15,35],[1,21,22,23]],[42,'船',51,'海']);
	occManu[93] = new occupation('商船水手',['EDU','DEX','STR'],[20,40],[24,35,37,38,42,49,52],1,0,[],[42,'船']);
	occManu[94] = new occupation('銷售員',['EDU','APP'],[9,40],[0,14,33,43],2,1,[[1,50,48]],[]);
	occManu[95] = new occupation('科學家',['EDU'],[9,50],[28,30,45,49],1,0,[[1,9,32]],[]);
	occManu[96] = new occupation('秘書',['EDU','DEX','APP'],[9,30],[0,30,43],2,1,[[1,4,5],[1,32,9]],[4,'打字',5,'速記']);
	occManu[97] = new occupation('店長',['EDU','APP','DEX'],[20,40],[0,15,33,35,43,49],2,0,[],[]);
	occManu[98] = new occupation('走私商',['EDU','APP','DEX'],[20,60],[33,38,43,48,49],1,0,[[1,21,22,23],[1,14,42,42]],[42,'飛機',42,'船']);
	occManu[99] = new occupation('士兵/海軍',['EDU','DEX','STR'],[9,30],[13,18,50,51],0,0,[[1,8,52],[1,21,22,23],[2,24,35,28]],[]);
	occManu[100] = new occupation('間諜',['EDU','APP','DEX'],[20,60],[28,33,43,48,50],1,0,[[1,4,12],[1,21,22,23]],[4,'表演']);
	occManu[101] = new occupation('舞台演員',['EDU','APP'],[9,40],[4,12,18,25,43],2,1,[],[4,'表演']);
	occManu[102] = new occupation('街頭痞子',['EDU','DEX','STR'],[3,10],[8,18,27,48,50,53],1,0,[[1,21,22,23]],[]);
	occManu[103] = new occupation('學生/實習生',['EDU'],[5,10],[32,33],0,1,[[1,55,28]],[55,'母語']);
	occManu[104] = new occupation('替身演員',['EDU','DEX','STR'],[10,50],[8,13,18,24,27,52],0,0,[[1,15,35],[1,55,14,42,56]],[55,'潛水',56,'騎術']);
	occManu[105] = new occupation('計程車司機',['EDU','DEX'],[9,30],[0,14,15,35,38,49,55],0,1,[],[55,'話術']);
	occManu[106] = new occupation('部落成員',['EDU','DEX','STR'],[5,10],[8,33,37,39,49,51,52],0,0,[[1,18,53]],[]);
	occManu[107] = new occupation('殯塟業者',['EDU'],[20,40],[0,14,25,39,43,45,46],1,0,[],[45,'生物學',46,'化學']);
	occManu[108] = new occupation('工會份子',['EDU'],[5,30],[0,18,31,33,40,43],2,0,[],[]);
	occManu[109] = new occupation('服務生',['EDU','APP','DEX'],[9,20],[0,4,13,33,43],2,1,[],[]);
	occManu[110] = new occupation('白領職員/行政',['EDU'],[9,20],[0,30,31,33],1,1,[[1,32,9]],[]);
	occManu[111] = new occupation('白領中高階主管',['EDU'],[20,80],[0,28,31,43],2,1,[],[]);
	occManu[112] = new occupation('狂信者',['EDU','APP','POW'],[0,30],[25,43,50],2,1,[],[]);
	occManu[113] = new occupation('動物園員工',['EDU'],[9,40],[0,13,24,36,37,45,46,55],0,0,[],[55,'掌控動物',45,'藥學',46,'動物學']);
	
	var OccupationManager = (function() {
		return {
			list: function(i){
				return occManu[i];
			}
		}
	})();
	
	
	window.Occupation = {
		OccupationManager: OccupationManager
	};
})();