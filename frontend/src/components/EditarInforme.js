import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { baseUrl } from "../shared/baseUrl";

class EditarInforme extends Component {
  state = {
    content: " ",
  };

  handleCKeditorState = (event, editor) => {
    const data = editor.getData();
    this.setState({
      content: data,
    });
    console.log(data);
  };

  render() {
    return (
      <div className="editar">
        <br></br>
        <h2>{this.props.item.nombre}</h2>
        <br></br>
        <CKEditor
          onInit={(editor) => {
            console.log("Editor is ready to use!", editor);

            // Insert the toolbar before the editable area.
            editor.ui
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );
          }}
          config={{
            ckfinder: {
              uploadUrl: baseUrl + "imageUpload" ,
            },
          }}
          onChange={this.handleCKeditorState}
          //onChange={(event, editor) => console.log({ event, editor })}
          editor={DecoupledEditor}
          data="<p>Esta es el área de edición!</p>"
        />
      </div>
    );
  }
}
export default EditarInforme;
