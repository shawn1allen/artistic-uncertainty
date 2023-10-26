import { useEffect, useState } from "react";

const PercentBar = ({ percent }) => {
    const [barColor, setBarColor] = useState('red')

    useEffect(() => {
        if(percent < 50) {
            setBarColor('red')
        } else if(percent < 100) {
            setBarColor('yellow')
        } else {
            setBarColor('#00FF00')
        }
    }, [percent])

    return (  
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '20px',
            border: '1px black solid'
        }}>
            <div style={{
                position: 'absolute',
                height: '20px',
                width:  `${percent}%`,
                backgroundColor: `${barColor}`,
            }}>

            </div>
            
        </div>
    );
}
 
export default PercentBar;