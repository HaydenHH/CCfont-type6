window.onload = function(){



	anime({
		targets:'#logo',
		backgroundColor: 'rgb(237, 195, 41)',
		duration:500,
		easing: 'linear'
	})
	anime({
		targets: '#beginSvg',
		translateY:'50px',

		duration: 1500,
		easing: 'linear'
	})

	let lo = x => console.log(x)
	let rNF = x => Math.floor(Math.random() * x)
	let ranIndex = x => Math.floor(Math.random() * x.length)

	let trm = (t,x,y)=>{
		let m = new Snap.Matrix()
		m.translate(x,y)
		if(t==='t'){
			return m
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
	let pSvg = Snap('#pSvg')

	var goStop = false
	var down = true

	const ww = $(window).width()
	const	wh = $(window).height()
	const bgc = $('#logo').css('backgroundColor')
	const bgcL = 'rgb(237, 205, 21)'
	let [cc, rc, tc] = ['#00A6FF','#FF4D4D','#00AC8E']
	if ($(window).width()<1068){
		var BGsize = 5
	}else{
		var BGsize = 5
	}
	let [x,y,r] = [ww/4,wh/2.5,wh/BGsize]
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
		id:'bgRect',
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
	var bGp = bSvg.g(bRect,bCir,bTrg).attr({
		class:'bGp'
	})
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
				$('#poem').children().remove()
				let poemSenten = Array.from(result.data.origin.content)
				let poemAuthor = result.data.origin
				getFirstPoem(poemSenten, poemAuthor)

				let createWave = ()=>{
					pSvg.selectAll('.pCir').remove()
					let cX = $('#pSvg').width() / 2
					let cY = $('#pSvg').height() / 2
					for(let i=0;i<rNF(10);i++){
						let center = [cX + rNF(300) - rNF(300), cY + rNF(300) - rNF(300)]
						let size = cX/2-rNF(100)
						let delay = i*100
						let pCirL = pSvg.paper.circle(center[0], center[1], 10).attr({
							fill: bgc,
							opacity:0.5,
							id: `pCirL${i}`,
							class:'pCir'
						})
						let pCirS = pSvg.paper.circle(center[0], center[1], 10).attr({
							fill:bgcL,
							opacity:0.5,
							id: `pCirS${i}`,
							class:'pCir'
						})
						let moL = anime({
							targets: `#pCirL${i}`,
							r: size,
							opacity: 0.2,
							delay:delay,
							duration: 2000
						})
						let moS = anime({
							targets: `#pCirS${i}`,

							r: size-0.1,
							delay:delay,
							duration: 3500
						})
						var clearPCir = moL.finished.then(() => {
							$('.pCir').fadeOut(300)
						});
					}

				}

				$(window).one(createWave())


			}
		});
	})


		bGp.hover(()=>{
			$('#logo').css({
				backgroundColor: bgcL
			})


			bGp.animate({
				transform: ` translate(0,-20)`,
				//fill:'blue'
			}, 300)
		}, () => {
			bGp.animate({
				transform: `translate(0,0)`,
				// fill: bgc
			}, 300)

			$('#logo').css({
				backgroundColor: 'rgb(237, 195, 41)'
			})
		})

		let shapeOpen = ()=>{
			bCir.animate({
					//fill:cc,
			},300,mina.easeout)
			bTrg.animate({
					//fill:tc,
					transform:`rotate(0,${[x3]}) tranlate(${-0.5*r},${0.5*r})`
			},300,mina.easeout)
			bRect.animate({
					//fill:rc,
					transform:`rotate(0,${x},${y}) translate(${0.5*r},${-0.3*r}) scale(0.8)`
			},300,mina.easeout)

			var mouseMotion = () =>{
				goStop = false
				if (goStop) {
					document.getElementById('beginSvg').removeEventListener('mousemove')
				}
				function go(tar, x, y, xT, yT) {

					let tarA = tar.animate({
						transform: `tranlate(${x/xT},${y/yT})`
					}, 700, mina.easein);


				}
				let bGpShape = bSvg.selectAll('.bgShape')

				document.getElementById('beginSvg').addEventListener('mousemove',(e)=>{
					if (goStop) {
						return false
					}
					var target = e.target || e.srcElement,
						rect = target.getBoundingClientRect(),
						btWidth = rect.right - rect.left,
						btHeight = rect.top - rect.bottom,
						offsetX = e.clientX - rect.left,
						offsetY = e.clientY - rect.top;

					var cenX = btWidth / 2,
						cenY = btHeight / 2;

					var goX = [cenX - offsetX] / 0.5,
						goY = [cenY - offsetY] / 0.5;


					go(bGpShape[0], goX, goY, 10, 15)
					go(bGpShape[1], -goX, -goY, 15, 15)
					go(bGpShape[2], goX, -goY, 3, 25)

				})


			}
			mouseMotion()

		}

		let shapeClose = ()=>{
			goStop = true


			setTimeout(() => {
				bCir.animate({
					fill: bgc,
					transform: `translate(0,0)`,
				}, 300, mina.easein)
				bTrg.animate({
					fill: bgc,
					transform: `rotate(30,${[x3]}) `
				}, 400, mina.easeout)
				bRect.animate({
					fill: bgc,
					transform: `rotate(0,${x2},${y2}) translate(${-r},0)`
				}, 500, mina.linear)
			}, 1000);

			if(down){
				setTimeout(() => {
					document.getElementById('inp1').scrollIntoView({
						behavior: 'smooth',
						block: 'center'
					})
				}, 1500);
			}
			down = false;

		}

		var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
		if(iOS){
			screen.onorientationchange = ()=>{
				document.location.reload()
			}
		}else{
			window.onresize = ()=>{
				document.location.reload()
			}
		}






	//create Gallery
	let createImg = link => `<img class="img-fluid gaImg rounded my-auto  p-2 col-12 col-md-6 col-lg-4" src="${link}">`;
	let ranListSet = new Set()
	const imgQ = imgLink.length;
	lo(imgQ)
	let loadQ = 6

	do {
		ranListSet.add(imgLink[ranIndex(imgLink)])
	} while (ranListSet.size<loadQ);

	let ranList = Array.from(ranListSet);

	for(let link of ranList.values()){
		$('#gallery').append(createImg(link))
	}

	var Q = 6
	$('#gaBtn').click((t)=>{

		if(Q<imgQ-9){

			Q = Q + 3
		}else{
			alert('SORRY,YOUR BROSWER WILL BE TIRED (´ﾟдﾟ`)')
			return false
		}

		do {
			let rIndex = ranIndex(imgLink)
			ranList.splice(rIndex,1)
			ranListSet.add(imgLink[rIndex])
		} while (ranListSet.size < loadQ+Q);

		let arr = Array.from(ranListSet)

		let newLink = arr.slice(arr.length - 3, arr.length)
		for(let link of newLink.values()){
			let newLink = createImg(link)

			$('#gallery').append(newLink)
			addEvt(Array.from(document.querySelectorAll('.gaImg:last-child')))
			//lo(document.querySelector('.gaImg:last-child'))
		}
		document.getElementById('ausor').scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		})

		lo($('.gaImg').length)

	})

	let addEvt =(eles)=>{

		eles.forEach((t)=> {
			t.addEventListener('click',cloBtn = (t)=>{
			let href = t.target.src
			$('body').append(`
				<div class="viewImg">
					<img src="${href}" class="img-responsive">
					<button class="closeImg btn">
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

			Array.from(document.getElementsByClassName('closeImg')).forEach((t)=>{
				t.addEventListener('click',()=>{
					$('.viewImg').fadeOut();
					setTimeout(() => {
						$('.viewImg').remove()
					}, 1000);
				})
			})

			})
		});
	}
	addEvt(Array.from(document.getElementsByClassName('gaImg')))
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

	let nCir = svgNext.paper.circle(20,60,10).attr({
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
		let sen = data
		document.getElementById('poemTitleHead').innerText = auth.title
		document.getElementById('poemAuthorHead').innerText = '(' + auth.dynasty + ')' + auth.author
		let sentenceBox = document.getElementsByClassName('sentences')
		for(let sentences of sen.values()){
			$('#poem').append(`<div class="sentences">${sentences}</div>`)
			if(sentenceBox.length >10){

			}
		}

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
				let rect = s2.paper.rect(0, 100, 0, 5)

				s2.selectAll('.stroNum').remove()
				let text2 = s2.paper.text(0, 80,`
					Strokes:${[i+1]} Tone:${nameOfTone[obj.getTone]} Radical:${obj.getRadi}
				`).attr({
					'font-size': '1.5em',
					'fill': '#4d4d4d',
					'class':'stroNum',
					'font':'future'
				})

				rect.attr({
					 fill:'hsl(' + i*10 + ',' + i*20 + ',' + i*15 + ')',
					 class:'dataBar'
				})
				 Snap.animate(0, lineW - i * [lineW/obj.getStro], function (val) {
				 	rect.attr({
						 width: val

				 	});
				 }, 500+i*50,mina.easein);
			}

			$('#bigTrans').fadeIn(1500)
			$('#bigTone').fadeIn(1500)

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

			anime({
				targets:'.introDataBtn',
				translateX:'100px',
				duration: function (el, i, l) {
					return 500 + (i * 100);
				},
				 easing: 'easeInQuart'
			})



			let season = [sp,su,au,wi]=[CBL.slice(0,4),CBL.slice(4,8),CBL.slice(8,12),CBL.slice(12,16)]

			let getColor=(t)=>{
				if(t=='0'){
					t++
				}
				let thisColor = season[t-1][rNF(4)].allColor
				return thisColor[ranIndex(thisColor)]
			}

			$('.introDataBtn:eq(0)').click(function () {
				let toneStr = this.innerHTML.toString()
				let endIndex = toneStr.indexOf(':')
				let tone = toneStr.slice(endIndex+1,toneStr.length)


				bTrg.animate({
					fill: getColor(obj.getTone),
					transform: `rotate(${15-obj.getTone*5},${[x3]}) )`
				}, 300)
			})
			$('.introDataBtn:eq(1)').click(function () {
				bRect.animate({
					fill: getColor(obj.getTone),
					transform: `rotate(0,${x2},${y2}) translate(${-r+obj.getStro*20},0)`
				}, 300)
			})
			$('.introDataBtn:eq(2)').click(function () {

				bCir.animate({
					fill: getColor(obj.getTone),
					transform: `translate(${10-obj.getStro*2},${10-obj.getStro*2}) scale(${1-obj.getStro*0.01})`,
				}, 300)
			})

			var OP
			$('.introDataBtn').click(function(){
					this.remove()

					lo(this.innerHTML)


					if($('.introDataBtn').length<1){

						 OP = setTimeout(() => {
							shapeOpen()
						}, 1500);
						OP

						let remove =()=>{
							$('#bigWord').fadeOut(1000)
							$('#bigTone').fadeOut(1000)
							$('#bigTrans').fadeOut(1000)
							$('#poem').fadeOut(1000)
							$('.poemHead').fadeOut(1000)
							s2.selectAll('.stroNum').remove()
							s2.selectAll('.dataBar').remove()
							$('#bigWord').text('')
							$('#bigTrans').text('')
						}
						remove()


						bGp.click(()=>{
							clearTimeout(OP)
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
