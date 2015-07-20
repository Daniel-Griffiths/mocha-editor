/*
* Plugin: Mocha Editor v1.0
* Author: Daniel Griffiths
* Created: 12/05/2015
*/

(function($) {
    $.fn.mochaEditor = function(){
        this.each(function(){

          var mocha_textbox = this;

          /* load mocha editor after each element */
          $(mocha_textbox).hide().after('<style>.mocha-editor{width:100%; font-family: Helvetica, Arial, sans-serif; height: 200px;}/* taskbar buttons */.mocha-editor .mocha-taskbar{background: #1C1F26; border-bottom: 5px solid #3D4454;}.mocha-editor .mocha-taskbar:after{content: ""; display: block; clear: both;}.mocha-editor .mocha-taskbar button{position:relative; height: 40px; background: #1C1F26; display: block; outline: none; border: none; line-height: 40px; padding: 0px 16px; color: #fff; float: left; font-size: 15px; text-align: center; cursor: pointer; transition: all 0.1s ease-out 0s; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;}.mocha-editor .mocha-taskbar button:hover{background: #3D4454;}.mocha-editor .mocha-taskbar li:hover{background:#3D4454;}/* textarea */.mocha-editor .mocha-textarea{min-height:100%; padding: 10px; outline: none; border: none; border: 1px solid #ccc;}/* arrows */.mocha-editor .mocha-taskbar .mocha-dropdown:after{content: ""; width: 0; height: 0; border-left: 3px solid transparent; border-right: 3px solid transparent; border-top-width: 3px; border-top-style: solid; border-top-color: #fff; position: absolute; top: 20px; right: 5px;}/* fullscreen */.mocha-editor.fullscreen-active{position: fixed; top: 0; left: 0; height: 100%; width: 100%;}/* dropdowns */.mocha-editor .mocha-taskbar ul{display:none; width:100%; list-style:none; margin: 0; padding: 0; position: absolute; top: 40px; left: 0; font-size: 11px;}.mocha-editor .mocha-taskbar li{background: #1C1F26; width:100%;}/* popup */.mocha-editor .mocha-popup div{display:none; position:absolute; background:#1C1F26; top: 40px; left: 0;}</style><div class="mocha-editor"> <div class="mocha-taskbar"> <button class="bold"><i class="fa fa-bold"></i></button> <button class="italic"><i class="fa fa-italic"></i></button> <button class="underline"><i class="fa fa-underline"></i></button> <button class="font-size mocha-dropdown"> <i class="fa fa-text-height"></i> <ul> <li data-val="1">11px</li><li data-val="2">12px</li><li data-val="3">13px</li><li data-val="4">14px</li><li data-val="5">15px</li><li data-val="6">16px</li><li data-val="7">17px</li></ul> </button> <button class="font-family mocha-dropdown"> <i class="fa fa-font"></i> <ul> <li data-val="Arial">Arial</li><li data-val="Courier">Courier</li><li data-val="Georgia">Georgia</li><li data-val="Times New Roman">Times New Roman</li><li data-val="Trebuchet MS">Trebuchet MS</li><li data-val="Verdana">Verdana</li></ul> </button> <button class="unordered-list"><i class="fa fa-list-ul"></i></button> <button class="ordered-list"><i class="fa fa-list-ol"></i></button> <button class="text-align"><i class="fa fa-align-left"></i></button> <button class="background-color"><i class="fa fa-tint"></i></button> <button class="link"><i class="fa fa-link"></i></button> <button class="image mocha-popup"> <i class="fa fa-picture-o"></i> <div> <form class="mocha-image-upload"> <input name="image" type="file"/> <input type="submit"/> </form> <div> </button> <button class="video mocha-popup"> <i class="fa fa-video-camera"></i> <ul> <li>coming soon</li></ul> </button> <button class="undo"><i class="fa fa-undo"></i></button> <button class="redo"><i class="fa fa-repeat"></i></button> <button class="fullscreen"><i class="fa fa-expand"></i></button> </div><div class="mocha-textarea" contenteditable="true"> blah </div></div>');

          /* send html to textarea on keyup */
          $(document).on("keyup", ".mocha-textarea", function() {
            $(mocha_textbox).html($(".mocha-textarea").html());
          });
        });

        /*
        |-------------------------------------------------------
        | Core
        |-------------------------------------------------------
        */

        /* dropdowns */
        $(document).on("click", ".mocha-editor .mocha-dropdown, .mocha-editor .mocha-dropdown li",  function(){ $(this).find('ul').toggle(); });

        /* popups */
        $(document).on("click", ".mocha-editor .mocha-popup",  function(){ $(this).find('div').toggle(); });

        /*
        |-------------------------------------------------------
        | Buttons
        |-------------------------------------------------------
        */


        /* bold */
        $(document).on("click", ".mocha-editor .bold", function(){ document.execCommand('bold',false,null); });

        /* italic */
        $(document).on("click", ".mocha-editor .italic",  function(){  document.execCommand('italic',false,null); });

        /* underline */
        $(document).on("click", ".mocha-editor .underline",  function(){  document.execCommand('underline',false,null); });

        /* font size */
        $(document).on("click", ".mocha-editor .font-size li",  function(){ document.execCommand('fontSize',false,$(this).attr("data-val")); });

        /* font family */
        $(document).on("click", ".mocha-editor .font-family li",  function(){ document.execCommand('fontName',false,$(this).attr("data-val")); });

        /* unordered list */
        $(document).on("click", ".mocha-editor .unordered-list",  function(){  document.execCommand('insertUnorderedList',false,null); });

        /* ordered list */
        $(document).on("click", ".mocha-editor .ordered-list",  function(){  document.execCommand('insertOrderedList',false,null); });

        /* text align */
        $(document).on("click", ".mocha-editor .text-align li",  function(){  document.execCommand($(this).attr("data-val"),false,null); });

        /* undo */
        $(document).on("click", ".mocha-editor .undo",  function(){  document.execCommand('undo',false,null); });

        /* redo */
        $(document).on("click", ".mocha-editor .redo",  function(){  document.execCommand('redo',false,null); });

        /* link */
        $(document).on("click", ".mocha-editor .link",  function(){
          var mocha_link = prompt("Please enter a url", "");
          document.execCommand('createLink',false,mocha_link);
        });

        /* fullscreen */
        $(document).on("click", ".mocha-editor .fullscreen",  function(){
          $(this).find('i').toggleClass('fa-compress');
          $(this).closest(".mocha-editor").toggleClass('fullscreen-active');
        });

        /* UNIFINISHED BUTTONS */

        /* background color */
        $(document).on("click", ".mocha-editor .background-color",  function(){
          var mocha_background = prompt("Please enter a hex value", "#fff");
          document.execCommand('backColor',false,mocha_background);
        });

    }
}(jQuery));
