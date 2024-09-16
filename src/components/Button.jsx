
function Button({ text, className, type }) {
    return (
        <button className={className} type={type}>{text}</button>
    )

}

export const PrimaryButton = ({ text, handler }) => {
    return <button className="btn btn-primary" onClick={handler} type="button">{text}</button>
}

export default Button;