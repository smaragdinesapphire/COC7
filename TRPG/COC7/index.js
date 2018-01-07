$(function(){
	// var pro = ["STR", "DEX", "INT", "CON", "APP", "POW", "SIZ", "EDU"];
	//-------------------初始設定START---------------------
	$("a[href *='updog']").css("display","none"); //close updog add

	//-------------------初始設定END---------------------
	//-------------------測試用START---------------------


	/* $(".body:gt(0)").hide(); */
	//-------------------測試用END---------------------
	
	
	
	
	//-------------------封面---------------------
	$(".index_4").bind('click',function(event){
		// $(".first").css("display","none");
		$(".first").fadeOut("slow",function(event){
			$(".inputProperty").fadeIn("slow",$.noop());
		});
		window.document.body.scrollTop = 0;	//跑到頂端
		$("#gotop").show();
	});
	//-------------------展示點數---------------------
	// $(".body:first").html(function(){
			// var string = "<table class='outPro'>";
			// for(var i=0;i<pro.length;i++){
				// string += 	"<div class='proBlock'><tr>"
							// +"<th rowspan='2'>"+pro[i]+"</th><th rowspan='2' class='out"+pro[i]+"'>1</th><th class='out"+pro[i]+"'>2</th>"
							// +"</tr><tr><th class='out"+pro[i]+"'>3</th></tr></div>";
			// }
			// var string = "";
			// for(var i=0;i<pro.length;i++){
				// string += 	"<div class='proBlock'><table><tr>"
							// +"<th rowspan='2'class='proName'>"+pro[i]+"</th><th rowspan='2' class='out"+pro[i]+"'>1</th><th class='out"+pro[i]+"'>2</th>"
							// +"</tr><tr><th class='out"+pro[i]+"'>3</th></tr></table></div>";
			// }
			
			// return string;
	// });
	//-------------------配點---------------------
	
	$(".D3").append("<option value=0>-3D6-</option>");
	for(var i=3;i<=18;i++){
		$(".D3").append("<option value=" + i + ">" + i + "</option>");
	};
	$(".D2").append("<option value=0>-2D6-</option>");
	for(var i=2;i<=12;i++){
		$(".D2").append("<option value=" + i + ">" + i + "</option>");
	};
	//-------------------年紀補正---------------------
	for(var i=15;i<=89;i++){
		$("#inAGE").append("<option value=" + i + ">" + i + "</option>");
	}
	$(".D100").append("<option value=-1>-1D100-</option>");
	for(var i=0;i<100;i++){
		$(".D100").append("<option value=" + i + ">" + i + "</option>");	
	}
	$("#ageT3 table tr th select.D100:lt(3)").css("width","100px");
	for (var i=1;i<=3;i++){
		$(".D100:eq(" + i + ") option[value=-1]").remove();
	}
	$(".D10").append("<option value=-1>-1D10-</option>");
	for(var i=0;i<10;i++){
		$(".D10").append("<option value=" + i + ">" + i + "</option>");	
	}
	$("input[type='radio'][value='str']").attr('checked',true);

	$("#inAGE").bind("change",function(event){	//顯示年紀補正註解
		var age= $(this).val();
		var val = Array(4);
		if (/^[4-8]/.test(age)){
			if (/4[0-9]/.test(age)){
				val = [5,2,5,1];
			} else if (/5[0-9]/.test(age)){
				val = [10,3,10,2];
			} else if (/6[0-9]/.test(age)){
				val = [20,4,15,3];
			} else if (/7[0-9]/.test(age)){
				val = [40,4,20,4];
			} else {
				val = [80,4,25,5];
			} 
			for (var i=0;i<4;i++){
				$(".ageIF:eq("+i+")").html(val[i]);
			}
			
		}
		if (/^1/.test(age)){
			$(".age15").show();
			$(".age20").hide();
			$(".ageOther").hide();
			$(".age15 .tr:eq(1) .td:eq(1)").html(Character.CharacteristicsManager.listFinal().str);
			$(".age15 .tr:eq(2) .td:eq(1)").html(Character.CharacteristicsManager.listFinal().siz);
		} else if (/^[23]/.test(age)){
			$(".age15").hide();
			$(".age20").show();
			$(".ageOther").hide();
		} else if (/^4/.test(age)){
			$(".age15").hide();
			$(".age20").hide();
			$(".ageOther").show();
			$(".eduUP div.table:eq(2)").hide();
			$(".eduUP div.table:eq(3)").hide();
		} else if (/^5/.test(age)){
			$(".age15").hide();
			$(".age20").hide();
			$(".ageOther").show();
			$(".eduUP div.table:eq(2)").show();
			$(".eduUP div.table:eq(3)").hide();
		} else {
			$(".age15").hide();
			$(".age20").hide();
			$(".ageOther").show();
			$(".eduUP div.table:eq(2)").show();
			$(".eduUP div.table:eq(3)").show();
		} 
		
		if(/^[4-8]/.test(age)){
			var property = Character.CharacteristicsManager.listFinal();
			$("#outSTR").html(property.str);
			$("#outCON").html(property.con);
			$("#outDEX").html(property.dex);
			$("#outSTR2").html(property.str);
			$("#outCON2").html(property.con);
			$("#outDEX2").html(property.dex);
		}
		
	});
	
	//-------------------選擇職業---------------------
	for(var i=0;i<114;i++){
		$(".job").append("<option value=" + i + ">"+Occupation.OccupationManager.list(i).name+"</option>");
	}
	//------------------------------------------------
	

	
	
});