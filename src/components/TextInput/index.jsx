import './styles.css';

export const TextInput = ({ searchValue, onchange }) => {
    return (
        <input className='form-control' value={searchValue} onChange={onchange} type="search" placeholder='Type your filter' />
    )
}