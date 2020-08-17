const stages=[
	{ length: 5 },    //  0. Globe rotate entry
	{ length: 2.5 },  //  1. Zoom to Vancouver
	// { length: 1},     //  2. Rotate on Vancouver

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
	// { length: 2.5 },  // 43. Zoom to 'North Vancouver'
	{ length: 2.5 },  // 44. Zoom to 'Vancouver'              ]
	{ length: 10 },
	{ length: 5 },
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
			// stagedAnimation[stage](1)
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
for(let i in arcs){
	setArcPhase(arcs[i],0)
}

const stagedAnimation=[
	/* 0 */ phase=>{
		const p=easeOutCirc(phase)
		groupContainer.rotation.y=initAngle-Math.PI*(1-p)-twoPi

		const q=Math.min(phase*2,1)
		const scale=4-3*easeOutCubic(q)
		groupContainer2.scale.set(scale,scale,scale)
		groupContainer2.position.set(0,-((1-q)**2)*sizeY*1.5,(sizeY-sizeX)/2-((1-q)**2)*sizeY)
	},
	/* 1 */ phase=>{
		// if(phase===0){
		// 	if(vars[1]===undefined) vars[1]={}
		// 	vars[1].initQuaternion=new THREE.Quaternion()
		// 	vars[1].finalQuaternion=new THREE.Quaternion()
		// 	vars[1].finalQuaternion.setFromUnitVectors(
		// 		new THREE.Vector3(0,1,0),
		// 		geoData['Vancouver'].xyz.clone().multiply(new THREE.Vector3(-1,1,-1))
		// 	)
		// 	vars[1].initPosition=groupContainer2.position.clone()
		// 	vars[1].finalPosition=new THREE.Vector3(0,-sizeY,0)
		// }

		// const p=easeInOutCubic(phase)
		// groupContainer.rotation.y=initAngle+easeInCubic(phase)*piBy8
		// groupContainer2.rotation.z=-piBy4*p

		// THREE.Quaternion.slerp(
		// 	vars[1].initQuaternion,
		// 	vars[1].finalQuaternion,
		// 	group.quaternion,
		// 	p
		// )

		// groupContainer2.position.lerpVectors(
		// 	vars[1].initPosition,
		// 	vars[1].finalPosition,
		// 	p
		// )
		// const scale=1+2*easeInOutQuart(phase)
		// groupContainer2.scale.set(scale,scale,scale)
	},
	// /* 2 */ phase=>{
	// 	if(phase===0){
	// 		if(vars[2]===undefined) vars[2]={}
	// 		vars[2].initAngle=groupContainer.rotation.y
	// 	}
	// 	groupContainer.rotation.y=vars[2].initAngle+phase*piBy8
	// },

	/* 05 */ phasedSequenceHOF( 5,'Seoul'                  ),
	/* 24 */ phasedSequenceHOF(24,'Dhaka'                  ),
	/* 28 */ phasedSequenceHOF(28,'Shiraz'                 ),
	/* 10 */ phasedSequenceHOF(10,'Nantong'                ),
	/* 41 */ phasedSequenceHOF(41,'Oliver'                 ),
	/* 15 */ phasedSequenceHOF(15,'Hefei'                  ),
	/* 13 */ phasedSequenceHOF(13,'Nanjing'                ),
	/* 25 */ phasedSequenceHOF(25,'Bangalore'              ),
	/* 19 */ phasedSequenceHOF(19,'Guangzhou'              ),
	/* 03 */ phasedSequenceHOF( 3,'Jixi'                   ),
	/* 09 */ phasedSequenceHOF( 9,'Hsinchu'                ),
	/* 30 */ phasedSequenceHOF(30,'Manama'                 ),
	/* 31 */ phasedSequenceHOF(31,"Modi'in-Maccabim-Re'ut" ),
	/* 38 */ phasedSequenceHOF(38,'León'                   ),
	/* 27 */ phasedSequenceHOF(27,'Mumbai'                 ),
	// /* 43 */ phasedSequenceHOF(43,'North Vancouver'        ),
	/* 16 */ phasedSequenceHOF(16,'Beijing'                ),
	/* 40 */ phasedSequenceHOF(40,'Calgary'                ),
	/* 42 */ phasedSequenceHOF(42,'Oakland'                ),
	/* 39 */ phasedSequenceHOF(39,'Edmonton'               ),
	/* 29 */ phasedSequenceHOF(29,'Tehran'                 ),
	/* 08 */ phasedSequenceHOF( 8,'Manila'                 ),
	/* 20 */ phasedSequenceHOF(20,'Taiyuan'                ),
	/* 26 */ phasedSequenceHOF(26,'Delhi'                  ),
	/* 21 */ phasedSequenceHOF(21,'Loudi'                  ),
	/* 34 */ phasedSequenceHOF(34,'Polinyà de Xúquer'      ),
	/* 07 */ phasedSequenceHOF( 7,'Shanghai'               ),
	/* 17 */ phasedSequenceHOF(17,'Hong Kong'              ),
	/* 06 */ phasedSequenceHOF( 6,'Taipei'                 ),
	/* 33 */ phasedSequenceHOF(33,'London'                 ),
	/* 36 */ phasedSequenceHOF(36,'Bogotá'                 ),
	/* 11 */ phasedSequenceHOF(11,'Qingdao'                ),
	/* 35 */ phasedSequenceHOF(35,'São Paulo'              ),
	/* 18 */ phasedSequenceHOF(18,'Zhuhai'                 ),
	/* 12 */ phasedSequenceHOF(12,'Wuxi'                   ),
	/* 14 */ phasedSequenceHOF(14,'Tianjin'                ),
	/* 32 */ phasedSequenceHOF(32,'Beersheba'              ),
	/* 37 */ phasedSequenceHOF(37,'Toronto'                ),
	/* 23 */ phasedSequenceHOF(23,'Bangkok'                ),
	/* 04 */ phasedSequenceHOF( 4,'Mudanjiang'             ),
	/* 22 */ phasedSequenceHOF(22,'Chengdu'                ),
	/* 44 */ phasedSequenceHOF(44,'Vancouver'              ),

	/* 45 */ phase=>{
		const p=easeInOutCubic(phase)
		groupContainer.rotation.y=initAngle+p*twoPi
		for(let i in arcs)
			setArcPhase(arcs[i],p*.5)
	},
	/* 46 */ phase=>{
		if(phase===0){
			if(vars[46]===undefined) vars[46]={}
			vars[46].initQuaternion=new THREE.Quaternion()
			vars[46].finalQuaternion=new THREE.Quaternion()
			vars[46].finalQuaternion.setFromUnitVectors(
				new THREE.Vector3(0,1,0),
				geoData['Vancouver'].xyz.clone().multiply(new THREE.Vector3(-1,1,-1))
			)
			vars[46].initPosition=groupContainer2.position.clone()
			vars[46].finalPosition=new THREE.Vector3(0,-sizeY*1.5,0)
		}

		const p=easeInOutCubic(phase)
		groupContainer.rotation.y=initAngle+easeInCubic(phase)*piBy2
		// groupContainer2.rotation.z=-piBy4*p

		THREE.Quaternion.slerp(
			vars[46].initQuaternion,
			vars[46].finalQuaternion,
			group.quaternion,
			p
		)

		groupContainer2.position.lerpVectors(
			vars[46].initPosition,
			vars[46].finalPosition,
			p
		)
		const scale=1+2*easeInOutQuart(phase)
		groupContainer2.scale.set(scale,scale,scale)
	}
]

function setArcPhase(arc,phase){
	phase*=4
	let l=arc.length-1,p,scale
	for(let i=0;i<=l;++i){
		p=i/l
		if(phase<=2) scale=clamp(phase-p,0,1)
		else scale=clamp(4-phase-(1-p),0,1)
		scale=Math.round(scale)+.0001

		if(phase>0 && (i===0 || i===Math.round((phase-.5)*l)))
			scale=2.5*clamp(phase*2,0,1)+.0001

		arc[i].scale.set(scale,scale,scale)
	}
}

setCountryTransparency=(country,phase)=>{
	let p=phase*2
	p=p<=1?p:2-p
	p*=2
	geoData[country].material.opacity=Math.max(10*p-9,0)
}

function phasedSequenceHOF(i,loc){
	return phase=>{
		if(phase===0){
			console.log(loc)
			if(vars[i]===undefined) vars[i]={}
			// vars[i].initQuaternion=group.quaternion.clone()
			// vars[i].finalQuaternion=new THREE.Quaternion()
			// vars[i].finalQuaternion.setFromUnitVectors(
			// 	new THREE.Vector3(0,1,0),
			// 	geoData[loc].xyz.clone().multiply(new THREE.Vector3(-1,1,-1))
			// )
			vars[i].initAngle=groupContainer.rotation.y
		}
		// groupContainer.rotation.y=vars[i].initAngle+phase*piBy8*2.5

		const p=easeInOutCubic(Math.min(phase*2.5,1))
		groupContainer.rotation.y=THREE.Math.lerp(vars[i].initAngle,geoData[loc].phiTheta.y,p)
		// THREE.Quaternion.slerp(
		// 	vars[i].initQuaternion,
		// 	vars[i].finalQuaternion,
		// 	group.quaternion,
		// 	p
		// )

		let scale
		if(phase*2.5<=.5){
			const p=easeOutExpo(phase*5)
			scale=.0001+90*p
		}else if(phase*2.5>=2){
			const p=easeInExpo((phase*2.5-2)*2)
			scale=.0001+90*(1-p)
		}else{
			scale=90
		}
		pins[loc].scale.set(scale,scale,scale)
	}
}
