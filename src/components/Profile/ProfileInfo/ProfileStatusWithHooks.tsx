import React, {ChangeEvent, useEffect, useState} from "react";


type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {

    const [editmode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() =>{
        setStatus(props.status)
    }, [props.status])

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
      setStatus(e.currentTarget.value)
    }

        return (
            <div>
                {!editmode &&
				    <div>
				    	<b>Status: </b><span onDoubleClick={onEditMode}>{props.status || '--------'}</span>
				    </div>
                }
                {editmode &&
                    <div>
                        <input onBlur={offEditMode} onChange={onStatusChange} value={status} autoFocus/>
                    </div>
                }
            </div>
        );
};

