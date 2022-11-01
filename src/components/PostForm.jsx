import React from 'react'

function PostForm() {
  return (
    <div>
      <div>
        <h1>Create Post</h1>
        <form>
        <input required type="text" placeholder="Enter Post Title" /><br /><br />
        <textarea required rows="5" cols="28" placeholder="Enter Post" /><br /><br />
        <button>Post</button>
        </form>
      </div>
    </div>
  )
}

export default PostForm
