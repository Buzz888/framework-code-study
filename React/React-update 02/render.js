// const VNodeType = {
//     // 组件待扩展
//     HTML:'HTML',
//     TEXT:'TEXT',
//   }
function render(vnode,node,callback){
    
    if(node.vnode==null){
        mount(vnode,node,null)
    }else{
        updata(node.vnode,vnode,node)
    }
    node.vnode = vnode;
    callback && callback();
}
function mount(vnode,node,refnode){
    let el = document.createElement(vnode.type)
    vnode.el = el
    if(vnode.props){
        //props添加
        for (let key in vnode.props) {
            setprops(el, key, null, vnode.props[key])
          }
    }
    node.appendChild(el)
    //处理文本/节点
    if(vnode.children){
    for(let i = 0; i<vnode.children.length;i++){
        if(typeof vnode.children[i] === 'string'){
            createText(el,vnode.children[i])
        }else{
           mount(vnode.children[i],el)
        }
    }
    }
}
//处理class style id
function setprops(el,key,oldval,newval){
    switch(key){
        case 'style':
           for(let stykey in newval){
               el.style[stykey] = newval[stykey];
           };
           break
        case 'className':
           el.className = newval;
           break;
        default: if(key[0] === '@'){
            if (oldval) {
                el.removeEventListener(key.slice(1), oldval);
              };
            if (newval){
                el.addEventListener(key.slice(1),newval);
            }
        }else{
                el.setAttribute(key, newval);
            }
            break;   
        }}
//处理文本
function createText(node,text){
        let elm = document.createTextNode(text);
        node.appendChild(elm);
}
//更新操作
function updata(oldval, newval, node){

    //=>都改变只能全部重新渲染
    if(oldval.flags !== newval.flags){
        replaceVNode(oldval, newval, node);
    }
    //=>判断文本和元素
    else if(newval.flags === VNodeType.HTML){
        patchElement(oldval, newval, node);
    }else if(newval.flags === VNodeType.TEXT){}

}
function replaceVNode(prevVNode, nextVNode, container) {
    container.removeChild(prevVNode.el);
    mount(nextVNode, container);
}
function patchElement(oldval, newval, node){
    // 如果新旧 VNode 描述的是不同的标签，则调用 replaceVNode 函数使用新的 VNode 替换旧的 VNode
  if (oldval.type !== newval.type) {
    replaceVNode(oldval, newval, node);
    return
  }
  //获取el
  const el = (newval.el = oldval.el);
  //更新class style
  if(newval.props){
    for (let key in newval.props) {
        const prevValue = oldval.props[key]
        const nextValue = newval.props[key]
        setprops(el, key, prevValue, nextValue)
      }

  }
  //删除
  if(oldval.props){
    for (let key in oldval.props) {
        const prevValue = oldval.props[key]
        if (prevValue && !newval.props.hasOwnProperty(key)) {
            setprops(el, key, prevValue, null)
        }
      }
  }
  // 调用 patchChildren 函数递归的更新子节点
  patchChildren(
    oldval.children, // 旧的 VNode 子节点
    newval.children, // 新的 VNode 子节点
    el, // 当前标签元素，即这些子节点的父节点
    oldval
  )
   
}
function patchChildren(oldc,newc,el){
    if(typeof oldc[0] === 'string'){
        
        uptext(newc[0],el)
    }else if(typeof newc[0] === 'string'){
        createText(el,newc[0])}
    if(oldc.length<=newc.length){

    for(let i=0;i<newc.length;i++){
        if(typeof newc[i] === 'string'){
            continue;
        };
        if(typeof oldc[i] ==='undefined'){
            mount(newc[i],el);
            continue;
        }
        updata(oldc[i],newc[i],el)
    }}else{
        for(let i =0;i<oldc.length;i++){
            if(typeof newc[i] === 'string'){
                continue;
            };
            
            if(typeof newc[i] ==='undefined'){
                el.removeChild(oldc[i].el);
                continue;
            }
             updata(oldc[i],newc[i],el)
            
        }
       
    }

    
    }
    
function uptext(text,el){
    el.firstChild.nodeValue = text
}