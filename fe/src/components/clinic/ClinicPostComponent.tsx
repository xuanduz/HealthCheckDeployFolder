import { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

export interface ClinicPostComponentProps {
  descriptionHTML?: string;
  setDescriptionHTML?: Function;
}

export default function ClinicPostComponent(props: ClinicPostComponentProps) {
  const { descriptionHTML, setDescriptionHTML } = props;
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(stateFromHTML(descriptionHTML || ""))
  );

  useEffect(() => {
    setEditorState(EditorState.createWithContent(stateFromHTML(descriptionHTML || "")));
  }, [descriptionHTML]);

  const onEditorStateChange = function (editorState: any) {
    setEditorState(editorState);
    setDescriptionHTML && setDescriptionHTML(stateToHTML(editorState.getCurrentContent()));
  };

  return (
    <>
      {/*<div>{draftToHtml(convertToRaw(editorState.getCurrentContent()))}</div>*/}
      {/* {<div style={{ height: "80px", overflow: "auto" }}>{text}</div>} */}
      {/*https://codesandbox.io/s/react-nqf61?file=/src/reactDraft/index.js:88-192*/}
      <div className=" black-all-child border-2">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </>
  );
}
