import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({ setFieldValue, values, name }) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={name && values[name]}
        onChange={(event, editor) => {
          const data = editor.getData();
          setFieldValue(name, data);
        }}
      />
    </div>
  );
};

export default CKEditorComponent;
