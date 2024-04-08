import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ placeholder, description,setDescription }) => {
  // const [editorHtml, setEditorHtml] = useState(description);
  const [theme, setTheme] = useState('snow');
 
  const handleChange = (html) => {
    console.log("🚀 ~ handleChange ~ html:", html)
    setDescription(html);
  };

  const handleThemeChange = (newTheme) => {
    // if (newTheme === "core") newTheme = null;
    setTheme(newTheme);
  };

  return (
    <div >
      <ReactQuill 
        theme={theme}
        onChange={handleChange}
        value={description}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={'.app'}
        placeholder={placeholder}
        style={{ height: '20rem', width: '100%', resize: 'vertical' }}
        />
      {/* <div className="themeSwitcher">
        <label>Theme </label>
        <select onChange={(e) => handleThemeChange(e.target.value)}>
          <option value="snow">Snow</option>
          <option value="bubble">Bubble</option>
          <option value="core">Core</option>
        </select>
      </div> */}
    </div>
  );
};

Editor.propTypes = {
  placeholder: PropTypes.string,
};

Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default Editor;
