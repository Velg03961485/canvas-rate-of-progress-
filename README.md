# canvas-rate-of-progress-
基于canvas绘制的环状进度图，附带，名称，目标，完成百分比

![image](https://github.com/Velg03961485/canvas-rate-of-progress-/blob/master/img/1555921074(1).png)

##使用方式
        依赖于小程序的canvas插件

```
<canvas style="width: 120px; height: 138px;" class='canvasStyle' canvas-id="ccanvas"></canvas>
```
控制canvas的大小，应该和js中传入插件的width,height 一样

在js中，首先引入插件地址</br>
```
const cricleChart = require('../../utils/circleCanvas.js'); 
//然后在函数中，crate一个新的对象，传入所需要的值
// 环状进度图
  getRingInfo(data1, data2){
    new cricleChart({
      id: "ccanvas",
      cax: 130,
      cah: 190,
      title: '目标',
      target: data1.target,
      finish: data1.sale,
      color: '#c4cdf2',
    })
  },
```

这里需要注意，在注入值的时候，一定要做防空处理

