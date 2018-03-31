import React from 'react'
import {Spin} from 'antd';
import cs from '../assets/css/loading.css'

export default({loading, isNull, isError,children,isWhite}) => {
  let white = isWhite?' '+cs.loadingWhite:''
  return (
    <div>
        <div className={cs.loading+white}>
          <Spin spinning={loading} delay={300} className={cs.spinStyle}></Spin>
        </div>
        {
          loading
            ? null
            : isNull
              ? (<div className={cs.loading}><span className={cs.errText}>并没有内容(๑´ڡ`๑)</span></div>)
              : isError
                ? (<div className={cs.loading}><span className={cs.errText}>sorry,加载出错(๑´ڡ`๑)</span></div>)
                : children
        }

    </div>
  )
}
