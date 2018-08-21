import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ViewBase from "../ViewBase";

import "./Rice.styl";

export default class RiceTextEditor extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      insertImageSrc: "",
    };
    this.openImage = this.openImage.bind(this);
    this.imageHandle = this.imageHandle.bind(this);
    this.textHandle = this.textHandle.bind(this);
    this.getChildren = this.getChildren.bind(this);
    this.addP = this.addP.bind(this);
    this.addImageDiv = this.addImageDiv.bind(this);
    this.findFather = this.findFather.bind(this);
    this.addItalic = this.addItalic.bind(this);
    this.addBold = this.addBold.bind(this);
    this.addHorLine = this.addHorLine.bind(this);
    this.addLink = this.addLink.bind(this);
  }

  imageHandle(e) {
    console.log("value", this.refs["file"].value);
    let file = this.refs["file"].files[0];
    var reader = new FileReader();
    var imgUrlBase64 = "";
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        imgUrlBase64 = reader.result;
        console.log(imgUrlBase64);
        this.setState({
          insertImageSrc: imgUrlBase64
        });
        // 必须获取焦点才能exec
        document.querySelector(".editor-place").focus();
        let result = document.execCommand("insertImage", false, imgUrlBase64);
        console.log("exec result: " + result);
        // this.imageSetStyle(imgUrlBase64);
        // this.getChildren(document.querySelector(".editor-place"), this.addImageDiv(this,imgUrlBase64));
        this.getChildren(document.querySelector(".editor-place"), this.addImageDiv);
      }
    }
  }

  imageSetStyle(src) {
    let father = document.querySelector(".editor-place");
    father.childNodes.forEach((item, index) => {

      if(item.nodeName === "IMG") {
        let myImg = document.createElement("img");
        let myDiv = document.createElement("div");
        myDiv.setAttribute("style","text-align:center");
        myDiv.setAttribute("class","test");
        myImg.setAttribute("style","width:80%");
        myImg.setAttribute("src",src);
        myDiv.appendChild(myImg);
        debugger;
        item.parentNode.replaceChild(myDiv, item);
        // myDiv.addEventListener("keydown", function (e) {
        //   console.log("imgTest", e);
        // }, true)
      }
    });
  }

  openImage() {
    // this.refs["label"].click();
    // this.refs["label"].onchange = this.imageHandle;
    this.refs["file"].click();
    this.refs["file"].onchange = this.imageHandle;
  }

  textHandle(e) {
    // let father = document.querySelector(".editor-place")
    // let fatherChildNodes = father.childNodes;
    // // debugger;
    // console.log("in show ...", fatherChildNodes);
    // fatherChildNodes.forEach((item, index) => {
    //
    //   console.log(index,"item is ->", item, item.nodeName);
    //   if(item.nodeType ==3) {
    //     console.log("item is a text node : ",item);
    //     let mySpan = document.createElement("p");
    //     mySpan.setAttribute("style","font-size:30px");
    //     mySpan.appendChild(item.cloneNode() );
    //     item.parentNode.replaceChild(mySpan, item);
    //   }
    //
    // });
  }

  //为图片加入不可编辑的div (contentEditable为false 就删不掉图了)
  addImageDiv(imgDom) {
    console.log("进入 addImageDiv");
    if(imgDom.parentNode.className ==="editor-place" || imgDom.parentNode.nodeName !=="DIV") {
      let myDiv = document.createElement("div");
      myDiv.style.textAlign = "center";
      myDiv.setAttribute("contentEditable", "false");
      myDiv.className = "imgDiv";
      myDiv.appendChild(imgDom.cloneNode(true));
      imgDom.parentNode.replaceChild(myDiv,imgDom);
      debugger;
      // this.findFather(document.querySelector(".editor-place"));
      let father = myDiv.parentNode.parentNode;
      let tempNode = myDiv.cloneNode(true);
      myDiv.parentNode.removeChild(myDiv);
      father.appendChild(tempNode);
    }
  }

  // 为文本节点加入<p>
  addP(dom) {
    if (dom.parentNode.nodeName !== "P") {
      let myP = document.createElement("p");
      myP.style.fontSize = "30px";
      myP.appendChild(dom.cloneNode());
      dom.parentNode.replaceChild(myP, dom);

    }
  }

  addBold(e) {
    console.log(e.target);
    let command = e.target.dataset.exec;
    console.log(command);

    let selection = document.getSelection();
    let range = selection.getRangeAt(0);
    let span = document.createElement("span");
    span.style.fontWeight = "bold";
    range.surroundContents(span);
    // document.execCommand(command);
  }

  addItalic(e) {
    let selection = document.getSelection();
    let range = selection.getRangeAt(0);
    let span = document.createElement("span");
    span.style.fontStyle = "italic";
    range.surroundContents(span);
  }

  addHorLine(e) {
    let selection = document.getSelection();
    let range = selection.getRangeAt(0);
    let span = document.createElement("span");
    span.style.fontStyle = "italic";
    range.surroundContents(span);
  }

  addLink(e) {

  }

  // 遍历递归dom 找到祖宗
  findFather(dom, imgDom) {
    console.log("进入findFather");

    if (dom && dom.className === "editor-place") {
      console.log(11111111,dom);

    }
    else {
      dom.childNodes.forEach((item, index) => {
        if (item.hasChildNodes()) {
          this.findFather(item);
        }
        if (item.nodeName === "IMG") {

        }
      });
    }
  }

  // 遍历递归dom
  getChildren(dom) {
    console.log("进入getChildren");

    if (dom && dom.hasChildNodes()) {
      dom.normalize();
      dom.childNodes.forEach((item, index) => {
        if (item.hasChildNodes()) {
          this.getChildren(item);
        }
        if (item.nodeType === 3) {
          console.log(11111, item.nodeValue);
          // this.addP(item);
          this.addP(item);
        }
        if(item.nodeName === "I") {
          console.log(222, "i found a I");
          // document.createElement()
        }
      });
    }
  }

  componentDidMount() {
    // document.querySelector(".editor-place").addEventListener("keydown", this.textHandle);
    // document.querySelector(".editor-place").addEventListener("keyup", () => {
    //   let dom = document.querySelector(".editor-place");
    //   this.getChildren(dom);
    // });

  }

  render() {
    return (
      <div className="editor">
        <div className="toolbar">
          <input ref="file" type="file" id="file"/>
          <button data-exec="bold" onClick={this.addBold}>
            加粗
          </button>
          <button data-exec="italic" onClick={this.addItalic}>
            斜体
          </button>
          <span className="toolbar-separator"></span>


          <button data-exec="insertHorizontalRule" onClick={this.addHorLine}>
            删除线
          </button>
          <button data-exec="createLink" onClick={this.addLink}>
            链接
          </button>
          <span className="toolbar-separator"></span>

          <button className="image-btn" onClick={this.openImage}>
            加图
          </button>


        </div>
        <div className="editor-place" contentEditable="true">

        </div>
      </div>
    );
  }
}