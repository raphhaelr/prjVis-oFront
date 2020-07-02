import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useField } from '@unform/core';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR'
import { getDate } from 'date-fns'

import { Container, StyledDatePicker } from './styles'

const DatePicker = ({ name, ...rest }) => {
    const datepickerRef = useRef(null);
    const { fieldName, registerField, defaultValue } = useField(name);
    const [date, setDate] = useState(defaultValue || null);

    const [placeholder, setPlaceholder] = useState('')
    
    const renderDayContents = (day, date) => {
        const tooltipText = `Tooltip for date: ${date}`;
        return <span title={tooltipText}>{getDate(date)}</span>;
    };

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: datepickerRef.current,
            path: 'props.selected',
            clearValue: (ref) => {
                ref.clear();
            },
        });
    }, [fieldName, registerField]);

    useEffect(() => {
        if (name === 'start_date') {
            setPlaceholder('Digite a data de início.')
        }
        if (name === 'end_date') {
            setPlaceholder('Digite a data de término.')
        }
    }, [name])

    return (
        <Container>
            <StyledDatePicker>
                <ReactDatePicker
                    ref={datepickerRef}
                    selected={date}
                    onChange={setDate}
                    writable="true"
                    dateFormat="dd/MM/yyyy"
                    placeholderText={placeholder}
                    minDate={new Date(Date.now())}
                    renderDayContents={renderDayContents}
                    locale={ptBR}
                    withPortal
                    formatWeekDay={nameOfDay => nameOfDay.substr(0, 3)}
                    {...rest}
                />
            </StyledDatePicker>
        </Container>
    );
};
export default DatePicker;