function createElement(type,props,...children){
	let Objdom = {
		props:{},
		ref:null,
		type:null
	   }
	Objdom.type = type
	//判断是否存在props
	if(props){
		//处理ref&&type
		if(props.ref){
			Objdom.ref = props.ref;
			delete props.ref;
		};
		if(props.key){
			Objdom.key = props.key;
			delete props.key;
		};
		Object.assign(Objdom.props,props)
	}
	// console.log(Objdom.props)
	if(children.length>0){
		children.length === 1?Objdom.props.children = children[0]:Objdom.props.children = children;
	};
	//console.log(Objdom)
	return Objdom
}
export default createElement
