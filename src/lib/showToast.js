import Image from "next/image";
import { toast } from 'react-toastify';

export const showToast = (type, message) => {
    switch (type) {
        case 'error':
            toast.error( 
                <p>{message}</p>, 
                {
                    icon: () => <Image src={'/toastIcons/error.svg'} width={22} height={22} alt={'error'}/>,
                }
            )
            break;
        case 'success':
            toast.success( 
                <p>{message}</p>, 
                {
                    icon: () => <Image src={'/toastIcons/sucseses.svg'} width={22} height={22} alt={'error'}/>,
                }
            )
            break;
        case 'warn':
            toast.warn( 
                <p>{message}</p>, 
                {
                    icon: () => <Image src={'/toastIcons/warning.svg'} width={22} height={22} alt={'error'}/>,
                }
            )
            break;
        case 'info':
            toast.info( 
                <p>{message}</p>, 
                {
                    icon: () => <Image src={'/toastIcons/information.svg'} width={22} height={22} alt={'error'}/>,
                }
            )
            break;
        default:
            toast.error( 
                <p>Error, try again later</p>, 
                {
                    icon: () => <Image src={'/toastIcons/error.svg'} width={22} height={22} alt={'error'}/>,
                }
            )
            break;
    }
}
