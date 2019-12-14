
//为每一个确定类型以便下次渲染
const VNodeType = {
	// 组件待扩展
	HTML:'HTML',
	TEXT:'TEXT',
  }
function createElement(type,props=null,...children){
	let flags // =>设置父节点类型
	if(typeof type === 'string'){
		flags = VNodeType.HTML
	}else if(typeof type === 'function'){
		//组件
		flags = VNodeType.COMPONENT
	}else{
		flags = VNodeType.TEXT
	}
	let ref = null;
	let key = null;
	//判断是否存在props
	if(props){
		//处理ref&&type
		if(props.ref){
		  ref = props.ref;
			delete props.ref;
		};
		if(props.key){
			key = props.key;
			delete props.key;
		};
	}
	// 返回 VNode 对象
	return {
		flags,
		type,
		props,
		key,
		ref,
		children,
		el: null
	  }
}


