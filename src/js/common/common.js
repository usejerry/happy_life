export default {
    //打开第二层弹层
    popWindow2 : function(popID){
        var obj=$("#"+popID);
        var width=obj.width();
        var height=obj.height();
        var popTop=obj.height()/2;
        var popLeft=obj.width()/2; 
        obj.css({"margin-top":-popTop,"margin-left":-popLeft}).fadeIn();
    },
    //关闭第二层弹层
    popClose2 : function(popID){
        $('.dialog ,#'+popID).fadeOut();
    },
    stopDefault : function(event){
        if(event && event.preventDefault){
            event.preventDefault();
        }else{
            window.event.returnValue = false;
        }
    },
    //检测号码正确性
    checkPhone : function(phonenum){
        return /^(13|14|15|17|18|19)\d{9}$/.test(phonenum);
    },
    checkEmail: function(email){
        return /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
    },
    picPreload : function(src,cb){
        var img = new Image();
        img.onload = function(){
            // console.log(src+':加载好了，请享用');
        }
        img.src = src;
    },
    getUrlParam : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        // if (r != null) return r[2];
        if (r != null){
            var reg2 = new RegExp("\\+","g");
            var r2 = r[2].replace(reg2, "%20");
            // return decodeURIComponent(r[2]);
            return decodeURIComponent(r2);
        }
        return "";
    },
    getUrlHash : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var index = window.location.hash.indexOf("?");
        var r = window.location.hash.substr(index+1).match(reg);
        // if (r != null) return r[2];
        if (r != null){
            var reg2 = new RegExp("\\+","g");
            var r2 = r[2].replace(reg2, "%20");
            // return decodeURIComponent(r[2]);
            return decodeURIComponent(r2);
        }
        return "";
    },
    hostUrl : function(){
        return __CDNPATH
    },
    openTips : function(msg){
        let $pop = $(".pop-tips").parents(".popup");
        $pop.css("display","block");
        $pop.find(".msg").html(msg);
        setTimeout(function(){
            $pop.find(".popup-mask").addClass("show");
            $pop.find(".popup-box").addClass("show");
        },300);
        // $("#JtipsPop .msg").html(msg);
        // this.popWindow("JtipsPop");
    },
    closeTips : function(){
        let $pop = $(".pop-tips").parents(".popup");
        $pop.find(".close").click(function(){
            $pop.find(".popup-mask").removeClass("show");
            $pop.find(".popup-box").removeClass("show");
            setTimeout(function(){
                $pop.css("display","none");
                $pop.find(".msg").html("");
            },300);
        });
    },
    openTips2 : function(msg){
        $("#JtipsPop2 .msg").html(msg);
        this.popWindow("JtipsPop2");
    },
    failCallback : function(msg){
        if(typeof(msg) == "string"){
            $("#JtipsPop .msg").html(msg);
            this.popWindow("JtipsPop");
        }else{
            $("#JtipsPop .msg").html(JSON.stringify(msg));
            this.popWindow("JtipsPop");
        }
    },
    isTwitter : function(){
        return  /twitter/i.test(navigator.userAgent.toLowerCase());
    },
    isLine : function(){
        return /line/i.test(navigator.userAgent.toLowerCase());
    },
    createPd(){
        if(document.getElementById('preventTran') === null){
             var imgData = 'data:image/png;base64,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';
             pd = document.createElement('div');
             pd.setAttribute('id','preventTran');
             pd.style.position = 'fixed';
             pd.style.left = '0';
             pd.style.top = '0';
             pd.style.width = '100%';
             pd.style.height = '100%';
             pd.style.overflow = 'hidden';
             pd.style.backgroundColor = '#2e2e2e';
             pd.style.textAlign = 'center';
             pd.style.zIndex = '99999';
             document.getElementsByTagName('body')[0].appendChild(pd);
             var img = document.createElement('img');
             img.src = imgData;
             pd.appendChild(img);
             img.style.margin = '60px auto 30px'
             var br = document.createElement('br');
             var p = document.createElement('p');
             p.style.width = '100%';
             p.style.height = 'auto';
             p.style.fontSize = '22px';
             p.style.color = '#626262';
             p.style.lineHeight = '34px';
             p.style.textAlign = 'center';
             p.innerHTML = '为了您的良好体验';
             p.appendChild(br);
             p.innerHTML += '请将手机/平板竖屏操作';
             pd.appendChild(p);
         }
    },
    rotate(){
        var orientation=window.orientation;
        var pd = null;
        if(orientation==90||orientation==-90){
            if(pd == null && document.getElementById('preventTran') === null) createPd();
            document.getElementById('preventTran').style.display = 'block';
       }
       window.onorientationchange=function(){
          if(pd == null && document.getElementById('preventTran') == null) createPd();
          document.getElementById('preventTran').style.display='none';
          rotate();
       };
    },
    // 手机振动
    startVibrate(duration) {
        navigator.vibrate(duration);
    },
    // 二进制和十进制的转化  使用选择卡片 比如：10选3 返回 选中的卡片下标 s数组
    binaryConversion(tenNum,len){
        
        let er = tenNum.toString(2)        // 十转二进制
        let er_data = ''
        let er_arr = []
        if(er.length <len){
            for(var i=0;i<9-er.length;i++){
                er_data+= '0'
            }
            er_data = er_data + er
        }else{
            er_data = er
        }
        let er_arr2 =er_data.split('').reverse()
        let imgs =[]
        er_arr2.forEach((item,index)=>{
            if(item == '1'){
                imgs.push(index)
            }
        })
        return imgs
    },
    // 一键复制
	textcode(text){
        var n = document.createElement("input");
        n.setAttribute("value", text)
          document.body.appendChild(n);
          n.select();
          document.execCommand("copy");
          document.body.removeChild(n);
          alert("\u590d\u5236\u6210\u529f")
    },
    // 解决跨域问题
    getImages(_url) {
        if (_url !== undefined) {
          let _u = _url.substring(7);
          return `https://images.weserv.nl/?url=${_u}`;
        }
    },
    setManagement(name,text){
        if(this.getUrlParam('share_key')!=''){
            MShare.report({
                monitor : `${name}_nq`, 
                desc : `${text}(内嵌)` 
            });
            gtag('event', `${text}(内嵌)`);
        }else{
            MShare.report({
                monitor : `${name}_nq`, 
                desc : text
            });
            gtag('event', text);
        }
    }

}