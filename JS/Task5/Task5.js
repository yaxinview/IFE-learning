//事件绑定函数，浏览器兼容
function addEvent(element, event, listener) {
  if (element.addEventListener) {
    element.addEventListener(event, listener ,false);
  }
  else if (element.attachEvent) {
    element.attachEvent("on"+event, listener);//IE
  }
  else {
    element["on"+event] = listener;
  }
}

//绑定各个事件
var data = [];
var input = document.getElementById('input');
var leftIn = document.getElementById('leftIn');
var rightIn = document.getElementById('rightIn');
var leftOut = document.getElementById('leftOut');
var rightOut = document.getElementById('rightOut');
var random = document.getElementById('random');
var sort = document.getElementById('sort');
var ul  = document.getElementById('container');

//创建li标签
function creatLi(el,value) {
  el = document.createElement('li')
  el.style.height = value+'px';
  return el;
}
 
 //左侧入
  function leftInFunc(value){
    if(data.length>60) {
      alert("队列已满");
      return false;
    }else{
      var li = creatLi(li,value);
      data.unshift(value);
      ul.insertBefore(li,ul.firstChild);
    }
  }

  addEvent (leftIn,"click",function(){
    var value = parseInt(input.value);
    /^([0-9]{2}|100)$/.test(value) ? leftInFunc(value) : alert('请输入10-100的整数');
  });

  //右侧入
  function rightInFunc(value){
    if(data.length>60){
      alert("队列已满");
      return false;
    }else{
      var li = creatLi(li,value);
      data.push(value);
      ul.appendChild(li);
    }
  }

    addEvent (rightIn,"click",function(){
    var value = parseInt(input.value);
    /^([0-9]{2}|100)$/.test(value) ? rightInFunc(value) : alert('请输入10-100的整数');
  });


  //左侧出
  function leftOutFunc(){
    if(ul.firstChild != null){
      data.shift();
      ul.removeChild(ul.firstChild);
    }else{
      alert("数据已全部移除");
    }
  }

  addEvent (leftOut,"click",leftOutFunc);

  //右侧出
  function rightOutFunc(){
    if(ul.lastChild != null){
      data.pop();
      ul.removeChild(ul.lastChild);
    }else{
      alert("数据已全部移除");
    }
  }

  addEvent (rightOut,"click",rightOutFunc);

  //随机加入20个元素
  function randomFunc() {
    data.length = 0;
    ul.innerHTML = null;
    for(var i = 0; i<20; i++){
      leftInFunc(parseInt(Math.random()*90+10));
    }
  }

  addEvent(random, 'click', randomFunc);

//冒泡排序
function sortFunc(el){
  var len = data.length, temp, i, j;
  for(i = 0;i<len;i++){
    for(j = 0;j<len-i;j++){
      if(data[j]>data[j+1]){
        temp = data[j];
        data[j] = data[j+1];
        data[j+1] = temp;
        el[j].style.height = data[j]+'px';
        el[j+1].style.height = data[j+1]+'px';
      }
    }
  }
}
addEvent(sort,"click",function(){
  var li=ul.getElementsByTagName('li');
  sortFunc(li);
});
