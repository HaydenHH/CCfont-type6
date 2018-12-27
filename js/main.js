window.onload = function(){


	let lo = x => console.log(x)


	//-------------------------


	let svgBox = document.getElementById('svg1')
	let dot = document.getElementById('topDot')
	let letterBox = document.getElementById('front')
	let sendBtn = document.getElementById('sendEmail')


	window.onscroll = function(x){
		let dotT = dot.getBoundingClientRect().top 
		let letterTop = letterBox.getBoundingClientRect().top 
		
		if(-300<dotT&&dotT<0){
			lo(dotT)
			let bk = document.getElementById('back')
			let ft = document.getElementById('front')
			let bkMove = parseInt(dotT)
			let ftMove = parseInt(dotT)
			
			// bk.style.setProperty('bottom', + bkMove + 'px')
			$('#back').css({
				'bottom': bkMove + 'px'
				
			})
			$('#front').css({
				'bottom': ftMove + 'px'
				
			})
			
		}
		

		
	}



	//mailto:sample@fly63.com?subject=test&cc=sample@hotmail.com&subject=主题&body=xxx
	




}
