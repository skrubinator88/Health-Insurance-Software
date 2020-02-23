import React, {useState, useRef} from 'react';
import Icon from '@material-ui/core/Icon';
import "../../../styles/Dropzone.css"

const Dropzone = (props) => {
    const fileInputRef = useRef(null);
    const [highlight, setHighlight] = useState(false);

    let openFileDialog = () => {
        if (props.disabled) return;
        fileInputRef.current.click();
    };

    let onFilesAdded = (evt) => {
        if (props.disabled) return;
        const files = evt.target.files;
        if (props.onFilesAdded) {
            const array = fileListToArray(files);
            props.onFilesAdded(array);
        }
    };

    const fileListToArray = (list) => {
        const array = [];
        for (let i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    };

    let onDragOver = (evt) => {
        evt.preventDefault();
        if (props.disabled) return;
        setHighlight(true);
    };

    let onDragLeave = () => {
        setHighlight(false);
    };

    let onDrop = (e) => {
        e.preventDefault();
        if (props.disabled) return;
        const files = e.dataTransfer.files;
        if (props.onFilesAdded) {
            const array = fileListToArray(files);
            props.onFilesAdded(array);
        }
        setHighlight(false);
    };

    openFileDialog = openFileDialog.bind(this);
    onFilesAdded = onFilesAdded.bind(this);
    onDragOver = onDragOver.bind(this);
    onDragLeave = onDragLeave.bind(this);
    onDrop = onDrop.bind(this);

    return (
        <div className="Dropzone"
             className={`Dropzone ${highlight ? "Highlight" : ""}`}
             onDragOver={onDragOver}
             onDragLeave={onDragLeave}
             onDrop={onDrop}
             onClick={openFileDialog}
             style={{ cursor: props.disabled ? "default" : "pointer" }}>
            <Icon style={{fontSize: 64, opacity: 0.3}}>cloud_upload</Icon>
            <input
                ref={fileInputRef}
                className="FileInput"
                type="file"
                multiple
                onChange={onFilesAdded}
            />
            <span>Upload Files</span>
        </div>
    );
};

export default Dropzone;