const stages=[
	{ length: 5 },    //  0. Globe rotate entry
	{ length: 2.5 },  //  1. Zoom to Vancouver
	{ length: 1},     //  2. Rotate on Vancouver

	{ length: 2.5 },  //  3. Zoom to 'Jixi'
	{ length: 2.5 },  //  4. Zoom to 'Mudanjiang'
	{ length: 2.5 },  //  5. Zoom to 'Seoul'
	{ length: 2.5 },  //  6. Zoom to 'Taipei'
	{ length: 2.5 },  //  7. Zoom to 'Shanghai'
	{ length: 2.5 },  //  8. Zoom to 'Manila'
	{ length: 2.5 },  //  9. Zoom to 'Hsinchu'
	{ length: 2.5 },  // 10. Zoom to 'Nantong'
	{ length: 2.5 },  // 11. Zoom to 'Qingdao'
	{ length: 2.5 },  // 12. Zoom to 'Wuxi'
	{ length: 2.5 },  // 13. Zoom to 'Nanjing'
	{ length: 2.5 },  // 14. Zoom to 'Tianjin'
	{ length: 2.5 },  // 15. Zoom to 'Hefei'
	{ length: 2.5 },  // 16. Zoom to 'Beijing'
	{ length: 2.5 },  // 17. Zoom to 'Hong Kong'
	{ length: 2.5 },  // 18. Zoom to 'Zhuhai'
	{ length: 2.5 },  // 19. Zoom to 'Guangzhou'
	{ length: 2.5 },  // 20. Zoom to 'Taiyuan'
	{ length: 2.5 },  // 21. Zoom to 'Loudi'
	{ length: 2.5 },  // 22. Zoom to 'Chengdu'
	{ length: 2.5 },  // 23. Zoom to 'Bangkok'
	{ length: 2.5 },  // 24. Zoom to 'Dhaka'
	{ length: 2.5 },  // 25. Zoom to 'Bangalore'
	{ length: 2.5 },  // 26. Zoom to 'Delhi'
	{ length: 2.5 },  // 27. Zoom to 'Mumbai'
	{ length: 2.5 },  // 28. Zoom to 'Shiraz'
	{ length: 2.5 },  // 29. Zoom to 'Tehran'
	{ length: 2.5 },  // 30. Zoom to 'Manama'
	{ length: 2.5 },  // 31. Zoom to "Modi'in-Maccabim-Re'ut"
	{ length: 2.5 },  // 32. Zoom to 'Beersheba'
	{ length: 2.5 },  // 33. Zoom to 'London'
	{ length: 2.5 },  // 34. Zoom to 'Polinyà de Xúquer'
	{ length: 2.5 },  // 35. Zoom to 'São Paulo'
	{ length: 2.5 },  // 36. Zoom to 'Bogotá'
	{ length: 2.5 },  // 37. Zoom to 'Toronto'
	{ length: 2.5 },  // 38. Zoom to 'León'
	{ length: 2.5 },  // 39. Zoom to 'Edmonton'
	{ length: 2.5 },  // 40. Zoom to 'Calgary'
	{ length: 2.5 },  // 41. Zoom to 'Oliver'
	{ length: 2.5 },  // 42. Zoom to 'Oakland'
	{ length: 2.5 },  // 43. Zoom to 'North Vancouver'
	{ length: 2.5 },  // 44. Zoom to 'Vancouver'              ]
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
			if(vars[1]===undefined) vars[1]={}
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
			if(vars[2]===undefined) vars[2]={}
			vars[2].initAngle=groupContainer.rotation.y
		}
		groupContainer.rotation.y=vars[2].initAngle+phase*piBy8
	},
	/*  3 */ phasedTransitionHOF( 3,'Jixi'                   ),
	/*  4 */ phasedTransitionHOF( 4,'Mudanjiang'             ),
	/*  5 */ phasedTransitionHOF( 5,'Seoul'                  ),
	/*  6 */ phasedTransitionHOF( 6,'Taipei'                 ),
	/*  7 */ phasedTransitionHOF( 7,'Shanghai'               ),
	/*  8 */ phasedTransitionHOF( 8,'Manila'                 ),
	/*  9 */ phasedTransitionHOF( 9,'Hsinchu'                ),
	/* 10 */ phasedTransitionHOF(10,'Nantong'                ),
	/* 11 */ phasedTransitionHOF(11,'Qingdao'                ),
	/* 12 */ phasedTransitionHOF(12,'Wuxi'                   ),
	/* 13 */ phasedTransitionHOF(13,'Nanjing'                ),
	/* 14 */ phasedTransitionHOF(14,'Tianjin'                ),
	/* 15 */ phasedTransitionHOF(15,'Hefei'                  ),
	/* 16 */ phasedTransitionHOF(16,'Beijing'                ),
	/* 17 */ phasedTransitionHOF(17,'Hong Kong'              ),
	/* 18 */ phasedTransitionHOF(18,'Zhuhai'                 ),
	/* 19 */ phasedTransitionHOF(19,'Guangzhou'              ),
	/* 20 */ phasedTransitionHOF(20,'Taiyuan'                ),
	/* 21 */ phasedTransitionHOF(21,'Loudi'                  ),
	/* 22 */ phasedTransitionHOF(22,'Chengdu'                ),
	/* 23 */ phasedTransitionHOF(23,'Bangkok'                ),
	/* 24 */ phasedTransitionHOF(24,'Dhaka'                  ),
	/* 25 */ phasedTransitionHOF(25,'Bangalore'              ),
	/* 26 */ phasedTransitionHOF(26,'Delhi'                  ),
	/* 27 */ phasedTransitionHOF(27,'Mumbai'                 ),
	/* 28 */ phasedTransitionHOF(28,'Shiraz'                 ),
	/* 29 */ phasedTransitionHOF(29,'Tehran'                 ),
	/* 30 */ phasedTransitionHOF(30,'Manama'                 ),
	/* 31 */ phasedTransitionHOF(31,"Modi'in-Maccabim-Re'ut" ),
	/* 32 */ phasedTransitionHOF(32,'Beersheba'              ),
	/* 33 */ phasedTransitionHOF(33,'London'                 ),
	/* 34 */ phasedTransitionHOF(34,'Polinyà de Xúquer'      ),
	/* 35 */ phasedTransitionHOF(35,'São Paulo'              ),
	/* 36 */ phasedTransitionHOF(36,'Bogotá'                 ),
	/* 37 */ phasedTransitionHOF(37,'Toronto'                ),
	/* 38 */ phasedTransitionHOF(38,'León'                   ),
	/* 39 */ phasedTransitionHOF(39,'Edmonton'               ),
	/* 40 */ phasedTransitionHOF(40,'Calgary'                ),
	/* 41 */ phasedTransitionHOF(41,'Oliver'                 ),
	/* 42 */ phasedTransitionHOF(42,'Oakland'                ),
	/* 43 */ phasedTransitionHOF(43,'North Vancouver'        ),
	/* 44 */ phasedTransitionHOF(44,'Vancouver'              ),
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
			console.log(loc,vars)
			if(vars[i]===undefined) vars[i]={}
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
