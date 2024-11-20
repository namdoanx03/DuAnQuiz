import { useEffect, useState } from "react"

const CountDown = (props) => {
    const [count, setCount] = useState(300)

    useEffect(() => {
        if(count === 0 )  {
            props.onTimeUp()
        } 
        const timer = setInterval(() => {
            setCount(count - 1)
        }, 1000)

        /*
        timer1   setCount => Change count
        ===== moi lan hieu ung phia tren duoc chay, da hoan thanh roi, va truoc khi den lan render tiep theo, 
                chung ta se su dung clearInterval de kill luon thang truoc no, tao moi 1 thang moi de dam bao rang tai 1 thoi diem chi co 1 timer
        timer2   setCount => Change count

        clean up
        */
        return () => {
            clearInterval(timer)
        }
        
    }, [count]) // moi lan count thay doi se chay lai timer

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }
    return(
        <div>
            {toHHMMSS(count)}
        </div>
    )
}
export default CountDown