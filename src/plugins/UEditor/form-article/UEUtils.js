UE.registerUI('font-color', function(editor, uiName) {
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
          fontBtn(btn,editor)
          editor.fontColor()
        },
        queryCommandState:function(){
            // console.log(editor.queryCommandState('forecolor'))
        }
    });

    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: '字体颜色',
        //添加额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position: -720px 0;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(uiName);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
      fontBtn(btn,editor)
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
},13,'formArtcile');

function fontBtn(btn,editor) {
  if(!btn.target) return
  var obj = btn.target.querySelector('.edui-button-wrap').querySelector('.edui-button-body').querySelector('.font-color');
  var color = editor.queryCommandValue('forecolor');
  var $color = document.createElement('span');
  $color.setAttribute('class', 'font-color');
  $color.setAttribute("style", `position: absolute; width: 16px; height: 4px; background: ${color}; left: 3px; right: 0; bottom: 0; margin: auto;`);
  if(obj) obj.remove();
  btn.target.querySelector('.edui-button-wrap').querySelector('.edui-button-body').append($color);
}

UE.registerUI('upload-image', function(editor, uiName) {
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
          console.log(1)
          editor.uploadImage()
        },
        queryCommandState:function(){
            // console.log(editor.queryCommandState('forecolor'))
        }
    });

    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: '插入图片',
        //添加额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position: -380px 0;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
},13,'formArtcile');

UE.registerUI('upload-video', function(editor, uiName) {
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
          editor.uploadVideo()
        },
        queryCommandState:function(){
            // console.log(editor.queryCommandState('forecolor'))
        }
    });

    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: '插入视频',
        //添加额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position: -320px -20px;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(uiName);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
},13,'formArtcile');
