import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

class EditarInforme extends Component {

    render() {
        return (
            < div >
            <h2>{this.props.item.nombre}</h2>
            <CKEditor
                onInit={editor => {
                    console.log('Editor is ready to use!', editor);

                    // Insert the toolbar before the editable area.
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                }}
                onChange={(event, editor) => console.log({ event, editor })}
                editor={DecoupledEditor}
                data="<p>Esta es el área de edición!</p>"
            />
            </div >
        );
    }
}
export default EditarInforme;