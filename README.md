# H5-game
``` bash
》 现有H5都已成功上线，经得起大家开箱鉴戒思路，后续会继续放其他类H5
》 只提供大概页面动画实现思路及其他部分辅助
```

# brief
``` bash
> 基于vue
> 每个游戏js都按需加载
> 建议图片上传oss等第三方文件服务器，减少网站服务器带宽
```
# thinking
``` bash
    通过vue.extend可大面积抽出玩游戏后的抽奖页面及逻辑（不局限），通过mixins可抽出同一类游戏的逻辑，  
    多人开发时只需要专注实现页面动画实现即可（目前我们就这样做的，一个通用类游戏大概花十来分钟即可完成）
```

# H5-show
http://localhost:8080/home?tplId=23  抓粽子  
<img src="https://github.com/qianduanwuzi/img/blob/master/gif/H5-GIF-23.gif" width="450" height="600" />  
http://localhost:8080/home?tplId=10  刮刮乐  
<img src="https://github.com/qianduanwuzi/img/blob/master/gif/H5-GIF-10.gif" width="450" height="600" />  
http://localhost:8080/home?tplId=9  砸金蛋  
<img src="https://github.com/qianduanwuzi/img/blob/master/gif/H5-GIF-9.gif" width="450" height="600" />  

# tips
> 由于间接暴露源码，实属不易，放个打赏码~，有问题随时call我，后续会继续放其他类H5，参考https://juhewin.com/activity  
<img src="https://github.com/qianduanwuzi/img/blob/master/static/wx-ds.jpg" width="350" height="350" />

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
"# vue-lottery" 
