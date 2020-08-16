const stages=[
	{ length: 5 },   // 0. Globe rotate entry
	{ length: 2.5 }, // 1. Zoom to Vancouver
	{ length: 1},    // 2. Rotate on Vancouver
	{ length: 2.5 },  // 3. Zoom to Jixi
	{ length: 2.5 },  // 4. Zoom to Mudanjiang
	{ length: 2.5 },  // 5. Zoom to Seoul
	{ length: 2.5 },  // 6. Zoom to Taipei
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
			stagedAnimation[--stage](0)
			stagedAnimation[stage](1)
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
// const initAngle=90*piBy180+Math.PI
const initAngle=geoData['Vancouver'].phiTheta.y
const hightlightAngle=90*piBy180
// geoData['france'].phiTheta.y-=twoPi
// geoData['uk'].phiTheta.y-=twoPi
// geoData['peru'].phiTheta.y-=twoPi
// geoData['usa'].phiTheta.y-=twoPi
// geoData['canada'].phiTheta.y-=twoPi

const vars=[]
for(let i=0;i<stages.length;++i)
	vars[i]={}

const stagedAnimation=[
	/* 0 */ phase=>{
		const p=easeOutCirc(phase)
		groupContainer.rotation.y=initAngle-Math.PI*(1-p)

		const q=Math.min(phase*2,1)
		const scale=4-3*easeOutCubic(q)
		groupContainer2.scale.set(scale,scale,scale)
		groupContainer2.position.set(0,-((1-q)**2)*sizeY*1.5,(sizeY-sizeX)/2-((1-q)**2)*sizeY)
	},
	/* 1 */ phase=>{
		if(phase===0){
			vars[1].initQuaternion=new THREE.Quaternion()
			vars[1].finalQuaternion=new THREE.Quaternion()
			vars[1].finalQuaternion.setFromUnitVectors(
				new THREE.Vector3(0,1,0),
				geoData['Vancouver'].xyz.clone().multiply(new THREE.Vector3(-1,1,-1))
			)
			vars[1].initPosition=groupContainer2.position.clone()
			vars[1].finalPosition=new THREE.Vector3(0,-sizeY,0)
		}

		const p=easeInOutCubic(phase)
		groupContainer.rotation.y=initAngle+easeInCubic(phase)*piBy8
		groupContainer2.rotation.z=-piBy4*p

		THREE.Quaternion.slerp(
			vars[1].initQuaternion,
			vars[1].finalQuaternion,
			group.quaternion,
			p
		)

		groupContainer2.position.lerpVectors(
			vars[1].initPosition,
			vars[1].finalPosition,
			p
		)
		const scale=1+2*easeInOutQuart(phase)
		groupContainer2.scale.set(scale,scale,scale)
	},
	/* 2 */ phase=>{
		if(phase===0){
			vars[2].initAngle=groupContainer.rotation.y
		}
		groupContainer.rotation.y=vars[2].initAngle+phase*piBy8
	},
	/* 3 */ phasedTransitionHOF(3,'Jixi'),
	/* 4 */ phasedTransitionHOF(4,'Mudanjiang'),
	/* 5 */ phasedTransitionHOF(5,'Seoul'),
	/* 6 */ phasedTransitionHOF(6,'Taipei'),
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

function phasedTransitionHOF(i,loc){
	return phase=>{
		if(phase===0){
			vars[i].initQuaternion=group.quaternion.clone()
			vars[i].finalQuaternion=new THREE.Quaternion()
			vars[i].finalQuaternion.setFromUnitVectors(
				new THREE.Vector3(0,1,0),
				geoData[loc].xyz.clone().multiply(new THREE.Vector3(-1,1,-1))
			)
			vars[i].initAngle=groupContainer.rotation.y
		}
		groupContainer.rotation.y=vars[i].initAngle+phase*piBy8*2.5

		const p=easeInOutCubic(Math.min(phase*2.5,1))
		THREE.Quaternion.slerp(
			vars[i].initQuaternion,
			vars[i].finalQuaternion,
			group.quaternion,
			p
		)
	}
}
