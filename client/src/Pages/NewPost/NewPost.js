import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Jodit.min.css';
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import { gql } from 'graphql-request';
import { request } from 'graphql-request';

const NewPost = () => {
  const editor = useRef(null);
  const [editorValue, setEditorValue] = useState('');
  const [categories, setCategories] = useState([]);
  const config = {
    uploader: { insertImageAsBase64URI: true },
    removeButtons: ['about', 'print'],
    minHeight: 400,
    enter: 'DIV'
  };
  const categoryQuery = gql`
    {
      categories {
        id
        categoryName
        slug
      }
    }
  `;
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = 'http://localhost:5000/graphql';
      const res = await request(endpoint, categoryQuery);
      setCategories(res?.categories);
    };
    fetchData();
  }, []);

  return (
    <div className="container px-2 mx-auto">
      <h1 className="text-center text-2xl md:text-3xl my-2 md:my-8">
        Add New Post
      </h1>
      <div className="my-8">
        <h1 className="text-3xl mb-2 md:mb-4">Title</h1>
        <input
          className="w-full mb-4 bg-slate-100 focus:bg-slate-50 border-0 outline-none rounded-sm focus:ring-2 px-2 py-1 text-xl md:text-2xl"
          type="text"
          placeholder="Title Here"
        />
        <select
          name="cars"
          id="cars"
          className="bg-slate-100 px-2 py-1 focus:ring-2 border-0 outline-none rounded text-xl md:text-2xl"
          defaultValue=""
        >
          <option disabled value="">
            Select Category
          </option>
          {categories?.map((category) => (
            <option key={category?.id} value={category?.id}>
              {category?.categoryName}
            </option>
          ))}
        </select>
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
      <div>{editorValue}</div>
    </div>
  );
};

export default NewPost;
