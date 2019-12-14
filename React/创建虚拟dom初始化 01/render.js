function render(elem,node,callback){
	let {type,props,key,ref} = elem;
	let element = document.createElement(type);
	for(let key in props ){
		//处理className
		if(key === 'className'){
			element.className = props[key];
			continue;
		};
		//处理style
		if(key === 'style' ){
			let style = props['style'];
			for(let stykey in style){
				element.style[stykey]=style[stykey];
			}
			continue;
		};
		//处理每一个children属性
		if(key === 'children'){
			let val = props['children']
				let childrenArr = Array.isArray(val) ? val : [val]
				childrenArr.forEach((item,i)=>{
					if(typeof item === 'string'){
						element.appendChild(document.createTextNode(item))
					return	}
					render(item,element)});
				continue}
		element.setAttribute(key,props[key])
		
	}
	console.log(element)
	node.appendChild(element)
	callback && callback()
}

export default render