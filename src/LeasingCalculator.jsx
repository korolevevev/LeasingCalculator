import React, {useEffect, useState} from "react";
import NumberInput from "./NumberMask";

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
        const totalSum = Math.floor(initialPayment + (leaseTerm * monthlyPayment))
        setTotal(totalSum)
    }, [carCost, initialPayment, initialPaymentPercent, leaseTerm, monthlyPayment, total])

    // для отображения slider-progress
    useEffect(() => {
        for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
            e.style.setProperty('--value', e.value);
            e.style.setProperty('--min', e.min === '' ? '0' : e.min);
            e.style.setProperty('--max', e.max === '' ? '100' : e.max);
            e.addEventListener('input', () => e.style.setProperty('--value', e.value));
        }
    }, [carCost, initialPayment, initialPaymentPercent, leaseTerm, monthlyPayment, total])

    // useEffect(() => {
    //     for(let field of document.querySelectorAll('.parameter-field')) {
    //         if (field.querySelectorAll('.number-input').) {
    //
    //         }
    //     }
    // })

    const reformatNumber = (number) => {
        return new Intl.NumberFormat("ru-RU").format(number);
    }

    const onCarCostSliderChange = (event) => {
        let num = event.target.value
        setCarCost(num)
    }

    const onCarCostChange = (event) => {
        let num = Number(event.target.value.replace(/ /g,''))
        if(!num){
            setCarCost(1000000);
            return;
        }
        setCarCost(num)
    }

    const onCarCostBlur = (event) => {
        let num = Number(event.target.value.replace(/ /g,''))
        if (num < 1000000) {
            num = 1000000
        } else if (num > 6000000) {
            num = 6000000
        }
        setCarCost(num)
    }

    const onLeaseTermSliderChange = (event) => {
        let num = event.target.value
        setLeaseTerm(num)
    }

    const onLeaseTermChange = (event) => {
        let num = Number(event.target.value.replace(/ /g,''))
        setLeaseTerm(num)
    }

    const onLeaseTermBlur = (event) => {
        let num = Number(event.target.value.replace(/ /g,''))
        if(!num){
            setLeaseTerm(1);
            return;
        }
        if (num < 1) {
            num = 1
        } else if (num > 60) {
            num = 60
        }
        setLeaseTerm(num)
    }

    const onInitialPaymentPercentSliderChange = (event) => {
        let num = event.target.value
        setInitialPaymentPercent(num)
    }

    const onInitialPaymentPercentChange = (event) => {
        let num = Number(event.target.value.replace(/ /g,''))
        setInitialPaymentPercent(num)
    }

    const onInitialPaymentPercentBlur = (event) => {
        let num = Number(event.target.value.replace(/ /g,''))
        if(!num){
            setInitialPaymentPercent(10);
            return;
        }
        if (num < 10) {
            num = 10
        } else if (num > 60) {
            num = 60
        }
        setInitialPaymentPercent(num)
    }

    const parameterOnClick = (id, event) => {
        document.getElementsByClassName('parameter-field')[id].style = {
            backgroundColor: 'transparent',
            border: '2px solid #F3F3F4'
        }
    }

    return (
        <div>
            <div className='parameters'>
                <div id='param-1' className="parameter-container">
                    <div className='parameter-title'>Стоимость автомобиля</div>
                    <div className='parameter-field'>
                        <div className='parameter-wrapper'>
                            <div className='parameter-text'>
                                <div>
                                    <NumberInput className='number-input' type='text' value={carCost}
                                                 onChange={onCarCostChange}
                                                 onBlur={onCarCostBlur}
                                                 onClick={() => parameterOnClick(0)}/>
                                </div>
                                <div className='measure'>₽</div>
                            </div>
                            <input className='slider-progress' type="range" min='1000000' max='6000000' step='50' value={carCost}
                                   onChange={(event) => onCarCostSliderChange(event)}/>
                        </div>
                    </div>
                </div>
                <div id='param-2' className="parameter-container">
                    <div className='parameter-title'>Первоначальный взнос</div>
                    <div className='parameter-field'>
                        <div className='parameter-wrapper'>
                            <div className='parameter-text'>
                                <div className='initial-payment'>
                                    <div>{reformatNumber(initialPayment)}</div>
                                    <div>₽</div>
                                </div>
                            </div>
                            <input className='slider-progress' type="range" min='10' max='60' step='1' value={initialPaymentPercent}
                                   onChange={(event) => onInitialPaymentPercentSliderChange(event)}/>
                        </div>
                        <div className='initial-payment-percent'>
                            <NumberInput className='number-input initial-payment-input ' type='text' value={initialPaymentPercent} onChange={onInitialPaymentPercentChange} onBlur={onInitialPaymentPercentBlur}/>%
                        </div>
                    </div>
                </div>
                <div id='param-3' className="parameter-container">
                    <div className='parameter-title'>Срок лизинга</div>
                    <div className='parameter-field'>
                        <div className='parameter-wrapper'>
                            <div className='parameter-text'>
                                <div>
                                    <NumberInput className='number-input' type='text' value={leaseTerm} onChange={onLeaseTermChange} onBlur={onLeaseTermBlur}/>
                                </div>
                                <div className='measure'>мес.</div>
                            </div>
                            <input className='slider-progress' type="range" min='1' max='60' step='1' value={leaseTerm}
                                   onChange={(event) => onLeaseTermSliderChange(event)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='results'>
                <div className="result">
                    <div className='result-title'>Сумма договора лизинга</div>
                    <div className="result-text">
                        <div>{reformatNumber(total)}</div>
                        <div>₽</div>
                    </div>
                </div>
                <div className="result">
                    <div className='result-title'>Ежемесячный платёж от</div>
                    <div className="result-text">
                        <div>{reformatNumber(monthlyPayment)}</div>
                        <div>₽</div>
                    </div>
                </div>
                <div className="send">
                    <button className='send-button' onClick={() => {
                        document.getElementsByClassName('send-button')[0].className = 'button--loading'
                        setTimeout(() => {
                            document.getElementsByClassName('button--loading')[0].className = 'send-button'
                            document.getElementsByClassName('button__text')[0].textContent = 'Заявка отправлена'
                        }, 2000)
                    }}><span className='button__text'>Оставить заявку</span></button>
                </div>
            </div>
        </div>
    )
}