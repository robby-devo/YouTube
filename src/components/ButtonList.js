import React from 'react'
import Button from './Button'

const ButtonList = () => {
  const list = ["All","Gaming","Songs","Live","Soccer","Cricket","News"]
  return (
    <div className='flex'>
      {list.map((li)=>{
        console.log("liss",li)
return (
  <Button name={li} />
)
      })}



    </div>
  )
}

export default ButtonList