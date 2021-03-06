var CBL = new Array
$(function(){

	const imgQ = 160
	const xH = 1.2

	var s = Snap('#svg1').attr({
		width: window.screen.width,
		height:window.screen.height*xH,
		viewBox: '-20 -50 ' + screen.width + ' ' + screen.height*xH,
		preserveAspectRatio: 'xMinYMid slice'
	})

	// window.onresize = function(event) {
	// 	s.attr({
	// 		width:window.screen.width,
	// 		height:window.screen.height
	// 	})
	// };

	if(window.screen.width < 1000){
		s.attr({
			width:window.screen.width,
			height:window.screen.height*1.3,
			viewBox: '-20 0 '  + window.screen.width*2  + ' ' + window.screen.height*1.6,
			preserveAspectRatio: 'xMinYMid slice'
		})
	}




	let ELE = new Array


	let basicG = new Array


	let CB = new Object

	let BO = new Array

	let BB = new Object

	let patterList = new Array
	let PaL = new Array
	let PaI = new Object

	const blend = [
	'normal',
	'multiply',
	'screen',
	'overlay',
	'darken',
	'lighten',
	'color-dodge',
	'color-burn',
	'hard-light',
	'soft-light',
	'difference',
	'exclusion',
	'hue',
	'saturation',
	'color',
	'luminosity'
	]
	// -------------load SVG basic--------------------------load SVG basic--------------------------load SVG basic-------------


	function getColorFromSVG(name){


		Snap.load("img/SVG/color/" + name + ".svg",function(x){
			var typeL = x.node.getElementsByTagName('g')

			for (var i = 0; i < typeL.length; i++) {
				var list = new Array
				var colorL = new Array
				var typeID = typeL[i].getAttribute('id')
				colorL = typeL[i].getElementsByTagName('rect')
				for (var ii = 0; ii < colorL.length; ii++) {
					var color = colorL[ii].style.fill
					list[ii] = color
				}
				var CB = new Object
				CB.type = typeID
				CB.allColor = list
				CBL.push(CB)

			}


		//lo(CBL)
		})


	}

	getColorFromSVG('T4')
	getColorFromSVG('T3')
	getColorFromSVG('T2')
	getColorFromSVG('T1')

	lo(CBL)


	function getBasicFromSVG(name){

		Snap.load("img/SVG/" + name + ".svg",function(x){
			s.select('defs').append(x)

			var eleL = x.selectAll('g')
			var BList = new Array


				var typeID = name
				for (var ii = 0; ii < eleL.length; ii++) {
					var BB = new Object
					BB.shape = eleL[ii]
					BB.type = typeID
					BB.num = 'n' + ii

					BList[ii] = BB
					BList.na  = name
				}


				basicG.push(BList)
		})


	}
	getBasicFromSVG('A1')

	getBasicFromSVG('N2')
	getBasicFromSVG('N1')
	getBasicFromSVG('N3')
	getBasicFromSVG('N4')
	getBasicFromSVG('N6')
	getBasicFromSVG('N7')
	getBasicFromSVG('N8')
	getBasicFromSVG('N9')
	getBasicFromSVG('N10')
	getBasicFromSVG('N11')

	getBasicFromSVG('B1')
	getBasicFromSVG('B2')
	getBasicFromSVG('B4')
	getBasicFromSVG('B5')
	getBasicFromSVG('B6')
	getBasicFromSVG('B7')
	getBasicFromSVG('B8')
	getBasicFromSVG('B99')

	getBasicFromSVG('P1')
	getBasicFromSVG('P2')
	getBasicFromSVG('P3')
	getBasicFromSVG('P4')
	getBasicFromSVG('P6')
	getBasicFromSVG('P8')



	function getPatternFromSVG(name){


		Snap.load("img/SVG/" + name + ".svg",function(x){

			s.select('defs').append(x)

			var eleL = x.selectAll('g')


				var typeID = name

				for (var ii = 0; ii < eleL.length; ii++) {
					var PaI = new Object
					PaI.shape = eleL[ii]
					PaI.type = typeID
					PaI.num = 'PN' + ii

					PaL[ii] = PaI
					PaL.id = name
				}
				patterList.push(PaL)




				})
	}
	getPatternFromSVG('pattern')



	// -------------load SVG basic--------------------------load SVG basic--------------------------load SVG basic-------------

	var result, poAry,poAuthor,poTitle
	var userType
	var
		allStroke = new Array(),
		allTone = new Array(),
		allRadicals = new Array(),
		myObj = new Array()

	var type = $("#inp1");




	$('#btn1').click(function(event) {
		document.getElementById('trans').innerHTML = '&nbsp'
		getAPoem()

	});

	let btn2S = Snap('#btn2Svg')

	$('#btn2').click(function(event){
		var wordAttr = getAttrOfWord()
		sortData(wordAttr)
	})

	$('#btn2').hover(function(b){
		let inpText = document.getElementById('inp1').value
		if(inpText === ''){
			$('#btn2 p').text('RANDOM DRAW')
		}else{
			$('#btn2 p').text('DRAW WRITING')

		}

		let btnO = anime({
			targets:'.btnCs',
			fill:'rgb(237, 195, 41)',
			r:$('#btn2').width()/8,
			duration:1000
		})

	},function(){
		$('#btn2 p').text('DRAW')

		let btnC = anime({
			targets:'.btnCs',
			fill:'rgb(237, 195, 41)',
			r:$('#btn2').width()/1.9,
			duration:1000
		})

	})

	$('#btn3').click(function (e) {
		let inpText = document.getElementById('inp1').value

		let appid = '20190105000254845';
		let key = 'U0V67jcwJv9A0sPrByhj';
		let salt = (new Date).getTime();

		// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
		let from = 'en';
		let to = 'zh';
		let str1 = appid + inpText + salt + key;
		let sign = MD5(str1);
		$.ajax({
			url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
			type: 'get',
			dataType: 'jsonp',
			data: {
				q: inpText,
				appid: appid,
				salt: salt,
				from: from,
				to: to,
				sign: sign
			},
			success: function (data) {
				document.getElementById('inp1').value = data.trans_result[0].dst
			}
		});


	});

	$('#showBtn1').click(function(){
		window.print()

	});




	function getAPoem(){


		$.ajax({
			url: 'https://api.gushi.ci/all.json',
			type: 'GET'

		})
		.done(function(data) {
			poAry =  data.content
			poAuthor = data.author
			poTitle = data.origin
			type.val(poAry)

			btn2S.selectAll('.btnC').remove()

			var btnC = btn2S.paper.circle($('#btn2').width()/2,$('#btn2').height()/2,10).attr({
				fill:'#2953ED',
				class:'btnC'
			})

			var btnCs =btn2S.paper.circle($('#btn2').width()/2,$('#btn2').height()/2,10).attr({
				fill: 'rgb(237, 195, 41)',
				class:'btnCs'
			})

			anime({
				targets:'.btnC',
				r:$('#btn2').width()/1.9,
				duration:1000
			})
			anime({
				targets:'.btnCs',
				r:$('#btn2').width()/1.85,
				duration:2500
			})


		})
		.fail(function() {
			console.log("error");
		})
	}

	function getAttrOfWord(){
		let all = type.val().replace(/\s+/g,"，")
		document.getElementById('poemTitle').innerHTML = '&nbsp'
		document.getElementById('poemAuthor').innerHTML = '&nbsp'




		let appid = '20190105000254845';
		let key = 'U0V67jcwJv9A0sPrByhj';
		let salt = (new Date).getTime();

		// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
		let from = 'zh';
		let to = 'en';
		let str1 = appid + all + salt + key;
		let sign = MD5(str1);
		$.ajax({
			url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
			type: 'get',
			dataType: 'jsonp',
			data: {
				q: all,
				appid: appid,
				salt: salt,
				from: from,
				to: to,
				sign: sign
			},
			success: function (data) {
				document.getElementById('trans').innerHTML = data.trans_result[0].dst
			}
		});



		document.getElementById('inp1').addEventListener("input", function (e) {
			document.getElementById('poemTitle').innerHTML = '&nbsp'
			document.getElementById('poemAuthor').innerHTML = '&nbsp'
			document.getElementById('trans').innerHTML = '&nbsp'

			btn2S.selectAll('.btnC').remove()
			btn2S.selectAll('.btnCs').remove()
			if(poAuthor){
				poAuthor = '&nbsp'
			}
			if(poTitle){
				poTitle = '&nbsp'
			}
		})
		//如果获取诗集后键入过，会取消标题作者

		if (poAuthor) {
			document.getElementById('poemAuthor').innerHTML = poAuthor
		}else{
			document.getElementById('poemAuthor').innerHTML = 'A RANDOM POEM'
		}
		if (poTitle) {
			document.getElementById('poemTitle').innerHTML = poTitle
		}else{
			document.getElementById('poemTitle').innerHTML = ''
		}

		allStroke.splice(0)
		allTone.splice(0)
		allRadicals.splice(0)
		myObj.splice(0)

		for(var count = 0, allword = all.length; count < allword; count++){
	       	for (var bankIndex = 0, bank = wordBank.length; bankIndex < bank; bankIndex++){
	       		if (wordBank[bankIndex].word == all[count]) {

	       			var pinyinStr = new Array()
	       			  	pinyinStr.length = 0
	       			var pinyin = wordBank[bankIndex].pinyin;
	       			var symbolIndex = wordBank[bankIndex].strokes;

	       			    allStroke.push(wordBank[bankIndex].strokes);
	       			    allRadicals.push(wordBank[bankIndex].radicals)



	       			if(wordBank[bankIndex].radicals == 'symbol'){
	       			   		//renderSymbol('symbol', symbolIndex)
	       			}
	       		 	for(var i = 0, l = pinyin.length; i < l; i++){
	       			   		pinyinStr.push(pinyin.charAt(i))

	       			}


	       			if(isNaN(pinyinStr) == true){
	       				for(var toneG = 0, toneGl = toneBank.length; toneG < toneGl; toneG++){
	       					for(var toneIndex = 0, tonel = toneBank[toneG].tone.length; toneIndex < tonel; toneIndex++){
	       					    for(var pin = 0, pinl = pinyinStr.length; pin < pinl; pin++){
	       					       	if(toneG > 0 && toneBank[toneG].tone[toneIndex] == pinyinStr[pin]){

	       					       		allTone.push([toneG])
	       					       	}else if(toneBank[toneG].tone[toneIndex] == pinyinStr[pin]){

	       					       		allTone.push([toneG])
	       					       		}
	       					       	}
	       					    }
	       					}
	       			}else{
	       				allTone.push('1')
	       			}




	       			var thisStrokes = allStroke[count];
					var thisTone = allTone[count];
					var thisRadi = allRadicals[count];
					var thisCount = [count + 1]




					var userType = new Object()
					userType.word = all[count]
					userType.getTone = parseInt(thisTone);
					userType.getStro = parseInt(thisStrokes);
					userType.getRadi = thisRadi;

					//console.log("JSON:" + userType.getTone + "Strokes:" +  userType.getStro)

					myObj.push(userType)


					}

	       	}//每个输入的字

	   	}

	   	if(myObj.length == 0){

						var userType = new Object()
						userType.word = '无'
						userType.getTone = parseInt(0);
						userType.getStro = parseInt(3);
						userType.getRadi = '无';

						myObj.push(userType)
					//非法字符
	   	}

	   	return myObj
	}

	function gColor(typeName,count){

			for(var i = 0, l = CBL.length;i<l;i++){

				if (typeName.id == CBL[i].type ){
					var c = CBL[i].allColor
					var useC = new Array;


					for(var i=0,l = count+1;i<l;i++){

						useC.push(c[rNF(c.length)])

					}


					return useC[rNF(useC.length)]
				}
			}
	}



	function sB(type,count){
				//sorted shape, max 10 counts
				var basicUseRange = new Array
				var cc
				if(count < 10){
					cc = count

				}else{
					cc = 10
				}
				for(var i=0,l=cc;i<l;i++){
					basicUseRange[i] = type[rNF(type.length)]

				}

				var usedBasic = basicUseRange[rNF(basicUseRange.length)]


				return usedBasic
			}//从待选区间选取基本形状



	// -----support function----------support function----------support function----------support function-----

	function rN(x){
		return Math.floor(Math.random()*(x+1))-x
	}//-x到x 随机数

	function rNF(x){
		return Math.floor(Math.random()*x)
	}//0到x 随机数

	function lo(x){
		return console.log(x)
	}

	function uni(arr){
	  var hash=[];
	  for (var i = 0; i < arr.length; i++) {
	     if(hash.indexOf(arr[i])==-1){
	      hash.push(arr[i]);
	     }
	  }
	  return hash;
	}

	function randomSort(arr,newArr){
		if(arr.length == 1){
			newArr.push(arr[0]);
			return newArr;
		}

		var random = Math.ceil(Math.random() * arr.length) - 1;
		newArr.push(arr[random]);
		arr.splice(random,1);
		return randomSort(arr,newArr);
	}

	let rSA = arr => {
				const newArr = []
				randomSort(arr,newArr)
				return newArr
			}

	function report(shapeC,rL,cUse,sRange,usedShapeG,sUse){

				var report = new Object

				var uSL = new Array
				for(var i=0;i<ELE.length;i++){
					uSL.push(ELE[i].bs)
				}

				report.opptionalShapes = sUse
				//report.usedShapes = uni(uSL)
				report.colorStyle = cUse.id
				report.useRadicals = rL
				//report.usedShapeCount = useC
				report.opptionalShapeCount = shapeC
				report.StyleList = CBL
				report.ShapeRange = sRange
				//report.usedShapeGroup= usedShapeG

				return console.log(report)
			}

	// -----support function----------support function----------support function----------support function-----




	function sortData(d){
		//s.selectAll('.suG').remove()
		s.paper.selectAll('use').remove()
		s.selectAll('pattern').remove()

		var stroL = new Array,
			radiL = new Array,
			toneL = new Array,
			wordL = new Array

		for(var i = 0, l = d.length; i<l;i++){

			var stro = d[i].getStro
			var radi = d[i].getRadi
			var tone = d[i].getTone
			var word = d[i].word

			stroL.push(stro)
			radiL.push(radi)
			toneL.push(tone)
			wordL.push(word)


		}

		var dataCol = new Array

		for (let i = 0; i < imgQ;i++){
			dataEle = new Object
			// var ranGet = rNF(dataCol.length)
			dataEle.stro = stroL[rNF(stroL.length)]
			dataEle.radi = radiL[rNF(radiL.length)]
			dataEle.tone = toneL[rNF(toneL.length)]
			dataEle.word = wordL[rNF(wordL.length)]
			dataCol.push(dataEle)

			//console.log(dataEle)


		}

		function Fcolor(typing){

			var seasonUse = new Array
			var timeUse = new Array
			var Fcolor = new Object

			//遍历键入字符,判断季节，输出到列表

			for(var i=0,l=typing.length;i<l;i++){
				for(var ia=0,la=seasonBank.season.length;ia<la;ia++){
					for(var ib=0,lb=seasonBank.season[ia].word.length;ib<lb;ib++){
						if(seasonBank.season[ia].word[ib]  == d[i].word){
							seasonUse.push(seasonBank.season[ia].num)
						}
					}

				}

				for(var iaa=0,laa=seasonBank.time.length;iaa<laa;iaa++){
					for(var ibb=0,lbb=seasonBank.time[iaa].word.length;ibb<lbb;ibb++){
						if(seasonBank.time[iaa].word[ibb]  == d[i].word){
							timeUse.push(seasonBank.time[iaa].num)
						}
					}

				}
			}
			var X

			if(seasonUse == 0){
				console.log('no season was found, return random season')
				Fcolor.season = seasonBank.season[rNF(seasonBank.season.length)].num

			}else{
				Fcolor.season = seasonUse[rNF(seasonUse.length)]
			}

			if(timeUse == 0){

				var X = 'G'
				// 默认G

			}else{
				Fcolor.time = timeUse[rNF(timeUse.length)]
			}


			if(Fcolor.time == 1){
				var X = 'M'
			}else if(Fcolor.time == 2){
				var X = 'D'
			}
			else if(Fcolor.time == 3){
				var X = 'N'
			}

			Fcolor.id = 'T' + Fcolor.season + X

			return Fcolor

		}//返回了选用的颜色序列

		function Flocation(typing){
		//返回偏旁的类别和序列，可用于输出 基本形状

			//lo(basicG)
			var environUse = new Array
			var objectUse = new Array


			//遍历键入字符,判断季节，输出到列表



			for(var i=0,l=typing.length;i<l;i++){
				var FLoc = new Object
				for(var ia=0,la=locationBank.length;ia<la;ia++){
					for(var ib=0,lb=locationBank[ia].attr.length;ib<lb;ib++){
						for(var ic=0,lc=locationBank[ia].attr[ib].symbol.length;ic<lc;ic++){
							if(locationBank[ia].attr[ib].symbol[ic]  ==  d[i].getRadi){

							var type = locationBank[ia].type
							var num = locationBank[ia].attr[ib].num
							FLoc.id = type + num
							environUse.push(FLoc.id)
							}
						}
					}
				}
			}//遍历50字,输出50个属性到数组
			if(environUse.length == 0){
				console.log('no defined words were found, chose random attribute')
				var ranLoc = new Object
				var ranType = locationBank[rNF(locationBank.length)]
				ranLoc.type = ranType.type
				var ranTAttr = ranType.attr
				ranLoc.num = ranTAttr[rNF(ranTAttr.length)].num
				ranLoc.id = ranLoc.type + ranLoc.num


				return [basicG[rNF(basicG.length)].na]

			}else{
				return environUse
				//返回能识别的数组
			}
		}

		var eleCount = d.length //键入的数量

		//let US = ['B5']

		let US = Flocation(d)
		//临时选用的基础形状数组

		var CB = chooseABasicSL(rSA(US))

			var CS = Fcolor(d)
			var CType = new Object
			CType.type = CS       //color types
			CType.c = eleCount   //count of Color type s



		function chooseABasicSL(uC){//带入的是 uS 的数组
				var basic = []

				for (var i = 0; i < eleCount; i++) {

					for(var ii=0,l=uC.length;ii<l;ii++){
						for(var iii=0,lll=basicG.length;iii<lll;iii++){
							if(basicG[iii].na == uC[rNF(uC.length)]){

								var out = basicG[iii][rNF(basicG[iii].length)]

								basic[i] = out.shape
								basic[i].type = out.type
							}
						}
					}
				}

				return basic
			}//返回一个待选形状区间，由定义字符生成


		function sC(type,count){
				//sorted color, 3 counts
				var colorUseRange = new Array
				var cc
				if(type.c == 1){
					cc = 2

				}else{
					cc = count
				}
				for(var i=0,l=cc;i<l;i++){
					//输入为0时，只有一种颜色, cc+1 就有两种
					colorUseRange[i] = gColor(type.type,cc)


				}
				return uni(colorUseRange)
				//返回了一个选用的颜色区间
			}

		var ColorUsedList = sC(CType,eleCount)
		// ColorUsedList.type = CType.type
		var ShapeUsedList = sB(CB,2)



		s.selectAll('.eleG').remove()
		$('#allEle').remove()


		for (let i = 0; i < imgQ;i++){

			let indexSize = x => {return 2.5+rNF(x)/24}


				createShapeGroup(
					sB(CB, 2), //basic shape
					i, //index
					eleCount, //总数
					CType, // color type
					ColorUsedList, // 选用的颜色数组
					dataCol[rNF(l)].radi, //符号判定
					dataCol[rNF(l)].tone, //音调判定
					indexSize(i) / 2, //  size
					rNF(8), //pattern type
					dataCol[rNF(l)].stro //笔画数 pattern ele size
				)





		}
		var allEle = s.paper.g().attr({id:'allEle'})
		allEle.append(s.selectAll('.eleG'))

		report(eleCount,radiL,CS,CB,ShapeUsedList,Flocation(d))
		$('#showBtn2').addClass('active')


		finish()

	}//sort

	$('#showBtn2').click(function(){
		if($('#showBtn2').hasClass('active')){
			getSVG()
			$('.svg-crowbar').remove()
				// $('body > svg').remove()
		}else{
			alert('You have not create graphics')
		}
	});












	// ---------------SVG 方法------------------------------SVG 方法------------------------------SVG 方法---------------

	function trans(x,y,s,r,ori){
			var m = new Snap.Matrix()
			m.translate(x,y)
			m.rotate(r,50,55)
			m.scale(s,s,50,55)
			return m
		}

	function pM(x,y,s){
			var m = new Snap.Matrix()
			m.scale(s,s)
			m.translate(x,y)

			return m
		}


	let BlendMode = x => {

		if(x === 0){
			return blend[rNF(blend.length)]
		}else{
			return blend[4]
		}

	}

	function ToneToOpac(X){
				var opc
				if(X == 1){
					var opc = 0.6
				}else if(X == 2){
					var opc = 0.9
				}else if(X == 3){
					var opc = 0.7
				}else if(X == 4){
					var opc = 1
				}else{
					var opc = Math.random()
				}

				return opc
			}





	function createPattern(type,size,pC,color,count,index,tone){
			if(size == NaN){
				var size = 1
			}
			if(type == 0){
				type = 1
			}
			var Usize = size + 1
			//console.log(size)


			function setPat(x1,c){
				var a = s.paper.use(x1.shape).attr({
					transform:pM(0,0,0.2)
				})
				var b = s.paper.use(x1.shape).attr({
					transform:pM(c*5,0,0.2),
					fill:color,
					//strokeWidth:10,
					opacity:0.7,
					mixBlendMode:'overlay'
					//stroke:sC(pC)
				})
				var p = s.paper.g(a,b).attr({
					fill:color

				}).pattern(c,c,c*5,c*10)

				return p
			}


			if(type==1){

				var p = s.paper.circle(10,10,Usize*0.8).attr({
					fill:color
				}).pattern(0,0,30,30)
				return p
				// 圆点
			}else if(type==2){
				var p = s.paper.rect(0,0,1+Usize*0.1,10).attr({
					fill:color
				}).pattern(0,0,3,10)
				return p
				//竖线
			}else if(type==3){
				var a = s.paper.rect(0,0,1,10)
				var b = s.paper.rect(1.5,0,2,10)
				var p = s.paper.g(a,b).attr({
					fill:color
				}).pattern(0,0,5-Usize*0.2,10)
				return p
				//双竖线
			}else if(type==4){

				var a = s.paper.rect(0,0,10,5).attr({
					transform: "skewY(30)"
				})

				var p = s.paper.g(a).attr({
					fill:color
				}).pattern(0,0,10,11)
				return p
				//菱形
			}else if(type==5){
				var a = s.paper.rect(0,0,1,10)
				var b = s.paper.rect(1.5,0,2,10)
				var c = s.paper.rect(3,0,1,10)
				var p = s.paper.g(a,b,c).attr({
					fill:color
				}).pattern(0,0,5-Usize*0.2,10)
				return p
				//三竖线
			}else if(type == 6){

				return  setPat(PaL[rNF(PaL.length)],Usize)

			}else if(type == 7){
				var c = s.paper.circle(0.3,0.3,0.3).attr({
					fill:color
				}).pattern(0,0,index*0.01+1,index*0.01+1)
				return c
				//网点图
			}else if(type == 8){
				var a = s.paper.circle(0.4,0.4,0.2)
				var b = s.paper.circle(0.8,0.8,0.2)
				var c = s.g(a,b).attr({
					fill:color
				}).pattern(0.2,0.2,1,1)
				return c
				//网点图
			}



	}


	function createShapeGroup(x,i,all,type,colorList,sym,tone,size,pT,pS){

			var colorA = colorList[rNF(colorList.length)]
			var colorB = colorList[rNF(colorList.length)]

			var shape = s.use(x).attr({
		 	fill: colorA,
		 	class: colorA + ' ' +'eleBasic',
		 	mixBlendMode: BlendMode(tone),
		 	opacity:ToneToOpac(tone),
		 	transform: trans(0,0,size,rN(2))
		 })


			// var stro = s.use(x).attr({
		 // 	fill: "none",
		 // 	stroke:"grey",
		 // 	strokeWidth: 0,
		 // 	mixBlendMode: 'multiply',
		 // 	transform: trans(rN(10),0,size,r2)
		 // })

		 //输出边框。重要

			var pat = s.use(x).attr({
		 	fill:createPattern(pT,pS,type,colorB,all,i,tone),
		 	class: colorB + ' ' +'elePat',
		 	mixBlendMode: BlendMode(tone),
		 	opacity:ToneToOpac(tone),
		 	transform: trans(rN(pS*1.5),rN(pS*0.5),size,rN(2))
		 })


		ELE[i] = s.paper.g(shape,pat).attr({
				transform:trans(LyR(i).x,LyR(i).y,1,0),
				mixBlendMode: 'overlay',
				class:'eleG',
				id:'eleG'+i
			})

		ELE[i].bs = shape
		ELE[i].pat = pat

		$('#allEle').append(ELE[i])

	}








	function LyR(index){
		space = 100 //每个字的间距


		lineHeight = 100 //行距

		rowWord = 14  //每行的字数
		row = Math.floor(index/rowWord)
		var X = index*space-row*rowWord*space
		var Y = row*lineHeight
		var cord = new Object
		cord.x = X
		cord.y = Y

		return cord

	}//排版方法，返回 x,y 值




	var finish = function(){


		// let btnCClick = anime({
		// 	targets:'.btnC',
		// 	fill:'red',
		// 	duration:2000
		// })

		// var promise = btnCClick.finished.then(()=>{
		// 	// alert('1')
		// });







	}
















	// ---------------SVG 方法------------------------------SVG 方法------------------------------SVG 方法---------------




})
