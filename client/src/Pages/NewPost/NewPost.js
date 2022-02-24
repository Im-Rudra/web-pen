import React, { useMemo, useRef, useState } from 'react';
import './Jodit.min.css';
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';

const NewPost = () => {
  const editor = useRef(null);
  const [editorValue, setEditorValue] = useState('');
  const config = {
    uploader: { insertImageAsBase64URI: true },
    removeButtons: ['about']
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl my-8">Add New Post</h1>
      <div className="my-8">
        <h1 className="text-3xl mb-4">Title</h1>
        <input
          className="w-full bg-gray-50 border-0 outline-none rounded-sm focus:ring-1 px-2 py-1 text-2xl"
          type="text"
        />
      </div>
      {useMemo(
        () => (
          <JoditEditor
            ref={editor}
            config={config}
            value={editorValue}
            tabIndex={1}
            onChange={(content) => setEditorValue(content)}
          />
        ),
        []
      )}
      <div>{parse(editorValue)}</div>
      {/* <div>{editorValue}</div> */}
    </div>
  );
};

export default NewPost;
