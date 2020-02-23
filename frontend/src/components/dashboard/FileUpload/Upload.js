import React, {PureComponent} from 'react';
import "../../../styles/Upload.css"
import Dropzone from "./Dropzone";
import Progress from "./Progress";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {logout} from "../../../actions/authActions";
import {clearErrors} from "../../../actions/errorActions";
const env = process.env.NODE_ENV || 'production';
const config = require('../../../config')[env];

class Upload extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullyUploaded: false,
            errors: []
        };

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }
    onFilesAdded(files) {
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }));
    }

    renderProgress(file) {
        const uploadProgress = this.state.uploadProgress[file.name];
        if (this.state.uploading || this.state.successfullyUploaded) {
            return (
                <div className="ProgressWrapper">
                    <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
                    <Icon className="CheckIcon"
                          alt="done"
                          style={{
                              opacity:
                                  uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                          }} >{uploadProgress && uploadProgress.state === "done" ? "check_circle_outline" : uploadProgress && uploadProgress.state === "error" ? "error_outline": ""}</Icon>
                </div>
            );
        }
    }

    sendRequest(file) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            let componentReference = this;
            req.onreadystatechange = () => {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        resolve(req.response);
                    } else if(req.status === 403) {
                        this.props.logout()
                    } else {
                        const copy = { ...componentReference.state.uploadProgress };
                        copy[file.name] = { state: "error", percentage: 0 };
                        componentReference.setState({ uploadProgress: copy });
                        reject(req.statusText);
                    }
                }
            };
            req.upload.addEventListener("progress", event => {
                if (event.lengthComputable) {
                    const copy = { ...this.state.uploadProgress };
                    copy[file.name] = {
                        state: "pending",
                        percentage: (event.loaded / event.total) * 100
                    };
                    this.setState({ uploadProgress: copy });
                }
            });

            req.upload.addEventListener("load", event => {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = { state: "done", percentage: 100 };
                this.setState({ uploadProgress: copy });
            });

            req.upload.addEventListener("error", event => {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = { state: "error", percentage: 0 };
                this.setState({ uploadProgress: copy });
                reject(req.response);
            });

            const formData = new FormData();
            formData.append("patient-docs", file, file.name);

            req.open("POST", `${config.api}/patients/${this.props.patientId}/newDocument`);
            req.setRequestHeader('x-access-token', this.props.token);
            req.send(formData);
        });
    }

    async uploadFiles() {
        //upload the photos and set successfullyUploaded to true if successful
        this.setState({ uploadProgress: {}, uploading: true });
        const promises = [];
        this.state.files.forEach(file => {
            promises.push(this.sendRequest(file));
        });
        try {
            await Promise.all(promises);
            this.setState({ successfullyUploaded: true, uploading: false });
        } catch (e) {
            this.setState(prevState => ({
                errors: prevState.errors.concat([e])
            }));
            // Not Production ready! Do some error handling here instead...
            this.setState({ successfullyUploaded: true, uploading: false });
        }
    }

    renderActions() {
        if (this.state.successfullyUploaded) {
            return (
                <Button
                    onClick={() =>
                        this.setState({ files: [], successfullyUploaded: false })
                    }
                >
                    Clear
                </Button>
            );
        } else {
            return (
                <Button
                    disabled={this.state.files.length < 0 || this.state.uploading}
                    onClick={this.uploadFiles}
                >
                    Upload
                </Button>
            );
        }
    }

    render() {
        return (
            <div className="Upload">
                <span className="Title">Upload Files</span>
                <div className="Content">
                    <div>
                        <Dropzone
                            onFilesAdded={this.onFilesAdded}
                            disabled={this.state.uploading || this.state.successfullyUploaded}
                        />
                    </div>
                </div>
                <div className="Files">
                    {this.state.files.map(file => {
                        return (
                            <div key={file.name} className="Row">
                                <span className="Filename">{file.name}</span>
                                {this.renderProgress(file)}
                            </div>
                        );
                    })}
                </div>
                {this.state.errors ? this.state.errors.map(err => {
                    return <h4 className="error">{err}</h4>
                }) : null}
                <div className="Actions">
                    {this.renderActions()}
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    token: state.auth.token
});
export default connect(
    mapStateToProps,
    { logout, clearErrors }
)(Upload);