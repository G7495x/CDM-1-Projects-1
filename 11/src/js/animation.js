const stages=[
	{ length: 2.5 },  //  0. Globe rotate entry + china fade in
	// { length: 2 },  //  1. China -> 0.5, Guangdong -> 1
	// { length: 2 },  //  2. Delay
	// { length: 2 },  //  3. Arcs to local
	// { length: 10 }, //  4. Globe rotation with arcs
	// { length: 2 },  //  5. Arcs finish
	// { length: 2 },  //  6. China -> 1, Guangdong -> 0
	// { length: 2 },  //  7. Delay
	// { length: 2 },  //  8. Arcs to local
	// { length: 10 }, //  9. Globe rotation with arcs
	// { length: 2 },  // 10. Arcs finish
]

let clock=0
let stage=0
let phase=0
let duration=0
let frameCount=0

{
	let start=0
	for(let stage of stages){
		stage.start=start
		start+=stage.length
	}
	duration=start
	scrubberEle.max=frameCount=duration*frameRate
}
const animation=()=>{
	while(1){
		stageObj=stages[stage]
		phase=(clock-stageObj.start)/stageObj.length
		if(phase>1){
			stagedAnimation[stage](1)
			stagedAnimation[++stage](0)
			continue
		}
		if(phase<0){
			stagedAnimation[stage](0)
			stagedAnimation[--stage](1)
			continue
		}
		break
	}
	stagedAnimation[stage](phase)
}

const smootherStep=phase=>{
	let p=phase*phase*(3-2*phase)
	return (1-phase)*p+phase*phase*(2-phase)
}

// const initAngle=geoData['china'].phiTheta.y
// const initAngle=geoData['peru'].phiTheta.y
const initAngle=30*piBy180+Math.PI
const hightlightAngle=90*piBy180
geoData['france'].phiTheta.y-=twoPi
geoData['uk'].phiTheta.y-=twoPi
geoData['peru'].phiTheta.y-=twoPi
geoData['usa'].phiTheta.y-=twoPi
geoData['canada'].phiTheta.y-=twoPi

const stagedAnimation=[
	/* 0 */ phase=>{
		const p=easeOutCirc(phase)
		group.rotation.y=initAngle-p*twoPi/2
		// geoData['guangdong'].material.opacity=phase
		// geoData['china'].material.opacity=phase

		const q=Math.min(phase*2,1)
		// const q=p
		// const scale=4-3*p
		const scale=4-3*easeOutCubic(q)
		group.scale.set(scale,scale,scale)
		group.position.set(0,-((1-q)**2)*sizeX*1.5,-((1-q)**2)*sizeX)
	},
	// /* 1 */ phase=>{
	// 	// geoData['china'].material.opacity=1-phase*.5
	// 	// geoData['guangdong'].material.opacity=phase
	// },
	// /* 2 */ phase=>{},
	/* 3 */ phase=>{
		for(let country in arcs[0]){
			if(phase==0){
				group.rotation.y=initAngle
				setArcPhase(arcs[0][country],0)
			}
			if(group.rotation.y<geoData[country].phiTheta.y){
				// setCountryTransparency(country,.5*phase)
				setArcPhase(arcs[0][country],.5*phase)
			}else{
				let p=(group.rotation.y-geoData[country].phiTheta.y)/hightlightAngle
				if(p<=1){
					p=1-p
					// setCountryTransparency(country,.5*p*phase)
					setArcPhase(arcs[0][country],.5*p*phase)
				}else{
					// setCountryTransparency(country,0)
					setArcPhase(arcs[0][country],0)
				}
			}
		}
	},
	/* 4 */ phase=>{
		group.rotation.y=initAngle-easeInOutSine(phase)*twoPi
		for(let country in arcs[0]){
			if(phase==0){
				setCountryTransparency(country,0)
				setArcPhase(arcs[0][country],0)
			}
			if(group.rotation.y<geoData[country].phiTheta.y){
				setCountryTransparency(country,.5)
				setArcPhase(arcs[0][country],.5)
			}else{
				let p=(group.rotation.y-geoData[country].phiTheta.y)/hightlightAngle
				if(p<=1){
					p=1-p
					setCountryTransparency(country,.5*p)
					setArcPhase(arcs[0][country],.5*p)
				}else{
					setCountryTransparency(country,0)
					setArcPhase(arcs[0][country],0)
				}
			}
		}
	},
	/* 5 */ phase=>{
		const p=lerp(.5,1,phase)
		for(let country in arcs[0]){
			setCountryTransparency(country,p)
			setArcPhase(arcs[0][country],p)
		}
	},
	/* 6 */ phase=>{
		// geoData['china'].material.opacity=.5+phase*.5
		geoData['china'].material.opacity=phase
		geoData['guangdong'].material.opacity=1-phase
	},
	// /* 7 */ phase=>{},
	/* 8 */ phase=>{
		for(let country in arcs[1]){
			if(phase==0){
				group.rotation.y=initAngle
				setArcPhase(arcs[1][country],0)
			}
			if(group.rotation.y<geoData[country].phiTheta.y){
				setCountryTransparency(country,.5*phase)
				setArcPhase(arcs[1][country],.5*phase)
			}else{
				let p=(group.rotation.y-geoData[country].phiTheta.y)/hightlightAngle
				if(p<=1){
					p=1-p
					setCountryTransparency(country,.5*p*phase)
					setArcPhase(arcs[1][country],.5*p*phase)
				}else{
					setCountryTransparency(country,0)
					setArcPhase(arcs[1][country],0)
				}
			}
		}
	},
	/* 9 */ phase=>{
		group.rotation.y=initAngle-easeInOutSine(phase)*twoPi
		for(let country in arcs[1]){
			if(phase==0){
				setCountryTransparency(country,0)
				setArcPhase(arcs[1][country],0)
			}
			if(group.rotation.y<geoData[country].phiTheta.y){
				setCountryTransparency(country,.5)
				setArcPhase(arcs[1][country],.5)
			}else{
				let p=(group.rotation.y-geoData[country].phiTheta.y)/hightlightAngle
				if(p<=1){
					p=1-p
					setCountryTransparency(country,.5*p)
					setArcPhase(arcs[1][country],.5*p)
				}else{
					setCountryTransparency(country,0)
					setArcPhase(arcs[1][country],0)
				}
			}
		}
	},
	/* 10 */ phase=>{
		const p=lerp(.5,1,phase)
		for(let country in arcs[1]){
			setCountryTransparency(country,p)
			setArcPhase(arcs[1][country],p)
		}
	},
]

function setArcPhase(arc,phase){
	phase*=4
	let l=arc.dots.length-1,p,scale
	for(let i=0;i<=l;++i){
		p=i/l
		if(phase<=2) scale=clamp(phase-p,0,1)
		else scale=clamp(4-phase-(1-p),0,1)
		scale=Math.round(scale)+.0001
		arc.dots[i].scale.set(scale,scale,scale)
	}
}

setCountryTransparency=(country,phase)=>{
	let p=phase*2
	p=p<=1?p:2-p
	p*=2
	geoData[country].material.opacity=Math.max(10*p-9,0)
}
