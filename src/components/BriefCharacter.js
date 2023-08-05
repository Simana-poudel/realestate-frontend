import React, { useState } from "react";

const BriefCharacter = ({data}) => {

    console.log(data);
return (
<div className='briefCharacteristics'>
              <h1 className='descriptionTitle'>Brief Characteristics</h1> 
              <div className='description'>
                <div><span className='dataTitle'>District:</span> <span className='data'>{data?.district}</span></div>
                <div><span className='dataTitle'>City:</span> <span className='data'>{data?.city}</span></div>
                <div><span className='dataTitle'>Size:</span> <span className='data'>{data?.size}</span></div>
                <div><span className='dataTitle'>Area:</span> <span className='data'>{data?.area}sq.m</span></div>
                <div><span className='dataTitle'>Built Year:</span> <span className='data'>{data?.builtYear} B.S</span></div>
                <div><span className='dataTitle'>Used Area:</span> <span className='data'>{data?.usedArea}sq.m</span></div>
              </div>
            </div>
);
};

export default BriefCharacter;