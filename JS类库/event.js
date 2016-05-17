/**
 * Created by 岩 on 2016/4/19.
 * 为兼容不同浏览器，将不同浏览器的属性或方法封装在一个对象中
 */
/****************************************************
 ***********        事件处理     *****************
 *********************************************************/

/**********        事件对象event         *****************/
var eventUtil={
    //添加句柄             添加事件
    addHandler:function(element,type,handler)  //（事件的主体，事件名称，触发的操作）
    {
        if(element.addEventListener)              //DOM2
        {
            element.addEventListener(type,handler,false);
        }
        else if(element.attachEvent)               //DOM0
        {
            element.attachEvent('on'+type,handler);
        }
        else                                       //IE
        {
            element['on'+type]=handler;
        }
    },
    //删除句柄                   删除事件
    removeHandler:function(element,type,handler)  //（事件的主体，事件名称，触发的操作）
    {
        if(element.removeEventListener)             //DOM2
        {
            element.removeEventListener(type,handler,false);
        }
        else if(element.detachEvent)                //DOM0
        {
            element.detachEvent('on'+type,handler);
        }
        else                                          //IE
        {
            element['on'+type]=null;
        }
    },
    //
    getEvent:function(event)
    {
         return event?event:window.event;
    },
    //获取事件类型
    geType:function(event)
    {
        return event.type;           //DOM和IE中字段相同
    },
    //获取事件目标
    getElement:function(event)
    {
        return event.target||event.srcElement;      //DOM||IE
    },
    //阻止事件的默认行为
    preventDefault:function(event)
    {
        if(event.preventDefault)        //DOM
        {
            event.preventDefault();
        }
        else                            //IE
        {
            event.returnValue=false;
        }
    },
    //阻止事件冒泡
    stopPropagation:function(event)
    {
        if(event.stopPropagation)       //DOM
        {
            event.stopPropagation();
        }
        else                           //IE
        {
            event.cancerlBubble=true;
        }
    },
}