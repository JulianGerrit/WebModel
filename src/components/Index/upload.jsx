import React, {Component} from "react";
import styles from "./index.module.css";

export default class FileInput extends Component {
    constructor(props) {
      super(props);
      this.uploadFile = this.uploadFile.bind(this);
    //   this.loopEditor = this.props.loopEditor.bind(this);
    //   this.startEditor = this.props.startEditor.bind(this);
    }
    
    
    
    render() {
        // var loopEditor = this.props.loopEditor;
        // var codeEditor = this.props.codeEditor;
        return <React.Fragment>
            <input type="file"
            name="myFile"
            className={styles.submitButton}
            onChange={this.uploadFile} />
        </React.Fragment>
    }

    uploadFile(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(evt) {
            var parsedFile = JSON.parse(evt.target.result);
            console.log(JSON.parse(evt.target.result));
            // this.loopEditor.value = parsedFile.loopCode;
            // this.startEditor.value = parsedFile.startingValues;
        };
        reader.readAsText(file);
    }
}