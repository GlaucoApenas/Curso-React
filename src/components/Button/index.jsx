import './styles.css';

export const Button = (props) => {
    const { text, onclick, disabled } = props;
    return (
        <button disabled={disabled} className='btn' onClick={onclick}>
            {text}
        </button>
    )
}