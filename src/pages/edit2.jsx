import React, {Component} from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js'

import cs from '../assets/css/edit.css'
import { Row,Col,Icon,Select,message,Modal,Spin,Affix } from 'antd'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { observer } from 'mobx-react'
import { editStore } from '../stores'

const Option = Select.Option



function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'atomic') {
    return {
      component: hrComponent,
      editable: false,
      props: {
        foo: 'bar',
      },
    };
  }
}

class hrComponent extends Component {
  render(){
    return (
      <div>
        <hr type={this.props.foo}></hr>
      </div>

    )
  }
}

const tools = [
  [
    { code:'bold',type:'style',path:'M9 17.025V13h4.418c1.19 0 2.415.562 2.415 2.012s-1.608 2.013-2.9 2.013H9zM9 7h4.336c1 0 1.814.888 1.814 2 0 .89-.814 2-1.814 2H9V7zm8.192 1.899a3.893 3.893 0 0 0-3.888-3.889S9.334 5 8.167 5C7 5 7 6.167 7 6.167v11.666C7 19 8.167 19 8.167 19l5.572.01c2.333 0 4.231-1.86 4.231-4.148a4.122 4.122 0 0 0-1.77-3.372 3.873 3.873 0 0 0 .992-2.591z'},
    { code:'italic',type:'style',path:'M15.751 5h-5.502a.751.751 0 0 0-.749.75c0 .417.336.75.749.75H12l-2 11H8.249a.751.751 0 0 0-.749.75c0 .417.336.75.749.75h5.502a.751.751 0 0 0 .749-.75.748.748 0 0 0-.749-.75H12l2-11h1.751a.751.751 0 0 0 .749-.75.748.748 0 0 0-.749-.75'}
  ],
  [
    {code:'h2',type:'tag',path:'M7 6.007C7 5.45 7.444 5 8 5c.552 0 1 .45 1 1.007v11.986C9 18.55 8.556 19 8 19c-.552 0-1-.45-1-1.007V6.007zm8 0C15 5.45 15.444 5 16 5c.552 0 1 .45 1 1.007v11.986C17 18.55 16.556 19 16 19c-.552 0-1-.45-1-1.007V6.007zM9 11h6v2H9v-2z'},
    {code:'blockquote',type:'tag',path:'M17.975 12.209c.504.454.822 1.05.952 1.792.061.35.055.715-.022 1.096-.075.379-.209.718-.4 1.018-.465.73-1.155 1.175-2.07 1.337-.874.153-1.684-.06-2.432-.638a3.6 3.6 0 0 1-.916-1.043 3.92 3.92 0 0 1-.506-1.336c-.172-.98-.03-2.026.425-3.142.455-1.116 1.155-2.118 2.1-3.007.8-.757 1.456-1.182 1.97-1.273a.72.72 0 0 1 .544.104.656.656 0 0 1 .286.452c.054.31-.095.601-.45.877-.856.67-1.455 1.27-1.796 1.798-.323.513-.467.873-.43 1.079.034.196.21.287.524.274l.191-.001.249-.029a2.436 2.436 0 0 1 1.781.642zm-7.51 0c.504.454.821 1.05.951 1.792.062.35.056.715-.02 1.096-.077.379-.21.718-.401 1.018-.465.73-1.155 1.175-2.07 1.337-.874.153-1.684-.06-2.432-.638a3.6 3.6 0 0 1-.916-1.043 3.92 3.92 0 0 1-.506-1.336c-.172-.98-.03-2.026.424-3.142.455-1.116 1.156-2.118 2.101-3.007.8-.757 1.456-1.182 1.97-1.273a.72.72 0 0 1 .544.104.656.656 0 0 1 .285.452c.055.31-.094.601-.45.877-.855.67-1.454 1.27-1.796 1.798-.322.513-.466.873-.43 1.079.034.196.21.287.525.274l.191-.001.248-.029a2.436 2.436 0 0 1 1.782.642z'},

    {code:'code-block',type:'tag',path:'M19.718 11.559a.961.961 0 0 1 .007 1.352l-2.201 2.033-1.319 1.219a.937.937 0 0 1-1.33-.005.961.961 0 0 1-.001-1.345l2.813-2.576-2.804-2.568a.96.96 0 0 1-.008-1.352.963.963 0 0 1 1.337 0l2.475 2.289 1.031.953zm-7.462-5.567a1.001 1.001 0 0 1 1.16-.818c.544.096.907.616.81 1.165l-2.082 11.804a1.001 1.001 0 0 1-1.16.818 1.003 1.003 0 0 1-.81-1.165l2.082-11.804zM9.123 8.316a.96.96 0 0 1 0 1.345l-2.812 2.575 2.806 2.569a.962.962 0 0 1 .006 1.35.935.935 0 0 1-1.337 0l-2.093-1.934-1.412-1.305a.961.961 0 0 1-.007-1.352l2.833-2.62.685-.634c.345-.35.976-.354 1.331.006z'},
    {code:'ordered-list-item',path:'M9 6.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 6.5zM5.884 7.893v-2.09h-.643L5.402 5h1.285v2.893h-.803zm.898 3.83l-.393.395h.862v.733H5v-.482l1.057-.892c.371-.312.461-.434.463-.566.003-.202-.135-.368-.396-.368-.289 0-.418.206-.418.43H5c0-.642.482-1.073 1.125-1.073s1.125.457 1.125.945c0 .307-.106.516-.468.877zM9 11.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01a.995.995 0 0 1-.995-1zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01a.995.995 0 0 1-.995-1zm-1.759.624c0 .14-.025.27-.076.388a.902.902 0 0 1-.217.309 1.017 1.017 0 0 1-.336.205c-.13.05-.275.074-.437.074-.166 0-.32-.027-.462-.08a1.166 1.166 0 0 1-.367-.217 1.062 1.062 0 0 1-.246-.318.914.914 0 0 1-.1-.38v-.055h.765v.054a.343.343 0 0 0 .367.352c.117 0 .207-.03.27-.09.062-.06.093-.152.093-.277 0-.117-.039-.206-.117-.268a.506.506 0 0 0-.32-.091h-.14v-.516h.144c.117 0 .205-.03.264-.09a.31.31 0 0 0 .087-.226.27.27 0 0 0-.087-.209.332.332 0 0 0-.233-.08c-.107 0-.185.027-.236.08a.275.275 0 0 0-.076.197v.055h-.695v-.055a.915.915 0 0 1 .295-.644c.178-.161.436-.242.775-.242.14 0 .27.021.39.064s.224.102.312.176a.802.802 0 0 1 .207.262c.05.1.075.206.075.318 0 .258-.116.46-.348.605v.008a.625.625 0 0 1 .193.119.777.777 0 0 1 .256.572z'},
    {code:'unordered-list-item',path:'M9 7c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 7zM6 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3-6c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 12zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 17z',len:2},

  ],
  [
    { code:'link',path:'M6.77 17.23c-.905-.904-.94-2.333-.08-3.193l3.059-3.06-1.192-1.19-3.059 3.058c-1.489 1.489-1.427 3.954.138 5.519s4.03 1.627 5.519.138l3.059-3.059-1.192-1.192-3.059 3.06c-.86.86-2.289.824-3.193-.08zm3.016-8.673l1.192 1.192 3.059-3.06c.86-.86 2.289-.824 3.193.08.905.905.94 2.334.08 3.194l-3.059 3.06 1.192 1.19 3.059-3.058c1.489-1.489 1.427-3.954-.138-5.519s-4.03-1.627-5.519-.138L9.786 8.557zm-1.023 6.68c.33.33.863.343 1.177.029l5.34-5.34c.314-.314.3-.846-.03-1.176-.33-.33-.862-.344-1.176-.03l-5.34 5.34c-.314.314-.3.846.03 1.177z',len:2},
    { code:'photo',path:'M21 17.444C21 18.3 20.1 19 19 19H5c-1.1 0-2-.7-2-1.556V6.556C3 5.7 3.9 5 5 5h14c1.1 0 2 .7 2 1.556v10.888zm-9.437-3.919a.5.5 0 0 1-.862.013l-1.26-2.065a.5.5 0 0 0-.861.012l-2.153 3.767a.5.5 0 0 0 .435.748h10.292a.5.5 0 0 0 .438-.741L14.573 9.78a.5.5 0 0 0-.872-.006l-2.138 3.75z',len:1},
    { code:'atomic',path:'M4 7c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H5c-.552 0-1-.444-1-1zm0 5a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2H5.01C4.451 13 4 12.556 4 12zm6 0a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2h-1.98c-.558 0-1.01-.444-1.01-1zm6 0a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2h-1.98c-.558 0-1.01-.444-1.01-1zM4 17c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H5c-.552 0-1-.444-1-1z'}
  ],
]

const tags = [
  {name:'javaScript',id:1},
  {name:'nodeJs',id:2}
]
@observer
export default class Edit2 extends Component {

  constructor(props) {
    super(props)
    this.state = {editorState: EditorState.createEmpty()}

  }

  onChange = (editorState) => {
    console.log(editorState)
    this.setState({editorState})
  }

  getSelectText(e){
     e.preventDefault()
     this.onChange(
       // RichUtils.toggleBlockType(
             RichUtils.toggleBlockType(
                     this.state.editorState,
                     'blockquote'
                 )
               // 'unstyled'
           // )




     )
  }
  handleChange(value){
    if(editStore.tagId === value) return
    editStore.setTagId(value)
  }
  handleOk(){

  }
  handleCancel(){
     editStore.setInputLink(false)
  }
  preloadShow(){
    message.destroy()
    if(!editStore.articleTitle) return message.warning('请输入文章标题')
    if(!editStore.articleText) return message.warning('请输入文章内容')
    editStore.setPreloadShow(!editStore.preloadShow)
  }
  uploadPhoto(input){

    if(!input.files.length) return
    editStore.upload(input.files[0],input)
  }
  opentitleImg(){
    this.refs.titleImgInput.click()
  }
  render() {
    let isArtPhoto = editStore.artPhotoStatus?'art-show':'art-hide',
        isPlaceholder = editStore.articleText?'art-hide':'art-show',
        isOpenShow = editStore.preloadShow?'art-show':'art-hide',
        isHideInput = editStore.preloadShow?'art-hide':'art-show',
        isArt = editStore.articleTitle && editStore.articleText?cs.btnActive:'',
        isTitleImg = editStore.titleImg?'flex-show':'art-hide',
        isNoTitleImg = editStore.titleImgloading || editStore.titleImg?'art-hide':'flex-show'
    return (
      <div className={cs.editArticle} >
        <Affix>

          <Row type='flex' justify='center' className={cs.headWrap}>
            <Col xl={{ span:14 }} lg={{ span: 14 }} md={{span:22}}  sm={{ span:22 }} xs={{span:22}}>
                <div className={cs.header}>
                  <span className={cs.editName}>{editStore.preloadShow?'预览文章':'写文章'}</span>
                  <div >
                    <button className={cs.rightBtn +' '+ isArt} onClick={() => this.preloadShow()}>{editStore.preloadShow?'关闭':'预览'}</button>
                    <button className={cs.rightBtn + ' '+ isArt} onClick={() => editStore.editArticle(this.refs.titleImgInput,this.refs.entryContent)}>发布</button>
                  </div>
                </div>

            </Col>
          </Row>
         </Affix>

        <Row type='flex' justify='center' className={cs.contentWarp}>
          <Col xl={{ span:14 }} lg={{ span: 14 }} md={{span:22}}  sm={{ span:22 }} xs={{span:22}}>
            <div className={cs.inputContent +' '+isHideInput}>
              <div className={cs.artTitle}>
                <input className={cs.titleInput} value={editStore.articleTitle} placeholder='请输入标题' onChange={(e) => editStore.setTitle(e.target.value)}/>
              </div>
              <div className={cs.selectTag}>
                <span></span>
                <Select defaultValue={1} style={{ width: 120 }} onChange={(e) => this.handleChange(e)}>
                   {tags.map((item,i) => (<Option key={i} value={item.id}>{item.name}</Option>))}
                </Select>
              </div>
              <div className={cs.titleImgBox}>

                <div className={cs.titleImgAction +' '+isNoTitleImg}>
                  <Icon type="camera-o" className={cs.iconCamera}/>
                  <div className={cs.artPhotoBox}>
                    <CSSTransitionGroup
                      transitionName="titlePhoto"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300}>
                      {editStore.artPhotoStatus?(<span className={cs.artPhoto}  key='artPhoto'>添加封面图</span>):null}
                    </CSSTransitionGroup>


                  </div>
                  <input type='file' accept='.jpeg, .jpg, .png' onChange={(e) => this.uploadPhoto(e.target) } className={cs.fileInput} title='添加封面图' onMouseEnter={() => editStore.setArtPhotoStatus(1)} onMouseLeave={() => editStore.setArtPhotoStatus(0)} ref='titleImgInput'/>
                </div>
                <div className={cs.titleImgShow +' '+isTitleImg} style={getBg(editStore.titleImg)}>
                  <div className={cs.titleImgBar}>
                    <button><Icon type="camera-o" className={cs.showBarBtn} onClick={() => this.opentitleImg()}/></button>
                    <button><Icon type="delete" className={cs.showBarBtn} onClick={() => editStore.setTitleImg('')}/></button>
                  </div>
                </div>

                <Spin spinning={editStore.titleImgloading} delay={300} className={cs.titleLoading}/>






              </div>
              <div className={cs.toolsBar}>
                <div className={cs.barLeft}>


                  {tools.map((item,i) => (
                    <div className={cs.toolbtnItem} key={i}>
                      {item.map((item2,i2) => (
                        <button className={cs.toolItem} onMouseDown={(e) => this.getSelectText(e,item2)} key={i2}>
                          <svg className={cs.Zi + ' '+cs.formatBold} fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                            <path d={item2.path} fillRule="evenodd">
                            </path>
                          </svg>
                        </button>
                       ))}
                      <span className={cs.toolLine}></span>
                    </div>


                  ))}

                </div>
                <div className={cs.barRight}>

                </div>
              </div>
                  <div className={cs.entryContent}>
                    <span className={cs.entryPlaceholder+' '+isPlaceholder}>请输入正文</span>
                    <input className={cs.uploadPhoto} type='file'  accept='.jpeg, .jpg, .png' ref='uploadPhoto'/>

                    <Editor editorState={this.state.editorState} onChange={this.onChange} blockRendererFn={myBlockRenderer}/>

                  </div>
            </div>

            <div className={cs.preloadShowContent +' '+isOpenShow}>
              <h1>{editStore.articleTitle}</h1>

              <div className={cs.textContent} dangerouslySetInnerHTML={{__html: editStore.articleText}}>

              </div>
            </div>

            <Modal
              title="插入链接"
              visible={editStore.isInputLink}
              onOk={this.handleOk}
              cancelText='取消'
              okText='插入'
              onCancel={this.handleCancel}
            >
              <div className={cs.linkContent}>
                <div >
                  <input className={cs.linkText} placeholder='链接文本'/>
                </div>
                <div>
                  <input className={cs.linkUrl} placeholder='链接网址'/>
                </div>
              </div>

            </Modal>

          </Col>
        </Row>
      </div>
    )
  }
}

const getBg = url => ({
  background:`url(${url}) 50% 50% / cover no-repeat`
})
