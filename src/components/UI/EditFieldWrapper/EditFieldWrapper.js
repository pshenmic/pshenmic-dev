import './EditFieldWrapper.scss'

function EditFieldWrapper ({ title, children }) {
    return (
        <div className={'EditFieldWrapper'}>
            <p>{title}</p>
            { children }
        </div>
    )
}

export default EditFieldWrapper
