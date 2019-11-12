const stages=[
	{ length: 2 },
	{ length: 2 },
	{ length: 4 },
]

let clock=0
let stage=0
let phase=0
let duration=0

{
	let start=0
	for(let stage of stages){
		stage.start=start
		start+=stage.length
	}
	duration=start
}
scrubberEle.oninput=()=>{
	clock=scrubberEle.value*duration
	animate()
}
const animation=()=>{
	while(1){
		stageObj=stages[stage]
		phase=(clock-stageObj.start)/stageObj.length
		if(phase>1){
			stagedAnimation[stage](1)
			++stage
			stagedAnimation[stage](0)
		}
		if(phase<0){
			stagedAnimation[stage](0)
			--stage
			stagedAnimation[stage](1)
		}
		break
	}
	stagedAnimation[stage](phase)
}

const lerp=(initial,final,p)=>(1-p)*initial+p*final
const smootherStep=phase=>{
	let p=phase*phase*(3-2*phase)
	return (1-phase)*p+phase*phase*(2-phase)
}

const initAngle=geoData['china'].phiTheta.y+piByTwo
const stagedAnimation=[
	/* 0 */ phase=>{
		group.rotation.y=initAngle+easeOutCubic(phase)*twoPi
		geoData['china'].material.opacity=phase
	},
	/* 1 */ phase=>{

	},
	/* 2 */ phase=>{

	},
]
