import { useNavigate } from 'react-router-dom';

export function InitialScreen(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/qr-scan');
    };

    return(
        <>
            <button onClick={handleClick}>QR読込</button>
        </>
    )
}
