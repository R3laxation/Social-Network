import React from "react";
import s from "./FormsControls.module.css"
import {Field} from "redux-form";


const FormControl = ({input, meta: {touched, error}, children, ...props}: any) => {
    const hasErorr = touched && error;

    return (
        <div className={s.formControl + ' ' + (hasErorr ? s.error : '')}>
            <div>
                {children}
            </div>
            {  hasErorr && <span>{error}</span>}
        </div>
    );
}

export const Textarea = (props: any) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
};

export const Input = (props: any) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
};


export const createField = (placeholder: string | null, name: string, validators: Array<any>, component: any, props: object = {}, text?: string) => {
   return <div>
       <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} />
       {text}
   </div>
}

