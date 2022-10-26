import React, {useEffect, useState} from "react";

export const LeasingCalculator = () => {
    const [carCost, setCarCost] = useState(3300000)
    const [initialPayment, setInitialPayment] = useState(0)
    const [initialPaymentPercent, setInitialPaymentPercent] = useState(13)
    const [leaseTerm, setLeaseTerm] = useState(60)
    const [monthlyPayment, setMonthlyPayment] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setInitialPayment(carCost*initialPaymentPercent/100)
        const monthPay = Math.floor((carCost - initialPayment) * ((0.035 * Math.pow((1 + 0.035),
            leaseTerm)) / (Math.pow((1 + 0.035), leaseTerm) - 1)))
        setMonthlyPayment(monthPay)
        console.log(initialPayment, leaseTerm, monthlyPayment)
        const totalSum = Math.floor(initialPayment + (leaseTerm * monthlyPayment))
        console.log('totalSum', totalSum)
        setTotal(totalSum)
    }, [carCost, initialPayment, initialPaymentPercent, leaseTerm, monthlyPayment, total])

    console.log(monthlyPayment, total)

    // для отображения slider-progress
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min === '' ? '0' : e.min);
        e.style.setProperty('--max', e.max === '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }

    // const reformatNumber = (number) => {
    //     const formatter = new Intl.NumberFormat("ru");
    //     return formatter.format(number)
    // }

    // срабатывает при любом изменении
    const onCarCostChange = (event) => {
        let num = event.target.value
        setCarCost(num)
    }

    // срабатывает после смены фокуса
    const onCarCostBlur = (event) => {
        let num = event.target.value
        if (num < 1000000) {
            num = 1000000
        } else if (num > 6000000) {
            num = 6000000
        }
        console.log(num)
        setCarCost(num)
    }

    const onLeaseTermChange = (event) => {
        let num = event.target.value
        setLeaseTerm(num)
    }

    const onInitialPaymentPercentChange = (event) => {
        let num = event.target.value
        setInitialPaymentPercent(num)
    }

    return (
        <div>
            <div className='parameters'>
                <div id='param-1' className="parameter-container">
                    <div className='parameter-title'>Стоимость автомобиля</div>
                    <div className='parameter-field'>
                        <div className='parameter-wrapper'>
                            <div className='parameter-text'>
                                <div><input type="tel" value={carCost} onBlur={(event) => onCarCostBlur(event)}/></div>
                                <div className='measure'>₽</div>
                            </div>
                            <input className='slider-progress' type="range" min='1000000' max='6000000' step='50' value={carCost}
                                   onChange={(event) => onCarCostChange(event)}/>
                        </div>
                    </div>
                </div>
                <div id='param-2' className="parameter-container">
                    <div className='parameter-title'>Первоначальный взнос</div>
                    <div className='parameter-field'>
                        <div className='parameter-wrapper'>
                            <div className='parameter-text'>
                                <div className='initial-payment'>
                                    <div>{initialPayment}</div>
                                    <div>₽</div>
                                </div>
                            </div>
                            <input className='slider-progress' type="range" min='10' max='60' step='1' value={initialPaymentPercent}
                                   onChange={(event) => onInitialPaymentPercentChange(event)}/>
                        </div>
                        <div className='initial-payment-percent'><input type="tel" size='2'
                                                                        value={initialPaymentPercent}/>%
                        </div>
                    </div>
                </div>
                <div id='param-3' className="parameter-container">
                    <div className='parameter-title'>Срок лизинга</div>
                    <div className='parameter-field'>
                        <div className='parameter-wrapper'>
                            <div className='parameter-text'>
                                <div><input type="tel" value={leaseTerm}/></div>
                                <div className='measure'>мес.</div>
                            </div>
                            <input className='slider-progress' type="range" min='1' max='60' step='1' value={leaseTerm}
                                   onChange={(event) => onLeaseTermChange(event)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='results'>
                <div className="result">
                    <div className='result-title'>Сумма договора лизинга</div>
                    <div className="result-text">
                        <div>{total}</div>
                        <div>₽</div>
                    </div>
                </div>
                <div className="result">
                    <div className='result-title'>Ежемесячный платёж от</div>
                    <div className="result-text">
                        <div>{monthlyPayment}</div>
                        <div>₽</div>
                    </div>
                </div>
                <div className="send">
                    <button>Оставить заявку</button>
                </div>
            </div>
        </div>
    )
}