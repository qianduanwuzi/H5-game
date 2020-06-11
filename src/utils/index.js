let util = {
    /** 
   * 精确计算浮点height/width
   * author chennan
   * data 8/22
   * @params 
   * classname: css类名
   * isHeight: true 返回高度, false 返回宽度
  */
  computeDomHeight(classname, isHeight = true) {
    let dom = document.querySelector(classname).getBoundingClientRect()
    return isHeight? dom.height : dom.width
  },
  /** 
   * 当前 or 符合条件所有dom的二维、XY
   * author chennan
   * data 8/22
   * @params 
   * classname: css类名
   * all: true 返回符合条件所有dom的二维, false 返回单个dom的二维
  */
  computeDom(classname, all = false) {
    if(!all)  return document.querySelector(classname).getBoundingClientRect()
    else {
      let all_dom = Array.prototype.slice.call(document.querySelectorAll(classname))
      let new_dimension = all_dom.map(c => c.getBoundingClientRect())
      return new_dimension
    }
  },
  /** 
   * setInterVal动画
   * author chennan
   * data 8/27
   * @params 
   * s_width: 距离
   * dom: dom_node节点
   * direction: 动画的css属性
   * animate_time: 动画时长
  */
  animateDom(s_width, dom, direction, animate_time = 1) {
    let time = 0;
    var scrolltimer = setInterval(() => {
      let speed = s_width / (animate_time*100); 
      time++;
      if (parseInt(dom.style[direction]) != 0) {
        dom.style[direction] = speed * time + "px";
      } else {
        dom.style[direction] = speed * time + "px";
      }
      if (time >= animate_time*100) { 
        clearInterval(scrolltimer);
      }
    }, animate_time/1000);
  },
  /**
   * 清楚ios端软键盘收起后底部留白
   */
  focusoutFunc() {
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
      window.scrollTo(0, 0);
    }
  },
}

export default util