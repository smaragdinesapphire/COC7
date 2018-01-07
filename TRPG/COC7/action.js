$(function(){
	//------------------取得屬性輸入的值--------------------
	var property={
		str: 0,
		dex: 0,
		con: 0,
		edu: 0,
		Int: 0,
		siz: 0,
		luk: 0,
		pow: 0,
		app: 0,
		age: 0,
	};
	function modifier (){
		this.str=0;
		this.dex=0;
		this.con=0;
		this.siz=0;
		this.edu = [-1,-1,-1,-1];		//EDU成長
		this.eduCheck = [-1,-1,-1,-1]; 	//EDU檢測
	}
	var newModifier = new modifier();
	// var propertyTran;
	// var PJ=0;
	var times = 3;	//隨機次數
	var error = false;  //錯誤紀錄
	
	var inMas = ['#inSTR',"#inDEX","#inINT","#inCON","#inAPP","#inPOW","#inSIZ","#inEDU","#inLUK"]; //輸入數值ID
	var mas = ['str','dex','Int','con','app','pow','siz','edu','luk'];
	var mas2 = ['hp','mp','san','mov','db','build'];
	var proExplain = [	'肌肉強度，影響肌肉爆發力與負重能力。',
						'更快、更靈活、更好的肉體彈性。在戰鬥時，可以更快進行動作。',
						'學習、理解、分析資訊與解決難題的能力。影響到個人興趣的品質。',
						'健康、生命力與耐久力。影響對打擊、疾病、身體惡化的抵抗能力。',
						'既包括肉體吸引力，也包括人格。決定是否迷人討喜。影響到社交時的第一印象。',
						'意志力，對魔法的資質與抗性。影響到心智強度與魔法力多寡。',
						'身高體重的綜合。影響是否方便移動、穿梭，並對生命力與體格造成影響。',
						'擁有的正式知識的多寡。影響到該職業受到多少訓練與能力的好壞。',
						'代表這個人的運勢有多好。',
						'生命力的數值。數值越高即能承受更多傷害。初始HP範圍最大值為18。',
						'魔力的數值。使用咒語可能會減少MP值。',
						'心智可由以下特性來理解：\n認知彈性：San 值可以反應出，一個角色是不是能夠合理化它所經歷到的認知失調。\n安全感：一個 San 值越低的角色，會越輕易對於危險狀況無法理性行動。\n安定性：情緒化、歇斯底里、不可理喻、無法考慮更長遠的後果等',
						'在進行追擊戰時，MOV值越高表示該回合能行使的行動次數越多。\n壯年時期數值為7至9。',
						'該數值為赤手空拳的額外補正，其範圍為-2至1D6。',
						'依照不同的體格大小，將對於攻擊者行使策略(關節技、推走、掙脫...等)將有提升/降低難度。\n其範圍為-2至2'];
	var PJ = 0; //職業點數
	var Pi = 0; //興趣點數
	
	$(".inProQ").bind("click",function(){
		alert(proExplain[$(".inProQ").index(this)]);
	})
	
	for(var i=0;i<inMas.length;i++){ //手動輸入後顯示實際數值
		$(inMas[i]).bind("change",function(){
			if($(this).attr("class")==="D3") $(this).closest("div").next("div").html($(this).val()*5);
			else $(this).closest("div").next("div").html((parseInt($(this).val())+6)*5);
		})	
	}

	$("#random").bind("click",function(event){
		if (times-->0){
			Character.CharacteristicsManager.random();
			property = Character.CharacteristicsManager.listInput();
			$("#random").val("隨機("+times+")");
			
			for(var i=0;i<mas.length;i++){
				eval("$(inMas[i]).val(property."+mas[i]+")");
				if($(inMas[i]).attr("class")==="D3") $(inMas[i]).closest("div").next("div").html($(inMas[i]).val()*5);
				else $(inMas[i]).closest("div").next("div").html((parseInt($(inMas[i]).val())+6)*5);
			}
			
		}
	});
	
	
	$("#checkInPro").bind("click",function(){ //確認鈕
		// var inMas = ['#inSTR',"#inDEX","#inCON","#inEDU","#inINT","#inSIZ","#inPOW","#inAPP","#inLUK"]; //輸入數值ID
		for(var i=0;i<9;i++){
			if($(inMas[i]).val()==0){
				error = true;
				alert("你有數值尚未輸入，請重新檢查並輸入！");
				break
			}else{
				error = false;
				eval("property."+mas[i]+" = parseInt($(inMas[i]).val());")
			}
		}
		if(error==false){
			Character.CharacteristicsManager.keyInCharacteristics(property); //輸入至Character內
			$(".inputProperty").hide();
			Character.CharacteristicsManager.transform();
			$(".inputAge").show();
			window.document.body.scrollTop = 0;	//跑到頂端
		}
		
	});
	

	//========================== AGE =====================================

	//--------------基本能力參數(測試用)--------------
		// Character.CharacteristicsManager.random();
		// property = Character.CharacteristicsManager.listInput();
		// for(var i=0;i<mas.length;i++){
				// eval("$(inMas[i]).val(property."+mas[i]+")");
				// if($(inMas[i]).attr("class")==="D3") $(inMas[i]).closest("div").next("div").html($(inMas[i]).val()*5);
				// else $(inMas[i]).closest("div").next("div").html((parseInt($(inMas[i]).val())+6)*5);
		// }
		// Character.CharacteristicsManager.transform();
	//------------------------------------------------
	
	//顯示數值增減
	$("#dSTR").bind("change",function(){
		$("#outSTR2").html($("#outSTR").html()-$(this).val());
		$("#debuff").html(parseInt($("#dSTR").val())+parseInt($("#dCON").val())+parseInt($("#dDEX").val()));
	});
	$("#dCON").bind("change",function(){
		$("#outCON2").html($("#outCON").html()-$(this).val());
		$("#debuff").html(parseInt($("#dSTR").val())+parseInt($("#dCON").val())+parseInt($("#dDEX").val()));
	});
	$("#dDEX").bind("change",function(){
		$("#outDEX2").html($("#outDEX").html()-$(this).val());
		$("#debuff").html(parseInt($("#dSTR").val())+parseInt($("#dCON").val())+parseInt($("#dDEX").val()));
	});
	
	$("#checkInAge").bind("click",function(){	//先檢查, 後繼續
		var age = $("#inAGE").val();
		if(/^1/.test(age)){
			if($("#inLUK2").val()>0){
				if ($("input[type='radio']:checked").val()=='str') {
					newModifier.str=5;
					newModifier.luk=$("#inLUK2").val();
					ageEffNext();	//通往下一頁
				} else {
					newModifier.siz=5;
					newModifier.luk=$("#inLUK2").val();
					ageEffNext();	//通往下一頁
				}
				
			} else {
				alert("請檢查第二次輸入LUCK之欄位是否尚未輸入");
			}
		} else if (/^[23]/.test(age)){
			if ($("#ageT2 .D100").val()<0) alert("請檢查 EDU檢測 是否尚未輸入");
			else if ($("#ageT2 .D10").val()<0) alert("請檢查 EDU成長 是否尚未輸入");
			else {
				newModifier.eduCheck[0] = $("#ageT2 .D100").val();
				newModifier.edu[0] = $("#ageT2 .D10").val();
				ageEffNext();	//通往下一頁
			}
		} else if (/^[4-8]/.test(age)){
			if($('.ageIF').html()!==$('#debuff').html()) alert('請檢查減少之數值是否合計'+$('.ageIF').html()+'點');
			else if ($('#outSTR2').html()<0) alert("請檢查 STR剩餘數值 是否低於0");
			else if ($('#outCON2').html()<0) alert("請檢查 CON剩餘數值 是否低於0");
			else if	($('#outDEX2').html()<0) alert("請檢查 DEX剩餘數值 是否低於0");
			else if ($(".eduUP .D100:eq(0)").val()<0) alert("請檢查 1st檢測 是否尚未輸入");
			else if ($(".eduUP .D10:eq(0)").val()<0) alert("請檢查EDU 1st成長 是否尚未輸入");
			else if ($(".eduUP .D100:eq(1)").val()<0) alert("請檢查 2nd檢測 是否尚未輸入");
			else if ($(".eduUP .D10:eq(1)").val()<0) alert("請檢查EDU 2nd成長 是否尚未輸入");
			else {
				if(/^[5-8]/.test(age)) {
					if ($(".eduUP .D100:eq(2)").val()<0) alert("請檢查 3rd檢測 是否尚未輸入");
					else if ($(".eduUP .D10:eq(2)").val()<0) alert("請檢查EDU 3rd成長 是否尚未輸入");
					else if(/^[6-8]/.test(age)) {
						if ($(".eduUP .D100:eq(3)").val()<0) alert("請檢查 4nd檢測 是否尚未輸入");
						else if ($(".eduUP .D10:eq(3)").val()<0) alert("請檢查EDU 4nd成長 是否尚未輸入");
						else {		//6X-8X
							ageEffI();
							ageEffII();
							ageEffIII();
							ageEffNext();	//通往下一頁
						}
					} else {	//5X
						ageEffI();
						ageEffII();
						ageEffNext();	//通往下一頁
					}
				} else {	//4X
					ageEffI();
					ageEffNext();	//通往下一頁
				}
			}
		}
	});
	
	$(".inProQ2").bind("click",function(){
		alert(proExplain[$(".inProQ2").index(this)]);
	})
	
	Skill.SkillManager.firstSet(Character.CharacteristicsManager.listFinal());
	
	$(".O").bind("click",function(){
		$(".inputAge").hide();
		$(".finalProperty").hide();
		pointJob(0);
		$(".jobChoose").show();
		Pi = Character.CharacteristicsManager.listFinal().Int*2;
		$(".allPoint .lessPoint").html(Pi);
	});
	$(".X").bind("click",function(){
		$(".finalProperty").hide();
		$(".inputAge .body").show();
		newModifier = new modifier();
		for (var i=1;i<16;i++) $(".underblock .finalProperty .body .tr:eq("+i+") .td:eq(3)").html("");
		
	})
	
	function ageEffI(){
		newModifier.str = $("#dSTR").val();
		newModifier.con = $("#dCON").val();
		newModifier.dex = $("#dDEX").val();
		newModifier.eduCheck[0] = $(".eduUP .D100:eq(0)").val();
		newModifier.edu[0] = $(".eduUP .D10:eq(0)").val();
		newModifier.eduCheck[1] = $(".eduUP .D100:eq(1)").val();
		newModifier.edu[1] = $(".eduUP .D10:eq(1)").val();
	}
	function ageEffII(){
		newModifier.eduCheck[2] = $(".eduUP .D100:eq(2)").val();
		newModifier.edu[2] = $(".eduUP .D10:eq(2)").val();
	}
	function ageEffIII(){
		newModifier.eduCheck[3] = $(".eduUP .D100:eq(3)").val();
		newModifier.edu[3] = $(".eduUP .D10:eq(3)").val();
	}	
	
	function ageEffNext(){
		$(".inputAge .body").hide();
		$(".finalProperty").show();
		window.document.body.scrollTop = 0;	//跑到頂端
		//AGE補正前
		Character.CharacteristicsManager.transform();
		Character.CharacteristicsManager.calculateOther();
		for (var i=0;i<mas.length;i++){
			eval("$('.finalProperty .tr:eq("+(i+1)+") .td:eq(2)').html(Character.CharacteristicsManager.listFinal()."+mas[i]+");");
		}
		for (var i=mas.length;i<mas2.length+mas.length;i++){
			eval("$('.finalProperty .tr:eq("+(i+1)+") .td:eq(2)').html(Character.CharacteristicsManager.listFinal()."+mas2[i-mas.length]+");");
		}
		
		//AGE補正後
		Character.CharacteristicsManager.keyInAge($("#inAGE").val());   //放到確認送出
		Character.CharacteristicsManager.modifier(newModifier);
		Character.CharacteristicsManager.calculateOther();
		for (var i=0;i<mas.length;i++){
			eval("$('.finalProperty .tr:eq("+(i+1)+") .td:eq(4)').html(Character.CharacteristicsManager.listFinal()."+mas[i]+");");
		}
		for (var i=mas.length;i<mas2.length+mas.length;i++){
			eval("$('.finalProperty .tr:eq("+(i+1)+") .td:eq(4)').html(Character.CharacteristicsManager.listFinal()."+mas2[i-mas.length]+");");
		}
		for (var i=0;i<mas2.length+mas.length;i++){
			if ($(".finalProperty .tr:eq("+(i+1)+") .td:eq(4)").html()!=$(".finalProperty .tr:eq("+(i+1)+") .td:eq(2)").html()) $(".finalProperty .tr:eq("+(i+1)+") .td:eq(3)").html(">>>");
		}
		
	}
	

	//======================== Jobs Choose================================
	$('.LRButton').bind('click',function(){
		if($('.LRButton').index(this)){
			if ($(".job").val()<113)	$(".job").val(parseInt($(".job").val())+1);
		} else {
			if ($(".job").val()>0)	$(".job").val($(".job").val()-1);
		}
		PJ = pointJob($(".job").val());
	})
	
	$('.job').bind('change',function(event){
		PJ = pointJob($(this).val());
	});
	$('.jobChooseQ').bind('click',function(){
		var explain = [	'這表現了探索者的富裕程度與金融信度。有錢能使鬼推磨；\n如果探索者嘗試用他的金融地位去達到目標，則使用此技能。\n信用評級可取代 APP 來給予第一印象。',
						'分配到職業技能的點數，不同職業及角色能力將會影響職業點數的多寡。',
						'職業技能為該職業之專業領域，僅能用職業點數去強化。'];
		alert(explain[$('.jobChooseQ').index(this)]);
	})
	
	
	
		//======================== Jobs Point================================
	$('.jobChooseCheck').bind("click",function(){
		
		$(".jobChoose").hide();
		$(".jobPoint").show();
		PJ = pointJob($(".job").val());
		
		
		
		Skill.SkillManager.firstSet(Character.CharacteristicsManager.listFinal());
		var job = Occupation.OccupationManager.list($(".job").val());
		for (var i=0;i<job.skill_V.length/2;i++){
			Skill.SkillManager.updateSub(job.skill_V[i*2],job.skill_V[i*2+1]);
		}
		
		$(this).queue("jobExplain",[
			function(){
				// $('.jobChoose').hide();
				// var job = Occupation.OccupationManager.list($(".job").val());
				$(".createRate").html(function(){
					return "(" + job.creditRating[0]+" ~ "+job.creditRating[1] +")"
				})
				for(var i=job.creditRating[0];i<=job.creditRating[1];i++){		//信譽評價之select
					$("#jobCreate").append("<option value=" + i + ">" + i + "</option>");
				}
				$(".jobPoint .lessPoint").html(PJ-$("#jobCreate").val());
				
				$(".norPoint .table").append(	//一般職業技能
					"<div class='tr'>"+
						"<div class='td'>技能</div>"+
						"<div class='td'>說明</div>"+
						"<div class='td'>基礎+興趣</div>"+
						"<div class='td'>職業點數</div>"+
						"<div class='td'>總點數</div>"+
					"</div>"
				);
				for(var i=0;i<job.skill_I.length;i++){
					if (job.skill_V.indexOf(job.skill_I[i])!=-1){
						$(".norPoint .table").append(
							"<div class='tr'>"
							+"<div class='td'>"+Skill.SkillManager.list(job.skill_I[i]).name+"("+job.skill_V[job.skill_V.indexOf(job.skill_I[i])+1]+")</div>"
							+"<div class='td'><button>?</button></div>"
							+"<div class='td'>"+(Skill.SkillManager.list(job.skill_I[i]).basicPoint + Skill.SkillManager.list(job.skill_I[i]).allotPoint) +"</div>"
							+"<div class='td'><select class='D100_job'></select></div>"
							+"<div class='td'>"+Skill.SkillManager.list(job.skill_I[i]).total+"</div></div>"
						);

					} else if(Skill.SkillManager.userSkill().indexOf(job.skill_I[i])!=-1){

						$(".norPoint .table").append(
							"<div class='tr'>"
							+"<div class='td'>"+Skill.SkillManager.list(job.skill_I[i]).name+"<br/><input type='text' value="+Skill.SkillManager.list(job.skill_I[i]).subName+"></input></div>"
							+"<div class='td'><button>?</button></div>"
							+"<div class='td'>"+(Skill.SkillManager.list(job.skill_I[i]).basicPoint + Skill.SkillManager.list(job.skill_I[i]).allotPoint) +"</div>"
							+"<div class='td'><select class='D100_job'></select></div>"
							+"<div class='td'>"+Skill.SkillManager.list(job.skill_I[i]).total+"</div></div>"
						);
					} else {
						$(".norPoint .table").append(
							"<div class='tr'>"
							+"<div class='td'>"+Skill.SkillManager.list(job.skill_I[i]).name+"</div>"
							+"<div class='td'><button>?</button></div>"
							+"<div class='td'>"+(Skill.SkillManager.list(job.skill_I[i]).basicPoint + Skill.SkillManager.list(job.skill_I[i]).allotPoint) +"</div>"
							+"<div class='td'><select class='D100_job'></select></div>"
							+"<div class='td'>"+Skill.SkillManager.list(job.skill_I[i]).total+"</div></div>"
						);
					}
				}
				for(var i=0;i<100;i++){	//設定選擇範圍
					$(".D100_job").append("<option value=" + i + ">" + i + "</option>");	
				}
				$(".D100_job").bind("change",function(){
					$(".norPoint .table .tr:eq("+($(".D100_job").index(this)+1)+") .td:eq(4)").html(parseInt($(".norPoint .table .tr:eq("+($(".D100_job").index(this)+1)+") .td:eq(2)").html())+parseInt($(this).val()));
				})
				
				if(job.skill_II>0){	//人際技能
					$(".self").show();
					$(".self div .table").remove();
					var temp = 
						"<div class='table'>"
							+"<div class='tr'>"
								+"<div class='td'>技能</div>"
								+"<div class='td'>說明</div>"
								+"<div class='td'>基礎+興趣</div>"
								+"<div class='td'>職業點數</div>"
								+"<div class='td'>總點數</div>"
							+"</div>"
							+"<div class='tr'>"
								+"<div class='td'><select id='socialType1' class='socialType'>"
									+"<option value=7>魅力</option>"
									+"<option value=17>話術</option>"
									+"<option value=26>威脅</option>"
									+"<option value=41>說服</option>"
								+"</select></div>"
								+"<div class='td'><button>?</button></div>"
								+"<div class='td'>15</div>"
								+"<div class='td'>"
									+"<select id='socialPoint1' class='socialPoint'></select>"
								+"</div>"
								+"<div class='td'></div>"
							+"</div>";

					if (job.skill_II==2){
						temp +=
							"<div class='tr'>"
							+"<div class='td'><select id='socialType2' class='socialType'>"
								+"<option value=7>魅力</option>"
								+"<option value=17>話術</option>"
								+"<option value=26>威脅</option>"
								+"<option value=41>說服</option>"
							+"</select></div>"
							+"<div class='td'><button>?</button></div>"
							+"<div class='td'>5</div>" //基本+興趣
							+"<div class='td'><select id='socialPoint2' class='socialPoint'></select></div><div class='td'></div></div>";
					}
					temp += "</div>";
					$(".self div:eq(1)").append(temp);
					if (job.skill_II==2) {
						// $("#socialType1 option[value=17]").hide();
						// $("#socialType2 option[value=7]").hide();
						
						
						$("#socialType1 option").prop('disabled', false);
						$("#socialType2 option").prop('disabled', false);
						$("#socialType1 option[value=17]").prop('disabled', true);
						$("#socialType2 option[value=7]").prop('disabled', true);
						$("#socialType2")[0].selectedIndex = 1;
					}
					for(var i=0;i<100;i++){
						$(".socialPoint").append("<option value=" + i + ">" + i + "</option>");	
					}
					
					$(".self .tr:eq(1) .td:eq(4)").html(Skill.SkillManager.list(7).basicPoint+Skill.SkillManager.list($('#socialType1').val()).allotPoint);
					if (job.skill_II==2) $(".self .tr:eq(2) .td:eq(4)").html(Skill.SkillManager.list(17).basicPoint+Skill.SkillManager.list($('#socialType2').val()).allotPoint);
					
				} else $(".self").hide();
				
				$("#socialType1").bind("change",function(event){	//技能不重複
					if (job.skill_II==2) {
						// $("#socialType2 option").show();
						// $("#socialType2 option[value="+$('#socialType1').val()+"]").hide();
						$("#socialType2 option").prop('disabled', false);
						$("#socialType2 option[value="+$('#socialType1').val()+"]").prop('disabled', true);
						
					}
					$(".self .tr:eq(1) .td:eq(2)").html(Skill.SkillManager.list($(this).val()).basicPoint+Skill.SkillManager.list($(this).val()).allotPoint);
					$(".self .tr:eq(1) .td:eq(4)").html(parseInt($(".self .tr:eq(1) .td:eq(2)").html())+parseInt($(".socialPoint:eq(0)").val()));
				})
				$("#socialType2").bind("change",function(event){  	//技能不重複
					// $("#socialType1 option").show();
					// $("#socialType1 option[value="+$('#socialType2').val()+"]").hide();
					$("#socialType1 option").prop('disabled', false);
					$("#socialType1 option[value="+$('#socialType2').val()+"]").prop('disabled', true);
					$(".self .tr:eq(2) .td:eq(2)").html(Skill.SkillManager.list($(this).val()).basicPoint+Skill.SkillManager.list($(this).val()).allotPoint);
					$(".self .tr:eq(2) .td:eq(4)").html(parseInt($(".self .tr:eq(2) .td:eq(2)").html())+parseInt($(".socialPoint:eq(1)").val()));
				})
				$(".socialPoint").bind("change",function(){		//計算技能總數值
					$(this).closest("div").next("div").html(
						parseInt($(this).closest("div").prev("div").html())+
						parseInt($(this).val())
					);
				});
				
				
				for (var i=0;i<job.skill_IV.length;i++){
					$('.mulPoint').show();
					$('.mulPoint').append("<div>以下技能多選<span class='red'>"+job.skill_IV[i][0]+"</span><br />");
					var temp = "";
					
					temp += "<div class='table'>"+
								"<div class='tr'>"+
									"<div class='td'>技能</div>"+
									"<div class='td'>說明</div>"+
									"<div class='td'>基礎+興趣</div>"+
									"<div class='td'>職業點數</div>"+
									"<div class='td'>總點數</div>"+
								"</div>"+
								"<div class='tr'>"+
									"<div class='td'><select class='mulSkill'></select></div>"+
									"<div class='td'><button>?</button></div>"+
									"<div class='td'></div>"+
									"<div class='td'><select  class='D100'></select></div>"+
									"<div class='td'></div>"+
								"</div>"
					
					if (job.skill_IV[i][0]==2){
						temp += "<div class='tr'>"+
									"<div class='td'><select class='mulSkill'></select></div>"+
									"<div class='td'><button>?</button></div>"+
									"<div class='td'></div>"+
									"<div class='td'><select class='D100'></select></div>"+
									"<div class='td'></div>"+
								"</div>"
					}
					
					temp += "</div></div>";
					$('.mulPoint').append(temp);
					
					for (var j=1;j<job.skill_IV[i].length;j++){	//技能選單
						if (job.skill_V.indexOf(job.skill_IV[i][j])!=-1) $('.mulPoint .table:eq('+i+') .mulSkill').append("<option value="+job.skill_IV[i][j]+">"+Skill.SkillManager.list(job.skill_IV[i][j]).name+"("+job.skill_V[job.skill_V.indexOf(job.skill_IV[i][j])+1]+")"+"</option>");
						else if (Skill.SkillManager.list(job.skill_IV[i][j]).subName === "自定義") {
							$('.mulPoint .table:eq('+i+') .mulSkill').append("<option value="+job.skill_IV[i][j]+">"+Skill.SkillManager.list(job.skill_IV[i][j]).name+"("+Skill.SkillManager.list(job.skill_IV[i][j]).subName+")</option>");
							
						}
						else $('.mulPoint .table:eq('+i+') .mulSkill').append("<option value="+job.skill_IV[i][j]+">"+Skill.SkillManager.list(job.skill_IV[i][j]).name+"</option>");
					}
					
					
				}
				
				for (var i=0;i<100;i++){
					$(".mulPoint .D100").append("<option value="+i+">"+i+"</option>")
				}
				
				
				for(var i=0;i<$(".mulSkill").length;i++){	//基礎+興趣
					$(".mulSkill:eq("+i+")").closest("div.tr").children(".td:eq(2)").html(
						parseInt(Skill.SkillManager.list($(".mulSkill:eq("+i+")").val()).basicPoint)+parseInt(Skill.SkillManager.list($(".mulSkill:eq(0)").val()).allotPoint)
					);
					$(".mulSkill:eq("+i+")").closest("div.tr").children(".td:eq(4)").html(
						parseInt(Skill.SkillManager.list($(".mulSkill:eq("+i+")").val()).basicPoint)+parseInt(Skill.SkillManager.list($(".mulSkill:eq(0)").val()).allotPoint)
					);
				}
				
				$('.mulSkill').each(function(){ //事先顯示input
					mulSkillU(this,job);
				})
				$('.mulSkill').bind('change',function(){ //變更後顯示input
					mulSkillU(this,job);		
					$(this).closest("div.tr").children(".td:eq(2)").html(	//基礎+興趣部分
						parseInt(Skill.SkillManager.list($(this).val()).basicPoint)+parseInt(Skill.SkillManager.list($(this).val()).allotPoint)
					);
					$(this).closest("div.tr").children(".td:eq(4)").html(	//總和部分
						parseInt($(this).closest("div.tr").children(".td:eq(2)").html())+parseInt($(this).closest("div.tr").children(".td:eq(3)").children("select").val())
					);
					
					if (job.skill_III>0){	//個人專長技能band 
						var tempMul = [];	//紀錄多選技能
						for (var i=0;i<job.skill_IV.length;i++){
							for (var j=1;j<job.skill_IV[i].length;j++){
								tempMul.push(job.skill_IV[i][j]);
							}
						}
						for (var i=0;i<tempMul.length;i++){ //
							if ($('.mulSkill').val()==tempMul[i]) {
								$(".selfSkill option[value="+tempMul[i]+"]").prop("disabled",true);
							} else {
								$(".selfSkill option[value="+tempMul[i]+"]").prop("disabled",false);
							}
						}	
					}

				})
				$('.mulPoint .D100').bind('change',function(){
					$(this).closest("div.tr").children(".td:eq(4)").html(
						parseInt($(this).val())+parseInt($(this).closest("div.tr").children(".td:eq(2)").html())
					);
					
				})
				
				if ($('.job').val()==99){
					$('.mulPoint .table:eq(2) .mulSkill:eq(1) option:eq(0)').prop('disabled', true);
					$('.mulPoint .table:eq(2) .mulSkill:eq(1)').val(35);
					$('.mulPoint .table:eq(2) .mulSkill:eq(0) option:eq(1)').prop('disabled', true);
				}
					
				
				$('.mulPoint .table:eq(2) .mulSkill:eq(0)').bind('change',function(){ //變更後顯示input
					if ($('.job').val()==99){
						$('.mulPoint .table:eq(2) .mulSkill:eq(1) option').prop('disabled', false);
						$('.mulPoint .table:eq(2) .mulSkill:eq(1) option[value='+$(this).val()+']').prop('disabled', true);
					}	
				})
				$('.mulPoint .table:eq(2) .mulSkill:eq(1)').bind('change',function(){ //變更後顯示input
					if ($('.job').val()==99){
						$('.mulPoint .table:eq(2) .mulSkill:eq(0) option').prop('disabled', false);
						$('.mulPoint .table:eq(2) .mulSkill:eq(0) option[value='+$(this).val()+']').prop('disabled', true);
					}	
				})
				
				if(job.skill_III>0){	//個人專長區
					$('.selfInterested').show();
					var temp = "";
					temp = 	"<div class='table'>"+
								"<div class='tr'>"+
									"<div class='td'>技能</div>"+
									"<div class='td'>說明</div>"+
									"<div class='td'>基礎+興趣</div>"+
									"<div class='td'>職業點數</div>"+
									"<div class='td'>總點數</div>"+
								"</div>";
					for(var i=0;i<job.skill_III;i++){
						temp += "<div class='tr'>"+
									"<div class='td'><select class='selfSkill'></select></div>"+
									"<div class='td'><button>?</button></div>"+
									"<div class='td'>?</div>"+
									"<div class='td'><select class='selfPoint'></select></div>"+
									"<div class='td'>?</div>"+
								"</div>";
					}
					temp +="</div>";
					$(".selfInterested").append(temp);
					$('.selfSkill').append("<option value=-1>-請選擇-</option>");
					
					for (var i=0;i<60;i++) {
						if (Skill.SkillManager.userSkill().indexOf(i)!=-1){
							if (job.skill_V.indexOf(i)!=-1) $('.selfSkill').append("<option value="+i+">"+Skill.SkillManager.list(i).name+"("+job.skill_V[job.skill_V.indexOf(i)+1]+")</option>");
							else {
								$('.selfSkill').append("<option value="+i+">"+Skill.SkillManager.list(i).name+"("+Skill.SkillManager.list(i).subName+")</option>");
							}
						} else $('.selfSkill').append("<option value="+i+">"+Skill.SkillManager.list(i).name+"</option>");
						
					}
					$(".selfSkill option[value='11']").prop("disabled",true);
					
					var skillIndex = [];		//將重複出現的bin掉
					skillIndex = job.skill_I;		//一般技能
					if (job.skill_II>0){			//人際技能
						skillIndex.push(7);
						if (job.skill_II==2){
							skillIndex.push(17);
						}
					}
					if (job.skill_IV.length){
						for (var i=0;i<job.skill_IV.length;i++){
							skillIndex.push(job.skill_IV[i][1]);
						}
					}
					for(var i=0;i<skillIndex.length;i++){
						$('.selfSkill option[value='+skillIndex[i]+']').prop("disabled",true);
					}
					
					if (job.skill_II==1){
						
						$('.socialType').bind('change',function(){
							var tempSocial = [7,17,26,41];
							for (var i=0;i<tempSocial.length;i++){
								if ($('.socialType').val()==tempSocial[i]) {
									$(".selfSkill option[value="+tempSocial[i]+"]").prop("disabled",true);
								} else {
									$(".selfSkill option[value="+tempSocial[i]+"]").prop("disabled",false);
								}
							}
						});
					} else if (job.skill_II==2){
						$('.socialType').bind('change',function(){
							var tempSocial = [7,17,26,41];
							for (var i=0;i<tempSocial.length;i++){
								if ($('.socialType:eq(1)').val()==tempSocial[i] || $('.socialType:eq(1)').val()==tempSocial[i]) $(".selfSkill option[value="+$('.socialType').val()+"]").prop("disabled",true);
								else $(".selfSkill option[value="+$('.socialType').val()+"]").prop("disabled",false);
							}
						});
					}
					
					for (var i=0;i<100;i++){
						$(".selfPoint").append("<option value="+i+">"+i+"</option>");
					}
					$(".selfPoint").hide();
					$(".selfSkill").bind("change",function(){
						if ($(this).val()>=0) {
							$(this).closest(".tr").children(".td:eq(2)").html(Skill.SkillManager.list($(this).val()).basicPoint+Skill.SkillManager.list($(this).val()).allotPoint);
							$(this).closest(".tr").children(".td:eq(4)").html(parseInt($(this).closest(".tr").children(".td:eq(2)").html()) + parseInt($(".selfPoint:eq("+ $(".selfSkill").index(this) +")").val()));
							$(this).closest(".tr").children(".td:eq(3)").children(".selfPoint").show();
						} else {
							$(this).closest(".tr").children(".td:eq(2)").html("?");
							$(this).closest(".tr").children(".td:eq(4)").html("?");
							$(this).closest(".tr").children(".td:eq(3)").children(".selfPoint").val(0).hide();
							// $(this).closest(".tr").children(".td:eq(3)").children(".selfPoint").hide();
						}
						
						$(this).next(".selfInput").remove();
						if (Skill.SkillManager.userSkill().indexOf(parseInt($(this).val()))>=0){
							if (Skill.SkillManager.list($(this).val()).subName === "自定義")	$(this).after("<div class='selfInput'><input type='text' value= '自定義' /></div>");
							else if(job.skill_V.indexOf(parseInt($(this).val()))===-1){$(this).after("<div class='selfInput'><input type='text' value= "+Skill.SkillManager.list($(this).val()).subName+" /></div>");}
						}
					})
					$(".selfPoint").bind("change",function(){
						if ($(".selfSkill").val()>0) $(".selfSkill").closest(".tr").children(".td:eq(4)").html(parseInt($(".selfSkill").closest(".tr").children(".td:eq(2)").html()) + parseInt($(this).val()));
					})
				}
				$('.jobChooseCheck').dequeue("jobExplain");
			},
			
			function(){
				var job = Occupation.OccupationManager.list($(".job").val());
				$(".norPoint button").bind("click",function(){
					alert(Skill.SkillManager.list(job.skill_I[$(".norPoint button").index(this)]).explain);
				});	
				
				if(job.skill_II){
					$(".self button").bind("click",function(){
						alert(Skill.SkillManager.list($(this).closest(".td").prev(".td").children("select").val()).explain);
					});	
				}
				
				if(job.skill_IV.length){
					$(".mulPoint button").bind("click",function(){
						alert(Skill.SkillManager.list($(this).closest(".td").prev(".td").children("select").val()).explain);
					});	
				}
				
				if(job.skill_III){
					$(".selfInterested button").bind("click",function(){
						if ($(this).prev().children("select").val()==='-1'){
							alert("在此可以選擇非職業技能的任一技能，作為職業點數可以投資的對象。")
						} else {
							alert(Skill.SkillManager.list($(this).closest(".td").prev(".td").children("select").val()).explain);
						}
					});	
				}
				$("#jobCreate").bind('change',function(){
					usedPointLess();
				})
				$(".norPoint .D100_job").bind('change',function(){
					usedPointLess();
				});
				$(".selfInterested .selfPoint").bind('change',function(){
					usedPointLess();
				});
				$(".self .socialPoint").bind('change',function(){
					usedPointLess();
				});
				$(".mulPoint .D100").bind('change',function(){
					usedPointLess();
				});
			}
		])
		$('.jobChooseCheck').dequeue("jobExplain");
	});
	
	$(".createQ").bind("click",function(){	//信用評級的說明
		alert("這表現了探索者的富裕程度與金融信度。有錢能使鬼推磨；如果探索者嘗試用他的金融地位去達到目標，則使用此技能。信用評級可取代 APP 來給予第一印象。");
	});
	
	$(".jobPoint .button input:eq(0)").bind("click",function(){	//回上一頁
		$('.norPoint .table').children().remove();
		$('.selfInterested .table').remove();
		$('.self .table').remove();
		$('.mulPoint div').remove();
		
		$(".jobChoose").show();
		$(".self").hide();
		$(".selfInterested").hide();
		$(".mulPoint").hide();
		$(".jobPoint").hide();
		window.document.body.scrollTop = 0;	//跑到頂端
		Skill.SkillManager.reSkill();
	})
	
	$(".jobPoint .button input:eq(1)").bind("click",function(){	//重製職業點數
		$('#jobCreate').val($('#jobCreate option:first-child').val());
		$('.norPoint select').val(0);
		$('.selfInterested .selfPoint').val(0);
		$('.socialPoint').val(0);
		$('.mulPoint .D100').val(0);
		
		
		var temp = ['.norPoint','.selfInterested','.self','.mulPoint'];
		for (var j=0;j<temp.length;j++){
			for(var i=1;i<$(temp[j]+" .table .tr").length;i++){
				$(temp[j]+" .table .tr:eq("+i+") .td:eq(4)").html($(temp[j]+" .table .tr:eq("+i+") .td:eq(2)").html());
			}
		}
		$(".jobPoint .lessPoint").html(PJ-$("#jobCreate").val());
	});
	
	$(".jobPoint .button input:eq(2)").bind("click",function(){	//存下點數, 前往興趣點數
		var errFlag = false;
		for(var i=0;i<$(".norPoint .D100_job").length;i++){
			if ($(".norPoint .D100_job:eq("+i+")").closest('.td').next('div').html()>99){
				errFlag = true;
				break;
			}
		}
		if (errFlag==false){
			for(var i=0;i<$(".selfInterested .selfPoint").length;i++){
				if ($(".selfInterested .selfPoint:eq("+i+")").closest('.td').next('div').html()>99){
					errFlag = true;
					break;
				}
			}
		}
		if (errFlag==false){
			for(var i=0;i<$(".self .socialPoint").length;i++){
				if ($(".self .socialPoint:eq("+i+")").closest('.td').next('div').html()>99){
					errFlag = true;
					break;
				}
			}
		}
		if (errFlag==false){
			for(var i=0;i<$(".mulPoint .D100").length;i++){
				if ($(".mulPoint .D100:eq("+i+")").closest('.td').next('div').html()>99){
					errFlag = true;
					break;
				}
			}
		}
		if (errFlag==false){
			// if ($('.jobPoint .lessPoint').html()==0){
			// } else if ($('.jobPoint .lessPoint').html()<0){
				// alert('投資的職業點數超過'+parseInt(-$('.jobPoint .lessPoint').html())+'點，請重新分配。');
			// } else {
				// alert('投資的職業點數尚有'+$('.jobPoint .lessPoint').html()+'點，請繼續分配。');
			// }
			if ($('.jobPoint .lessPoint').html()>0){
				alert('投資的職業點數尚有'+$('.jobPoint .lessPoint').html()+'點，稍後請繼續投資職業點數。');
			} else if ($('.jobPoint .lessPoint').html()<0){
				alert('投資的職業點數超過'+parseInt(-$('.jobPoint .lessPoint').html())+'點，稍後請減少投資職業點數。');
			} 
			
			
			var job = Occupation.OccupationManager.list($(".job").val());
			for (var i=0;i<$('.D100_job').length;i++){
				Skill.SkillManager.updateOccupation(job.skill_I[i],parseInt($('.D100_job:eq('+i+')').val()));
				if ($('.norPoint .table .tr:eq('+(i+1)+') input').val() !== undefined && $('.norPoint .table .tr:eq('+(i+1)+') input').val() !==Skill.SkillManager.list(job.skill_I[i]).subName){
					Skill.SkillManager.updateSub(job.skill_I[i],$('.norPoint .table .tr:eq('+(i+1)+') input').val());
				}
			}
			for (var i=0;i<$('.socialPoint').length;i++){
				Skill.SkillManager.updateOccupation(parseInt($('.socialType:eq('+i+')').val()),parseInt($('.socialPoint:eq('+i+')').val()));
			}
			for (var i=0;i<$('.mulPoint .D100').length;i++){
				Skill.SkillManager.updateOccupation(parseInt($('.mulSkill:eq('+i+')').val()),parseInt($('.mulPoint .D100:eq('+i+')').val()));
				
				if ($('.mulPoint .table:eq('+i+') .tr input[type="text"]').val() !== undefined && $('.mulPoint .table .tr:eq('+(i+1)+') input').val() !==Skill.SkillManager.list(job.skill_I[i]).subName){
					Skill.SkillManager.updateSub(parseInt($('.mulPoint .table:eq('+i+') .tr input[type="text"]').closest(".td").children("select").val()),$('.mulPoint .table:eq('+i+') .tr input[type="text"]').val());
				}
			}
			for (var i=0;i<$('.selfPoint').length;i++){	
				if ($('.selfSkill:eq('+i+')').val()>=0){
					//VVVVVVV更新點數VVVVVVVV
					Skill.SkillManager.updateOccupation(parseInt($('.selfSkill:eq('+i+')').val()),parseInt($('.selfPoint:eq('+i+')').val()));
					
					//VVVVVV更新subNameVVVVVV
					if ($('.selfInterested .table .tr:eq('+(i+1)+') input').val() !== undefined && $('.selfInterested .table .tr:eq('+(i+1)+') input').val() !==Skill.SkillManager.list($('.selfInterested .table .tr:eq('+(i+1)+') .selfSkill').val()).subName){
						Skill.SkillManager.updateSub(parseInt($(".selfInterested .selfSkill:eq("+i+")").val()),$('.selfInterested .table .tr:eq('+(i+1)+') input').val());
					}
				}
				
			}
			
			Skill.SkillManager.updateOccupation(10,parseInt($("#jobCreate").val()));
			
			//切換到步驟五
			$(".jobPoint").hide();
			$(".allPoint").show();
			window.document.body.scrollTop = 0;	//跑到頂端
			for (var i=0;i<Skill.SkillManager.userSkill().length;i++){
				if (Skill.SkillManager.userSkill()[i]<15){
					allTableUser(0,job,1,i);
				}
				else if (Skill.SkillManager.userSkill()[i]<30){
					allTableUser(1,job,-14,i);
				}
				else if (Skill.SkillManager.userSkill()[i]<45){
					allTableUser(2,job,-29,i);
				}
				else {
					allTableUser(3,job,-44,i);
				}
			}
			
			for (var i=0;i<4;i++){			//基礎+職業	
				for (var j=1;j<=15;j++){
					$('.allPoint .table:eq('+i+') .tr:eq('+j+') .td:eq(2)').html(Skill.SkillManager.list(i*15+j-1).basicPoint + Skill.SkillManager.list(i*15+j-1).occupationPoint);
					$('.allPoint .table:eq('+i+') .tr:eq('+j+') .td:eq(4)').html(parseInt($('.allPoint .table:eq('+i+') .tr:eq('+j+') .td:eq(2)').html()) + parseInt($('.allPoint .table:eq('+i+') .tr:eq('+j+') .D100_all').val()));
				}
			}
			$("body > div.underblock > div.allPoint > div.body > div:nth-child(2) > div:nth-child(1) > div:nth-child(13) > div:nth-child(4) > select ").hide();

		} else {
			alert("請檢查是否有技能總點數大於99，並重新分配職業點數。");
		}

	});
	

	
	function pointJob(val){
		if (val>=0){
			var PJ;
			var propertyTran = Character.CharacteristicsManager.listFinal();
			var job = Occupation.OccupationManager.list(val);
			$('.jobChoose .table .tr:eq(0) .td:eq(2)').html(function(){
				return job.creditRating[0]+" ~ "+job.creditRating[1]
			});
			$('.jobChoose .table .tr:eq(1) .td:eq(2)').html(function(){
				if (job.pointType.length>2){
					var big=0;
					for (var i=1;i<job.pointType.length;i++){
						if (propertyTran[job.pointType[i].toLowerCase()]>big){
							big = propertyTran[job.pointType[i].toLowerCase()];
						}
					}
					PJ = big*2 + propertyTran.edu*2;
					return PJ;
				} else if (job.pointType.length==2){
					PJ = propertyTran[job.pointType[1].toLowerCase()]*2 + propertyTran.edu*2;
					return PJ;
				} else {
					PJ = propertyTran.edu*4;
					return PJ;
				}
				
			});
			$('.jobChoose .table .tr:eq(2) .td:eq(2)').html(function(){
				var job = Occupation.OccupationManager.list(val);
				var temp = "";
				for(var i=0;i<job.skill_I.length;i++){
					temp += Skill.SkillManager.list(job.skill_I[i]).name;
					if (job.skill_V.length){
						for(var j=0;j<job.skill_V.length;j=j+2){
							if (job.skill_I[i]==job.skill_V[j]){
								temp += "("+job.skill_V[j+1]+")";
							}
						}
					}
					
					if (i!=job.skill_I.length-1) temp +="、";
				}
				if (job.skill_II) temp += "、人際技能X" +  job.skill_II;
				if (job.skill_III) temp += "、個人專長X" +  job.skill_III;
				if (job.skill_IV.length){
					for(var i=0;i<job.skill_IV.length;i++){

						if (job.skill_IV[i].length==4&&job.skill_IV[i][1]==21&&job.skill_IV[i][3]==23){
							temp += "、火器";

						} else {
							temp += "、以下技能選擇" +  job.skill_IV[i][0] + "個：";
							for (var j=1;j<job.skill_IV[i].length;j++){
								temp += Skill.SkillManager.list(job.skill_IV[i][j]).name;
								
								if (job.skill_V.length){
									for(var k=0;k<job.skill_V.length;k=k+2){
										if (job.skill_IV[i][j]==job.skill_V[k]){
											temp += "("+job.skill_V[k+1]+")";
										}
									}
								}
								
								if (j!=job.skill_IV[i].length-1) temp+="或";
							}
						}
						
					}
				}
				
				return temp;
				
			});
			return PJ;
		}
	}
	
	function mulSkillU(index,job){	//自定義input顯示
		if (Skill.SkillManager.userSkill().indexOf(parseInt($(index).val()))!=-1 && job.skill_V.indexOf(parseInt($(index).val()))==-1){
			$(index).next("br").remove();
			$(index).next("input").remove();
			$(index).closest("div").append("<br /><input type='text' value="+Skill.SkillManager.list($(index).val()).subName+">");
		} else {
			$(index).next("br").remove();
			$(index).next("input").remove();
		}
	}

	function allTableUser(table,job,shift,i){	//興趣點數顯示技能名稱及input框框
		if (job.skill_V.indexOf(Skill.SkillManager.userSkill()[i])>=0){		//職業已經定義好自定義
			$(".allPoint .table:eq("+table+") .tr:eq("+(Skill.SkillManager.userSkill()[i]+shift)+") .td:first").html(Skill.SkillManager.list(Skill.SkillManager.userSkill()[i]).name + "("+Skill.SkillManager.list(Skill.SkillManager.userSkill()[i]).subName+")");
		} else {
			$(".allPoint .table:eq("+table+") .tr:eq("+(Skill.SkillManager.userSkill()[i]+shift)+") .td:first").html(Skill.SkillManager.list(Skill.SkillManager.userSkill()[i]).name);
			$(".allPoint .table:eq("+table+") .tr:eq("+(Skill.SkillManager.userSkill()[i]+shift)+") .td:first").append(
				"<div class=userSkill><input type='text' value="+Skill.SkillManager.list(Skill.SkillManager.userSkill()[i]).subName+" /></div>"
			);
		}
	}
	
	function usedPointLess(){
		var usedPoint = parseInt($("#jobCreate").val());
		for (var i=0;i<$(".norPoint .D100_job").length;i++){
			usedPoint += parseInt($(".norPoint .D100_job:eq("+i+")").val());
		}
		for (var i=0;i<$(".selfInterested .selfPoint").length;i++){
			usedPoint += parseInt($(".selfInterested .selfPoint:eq("+i+")").val());
		}
		for (var i=0;i<$(".self .socialPoint").length;i++){
			usedPoint += parseInt($(".self .socialPoint:eq("+i+")").val());
		}
		for (var i=0;i<$(".mulPoint .D100").length;i++){
			usedPoint += parseInt($(".mulPoint .D100:eq("+i+")").val());
		}
		$(".jobPoint .lessPoint").html(PJ - usedPoint);
	}
	
	//======================== 興趣點數 ================================
	allSkExp(0,0);	//解釋興趣配點時全技能
	allSkExp(1,15);
	allSkExp(2,30);
	allSkExp(3,45);
	
	for (var i=0;i<100;i++){		//興趣配點select
		$('.D100_all').append(
			"<option value="+i+">"+i+"</option>"
		);
	}
	
	$('.allPoint .D100_all').bind('change',function(){		//當點數變動時, 更新剩餘點數
		var lessPoint = Pi;
		for(var i=0;i<60;i++){
			lessPoint -= $('.allPoint .D100_all:eq('+i+')').val();
		}
		$('.allPoint .lessPoint').html(lessPoint);
		$(this).closest(".td").next(".td").html(parseInt($(this).val())+parseInt($(this).closest(".td").prev(".td").html()));
	})
	
	$(".allPoint .body input[type='submit']:first").bind('click',function(){		//上一頁
		var errFlag = false;
		
		for (var i=0;i<4;i++){	
			for (j=0;j<15;j++){
				if ($('.allPoint .table:eq('+i+') .tr:eq('+(j+1)+') .td:last').html()>99){
					alert("請檢查是否有技能總點數大於99，並重新分配興趣點數。");
					errFlag = true;
					break
				}
			}
		}
		
		if (errFlag==false){
			$('.allPoint').hide();
			$('.jobPoint').show();
			window.document.body.scrollTop = 0;	//跑到頂端
			for (var i=0;i<4;i++){	//更新點數及SUBNAME
				for (j=0;j<15;j++){
					if (Skill.SkillManager.list(i*15+j).allotPoint !== $('.allPoint .table:eq('+i+') .D100_all:eq('+j+')').val()) Skill.SkillManager.updateAllot(i*15+j,$('.allPoint .table:eq('+i+') .D100_all:eq('+j+')').val());
					if (Skill.SkillManager.userSkill().indexOf(i*15+j)>=0 && $('.allPoint .table:eq('+i+') .tr:eq('+(j+1)+') .td:first input').val() !== undefined)
						if (Skill.SkillManager.list(i*15+j).subName!==$('.allPoint .table:eq('+i+') .tr:eq('+(j+1)+') .td:first input').val())
							Skill.SkillManager.updateSub(i*15+j,$('.allPoint .table:eq('+i+') .tr:eq('+(j+1)+') .td:first input').val());
				}
			}
			
			if($(".allPoint .lessPoint").html()<0)		alert('投資的興趣點數超過'+parseInt(-$(".allPoint .lessPoint").html())+'點，稍後請減少投資興趣點數。');
			else if ($(".allPoint .lessPoint").html()>0)	alert('投資的興趣點數尚有'+$(".allPoint .lessPoint").html()+'點，稍後請繼續投資興趣點數。');
		}

	})
	$(".allPoint .body input[type='submit']:eq(1)").bind('click',function(){	//興趣點數重置
		$('.allPoint .D100_all').val(0);
		for (var i=0;i<4;i++){	//回復各技能總點數
			for (j=0;j<15;j++){
				$('.allPoint .table:eq('+i+') .tr:eq('+(j+1)+') .td:eq(4)').html($('.allPoint .table:eq('+i+') .tr:eq('+(j+1)+') .td:eq(2)').html());
			}
		}
		$('.allPoint .lessPoint').html(Pi);
	})
	$(".allPoint .body input[type='submit']:eq(2)").bind('click',function(){	//完成前檢查
		var errFlag = false;
		
		if($(".allPoint .lessPoint").html()<0){
			alert('投資的興趣點數超過'+parseInt(-$(".allPoint .lessPoint").html())+'點，請減少投資興趣點數。');
			errFlag =true;
		} else if ($(".allPoint .lessPoint").html()>0){
			alert('投資的興趣點數尚有'+$(".allPoint .lessPoint").html()+'點，請繼續投資興趣點數。');
			errFlag =true;
		} else if ($('.jobPoint .lessPoint').html()>0){
			alert('投資的職業點數尚有'+$('.jobPoint .lessPoint').html()+'點，請返回上一頁並繼續投資職業點數。');
			errFlag =true;
		} else if ($('.jobPoint .lessPoint').html()<0){
			alert('投資的職業點數超過'+parseInt(-$('.jobPoint .lessPoint').html())+'點，請返回上一頁並減少投資職業點數。');
			errFlag =true;
		}
				
		for (var i=0;i<4;i++){	//檢查興趣點數是否<100
			for (j=0;j<15;j++){
				if ($('.allPoint .table:eq('+i+') .tr:eq('+(j+1)+') .td:last').html()>99){
					alert("請檢查是否有技能總點數大於99，並重新分配興趣點數。");
					errFlag = true;
					break
				}
			}
		}
		
		if (errFlag===false){
			// $('.jobPoint').hide();
			$('.allPoint').hide();
			for (var i=0;i<4;i++){	//更新點數及SUBNAME
				for (j=0;j<15;j++){
					if (Skill.SkillManager.list(i*15+j).allotPoint !== $('.allPoint .table:eq('+i+') .D100_all:eq('+j+')').val()) Skill.SkillManager.updateAllot(i*15+j,$('.allPoint .table:eq('+i+') .D100_all:eq('+j+')').val());
					if (Skill.SkillManager.userSkill().indexOf(i*15+j)>=0 && $('.allPoint .table:eq('+i+') .tr:eq('+(j+1)+') .td:first input').val() !== undefined)
						if (Skill.SkillManager.list(i*15+j).subName!==$('.allPoint .table:eq('+i+') .tr:eq('+(j+1)+') .td:first input').val())
							Skill.SkillManager.updateSub(i*15+j,$('.allPoint .table:eq('+i+') .tr:eq('+(j+1)+') .td:first input').val());
				}
			}
			
			$(".finish").show();
			window.document.body.scrollTop = 0;	//跑到頂端
			$(".finish .body div span:eq(0)").html(Occupation.OccupationManager.list($(".job").val()).name);
			$(".finish .body div span:eq(1)").html(Character.CharacteristicsManager.listFinal().age);
			FinalData.FinalDataManager.inputCharacter(Character.CharacteristicsManager.listFinal());
			Skill.SkillManager.total(); 	//計算一般 困難 極難點數
			FinalData.FinalDataManager.inputSkill(Skill.SkillManager.listAll());
			var propertyString = ["str","dex","Int","con","app","pow","siz","edu"];
			
			for (var i=0;i<propertyString.length;i++){
				$(".finish .body .property .pointN:eq("+i+")").html(FinalData.FinalDataManager.characterList()[propertyString[i]].normalPoint);
				$(".finish .body .property .pointH:eq("+i+")").html(FinalData.FinalDataManager.characterList()[propertyString[i]].hardPoint);
				$(".finish .body .property .pointV:eq("+i+")").html(FinalData.FinalDataManager.characterList()[propertyString[i]].varyHardPoint);
			}
			
			$(".finish .body .property .pointN:eq(8)").html(Character.CharacteristicsManager.listFinal().mov);
			$(".finish .body .property .pointH:eq(8)").html(Character.CharacteristicsManager.listFinal().mov+1);
			$(".finish .body .property .pointV:eq(8)").html(Character.CharacteristicsManager.listFinal().mov-1);
			
			var propertyString = ["hp","san","luk","mp"];
			for (var i=0;i<propertyString.length;i++){
				$(".finish .body .otherBox .tr:eq("+i+") .td:eq(1)").html(Character.CharacteristicsManager.listFinal()[propertyString[i]]);
			}
			var propertyString = ["db","build"];
			for (var i=0;i<propertyString.length;i++){
				$(".finish .body .otherBox .tr:eq("+i+") .td:eq(3)").html(Character.CharacteristicsManager.listFinal()[propertyString[i]]);
			}
			$(".finish .body .otherBox .tr:eq(2) .td:eq(3)").html(Skill.SkillManager.list(13).total);
			
			//-------------------------技能---------------------------------
			for (var i=0;i<4;i++){
				for (var j=0;j<15;j++){
					$(".finish .body .skill .allSkill .skill_"+i+" .skillBigBlock:eq("+j+") .pointN").html(FinalData.FinalDataManager.skillList()[i*15+j].normalPoint);
					$(".finish .body .skill .allSkill .skill_"+i+" .skillBigBlock:eq("+j+") .pointH").html(FinalData.FinalDataManager.skillList()[i*15+j].hardPoint);
					$(".finish .body .skill .allSkill .skill_"+i+" .skillBigBlock:eq("+j+") .pointV").html(FinalData.FinalDataManager.skillList()[i*15+j].varyHardPoint);
					if (Skill.SkillManager.userSkill().indexOf((i*15+j))>=0){
						$(".finish .body .skill .allSkill .skill_"+i+" .skillBigBlock:eq("+j+") .subName").html(Skill.SkillManager.list(i*15+j).subName);
					}
				
				}
			}
			//------------------------------消費水平--------------------------------------
			if (FinalData.FinalDataManager.skillList()[10].normalPoint===0){
				$(".finish .cradit .body .tr:eq(1) .td:eq(0)").html("$10");
				$(".finish .cradit .body .tr:eq(1) .td:eq(1)").html("$10");
				$(".finish .cradit .body .tr:eq(1) .td:eq(2)").html("無");
			} else if (FinalData.FinalDataManager.skillList()[10].normalPoint<=9){
				$(".finish .cradit .body .tr:eq(1) .td:eq(0)").html("$40");
				$(".finish .cradit .body .tr:eq(1) .td:eq(1)").html("$"+FinalData.FinalDataManager.skillList()[10].normalPoint*20);
				$(".finish .cradit .body .tr:eq(1) .td:eq(2)").html("$"+FinalData.FinalDataManager.skillList()[10].normalPoint*200);
			} else if (FinalData.FinalDataManager.skillList()[10].normalPoint<=49){
				$(".finish .cradit .body .tr:eq(1) .td:eq(0)").html("$200");
				$(".finish .cradit .body .tr:eq(1) .td:eq(1)").html("$"+FinalData.FinalDataManager.skillList()[10].normalPoint*40);
				$(".finish .cradit .body .tr:eq(1) .td:eq(2)").html("$"+FinalData.FinalDataManager.skillList()[10].normalPoint*1000);
			} else if (FinalData.FinalDataManager.skillList()[10].normalPoint<=89){
				$(".finish .cradit .body .tr:eq(1) .td:eq(0)").html("$1000");
				$(".finish .cradit .body .tr:eq(1) .td:eq(1)").html("$"+FinalData.FinalDataManager.skillList()[10].normalPoint*100);
				$(".finish .cradit .body .tr:eq(1) .td:eq(2)").html("$"+FinalData.FinalDataManager.skillList()[10].normalPoint*100000);
			} else if (FinalData.FinalDataManager.skillList()[10].normalPoint<=98){
				$(".finish .cradit .body .tr:eq(1) .td:eq(0)").html("$5000");
				$(".finish .cradit .body .tr:eq(1) .td:eq(1)").html("$"+FinalData.FinalDataManager.skillList()[10].normalPoint*400);
				$(".finish .cradit .body .tr:eq(1) .td:eq(2)").html("$"+FinalData.FinalDataManager.skillList()[10].normalPoint*400000);
			} else {
				$(".finish .cradit .body .tr:eq(1) .td:eq(0)").html("$100000");
				$(".finish .cradit .body .tr:eq(1) .td:eq(1)").html("$1000000");
				$(".finish .cradit .body .tr:eq(1) .td:eq(2)").html("$100000000+");
			}
		}
		
		
	})
	
	function allSkExp(index,shift){	//解釋興趣配點時全技能
		$('.allPoint .table:eq('+index+') button').bind("click",function(){
			alert(Skill.SkillManager.list($('.allPoint .table:eq('+index+') button').index(this)+shift).explain);
		});
	}
	
	//----------------------完成------------------------------
	$(".finish .body .background .choose .1D10").append("<option value=-1>-1D10-</option>");
	for (var i=0;i<10;i++){
		$(".finish .body .background .choose .1D10").append("<option value="+i+">"+i+"</option>");
	}
	var backgroundOption = [
		[	
			"有崇拜與禱告的上位力量（如：Vishnu、Jesus Christ、Haile Selassie I）",
			"人類並不需要宗教（如：無神論者、人文主義者、世俗論者）",
			"科學解答了一切。選擇一個感興趣的形象（如：演化論、低溫物理學、宇宙探索）",
			"相信命運（如：業報、種姓制度、迷信）",
			"會社或秘密會社成員（如：共濟會、婦女會、Anonymous)",
			"邪惡必須從社會根除。哪種邪惡？（如：毒品、暴力、種族主義）",
			"神祕學（如：占星術、招魂、塔羅牌）",
			"政治（保守、社會主義者、自由）",
			"「錢就是力量，我要盡可能得到全部」（如：貪婪、野心、無情）",
			"競選者/活動者（如：女權主義、平等權、工會）"
		],
		[	
			"父母（如：媽媽、爸爸、繼母）",
			"祖父母（如：媽媽那邊的祖母、爸爸那邊的祖父）",
			"兄弟姊妹（如：哥哥、同父異母弟弟、繼妹妹）",
			"孩子（如：兒子、女兒）",
			"伴侶（如：配偶、未婚妻、愛人）",
			"教你最高級職業技能的人。標註他教了你什麼技能（如：學校老師、你拜的老師、你爸）",
			"兒時朋友（如：同學、鄰居、想像中的朋友）",
			"名人。你的偶像或是英雄。從可能從未遇過他（如：電影明星、政治家、音樂家）",
			"遊戲中的另一個同伴探索者。自己或隨機選一個。",
			"一個遊戲中的 NPC 。叫 Keeper 幫你選一個。"
		],
		[	
			"你感激他們。他們如何幫助你？（如：經濟上、在你的艱苦時刻保護你、給你第一份工作）",
			"他們教了你某件事。那是什麼？（如：一個技能、去愛、當個男子漢）",
			"他們給予你人生的意義。如何？（如：你渴望成為他們、你想和他們在一起、你想讓他們快樂）",
			"你傷害了他們，想要和好。你做了什麼？（如：偷了他們的錢、告訴警察關於他們的事、在他們沮喪時拒絕幫忙）",
			"共享一段經歷。什麼？（如：你們一起度過了一段艱苦的時光、你們一起長大、你們曾一起作戰）",
			"你想向他們證明你自己。如何？（如：得到一份好工作、找到一個好老婆、書讀得很好）",
			"你視他們為偶像（如：因為他們的名望、他們的美貌、他們的作品）",
			"一種懊悔（如：你本該死在他們那裡、你們因你說的某件事而分手、當有機會時你沒有前去伸出援手）",
			"你希望證明自己比他們更好。他們的瑕疵是什麼？（如：懶惰、酗酒、缺乏愛心）",
			"他們讓你痛苦，你想要復仇。你為何責怪他們？（如：愛人之死、你的事業被毀、婚姻破碎）"
		],
		[	
			"你學習的地方（如：學校、大學）",
			"你的家鄉（如：農村、商鎮、繁華都市）",
			"你遇見初戀的地方（如：音樂會、假日、防空洞）",
			"可安靜沈思的地方（如：圖書館、在你的莊園散步、釣魚）",
			"社交場所（如：紳士俱樂部、當地酒吧、叔叔的屋子）",
			"連結到你的「意識型態/信念」的地方（如：教區教堂、麥加、巨石陣）",
			"一個重要人士的墓地。誰？（如：父或母、孩子、愛人）",
			"真正的家（如：郊區宅邸、出租公寓、你長大的孤兒院）",
			"你在那裡度過最快樂的日子（如：初吻的公園長凳、你的大學）",
			"你的工作地點（如：辦公室、圖書館、銀行）"
		],
		[
			"一個關聯到你的最高技能的物品（如：昂貴的西裝、假 ID、手指虎）",
			"你的職業的本質物品（如：醫生包、車、開鎖器）",
			"童年回憶（如：漫畫、折疊小刀、幸運錢幣）",
			"死者遺物（如：珠寶、在表中的相片、一封信）",
			"你的「重要人士」送你的東西（如：戒指、日記、地圖）",
			"你的收集。什麼收集？（如：公車票、動物玩偶、錄音）",
			"某個你正在找但是不知道是什麼的東西——你渴求答案（如：你在一個衣櫃中找到的不明語言寫成的信、從你先父遺物中找到的不明來源的奇異煙斗、在你花園中挖出的奇異銀球）",
			"運動用品（如：板球球棒、簽名球、釣魚桿）",
			"武器（如：配槍、你的老獵槍、藏在靴子裡的斧頭）",
			"寵物（如：狗、貓、烏龜）"
		],
		[
			"慷慨的（如：小費給很多、總會伸出援手、慈善家）",
			"善待動物（如：愛貓、在農場長大、瞭解馬兒）",
			"夢想家（如：讓幻想起飛、富有遠見、高度創意）",
			"享樂主義者（如：派對人生、有趣的酒鬼、及時行樂）",
			"賭徒性格（如：撲克臉、什麼都試、活在懸崖邊）",
			"好廚子（如：烤超棒的蛋糕、隨便都能變出大餐、精緻味覺）",
			"情聖/狐狸精（如：溫文儒雅、動人聲線、勾人眼神）",
			"忠誠（如：為朋友兩肋插刀、從未背信、願意為信念而死）",
			"美好名聲（如：全國最好的飯後演講者、大善人、無畏者）",
			"野心（如：達到一個目標、當老闆、佔有它的一切）"
		]
	];
	
	$(".finish .body .background .choose .rand").bind("click",function(){
		for (var i=0;i<6;i++){
			$(".finish .body .background .choose .1D10:eq("+i+")").val(Math.floor((10-0)*Math.random()+0));
			if (i===4){
				$(".finish .body .background .choose .1D10:eq("+i+")").closest(".td").next(".td").children("span").html(backgroundOption[i][parseInt($(".finish .body .background .choose .1D10:eq("+i+")").val())]);
			} else {
				$(".finish .body .background .choose .1D10:eq("+i+")").closest(".td").next(".td").html(backgroundOption[i][parseInt($(".finish .body .background .choose .1D10:eq("+i+")").val())]);
			}
		}
	});
	
	$(".finish .body .background .choose .1D10").bind("change",function(){
		if ($(".finish .body .background .choose .1D10").index(this)===4){
			if ($(this).val()>=0){
				$(this).closest(".td").next(".td").children("span").html(backgroundOption[$(".finish .body .background .choose .1D10").index(this)][$(this).val()]);
			} else {
				$(this).closest(".td").next(".td").children("span").html("請選擇1D10");
			}
		} else {
			if ($(this).val()>=0){
				$(this).closest(".td").next(".td").html(backgroundOption[$(".finish .body .background .choose .1D10").index(this)][$(this).val()]);
			} else {
				$(this).closest(".td").next(".td").html("請選擇1D10");
			}
		}
	});
	
	$(".finish .body .return input:eq(0)").bind("click",function(){
		$('.allPoint').show();
		$(".finish").hide();
	});
	$(".finish .body .return input:eq(1)").bind("click",function(){
		location.reload();
		
	});
	
	
	$("#gotop").click(function(){
		jQuery("html,body").animate({
			scrollTop:0
		},1000);
	});
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 300){
			$('#gotop').fadeIn("fast");
		} else {
			$('#gotop').stop().fadeOut("fast");
		}
	});
});