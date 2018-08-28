import React from 'react';
import ViewBase from "../../ViewBase";
import {
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';

import "../stylus/edit.styl";
import Rich from "../../../common/components/rich";

export default class Edit extends ViewBase {
  constructor(props) {
    super(props);
    let {dayDate, news, showList, mark} = props;

    this.state = {
      titleValue: "",
      author: "",
      say: "",
      tags: "",
      src: "",
      content: ""
    };

    this.openFile = this.openFile.bind(this);
  }

  openFile() {
    let dom = document.querySelector(".file");
    dom.click();
    // src = ();
    console.log(dom);

    console.log(this.refs["rich"].state.editorContent);
  }

  render() {
    return <div className="main">
      <div className="btn-div">
        <input type="button" className="upload btn" value="上传/更换题图" onClick={this.openFile}/>
        <input type="button" className="delete btn" value="删除题图"/>
      </div>

      {
        this.state.src && <div className="img-div">
          <img src={this.state.src}/>
        </div>
      }

      <div className="title-div">
        <input type="text" placeholder="输入标题（推荐20汉字以内，最多30汉字/60字符）" value={this.state.titleValue} onChange={v=>this.setState({titleValue:v.target.value})}/>
        {
          this.state.titleValue ? <span className={ this.state.titleValue.length >=30 ? "warn" : "normal"}>最多30汉字/60字符</span>
            : <span className="warn">必填项</span>
        }
      </div>

      <Rich ref="rich"/>

      <div className="author-div">
        <input type="text" placeholder="署名（最多8汉字/16字符）" value={this.state.author} onChange={v=>this.setState({author:v.target.value})}/>
        {
          this.state.author ? <span className={ this.state.author.length >=8 ? "warn" : "normal"}>最多8汉字/16字符</span>
            : <span className="warn">必填项</span>
        }
      </div>

      <div className="say-div">
        <input type="text" placeholder="作者个性签名（最多15汉字/30字符）" value={this.state.say} onChange={v=>this.setState({say:v.target.value})}/>
        {
          this.state.say ? <span className={ this.state.say.length >=8 ? "warn" : "normal"}>最多15汉字/30字符</span>
            : <span className="warn">必填项</span>
        }
      </div>

      <div className="tags-div">

        <input type="text" placeholder="相关标签（最多3个，使用分号间隔）" value={this.state.tags} onChange={v=>this.setState({tags:v.target.value})}/>
        {
          this.state.tags ? <span className={ this.state.tags.split(";").length-1 >=3 ? "warn" : "normal"}>最多3个，使用分号间隔</span>
            : <span className="warn">必填项</span>
        }
      </div>

      <div className="tools-div">
        <input type="file" className="file"/>
        <input type="button" className="release" value="发布文章"/>
        <input type="button" className="preview" value="预览"/>
      </div>
    </div>
  }
}