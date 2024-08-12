import { Trash } from 'lucide-react'
import React from 'react'
import ConfirmDeletePopup from '../popups/ConfirmDeletePopup'

const SingleComment = () => {
  return (
    <div className='px-2 bg-white py-2 gap-5 w-full lg:gap-10 justify-between items-center flex flex-col xmd:flex-row xmd:w-full border-[1px] border-neutral-400 rounded-[8px] shadow-sm'>
        <div className='w-full px-2 py-1 text-wrap'>
            <p className='text-description text-[12px]'>Comment Sender</p>
            <p className='text-description text-[15px]'>SingleComment comment</p>
        </div>
        <ConfirmDeletePopup
          trigger={
            <Trash className="hover:text-destructive bg-red-50 cursor-pointer" />
          }
          title={`Confirm deleting this comment`}
          body={`Are you sure deleting this comment?`}
          onSubmit={() => console.log("deleted")}
        />
    </div>
  )
}

export default SingleComment