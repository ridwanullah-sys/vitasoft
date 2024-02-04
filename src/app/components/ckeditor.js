import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ descriptionpre, setDescription }) => {
  const stripHtmlTags = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText || "";
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={descriptionpre}
      onChange={(event, editor) => {
        setDescription(stripHtmlTags(editor.getData()));
      }}
    />
  );
};

export default Editor;
