import React, {ChangeEvent} from "react";


type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({editMode: true})
        // this.state.editMode = true
        // this.forceUpdate()
    }

    deActivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate = (prevProps: any, prevState: any) => {
         if(prevProps.status !== this.props.status) {
             this.setState({
                 status: this.props.status
             })
         }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
				    <div>
				    	<span onDoubleClick={this.activateEditMode}>{this.props.status || 'NO STATUS'}</span>
				    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} onBlur={this.deActivateEditMode} value={this.state.status}
                               autoFocus/>
                    </div>
                }
            </div>
        );
    }


};

