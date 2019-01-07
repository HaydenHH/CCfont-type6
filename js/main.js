window.onload = function(){


	let lo = x => console.log(x)
	let rNF = x => Math.floor(Math.random() * x)
	let ranIndex = x => Math.floor(Math.random() * x.length)

	let trm = (t,x)=>{
		let m = Snap.Matrix
		if(t==='t'){
			return m.translate(x)
		}
	}

	function getAttr(x) {
		let all = x.innerHTML.replace(/\s+/g, "，")
		let allStroke = new Array,
			allTone = new Array,
			allRadicals = new Array,
			myObj = new Array;
		let appid = '20190105000254845';
		let key = 'U0V67jcwJv9A0sPrByhj';
		let salt = (new Date).getTime();

		// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
		let from = 'zh';
		let to = 'en';
		let str1 = appid + all + salt + key;
		let sign = MD5(str1);
		$.ajax({
			url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
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
				$('#bigTrans').text(data.trans_result[0].dst)
			}
		});

		allStroke.splice(0)
		allTone.splice(0)
		allRadicals.splice(0)
		myObj.splice(0)

		for (var count = 0, allword = all.length; count < allword; count++) {
			for (var bankIndex = 0, bank = wordBank.length; bankIndex < bank; bankIndex++) {
				if (wordBank[bankIndex].word == all[count]) {

					var pinyinStr = new Array()
					pinyinStr.length = 0
					var pinyin = wordBank[bankIndex].pinyin;
					var symbolIndex = wordBank[bankIndex].strokes;

					allStroke.push(wordBank[bankIndex].strokes);
					allRadicals.push(wordBank[bankIndex].radicals)



					if (wordBank[bankIndex].radicals == 'symbol') {
						//renderSymbol('symbol', symbolIndex)
					}
					for (var i = 0, l = pinyin.length; i < l; i++) {
						pinyinStr.push(pinyin.charAt(i))

					}


					if (isNaN(pinyinStr) == true) {
						for (var toneG = 0, toneGl = toneBank.length; toneG < toneGl; toneG++) {
							for (var toneIndex = 0, tonel = toneBank[toneG].tone.length; toneIndex < tonel; toneIndex++) {
								for (var pin = 0, pinl = pinyinStr.length; pin < pinl; pin++) {
									if (toneG > 0 && toneBank[toneG].tone[toneIndex] == pinyinStr[pin]) {

										allTone.push([toneG])
									} else if (toneBank[toneG].tone[toneIndex] == pinyinStr[pin]) {

										allTone.push([toneG])
									}
								}
							}
						}
					} else {
						allTone.push('1')
					}




					var thisStrokes = allStroke[count];
					var thisTone = allTone[count];
					var thisRadi = allRadicals[count];

					var userType = new Object()
					userType.word = all[count]
					userType.getTone = parseInt(thisTone);
					userType.getStro = parseInt(thisStrokes);
					userType.getRadi = thisRadi;


					myObj.push(userType)


				}

			} //每个输入的字

		}

		if (myObj.length == 0) {

			var userType = new Object()
			userType.word = '无'
			userType.getTone = parseInt(0);
			userType.getStro = parseInt(3);
			userType.getRadi = '无';

			myObj.push(userType)
			//非法字符
		}
		lo(myObj)
		return myObj
	}
	//-------------------------

	let bSvg = Snap('#beginSvg')



		const ww = $(window).width()
		const	wh = $(window).height()

		const bgc = 'rgb(237,185,41)'
		let [cc,rc,tc] = ['red','#5D9741','#4D42CC']
		let [x,y,r] = [ww/4,wh/2.5,ww/10]
		let [x2,y2,len] = [x-r,y,r*2]
		let [x3,y3,len2] = [
			[x-r,y+r],[x-r,y-r],[x-r+Math.sqrt((len*len)-(len/2*len/2)),y2]
		]

		bSvg.attr({
			width:ww,
			height:wh
		})

		let bCir = bSvg.paper.circle(x,y,r).attr({
			class:'bgShape',
			fill:bgc,
			opacity:0.8,
			mixBlendMode:'overlay'
		})

		let bRect = bSvg.paper.rect(x,y-r,len,len).attr({
			class:'bgShape',
			fill:bgc,
			mixBlendMode:'multiply',
			transform:`rotate(0,${x2},${y2}) translate(${-r},0)`
		})

		let bTrg = bSvg.paper.polyline([x3,y3,len2]).attr({
			class:'bgShape',
			transform:`rotate(30,${[x3]})`,
			fill:bgc,
			opacity:1,
			mixBlendMode:'overlay'
		})

		let bGp = bSvg.g(bRect,bCir,bTrg)

		bGp.click(()=>{

			$('#bigWord').fadeIn(1500)

			$('#bigTrans').fadeIn(1500)
			$('#poem').fadeIn(1500)
			$('.poemHead').fadeIn(1500)

			$('#poem').children().remove()
			$.ajax({
				url: 'https://v2.jinrishici.com/one.json',
				xhrFields: {
					withCredentials: true
				},
				success: function (result) {
					let poemSenten = Array.from(result.data.origin.content)
					let poemAuthor = result.data.origin
					getFirstPoem(poemSenten, poemAuthor)
				}
			});
		})

		let shapeOpen = ()=>{
			bCir.animate({
					fill:cc,
			},300)
			bTrg.animate({
					fill:tc,
					transform:`rotate(0,${[x3]}) tranlate(${-0.5*r},${0.5*r})`
			},300)
			bRect.animate({
					fill:rc,
					transform:`rotate(0,${x},${y}) translate(${r},${-0.3*r}) scale(0.8)`
			},300)
		}

		let shapeClose = ()=>{
			bCir.animate({
					fill:bgc,
			},300)
			bTrg.animate({
					fill:bgc,
					transform:`rotate(30,${[x3]}) `
			},300)
			bRect.animate({
					fill:bgc,
					transform:`rotate(0,${x2},${y2}) translate(${-r},0)`
			},300)
		}












	//createBeginSvg()

	window.onresize = ()=>{
		// Snap.selectAll('.bgShape').remove()
		// createBeginSvg()
		document.location.reload()
	}



	//create Gallery
	let createImg = link => `<img class="gaImg p-2 col-sm-6 col-lg-4 img-responsive" src="${link}">`;
	let ranListSet = new Set()
	const imgQ = 9;
	do {
		ranListSet.add(imgLink[ranIndex(imgLink)])
	} while (ranListSet.size<imgQ);

	const ranList = Array.from(ranListSet);


	for(let link of ranList.values()){
		//lo(i)
		$('#gallery').append(createImg(link))
	}

	Array.from(document.getElementsByClassName('gaImg')).forEach((t)=> {
		t.addEventListener('click', (t)=>{

			let href = t.target.src
			$('body').append(`
				<div class="viewImg">
					<img src="${href}" class="img-responsive">
					<button id="closeImg" class="btn">
						<span id="span1"></span>
						<span id="span2"></span>
					</button>
				</div>
			`)

			let viewMotion = () =>{
				let imgBigger = anime({
					targets:'.viewImg img',
					opacity:1,
					duration:200,
					easing: 'linear'
				})

				let bgDarken = anime({
					targets:'.viewImg',
					opacity:1,
					duration:200,
					easing: 'linear'
				})
			}

			viewMotion()

			$('#closeImg').click(function () {
				$('.viewImg').fadeOut();
				setTimeout(() => {
					$('.viewImg').remove()
				}, 1000);
			  })
		})
	});

	//----------------


	// $.ajax({
	// 	url: 'https://v2.jinrishici.com/one.json',
	// 	xhrFields: {
	// 		withCredentials: true
	// 	},
	// 	success: function (result) {
	// 		let poemSenten = Array.from(result.data.origin.content)
	// 		let poemAuthor = result.data.origin
	// 		getFirstPoem(poemSenten, poemAuthor)
	// 	}
	// });

	const svgNext = Snap('#nextBtn1')
	svgNext.attr({
		width:'100px',
		height:'100px'
	})

	let nCir = svgNext.paper.circle(20,20,10).attr({
		fill:'red',
		id:'resetPoemBtn'
	})

	nCir.hover(function(){
		this.animate({
			r:15,
			fill:'blue'
		},500,mina.easein)
	},function(){
		this.animate({
			r:10,
			fill:'red'
		},500,mina.easeout)
	});


	function getFirstPoem(data,auth) {
		let sen = new Array;
		sen = data
		lo(auth)
		document.getElementById('poemTitleHead').innerText = auth.title
		document.getElementById('poemAuthorHead').innerText = '(' + auth.dynasty + ')' + auth.author
		let sentenceBox = document.getElementsByClassName('sentences')
		for(let sentences of sen.values()){
			$('#poem').append(`<div class="sentences">${sentences}</div>`)
			if(sentenceBox.length >10){

			}
		}

		//let sentenceBox = document.getElementsByClassName('sentences')

		for (let i = 0; i < sentenceBox.length;i++){

			let sentence = Array.from(sentenceBox[i].innerHTML)
			sentenceBox[i].innerHTML = "&nbsp"
			let thisBox = sentenceBox[i]
			for(let words of sentence.values()){
				words.replace('。','。</br>')

				thisBox.insertAdjacentHTML('beforeend',`<p class="poemWords">${words}</p>`)
			}

		}
		wordsMotion()
	 }

	// $('#resetPoemBtn').click(()=>{
	// 	$('#poem').children().remove()
	// 	$.ajax({
	// 		url: 'https://v2.jinrishici.com/one.json',
	// 		xhrFields: {
	// 			withCredentials: true
	// 		},
	// 		success: function (result) {
	// 			let poemSenten = Array.from(result.data.origin.content)
	// 			let poemAuthor = result.data.origin
	// 			getFirstPoem(poemSenten, poemAuthor)
	// 		}
	// 	});
	// })



	function wordsMotion() {

		const motionQ = 10
		let words = document.getElementsByClassName('poemWords')

		let ranWordsList = new Set()

		do {
			ranWordsList.add(ranIndex(words))

		}
		while (ranWordsList.size < motionQ);

		var motion = anime({
			targets: ".poemWords",
			translateX: function (el, i, l) {
				return rNF(50);
			},
			translateY: function (el, i, l) {
				return rNF(10);
			},
			color: '#4d4d4d',
			duration: function (el, i, l) {
				return 3000 + (i * rNF(300));
			}

		});

		clickWord()
	}

	let s2 = Snap('#wordData')
	s2.attr({
		'width': window.screen.width/2
	})

	function clickWord() {


		$('.poemWords').click((t)=> {
			document.getElementById('bigWord').innerHTML = t.target.innerHTML
			anime({
					targets:'#bigWord',
					opacity:'1',
					color: '#4d4d4d',
					duration:5000
			})

			let obj = getAttr(t.target)[0]
			const nameOfTone = ['Nature','Level','Rise','Fall&Rise','Fall']

			for(let i=0;i<obj.getStro;i++){
				let lineW = window.screen.width/2
				let rect = s2.paper.rect(0, 100, 0, 5)

				s2.selectAll('.stroNum').remove()
				let text2 = s2.paper.text(10, 80,`
					Strokes:${[i+1]} Tone:${nameOfTone[obj.getTone]} Radical:${obj.getRadi}
				`).attr({
					'font-size': '2em',
					'fill': '#4d4d4d',
					'class':'stroNum',
					'font':'future'
				})

				rect.attr({
					 fill:'hsl(' + i*10 + ',' + i*20 + ',' + i*15 + ')'
				})
				 Snap.animate(0, lineW - i * [lineW/obj.getStro], function (val) {
				 	rect.attr({
						 width: val

				 	});
				 }, 500+i*50,mina.easein);
			}


			$('#bigTone').fadeIn(1500)
			// lo(obj)
			const toneTrans = [0,0,'-10deg',0,'15deg']
			const toneTS1 = ['90deg', 0, 0, '30deg', 0]
			const toneTS2 = [0, 0, 0, '-30deg', 0]

			let toneAni = anime({
				targets: '#bigTone',
				opacity: '1',
				skewY: toneTrans[obj.getTone],
				color: '#4d4d4d',
				duration: 5000
			})

			anime({
				targets: '#bigTone .s1',
				rotate: toneTS1[obj.getTone],
				duration: 5000
			})

			anime({
				targets: '#bigTone .s2',
				rotate: toneTS2[obj.getTone],
				duration: 5000
			})

			let ww = screen.width
			let wh = screen.height

			let getDT = [a,b,c] =['TONE:','STROKES:','RADICALS:']
			let getData = [gt,gs,gr] = [obj.getTone,obj.getStro,obj.getRadi]


			bSvg.selectAll('.attrC').remove()

			$('#introData').text('')

			for(let index of getData.keys()){
				$('#introData').append(`<a class="introDataBtn col-12">${getDT[index]}${getData[index]}</a>`)
			}

			$('.introDataBtn').click(function(){
					this.remove()
					if($('.introDataBtn').length<1){
						shapeOpen()
						$('#bigWord').fadeOut(1500)
						$('#bigTone').fadeOut(1500)
						$('#bigTrans').fadeOut(1500)
						$('#poem').fadeOut(1500)
						$('.poemHead').fadeOut(1500)

						$('#bigWord').text('')
						$('#bigTrans').text('')

						bGp.click(()=>{
							shapeClose()
						})
					}
			})












		})
		// bigWordHover()


	}

	// function bigWordHover() {
	// 	$('#bigWord').hover(function (param) {
	// 		$('#bigWord').stop(true)
	// 		$('#bigWord').animate({
	// 			transform: "scale(1.2)"
	// 		},1500)
	// 	},function (param) {
	// 		$('#bigWord').stop(true)
	// 		$('#bigWord').animate({
	// 			right: '-5vw'
	// 		}, 1500)
	// 	})
	// }









}
