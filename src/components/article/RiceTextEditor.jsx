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
    this.btns = this.btns.bind(this);
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

  btns(btn) {
    btn.onclick = () => {
      let command = btn.dataset.exec;
      console.log(command);

      document.execCommand(command, false);
    }

  }

  componentDidMount() {
    // document.querySelector(".editor-place").addEventListener("keydown", this.textHandle);
    document.querySelector(".editor-place").addEventListener("keyup", () => {
      let dom = document.querySelector(".editor-place");
      this.getChildren(dom);
    });

  }

  render() {
    return (
      <div className="editor">
        <div className="toolbar">
          <input ref="file" type="file" id="file"/>
          <button data-exec="bold" ref={this.btns}>
            <svg className="Zi Zi--FormatBold" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M9 17.025V13h4.418c1.19 0 2.415.562 2.415 2.012s-1.608 2.013-2.9 2.013H9zM9 7h4.336c1 0 1.814.888 1.814 2 0 .89-.814 2-1.814 2H9V7zm8.192 1.899a3.893 3.893 0 0 0-3.888-3.889S9.334 5 8.167 5C7 5 7 6.167 7 6.167v11.666C7 19 8.167 19 8.167 19l5.572.01c2.333 0 4.231-1.86 4.231-4.148a4.122 4.122 0 0 0-1.77-3.372 3.873 3.873 0 0 0 .992-2.591z"
              ></path>
            </svg>
          </button>
          <button>
            <svg className="Zi Zi--FormatItalic" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M15.751 5h-5.502a.751.751 0 0 0-.749.75c0 .417.336.75.749.75H12l-2 11H8.249a.751.751 0 0 0-.749.75c0 .417.336.75.749.75h5.502a.751.751 0 0 0 .749-.75.748.748 0 0 0-.749-.75H12l2-11h1.751a.751.751 0 0 0 .749-.75.748.748 0 0 0-.749-.75"
              ></path>
            </svg>
          </button>
          <span className="toolbar-separator"></span>


          <button>
            <svg className="Zi Zi--InsertOrderedList" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M9 6.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 6.5zM5.884 7.893v-2.09h-.643L5.402 5h1.285v2.893h-.803zm.898 3.83l-.393.395h.862v.733H5v-.482l1.057-.892c.371-.312.461-.434.463-.566.003-.202-.135-.368-.396-.368-.289 0-.418.206-.418.43H5c0-.642.482-1.073 1.125-1.073s1.125.457 1.125.945c0 .307-.106.516-.468.877zM9 11.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01a.995.995 0 0 1-.995-1zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01a.995.995 0 0 1-.995-1zm-1.759.624c0 .14-.025.27-.076.388a.902.902 0 0 1-.217.309 1.017 1.017 0 0 1-.336.205c-.13.05-.275.074-.437.074-.166 0-.32-.027-.462-.08a1.166 1.166 0 0 1-.367-.217 1.062 1.062 0 0 1-.246-.318.914.914 0 0 1-.1-.38v-.055h.765v.054a.343.343 0 0 0 .367.352c.117 0 .207-.03.27-.09.062-.06.093-.152.093-.277 0-.117-.039-.206-.117-.268a.506.506 0 0 0-.32-.091h-.14v-.516h.144c.117 0 .205-.03.264-.09a.31.31 0 0 0 .087-.226.27.27 0 0 0-.087-.209.332.332 0 0 0-.233-.08c-.107 0-.185.027-.236.08a.275.275 0 0 0-.076.197v.055h-.695v-.055a.915.915 0 0 1 .295-.644c.178-.161.436-.242.775-.242.14 0 .27.021.39.064s.224.102.312.176a.802.802 0 0 1 .207.262c.05.1.075.206.075.318 0 .258-.116.46-.348.605v.008a.625.625 0 0 1 .193.119.777.777 0 0 1 .256.572z"
              ></path>
            </svg>
          </button>
          <button>
            <svg className="Zi Zi--InsertUnorderedList" fill="currentColor" viewBox="0 0 24 24" width="24"
                 height="24">
              <path
                d="M9 7c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 7zM6 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3-6c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 12zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 17z"
              ></path>
            </svg>
          </button>
          <span className="toolbar-separator"></span>
          <button>
            <svg className="Zi Zi--InsertLink" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M6.77 17.23c-.905-.904-.94-2.333-.08-3.193l3.059-3.06-1.192-1.19-3.059 3.058c-1.489 1.489-1.427 3.954.138 5.519s4.03 1.627 5.519.138l3.059-3.059-1.192-1.192-3.059 3.06c-.86.86-2.289.824-3.193-.08zm3.016-8.673l1.192 1.192 3.059-3.06c.86-.86 2.289-.824 3.193.08.905.905.94 2.334.08 3.194l-3.059 3.06 1.192 1.19 3.059-3.058c1.489-1.489 1.427-3.954-.138-5.519s-4.03-1.627-5.519-.138L9.786 8.557zm-1.023 6.68c.33.33.863.343 1.177.029l5.34-5.34c.314-.314.3-.846-.03-1.176-.33-.33-.862-.344-1.176-.03l-5.34 5.34c-.314.314-.3.846.03 1.177z"
              ></path>
            </svg>
          </button>
          <button className="image-btn" onClick={this.openImage}>

            <svg className="Zi Zi--InsertImage" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M21 17.444C21 18.3 20.1 19 19 19H5c-1.1 0-2-.7-2-1.556V6.556C3 5.7 3.9 5 5 5h14c1.1 0 2 .7 2 1.556v10.888zm-9.437-3.919a.5.5 0 0 1-.862.013l-1.26-2.065a.5.5 0 0 0-.861.012l-2.153 3.767a.5.5 0 0 0 .435.748h10.292a.5.5 0 0 0 .438-.741L14.573 9.78a.5.5 0 0 0-.872-.006l-2.138 3.75z"
              ></path>
            </svg>
          </button>


        </div>
        <div className="editor-place" contentEditable="true">

        </div>
      </div>
    );
  }
}