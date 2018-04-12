import React, {Component} from 'react';
import cs from '../assets/css/edit2.css'
import { Edit2Store,commonStore } from '../stores'

import { dateFilter,likeNumFilter } from '../utils'
import { Timeline } from 'antd'
import {Editor, EditorState} from 'draft-js'


class Edit2 extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  componentDidMount(){
     // myMessageStore.init()
  }
  render() {

    return (
      <div className={cs.about}>
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>


    )
  }
}


export default Edit2
