import { useZxing } from 'react-zxing';
import { useNavigate } from 'react-router-dom';


export function QrScanScreen(){
    const navigate =useNavigate();
    const {ref}=useZxing({
        onDecodeResult(result){
            const text =result.getText()
            console.log(text)

            if (text.length===7) {
                navigate('/select-clockin-type'); // 例えば、特定のQRコードが読み取られたら /new-screen に遷移
            } else {
                navigate('/'); // QRコードの内容に応じた遷移先を設定
            }
        }
    })

    return(
        <>
            <video ref ={ref}/>
        </>
    )
}