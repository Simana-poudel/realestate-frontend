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
                <div><span className='dataTitle'>No of Rooms:</span> <span className='data'>{data?.rooms}</span></div>
                <div><span className='dataTitle'>Parking Space:</span> <span className='data'>{data?.parkingSpace}</span></div>
                <div><span className='dataTitle'>Kitchen:</span> <span className='data'>{data?.kitchen}</span></div>
                <div><span className='dataTitle'>Bedroom:</span> <span className='data'>{data?.bedroom}</span></div>
                <div><span className='dataTitle'>Diningroom:</span> <span className='data'>{data?.diningRoom}</span></div>
                <div><span className='dataTitle'>Hall:</span> <span className='data'>{data?.hall}</span></div>
                <div><span className='dataTitle'>Bathroom:</span> <span className='data'>{data?.bathroom}</span></div>
                <div><span className='dataTitle'>No of floors:</span> <span className='data'>{data?.noOfFloors} floors</span></div>
                <div><span className='dataTitle'>Built Year:</span> <span className='data'>{data?.builtYear} B.S</span></div>
                <div><span className='dataTitle'>Used Area:</span> <span className='data'>{data?.usedArea}sq.m</span></div>
              </div>
            </div>
);
};

export default BriefCharacter;