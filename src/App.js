import React, {Component, createRef} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from "styled-components";
import fileUploadIcon  from './icons/icons-upload-file.png';

const FileDropZone = styled.div`
margin:20px;
width:452px;
height:90px;
 border-radius: 4px;
  border: solid 1px #dadee7;
  background-color: #f5f6f8;
display: flex;
align-items:center;
 justify-content:center;
align-self:center;
`;

const FileNameDiv = styled.div`
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-position: 14px center;
  align-items:center;
  display: flex;
  width: 176px;
  height: 36px;
  margin-left: 12px;
  padding-left: 50px;
  border-radius: 4px;
  box-shadow: 0 4px 7px 0 rgba(27, 32, 70, 0.06);
  border: solid 1px #dadee7;
  background-color: #ffffff;
  color: #268dec;
  line-height: 1.25;
`;

const CloseIcon = styled.span`
      /*  color: #f5f6f8;*/
        margin-left: auto;
        margin-right: 14px;
`;

class App extends Component {
     state = {
         acceptedFiles: [],
         rejectedFiles: [],
         error:{},
         showUpload: true
     };

    onDrop = (acceptedDropFiles) => {
        const { acceptedFiles } = this.state;
        this.setState({acceptedFiles: acceptedFiles.concat(acceptedDropFiles), showUpload: false} ,console.log(this.state));
        //this.setState({acceptedFiles: [...acceptedFiles, acceptedDropFiles], showUpload: false} ,console.log(this.state));
        console.log('rejectedDropFiles',acceptedDropFiles);
    };
    getRejectedFiles = (rejectedDropFiles) => {
        const { rejectedFiles } = this.state;
        this.setState({rejectedFiles: rejectedFiles.concat(rejectedDropFiles), showUpload: false} ,console.log(this.state));
        console.log('rejectedDropFiles',rejectedDropFiles);
    }

    render() {
        const  {acceptedFiles, showUpload, rejectedFiles} = this.state;
        console.log('fileUploadIcon-> ', fileUploadIcon);
        return (
            <div className="App">

                {
                    acceptedFiles.length ? acceptedFiles.map(i=> <FileNameDiv image={fileUploadIcon}
                                                                                        color='red'>{i.name}
                        <CloseIcon>X</CloseIcon>
                                                                                        </FileNameDiv>) : ''

                }

                {
                    rejectedFiles.length ?  rejectedFiles.map(i=> `rejectedFiles:  ${i.name}`) : ''

                }
                {showUpload &&
                    <Dd accept="image/png"
                        noClick={true} multiple={true}
                        onDropAccepted={this.onDrop}
                        onDropRejected={this.getRejectedFiles}
                        image={fileUploadIcon}
                    />

                }
            </div>
        );

    }

}


const ACCEPTED =  '.xlsx, .xls'; //.png .gig

const Dd = (props={}) => {
    const {getRootProps, getInputProps, open, acceptedFiles, rejectedFiles} = useDropzone(props);
    return (
        <div className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <FileNameDiv type="button" onClick={open} image={props.image}>
                    Open File Dialog
                </FileNameDiv>
            </div>

        </div>
    );
};

export default App;
