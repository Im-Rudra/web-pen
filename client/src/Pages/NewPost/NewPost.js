import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';

const NewPost = () => {
  const editor = useRef(null);
  const [editorValue, setEditorValue] = useState('');
  const editorConfig = {
    buttons: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'eraser',
      'ul',
      'ol',
      'font',
      'fontsize',
      'paragraph',
      'classSpan',
      'lineHeight',
      'superscript',
      'subscript',
      'image',
      'file',
      'copyformat',
      'cut',
      'copy'
    ]
  };

  const config = {
    autofocus: true,
    uploader: {
      insertImageAsBase64URI: true
    },
    buttons:
      'bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,image,video,file,copyformat,cut'
  };
  console.log(editorValue);
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl my-8">Add New Post</h1>
      <JoditEditor
        ref={editor}
        config={config}
        value={editorValue}
        onChange={(content) => setEditorValue(content)}
      />
      <div>{parse(editorValue)}</div>
    </div>
  );
};

export default NewPost;
