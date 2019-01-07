window.onload = function(){


	let lo = x => console.log(x)
	let rNF = x => Math.floor(Math.random() * x)
	let ranIndex = x => Math.floor(Math.random() * x.length)

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

	
	let createImg = link => `<img class="gaImg p-2 col-sm-6 col-lg-4" src="${link}"></div>`;
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

			$('#closeImg').click(function () {
				$('.viewImg').fadeOut();
				setTimeout(() => {
					$('.viewImg').remove()
				}, 1000);
			  })
		})
	});

	//----------------

	
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

	$('#resetPoemBtn').click(()=>{
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
				let rect = s2.paper.rect(0, 100, 0, 10)

				s2.selectAll('.stroNum').remove()
				let text2 = s2.paper.text(10, 80,`
					Strokes:${[i+1]} Tone:${nameOfTone[obj.getTone]}
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

			

			lo(obj.getTone)
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
